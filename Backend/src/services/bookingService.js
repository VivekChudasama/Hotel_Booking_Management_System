import bookingRepository from '../repositories/bookingRepository.js';
import roomInventoryRepositories from '../repositories/roomInventoryRepositories.js';
import roomRepository from '../repositories/roomRepository.js';
import { ResponseMessages } from '../config/response_messages.js';

const createBookingService = async (bookingData) => {
    const { room_id, hotel_id, from, to } = bookingData;

    // Retrieve room category details
    const room = await roomRepository.getRoomById(room_id);
    if (!room) {
        throw new Error(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND);
    }

    const bookedInventoryIds = await bookingRepository.getBookedInventoryIdsForDates(room_id, from, to);

    // Check room inventory for an available room of this type in the specific hotel
    const availableRoomInventory = await roomInventoryRepositories.findAvailableRoomForDates(room_id, hotel_id, bookedInventoryIds);
    if (!availableRoomInventory) {
        throw new Error(ResponseMessages.booking.NO_AVAILABLE_ROOMS);
    }

    // Assign specific room to booking
    bookingData.room_inventory_id = availableRoomInventory._id;

    const booking = await bookingRepository.createBooking(bookingData);

    return booking;
};

const getBookingDetailsService = async (id) => {
    return await bookingRepository.getBookingById(id);
}

const updateBookingService = async (id, updateData) => {
    const booking = await bookingRepository.getBookingById(id);
    if (!booking) return null;

    if (updateData.booking_status) booking.booking_status = updateData.booking_status;
    if (updateData.check_in_date) booking.check_in_date = updateData.check_in_date;
    if (updateData.check_out_date) booking.check_out_date = updateData.check_out_date;

    await booking.save();
    return booking;
}

const cancelBookingService = async (id) => {
    const booking = await bookingRepository.getBookingById(id);
    if (!booking) {
        return null;
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