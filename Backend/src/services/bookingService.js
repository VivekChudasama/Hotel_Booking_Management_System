import bookingRepository from '../repositories/bookingRepository.js';
import { ResponseMessages } from '../config/response_messages.js';

const createBookingService = async (bookingData) => {
    const { room_id, from, to } = bookingData;
    const overlappingBooking = await bookingRepository.findOverlappingBooking(room_id, from, to);
    
    if (overlappingBooking) {
        throw new Error(ResponseMessages.booking.ROOM_ALREADY_BOOKED);
    }

    return await bookingRepository.createBooking(bookingData);
};

const getBookingDetailsService = async (id) => {
    return await bookingRepository.getBookingById(id);
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

export default {
    createBookingService,
    getBookingDetailsService,
    cancelBookingService,
    getBookingHistoryService
}

