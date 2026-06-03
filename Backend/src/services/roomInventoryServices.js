import roomInventoryRepositories from '../repositories/roomInventoryRepositories.js';
import { Booking } from '../entities/booking.js';
import { ResponseMessages } from '../config/response_messages.js';

const deleteRoomInventoryService = async (inventoryId) => {

    const existingRoomInRoomInventory = await roomInventoryRepositories.getRoomInventoryRoomById(inventoryId)

    if (!existingRoomInRoomInventory) {
        throw new Error(ResponseMessages.room_inventory.ROOM_INVENTORY_NOT_FOUND);
    }

    const hasActiveBookings = await Booking.exists({
        room_inventory_ids: inventoryId,
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] }
    });

    if (hasActiveBookings) {
        throw new Error(ResponseMessages.room.ACTIVE_BOOKINGS_EXIST);
    }

    const deletedInventory = await roomInventoryRepositories.deleteRoomInventoryById(inventoryId);
    if (!deletedInventory) {
        throw new Error(ResponseMessages.room_inventory.ROOM_INVENTORY_NOT_FOUND);
    }
    return deletedInventory;
};

const getAllRoomNumbersService = async (roomId) => {
    const room = await roomInventoryRepositories.getAllRoomNumbers(roomId);

    if (!room) {
        throw new Error(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND);
    }
    return room;
};

export default {
    deleteRoomInventoryService,
    getAllRoomNumbersService
};
