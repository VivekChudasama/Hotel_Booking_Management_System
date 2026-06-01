import { param } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';

const validateGetHotelInventory = [
    param('room_id').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_ID_REQUIRED)
        .bail()
        .isMongoId().withMessage(ResponseMessages.room.VALID_ROOM_ID),
];

const validateDeleteRoomfromRoomInventory = [
    param('room_inventory_id').notEmpty().withMessage(ResponseMessages.booking.ROOM_INVENTORY_ID_REQUIRED)
        .bail()
        .isMongoId().withMessage(ResponseMessages.common.MUST_BE_MONGO_ID)
];

export default {
    validateGetHotelInventory,
    validateDeleteRoomfromRoomInventory
};
