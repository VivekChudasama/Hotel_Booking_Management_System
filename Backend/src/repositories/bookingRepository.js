import mongoose from 'mongoose';
import { Booking } from '../entities/booking.js';
import { RoomInventory } from '../entities/room_inventory.js';

//create booking with session
const createBookingWithSession = async (bookingDataArray, options) => {
    return await Booking.create(bookingDataArray, options);
};

const startSession = async () => {
    return await mongoose.startSession();
};

//get booking by booking id
const getBookingById = async (id) => {
    return await Booking.findById(id).populate({
        path: 'room_inventory_ids',
        populate: [
            { path: 'room_id' },
            { path: 'hotel_id' },
        ]
    });
};

//get bookings by user_id  
const getBookingsByUserId = async (userId) => {
    return await Booking.find({ user_id: userId }).populate({
        path: 'room_inventory_ids',
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
    const inventoryIdStrings = new Set(inventoryIds.map(id => id.toString()));

    // Find overlapping bookings for these inventories
    const bookings = await Booking.find({
        room_inventory_ids: { $in: inventoryIds },
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] },
        from: { $lt: toDate },
        to: { $gt: fromDate }
    }).select('room_inventory_ids').session(session);

    const bookedIds = [];
    bookings.forEach(b => {
        b.room_inventory_ids.forEach(id => {
            if (inventoryIdStrings.has(id.toString())) {
               bookedIds.push(id);
            }
        });
    });
    return bookedIds;
};

// get all booked inventory ids for a hotel across given dates
const getBookedInventoryIdsForHotelDates = async (hotelId, fromDate, toDate) => {
    // fetch inventories by hotelId
    const inventories = await RoomInventory.find({ hotel_id: hotelId }).select('_id');
    const inventoryIds = inventories.map(inv => inv._id);
    const inventoryIdStrings = new Set(inventoryIds.map(id => id.toString()));
    
    const bookings = await Booking.find({
        room_inventory_ids: { $in: inventoryIds },
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] },
        from: { $lt: new Date(toDate) },
        to: { $gt: new Date(fromDate) }
    }).select('room_inventory_ids');
    
    const bookedIds = [];
    bookings.forEach(b => {
        b.room_inventory_ids.forEach(id => {
            const idStr = id.toString();
            if (inventoryIdStrings.has(idStr)) {
               bookedIds.push(idStr);
            }
        });
    });
    return bookedIds;
};

//get all user's bookings
const getAllUserBookings = async () => {
    return await Booking.find()
        .populate('user_id', 'name email phone_number')
        .populate({
            path: 'room_inventory_ids',
            populate: [
                { path: 'room_id' },
                { path: 'hotel_id', select: 'name city' }
            ]
        })
        .sort({ createdAt: -1 });
}



const findActiveBookingsByUserAndRooms = async (userId, roomIds, fromDate, toDate) => {
    // Find all inventory items for these rooms
    const inventories = await RoomInventory.find({ room_id: { $in: roomIds } }).select('_id room_id');
    const inventoryIds = inventories.map(inv => inv._id);

    const bookings = await Booking.find({
        user_id: userId,
        room_inventory_ids: { $in: inventoryIds },
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] },
        from: { $lt: toDate },
        to: { $gt: fromDate }
    });

    return { bookings, inventories };
};

export default {
    createBookingWithSession,
    startSession,
    getBookingById,
    getBookingsByUserId,
    getBookedInventoryIdsForDates,
    getAllUserBookings,
    getBookedInventoryIdsForHotelDates,
    findActiveBookingsByUserAndRooms
}