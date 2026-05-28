import bookingRepository from '../repositories/bookingRepository.js';
import roomInventoryRepositories from '../repositories/roomInventoryRepositories.js';
import roomRepository from '../repositories/roomRepository.js';
import paymentRepositories from '../repositories/paymentRepositories.js';
import { ResponseMessages } from '../config/response_messages.js';

//Create booking
const createBookingService = async (bookingData) => {
    const { room_id, hotel_id, from, to, user_id, room_inventory_id } = bookingData;

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
        throw new Error("Cannot book a room for more than 60 days.");
    }

    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
    if (fromDate > sixMonthsLater) {
        throw new Error("Cannot book a room more than 6 months in advance.");
    }

    // Convert dates to UTC
    bookingData.from = fromDate.toUTCString();
    bookingData.to = toDate.toUTCString();

    // fetching room_id and hotel_id from inventory if not provided
    let finalRoomId = room_id;
    let finalHotelId = hotel_id;

    if (!finalRoomId || !finalHotelId) {
        const inventory = await roomInventoryRepositories.getRoomInventoryRoomById(room_inventory_id);
        if (!inventory) {
            throw new Error(ResponseMessages.room_inventory.ROOM_INVENTORY_NOT_FOUND);
        }
        finalRoomId = inventory.room_id;
        finalHotelId = inventory.hotel_id;
        bookingData.room_id = finalRoomId;
        bookingData.hotel_id = finalHotelId;
    }

    // Check if the user already has an active booking for this room type for specific dates
    const activeBooking = await bookingRepository.findActiveBookingByUserAndRoom(user_id, finalRoomId, bookingData.from, bookingData.to);
    if (activeBooking) {
        throw new Error("You already have an active booking for this room for the selected dates.");
    }

    const room = await roomRepository.getRoomById(finalRoomId);
    if (!room) {
        throw new Error(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND);
    }

    const session = await bookingRepository.startSession();
    session.startTransaction();

    try {
        const bookedInventoryIds = await bookingRepository.getBookedInventoryIdsForDates(finalRoomId, bookingData.from, bookingData.to, session);

        const availableRoomInventory = await roomInventoryRepositories.findAvailableRoomForDates(finalRoomId, finalHotelId, bookedInventoryIds, session);
        if (!availableRoomInventory) {
            throw new Error(ResponseMessages.booking.NO_AVAILABLE_ROOMS);
        }

        // Override the room_inventory_id with the is available room
        bookingData.room_inventory_id = availableRoomInventory._id;

        const [booking] = await bookingRepository.createBookingWithSession([bookingData], { session });

        await roomInventoryRepositories.addBookingToInventory(availableRoomInventory._id, booking._id, bookingData.from, bookingData.to, session);

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
    return await bookingRepository.getBookingById(id);
}

//update booking service to confirm user booking and add checking and checkout date 
const updateBookingService = async (id, updateData) => {
    const booking = await bookingRepository.getBookingById(id);
    if (!booking) {
        throw new Error(ResponseMessages.booking.BOOKING_NOT_FOUND)
    };

    if (updateData.booking_status) booking.booking_status = updateData.booking_status;
    if (updateData.check_in_date) booking.check_in_date = updateData.check_in_date;
    if (updateData.check_out_date) booking.check_out_date = updateData.check_out_date;

    await booking.save();
    return booking;
}

//cancle booking 
const cancelBookingService = async (id) => {
    const booking = await bookingRepository.getBookingById(id);
    if (!booking) {
        throw new Error(ResponseMessages.booking.BOOKING_NOT_FOUND)
    }

    booking.booking_status = 'cancelled';
    await booking.save();
    await roomInventoryRepositories.removeBookingFromInventory(booking._id);

    return booking;
}

// get booking history by user id for specific user
const getBookingHistoryService = async (userId) => {
    return await bookingRepository.getBookingsByUserId(userId)
}

// get all user booking for admin
const getAllUserBookingService = async () => {
    return await bookingRepository.getAllUserBookings()
}

export default {
    createBookingService,
    getBookingDetailsService,
    updateBookingService,
    cancelBookingService,
    getBookingHistoryService,
    getAllUserBookingService
}