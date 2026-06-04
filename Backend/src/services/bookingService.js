import bookingRepository from '../repositories/bookingRepository.js';
import roomInventoryRepositories from '../repositories/roomInventoryRepositories.js';
import roomRepository from '../repositories/roomRepository.js';
import paymentRepositories from '../repositories/paymentRepositories.js';
import userRepository from '../repositories/userRepository.js';
import hotelRepository from '../repositories/hotelRepository.js';
import { ResponseMessages } from '../config/response_messages.js';

//Create booking
const createBookingService = async (bookingData) => {
    const { hotel_id, from, to, user_id, rooms } = bookingData;

    const fromDate = new Date(from);
    const toDate = new Date(to);
    const now = new Date();
    const today = new Date(now.setUTCHours(0, 0, 0, 0));

    if (fromDate < today) {
        throw new Error("Booking from date cannot be in the past.");
    }

    if (toDate <= fromDate) {
        throw new Error("Booking to date must be after from date.");
    }

    const diffDays = (toDate - fromDate) / (1000 * 60 * 60 * 24);
    if (diffDays > 60) {
        throw new Error(ResponseMessages.booking.MAX_BOOKING_DURATION);
    }

    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
    if (fromDate > sixMonthsLater) {
        throw new Error(ResponseMessages.booking.MAX_BOOKING_DATE);
    }

    // Convert dates to UTC
    bookingData.from = fromDate.toUTCString();
    bookingData.to = toDate.toUTCString();

    const user = await userRepository.getUserById(user_id);
    if (!user) {
        throw new Error("Invalid user ID. User not found in database.");
    }

    let finalRooms = rooms;
    if (!finalRooms || finalRooms.length === 0) {
        if (bookingData.room_id) {
            finalRooms = [{ room_id: bookingData.room_id, count: 1 }];
        } else if (bookingData.room_inventory_id) {
            const inventory = await roomInventoryRepositories.getRoomInventoryRoomById(bookingData.room_inventory_id);
            if (!inventory) throw new Error(ResponseMessages.room_inventory.ROOM_INVENTORY_NOT_FOUND);
            finalRooms = [{ room_id: inventory.room_id, count: 1 }];
            if (!bookingData.hotel_id) bookingData.hotel_id = inventory.hotel_id;
        } else {
            throw new Error("No rooms specified.");
        }
    }

    const hotelIdToUse = hotel_id || bookingData.hotel_id;
    const hotel = await hotelRepository.getHotelById(hotelIdToUse);
    if (!hotel) {
        throw new Error(ResponseMessages.hotel.HOTEL_NOT_FOUND);
    }

    let totalAdultCapacity = 0;
    let totalChildCapacity = 0;
    let calculatedTotalAmount = 0;
    const nights = Math.max(1, Math.round(diffDays));

    const processedRooms = [];

    // Fetch all requested room in a single query
    const finalRoomIds = finalRooms.map(r => r.room_id);
    const roomsList = await roomRepository.getRoomsByIds(finalRoomIds);
    const roomsMap = new Map(roomsList.map(room => [room._id.toString(), room]));

    for (const r of finalRooms) {
        const room = roomsMap.get(r.room_id.toString());
        if (!room) {
            throw new Error(`Room not found: ${r.room_id}`);
        }
        if (room.hotel_id.toString() !== hotelIdToUse.toString()) {
            throw new Error(`Room does not belong to the specified hotel.`);
        }

        const count = r.count;

        totalAdultCapacity += (room.room_capacity.adult_count * count);
        totalChildCapacity += (room.room_capacity.children_count * count);
        calculatedTotalAmount += (room.price_per_night * count * nights);

        processedRooms.push({ room_id: r.room_id, count: count });
    }

    const requestedAdults = bookingData.guests?.adult_count;
    const requestedChildren = bookingData.guests?.child_count;

    if (requestedAdults > totalAdultCapacity || requestedChildren > totalChildCapacity) {
        throw new Error("Guest count exceeds total combined room capacity.");
    }


    bookingData.total_amount = calculatedTotalAmount;

    const session = await bookingRepository.startSession();
    session.startTransaction();

    try {
        const finalInventoryIds = [];

        for (const pr of processedRooms) {
            const bookedInventoryIds = await bookingRepository.getBookedInventoryIdsForDates(pr.room_id, bookingData.from, bookingData.to, session);

            const availableInventories = await roomInventoryRepositories.findAvailableRoomsForDates(pr.room_id, hotelIdToUse, bookedInventoryIds, pr.count, session);

            if (availableInventories.length < pr.count) {
                throw new Error(`Not enough available rooms of type Requested: ${pr.count}, Available: ${availableInventories.length}`);
            }

            finalInventoryIds.push(...availableInventories.map(inv => inv._id));
        }

        bookingData.room_inventory_ids = finalInventoryIds;
        delete bookingData.room_inventory_id;

        const [booking] = await bookingRepository.createBookingWithSession([bookingData], { session });

        // Create Payment
        const paymentData = {
            booking_id: booking._id,
            amount: bookingData.total_amount,
            payment_method: bookingData.payment_method,
            payment_status: bookingData.payment_status
        };
        await paymentRepositories.createPaymentWithSession([paymentData], { session });

        await session.commitTransaction();
        session.endSession();

        return booking;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

//get details of booking by booking id
const getBookingDetailsService = async (id) => {
    const booking = await bookingRepository.getBookingById(id);
    if (!booking) {
        throw new Error(ResponseMessages.booking.BOOKING_NOT_FOUND)
    }

    return booking;
}

//update booking service to confirm user booking and add checking and checkout date 
const updateBookingService = async (id, updateData) => {
    const booking = await bookingRepository.getBookingById(id);
    if (!booking) {
        throw new Error(ResponseMessages.booking.BOOKING_NOT_FOUND)
    };

    if (updateData.check_out_date && updateData.check_in_date && updateData.check_out_date <= updateData.check_in_date) {
        throw new Error(ResponseMessages.booking.MIN_CHECK_OUT_DATE);
    };

    const Updates = ['booking_status', 'check_in_date', 'check_out_date'];
    Updates.forEach(key => {
        if (updateData[key] !== undefined) {
            booking[key] = updateData[key];
        }
    });

    await booking.save();
    return booking;
}

// cancel booking by booking id
const cancelBookingService = async (id) => {
    const booking = await bookingRepository.getBookingById(id);

    if (!booking) {
        throw new Error(ResponseMessages.booking.BOOKING_NOT_FOUND)
    }

    if (booking.booking_status = 'checked out') {
        throw new Error(ResponseMessages.booking.INVALID_CANCEL_REQUEST)
    }

    booking.booking_status = 'cancelled';
    await booking.save();

    return booking;
}

// get booking history by user id for specific user 
const getBookingHistoryService = async (userId, query = {}) => {
    return await bookingRepository.getBookingsByUserId(userId, query)
}

// get all user booking for admin
const getAllUserBookingService = async (query = {}) => {
    return await bookingRepository.getAllUserBookings(query)
}

export default {
    createBookingService,
    getBookingDetailsService,
    updateBookingService,
    cancelBookingService,
    getBookingHistoryService,
    getAllUserBookingService
}