import { Booking } from '../entities/Booking.js';

const createBooking = async (bookingData) => {
    const booking = new Booking(bookingData);
    return await booking.save();
};

const getBookingById = async (id) => {
    return await Booking.findById(id);
};

const getBookingsByUserId = async (userId) => {
    return await Booking.find({ user_id: userId });
};

const findOverlappingBooking = async (roomId, fromDate, toDate) => {
    return await Booking.findOne({
        room_id: roomId,
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] },
        $or: [
            { from: { $lt: toDate }, to: { $gt: fromDate } }
        ]
    });
};

const getAllUserBookings = async () => {
    return await Booking.find()
}

export default {
    createBooking,
    getBookingById,
    getBookingsByUserId,
    findOverlappingBooking,
    getAllUserBookings
}