import roomInventoryService from '../services/roomInventoryServices.js';
import { Constants } from '../config/Constants.js';
import { ResponseMessages } from '../config/response_messages.js';

const getHotelInventory = async (req, res) => {
    try {
        const room_id = req.params.room_id;
        const roomNumbers = await roomInventoryService.getAllRoomNumbersService(room_id);
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(roomNumbers);

    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
};

const deleteRoomInventory = async (req, res) => {
    try {
        const room_inventory_id = req.params.room_inventory_id;
        const roomInRoomInventory = await roomInventoryService.deleteRoomInventoryService(room_inventory_id);
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
