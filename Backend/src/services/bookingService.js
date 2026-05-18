import  bookingRepository  from '../repositories/bookingRepository.js'

const createBookingService = async (bookingData) => {
    return await bookingRepository.createBooking(bookingData);
};

const getBookingDetailsService = async (id) => {
    return await bookingRepository.getBookingById(id);
}

const cancelBookingService = async (id) => {
    return await bookingRepository.deleteBooking(id);
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

