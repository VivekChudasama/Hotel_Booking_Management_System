import roomRepository from '../repositories/roomRepository.js';
import { Room } from '../entities/room.js';
import { Booking } from '../entities/booking.js';
import { RoomInventory } from '../entities/room_inventory.js';
import { ResponseMessages } from '../config/response_messages.js';

const getroomListService = async (id) => {
    return await roomRepository.getHotelSpecificRoomsList(id);
};

const createRoomService = async (roomData) => {
    // Check if the room type already exists for this hotel
    const existingRoom = await Room.findOne({
        hotel_id: roomData.hotel_id,
        room_type: roomData.room_type
    });
    
    if (existingRoom) {
        throw new Error(ResponseMessages.room.ROOM_TYPE_ALREADY_EXISTS);
    }

    // Create the room if not exist.
    const savedRoom = await roomRepository.createRoom(roomData);

    return savedRoom;
};

const updateRoomService = async (id, updateRoomData) => {
    const existingRoom = await roomRepository.getRoomById(id);

    if (!existingRoom) {
        throw new Error(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND);
    }

    return await roomRepository.updateRoomById(id, updateRoomData);
};

const deleteRoomService = async (id) => {
    const existingRoom = await roomRepository.getRoomById(id);

    if (!existingRoom) {
        throw new Error(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND);
    }

    // Check if there are active bookings for this specific room
    const activeBookings = await Booking.find({
        room_id: id,
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] }
    });

    if (activeBookings.length > 0) {
        throw new Error(ResponseMessages.room.ACTIVE_BOOKINGS_EXIST);
    }

    // Delete associated physical room inventory entries
    await RoomInventory.deleteMany({ room_id: id });
    
    return await roomRepository.deleteRoomById(id);
}

export default {
    getroomListService,
    createRoomService,
    updateRoomService,
    deleteRoomService
}