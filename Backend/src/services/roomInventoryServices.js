import roomInventoryRepositories from '../repositories/roomInventoryRepositories.js';
import roomRepository from '../repositories/roomRepository.js';
import { Booking } from '../entities/booking.js';
import { ResponseMessages } from '../config/response_messages.js';

const deleteRoomInventoryService = async (inventoryId) => {

    const exisitingRoomInRoomInventory = await roomInventoryRepositories.getRoomInventoryRoomById(inventoryId)

    if (!exisitingRoomInRoomInventory) {
        throw new Error(ResponseMessages.room_inventory.ROOM_INVENTORY_NOT_FOUND);
    }

    //check if there are active bookings for this specific room
    const activeBookings = await Booking.find(
        {
            room_id: inventoryId,
            status: { $in: ['pending', 'confirmed', 'checked in'] }
        });

    if (activeBookings.length > 0) {
        throw new Error(ResponseMessages.room.ACTIVE_BOOKINGS_EXIST);
    }

    const deletedInventory = await roomInventoryRepositories.deleteRoomInventoryById(inventoryId);
    if (!deletedInventory) {
        throw new Error(ResponseMessages.room_inventory.ROOM_INVENTORY_NOT_FOUND);
    }
    return deletedInventory;
};

export default {
    deleteRoomInventoryService
};
