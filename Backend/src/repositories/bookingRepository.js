import { Booking } from '../entities/Booking.js';

const createBooking = async (bookingData) => {
    const booking = new Booking(bookingData);
    return await booking.save();
};

const getBookingById = async (id) => {
    return await Booking.findById(id);
};

const deleteBooking = async (id) => {
    return await Booking.findByIdAndDelete(id);
};

const getBookingsByUserId = async (userId) => {
    return await Booking.find({ user_id: userId });
};

export default {
    createBooking,
    getBookingById,
    deleteBooking,
    getBookingsByUserId
}