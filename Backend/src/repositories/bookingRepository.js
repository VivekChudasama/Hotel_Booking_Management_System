import { Booking } from '../entities/booking.js';
import { RoomInventory } from '../entities/room_inventory.js';

const createBooking = async (bookingData) => {
    const booking = new Booking(bookingData);
    return await booking.save();
};

const getBookingById = async (id) => {
    return await Booking.findById(id).populate({
        path: 'room_inventory_id',
        populate: [
            { path: 'room_id' },
            { path: 'hotel_id' }
        ]
    });
};

const getBookingsByUserId = async (userId) => {
    return await Booking.find({ user_id: userId }).populate({
        path: 'room_inventory_id',
        populate: [
            { path: 'room_id' },
            { path: 'hotel_id' }
        ]
    });
};

const getBookedInventoryIdsForDates = async (roomId, fromDate, toDate) => {
    // Find all inventories for this room
    const inventories = await RoomInventory.find({ room_id: roomId }).select('_id');
    const inventoryIds = inventories.map(inventorie => inventorie._id);

    const bookings = await Booking.find({
        room_inventory_id: { $in: inventoryIds },
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] },
        from: { $lt: toDate },
        to: { $gt: fromDate }
    }).select('room_inventory_id');
    
    return bookings.map(booking => booking.room_inventory_id);
};

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

export default {
    createBooking,
    getBookingById,
    getBookingsByUserId,
    getBookedInventoryIdsForDates,
    getAllUserBookings
}