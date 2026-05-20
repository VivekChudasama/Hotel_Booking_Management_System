import { Room } from '../entities/room.js'

const getHotelSpecificRoomsList = async (id) => {
    return await Room.find({ hotel_id: id })
}

const createRoom = async (roomData) => {
    const room = new Room(roomData);
    return await room.save();
}

const updateRoomById = async (id, updateRoomData) => {
    return await Room.findByIdAndUpdate(id, updateRoomData, { useFindAndModify: true });
}

const deleteRoomById = async (id) => {
    return await Room.findByIdAndDelete(id)
}

const getRoomById = async (id) => {
    return await Room.findById(id)
}



export default {
    getHotelSpecificRoomsList,
    createRoom,
    updateRoomById,
    deleteRoomById,
    getRoomById,
   
}