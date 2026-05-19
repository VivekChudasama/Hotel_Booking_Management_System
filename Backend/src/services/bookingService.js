import  bookingRepository  from '../repositories/bookingRepository.js'

const createBookingService = async (bookingData) => {
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

