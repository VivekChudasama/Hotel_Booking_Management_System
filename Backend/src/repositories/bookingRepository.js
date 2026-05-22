import { Booking } from '../entities/booking.js';

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
        .populate('user_id', 'name email phone_number')
        .populate('room_id', 'room_type room_description price_per_night')
        .populate('hotel_id', 'name city')
        .sort({ createdAt: -1 });
}

export default {
    createBooking,
    getBookingById,
    getBookingsByUserId,
    findOverlappingBooking,
    getAllUserBookings
}