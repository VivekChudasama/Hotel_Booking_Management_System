import roomInventoryService from "../services/roomInventoryServices.js";
import { Constants } from "../config/constants.js";
import { ResponseMessages } from "../config/response_messages.js";

const deleteRoomFromRoomInventory = async (req, res) => {
    try {
        const room_inventory_id = req.params.room_inventory_id
        const roomInRoomInventory = await roomInventoryService.deleteRoomInventoryService(room_inventory_id);
        if (!roomInRoomInventory) returnres.status(Constants.RESPONSE_STATUS_CODE.NOT_FOUND_CODE).json({ message: ResponseMessages.room_inventory.ROOM_INVENTORY_ROOM_NOT_FOUND })
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json({ message: ResponseMessages.room_inventory.ROOM_INVENTORY_ROOM_DELETED_SUCCESSFULLY })

    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
}

export default {
    deleteRoomFromRoomInventory
}