import roomInventorRepository from "../repositories/roomInventoryRepositories.js";
import { RoomInventory } from "../entities/room_inventory.js";
import { ResponseMessages } from "../config/response_messages.js";

const deleteRoomInventoryService = async (id) => {

    const existingRoomInRoomInventory = await roomInventorRepository.getRoomInventoryRoomById(id);

    if (!existingRoomInRoomInventory) {
        throw new Error(ResponseMessages.room_inventory.ROOM_INVENTORY_ROOM_NOT_FOUND);
    }

    // Check if there are active bookings for this specific room
    const activeBookings = await Booking.find({
        room_id: id,
        status: { $in: ['pending', 'confirmed', 'checked in'] }
    });

    if (activeBookings.length > 0) {
        throw new Error(ResponseMessages.room.ACTIVE_BOOKINGS_EXIST);
    }

    await roomInventorRepository.deleteRoomInventoryRoomById({ id })
}

export default {
    deleteRoomInventoryService
}
