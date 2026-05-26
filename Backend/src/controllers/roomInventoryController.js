import roomInventoryService from '../services/roomInventoryServices.js';
import { Constants } from '../config/Constants.js';
import { ResponseMessages } from '../config/response_messages.js';

const getHotelInventory = async (req, res) => {
    try {
        const hotel_id  = req.params.hotel_id;
        const { status, room_id } = req.query;

        if (status === 'available') {
            const availableRooms = await roomInventoryService.getAvailableRoomsByHotelService(hotel_id);
            return res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(availableRooms);
        }

        if (room_id) {
            const roomNumbers = await roomInventoryService.getAllRoomNumbersService(hotel_id, room_id);
            return res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(roomNumbers);
        }

    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
};

const deleteRoomInventory = async (req, res) => {
    try {
        const room_inventory_id = req.params.room_inventory_id;
        const roomInRoomInventory = await roomInventoryService.deleteRoomInventoryService(room_inventory_id);
        if (!roomInRoomInventory) returnres.status(Constants.RESPONSE_STATUS_CODE.NOT_FOUND_CODE).json({ message: ResponseMessages.room_inventory.ROOM_INVENTORY_NOT_FOUND })
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json({ message: ResponseMessages.room_inventory.ROOM_INVENTORY_ROOM_DELETED_SUCCESSFULLY })
    }
    catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
}

export default {
    deleteRoomInventory,
    getHotelInventory
};
