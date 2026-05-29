import roomInventoryRepositories from '../repositories/roomInventoryRepositories.js';
import roomRepository from '../repositories/roomRepository.js';
import { Booking } from '../entities/booking.js';
import { ResponseMessages } from '../config/response_messages.js';

const deleteRoomInventoryService = async (inventoryId) => {

    const exisitingRoomInRoomInventory = await roomInventoryRepositories.getRoomInventoryRoomById(inventoryId)

    if (!exisitingRoomInRoomInventory) {
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

const getAvailableRoomsByHotelService = async (hotelId) => {
    const hotel = await hotelRepository.getHotelById(hotelId)
    if (!hotel) {
        throw new Error(ResponseMessages.hotel.HOTEL_NOT_FOUND)
    }

    return await roomInventoryRepositories.getAvailableRoomsByHotel(hotelId);
};

const getAllRoomNumbersService = async (hotelId, roomId) => {
    return await roomInventoryRepositories.getAllRoomNumbers(hotelId, roomId);
};

export default {
    deleteRoomInventoryService,
    getAvailableRoomsByHotelService,
    getAllRoomNumbersService
};
