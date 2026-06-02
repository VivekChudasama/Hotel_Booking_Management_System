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
const getBookingsByUserId = async (userId, query = {}) => {
    const match = { user_id: userId };
    if (query.from) match.from = { $gte: new Date(query.from) };
    if (query.to) match.to = { $lte: new Date(query.to) };

    const hotelMatch = {};
    if (query.hotel_name) hotelMatch.name = { $regex: query.hotel_name, $options: 'i' };
    if (query.city_name) hotelMatch.city = { $regex: query.city_name, $options: 'i' };

    let bookings = await Booking.find(match).populate({
        path: 'room_inventory_ids',
        populate: [
            { path: 'room_id' },
            { path: 'hotel_id', match: Object.keys(hotelMatch).length > 0 ? hotelMatch : undefined },
        ]
    }).sort({ createdAt: -1 });

    if (Object.keys(hotelMatch).length > 0) {
        bookings = bookings.filter(b => 
            b.room_inventory_ids && b.room_inventory_ids.some(inv => inv.hotel_id !== null)
        );
    }
    return bookings;
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
    
    // Find overlapping bookings for inventories
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
const getAllUserBookings = async (query = {}) => {
    const match = {};
    if (query.from) match.from = { $gte: new Date(query.from) };
    if (query.to) match.to = { $lte: new Date(query.to) };

    const userMatch = {};
    if (query.user_name) userMatch.name = { $regex: query.user_name, $options: 'i' };

    const hotelMatch = {};
    if (query.hotel_name) hotelMatch.name = { $regex: query.hotel_name, $options: 'i' };
    if (query.city_name) hotelMatch.city = { $regex: query.city_name, $options: 'i' };

    let bookings = await Booking.find(match)
        .populate({ path: 'user_id', select: 'name email phone_number', match: Object.keys(userMatch).length > 0 ? userMatch : undefined })
        .populate({
            path: 'room_inventory_ids',
            populate: [
                { path: 'room_id' },
                { path: 'hotel_id', select: 'name city', match: Object.keys(hotelMatch).length > 0 ? hotelMatch : undefined }
            ]
        })
        .sort({ createdAt: -1 });

    if (Object.keys(userMatch).length > 0) {
        bookings = bookings.filter(b => b.user_id !== null);
    }
    if (Object.keys(hotelMatch).length > 0) {
        bookings = bookings.filter(b => 
            b.room_inventory_ids && b.room_inventory_ids.some(inv => inv.hotel_id !== null)
        );
    }
    return bookings;
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