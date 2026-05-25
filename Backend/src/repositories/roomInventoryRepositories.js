import { RoomInventory } from '../entities/room_inventory.js';

const getRoomInventoryRoomById = async (id) => {
    return await RoomInventory.findById({ _id: id })
}

const createRoomInventory = async (data) => {
    const roomInventory = new RoomInventory(data);
    return await roomInventory.save();
};

const findRoomInventoryByRoomNumber = async (hotelId, roomId, roomNumber) => {
    return await RoomInventory.findOne({
        hotel_id: hotelId,
        room_id: roomId,
        room_number: roomNumber
    });
};

const findAvailableRoomForDates = async (roomId, hotelId, bookedInventoryIds) => {
    return await RoomInventory.findOne({
        room_id: roomId,
        hotel_id: hotelId,
        _id: { $nin: bookedInventoryIds }
    });
};

const countRoomInventoryByRoomId = async (roomId) => {
    return await RoomInventory.countDocuments({ room_id: roomId });
};

const updateRoomInventoryStatus = async (inventoryId, status, bookingId) => {
    return await RoomInventory.findByIdAndUpdate(
        inventoryId,
        { status, booking_id: bookingId },
        { new: true }
    );
};

const releaseRoomInventory = async (bookingId) => {
    return await RoomInventory.findOneAndUpdate(
        { booking_id: bookingId },
        { status: 'available', booking_id: null },
        { new: true }
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
    }).select('room_number status -_id');
};

const getAllRoomNumbersByHotel = async (hotelId) => {
    return await RoomInventory.find({
        hotel_id: hotelId
    }).select('room_number status room_id -_id').populate('room_id', 'room_type');
};

const deleteRoomInventoryById = async (id) => {
    return await RoomInventory.findOneAndDelete({ _id: id });
};

export default {
    getRoomInventoryRoomById,
    createRoomInventory,
    findRoomInventoryByRoomNumber,
    findAvailableRoomForDates,
    countRoomInventoryByRoomId,
    updateRoomInventoryStatus,
    releaseRoomInventory,
    getAvailableRoomsByHotel,
    getAllRoomNumbers,
    getAllRoomNumbersByHotel,
    deleteRoomInventoryById
};
