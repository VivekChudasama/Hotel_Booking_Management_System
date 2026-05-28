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
        path: 'room_inventory_id',
        populate: [
            { path: 'room_id' },
            { path: 'hotel_id' },
        ]
    });
};

//get bookings by user_id  
const getBookingsByUserId = async (userId) => {
    return await Booking.find({ user_id: userId }).populate({
        path: 'room_inventory_id',
        populate: [
            { path: 'room_id' },
            { path: 'hotel_id' },
        ]
    });
};

const getBookedInventoryIdsForDates = async (roomId, fromDate, toDate, session) => {
    // Find all inventory items for this room
    const inventories = await RoomInventory.find({ room_id: roomId }).select('_id').session(session);
    const inventoryIds = inventories.map(inv => inv._id);

    // Find overlapping bookings for these inventories
    const bookings = await Booking.find({
        room_inventory_id: { $in: inventoryIds },
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] },
        from: { $lt: toDate },
        to: { $gt: fromDate }
    }).select('room_inventory_id').session(session);

    return bookings.map(b => b.room_inventory_id);
};

//get all user's bookings
const getAllUserBookings = async () => {
    return await Booking.find()
        .populate('user_id', 'name email phone_number')
        .populate({
            path: 'room_inventory_id',
            populate: [
                { path: 'room_id' },
                { path: 'hotel_id', select: 'name city' }
            ]
        })
        .sort({ createdAt: -1 });
}

const findActiveBookingByUserAndRoom = async (userId, roomId, fromDate, toDate) => {
    // Find all inventory items for this room
    const inventories = await RoomInventory.find({ room_id: roomId }).select('_id');
    const inventoryIds = inventories.map(inv => inv._id);

    return await Booking.findOne({
        user_id: userId,
        room_inventory_id: { $in: inventoryIds },
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] },
        from: { $lt: toDate },
        to: { $gt: fromDate }
    });
};

export default {
    createBooking,
    createBookingWithSession,
    startSession,
    getBookingById,
    getBookingsByUserId,
    getBookedInventoryIdsForDates,
    getAllUserBookings,
    findActiveBookingByUserAndRoom
}