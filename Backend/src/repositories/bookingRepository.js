import { Booking } from '../entities/booking.js';

const createBooking = async (bookingData) => {
    const booking = new Booking(bookingData);
    return await Booking.save();
};

const getBookingById = async (id) => {
    return await Booking.findById(id).populate('room_id');
};

const getBookingsByUserId = async (userId) => {
    return await Booking.find({ user_id: userId }).populate('room_id');
};

const getBookedInventoryIdsForDates = async (roomId, fromDate, toDate) => {
    const bookings = await Booking.find({
        room_id: roomId,
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] },
        $or: [
            { from: { $lt: toDate }, to: { $gt: fromDate } }
        ]
    }).select('room_inventory_id');
    return bookings.map(b => b.room_inventory_id);
};

const getAllUserBookings = async () => {
    return await Booking.find()
        .populate('user_id', 'name email phone_number')
        .populate('room_id')
        .populate('hotel_id', 'name city')
        .sort({ createdAt: -1 });
}

export default {
    createBooking,
    getBookingById,
    getBookingsByUserId,
    getBookedInventoryIdsForDates,
    getAllUserBookings
}