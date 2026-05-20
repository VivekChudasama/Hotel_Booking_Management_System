import roomRepository from '../repositories/roomRepository.js';
import { ResponseMessages } from '../config/response_messages.js';

const getroomListService = async (id) => {
    return await roomRepository.getHotelSpecificRoomsList(id);
};

const createRoomService = async (roomData) => {
    return await roomRepository.createRoom(roomData);
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

    const rooms = await roomRepository.getHotelSpecificRoomsList;
    const roomIds = room.map(room => room._id);

    // Check if there are active bookings for the rooms
        if (roomIds.length > 0) {
            const activeBookings = await Booking.find({
                room_id: { $in: roomIds },
                booking_status: { $in: ['pending', 'confirmed', 'checked in'] }
            });
    
            if (activeBookings.length > 0) {
                throw new Error('Cannot delete hotel room because it has active bookings');
            }
        }
    
    return await roomRepository.deleteRoomById(id);

}

export default {
    getroomListService,
    createRoomService,
    updateRoomService,
    deleteRoomService
}