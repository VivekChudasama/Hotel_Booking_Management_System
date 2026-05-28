import { RoomInventory } from '../entities/room_inventory.js';

const getRoomInventoryRoomById = async (id) => {
    return await RoomInventory.findById({ _id: id })
}

const findAvailableRoomForDates = async (roomId, hotelId, bookedInventoryIds) => {
    return await RoomInventory.findOne({
        room_id: roomId,
        hotel_id: hotelId,
        _id: { $nin: bookedInventoryIds }
    });
};


const addBookingToInventory = async (inventoryId, bookingId, from, to, session) => {
    return await RoomInventory.findByIdAndUpdate(
        inventoryId,
        { $push: { bookings: { booking_id: bookingId, from, to } } },
        { returnDocument: 'after', session }
    );
};

const removeBookingFromInventory = async (bookingId) => {
    return await RoomInventory.findOneAndUpdate(
        { 'bookings.booking_id': bookingId },
        { $pull: { bookings: { booking_id: bookingId } } },
        { returnDocument: 'after' }
    );
};

const getAvailableRoomsByHotel = async (hotelId) => {
    return await RoomInventory.find({
        hotel_id: hotelId,
        status: 'available'
    }).populate('room_id');
};

const getAllRoomNumbers = async (hotelId, roomId) => {
    return await RoomInventory.find({
        hotel_id: hotelId,
        room_id: roomId
    }).select('room_number -_id');
};


const deleteRoomInventoryById = async (id) => {
    return await RoomInventory.findOneAndDelete({ _id: id });
};

export default {
    getRoomInventoryRoomById,
    findAvailableRoomForDates,
    addBookingToInventory,
    removeBookingFromInventory,
    getAvailableRoomsByHotel,
    getAllRoomNumbers,
    deleteRoomInventoryById
};
