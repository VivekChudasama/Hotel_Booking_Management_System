import { RoomInventory } from "../entities/room_inventory.js";

const getRoomInventoryRoomById = async(id)=>{
    return await RoomInventory.findById(id)
}

const deleteRoomInventoryRoomById = async (id) => {
    return await RoomInventory.findByIdAndDelete(id)
}

export default {
    getRoomInventoryRoomById,
    deleteRoomInventoryRoomById
}