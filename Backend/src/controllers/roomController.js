import roomService from '../services/roomService.js';
import { Constants } from '../config/constants.js';
import { ResponseMessages } from '../config/response_messages.js';

const getRoomList = async (req, res) => {
    try {
        const roomList = await roomService.getroomListService();
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(roomList);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
}

const createRoom = async (req, res) => {
    try {
        const savedRoom = await roomService.createRoomService(req.body);
        res.status(Constants.RESPONSE_STATUS_CODE.CREATED_SUCCESS_CODE).json(savedRoom);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });

    }
}

const updateRoom = async (req, res) => {
    try {
        const room_id = req.params.room_id;
        const updateRoomData = req.body;
        const room = await roomService.updateRoomService(room_id, updateRoomData);
        if (!room) return res.status(Constants.RESPONSE_STATUS_CODE.NOT_FOUND_CODE).json({ message: ResponseMessages.room.HOTEL_ROOM_NOT_FOUND })
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json({ message: ResponseMessages.room.HOTEL_ROOM_UPDATED_SUCCESSFULLY })
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
}

const deleteRoom = async (req, res) => {
    try {
        const room_id = req.params.room_id;
        const room = await roomService.deleteRoomService(room_id);
        if (!room) return res.status(Constants.RESPONSE_STATUS_CODE.NOT_FOUND_CODE).json({ message: ResponseMessages.room.HOTEL_ROOM_NOT_FOUND })
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json({ message: ResponseMessages.room.HOTEL_ROOM_DELETED_SUCCESSFULLY })
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });

    }
}

export default {
    getRoomList,
    createRoom,
    updateRoom,
    deleteRoom
}
