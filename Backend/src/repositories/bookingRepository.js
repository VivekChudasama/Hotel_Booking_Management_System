import mongoose from 'mongoose';
import { Booking } from '../entities/booking.js';
import { RoomInventory } from '../entities/room_inventory.js';

//create booking
const createBooking = async (bookingData) => {
    const booking = new Booking(bookingData);
    return await booking.save();
};

const createBookingWithSession = async (bookingDataArray, options) => {
    return await Booking.create(bookingDataArray, options);
};

const startSession = async () => {
    return await mongoose.startSession();
};

//get booking by booking id
const getBookingById = async (id) => {
    return await Booking.findById(id).populate({
        path: 'room_inventory',
        populate: [
            { path: 'room_id' },
            { path: 'hotel_id' },
        ]
    });
};

//get bookings by user_id  
const getBookingsByUserId = async (userId) => {
    return await Booking.find({ user_id: userId }).populate({
        path: 'room_inventory',
        populate: [
            { path: 'room_id' },
            { path: 'hotel_id' },
        ]
    });
};


const getBookedInventoryIdsForDates = async (roomId, fromDate, toDate, session) => {
    // Find overlapping bookings
    const bookings = await Booking.find({
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] },
        from: { $lt: toDate },
        to: { $gt: fromDate }
    }).select('_id').session(session);

    const bookingIds = bookings.map(b => b._id);

    // Find inventories for this room that are overlapping bookings
    const bookedInventories = await RoomInventory.find({
        room_id: roomId,
        booking_id: { $in: bookingIds }
    }).select('_id').session(session);

    return bookedInventories.map(inv => inv._id);
};

//get all user's bookings
const getAllUserBookings = async () => {
    return await Booking.find()
        .populate('user_id', 'name email phone_number')
        .populate({
            path: 'room_inventory',
            populate: [
                { path: 'room_id' },
                { path: 'hotel_id', select: 'name city' }
            ]
        })
        .sort({ createdAt: -1 });
}

export default {
    createBooking,
    createBookingWithSession,
    startSession,
    getBookingById,
    getBookingsByUserId,
    getBookedInventoryIdsForDates,
    getAllUserBookings
}