import bookingRepository from '../repositories/bookingRepository.js';
import roomInventoryRepositories from '../repositories/roomInventoryRepositories.js';
import roomRepository from '../repositories/roomRepository.js';
import { ResponseMessages } from '../config/response_messages.js';

const createBookingService = async (bookingData) => {
    const { room_id, hotel_id, from, to } = bookingData;

    const room = await roomRepository.getRoomById(room_id);
    if (!room) {
        throw new Error(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND);
    }

    const session = await bookingRepository.startSession();
    session.startTransaction();

    try {
        const bookedInventoryIds = await bookingRepository.getBookedInventoryIdsForDates(room_id, from, to, session);

        const availableRoomInventory = await roomInventoryRepositories.findAvailableRoomForDates(room_id, hotel_id, bookedInventoryIds, session);
        if (!availableRoomInventory) {
            throw new Error(ResponseMessages.booking.NO_AVAILABLE_ROOMS);
        }

        const [booking] = await bookingRepository.createBookingWithSession([bookingData], { session });

        await roomInventoryRepositories.updateRoomInventoryStatus(availableRoomInventory._id, 'occupied', booking._id, session);

        await session.commitTransaction();
        session.endSession();

        return booking;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


const getBookingDetailsService = async (id) => {
    return await bookingRepository.getBookingById(id);
}

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

const cancelBookingService = async (id) => {
    const booking = await bookingRepository.getBookingById(id);
    if (!booking) {
        throw new Error(ResponseMessages.booking.BOOKING_NOT_FOUND)
    }

    if (booking.booking_status === 'pending' || booking.booking_status === 'confirmed') {
        booking.booking_status = 'cancelled';
        await booking.save();
    }
    
    return booking;
}

const getBookingHistoryService = async (userId) => {
    return await bookingRepository.getBookingsByUserId(userId)
}

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