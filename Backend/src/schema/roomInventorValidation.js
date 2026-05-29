import { param, query } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';

const validateGetHotelInventory = [
    param('hotel_id').notEmpty().withMessage(ResponseMessages.hotel.HOTEL_ID_REQUIRED)
        .bail()
        .isMongoId().withMessage(ResponseMessages.hotel.VALID_HOTEL_ID),

    query('room_id').optional().isMongoId().withMessage(ResponseMessages.room.VALID_ROOM_ID),

    query('status').optional().isIn(['available', 'Out of Service']).withMessage(ResponseMessages.room.VALID_ROOM_STATUS)
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
