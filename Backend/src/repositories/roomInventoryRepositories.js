import { RoomInventory } from '../entities/room_inventory.js';

const getRoomInventoryRoomById = async (id) => {
    return await RoomInventory.findById({ _id: id })
}

const findAvailableRoomsForDates = async (roomId, hotelId, bookedInventoryIds, limit, session) => {
    return await RoomInventory.find({
        room_id: roomId,
        hotel_id: hotelId,
        _id: { $nin: bookedInventoryIds },
        status: 'available'
    }).limit(limit).session(session);
};

const getAllRoomNumbers = async (roomId) => {
    return await RoomInventory.find({
        room_id: roomId
    }).select('room_number -_id');
};


const deleteRoomInventoryById = async (id) => {
    return await RoomInventory.findOneAndDelete({ _id: id });
};


export default {
    getRoomInventoryRoomById,
    findAvailableRoomsForDates,
    getAllRoomNumbers,
    deleteRoomInventoryById
};
