import { param, query } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';

const validateGetHotelInventory = [
    param('hotel_id').notEmpty().withMessage(ResponseMessages.hotel.HOTEL_ID_REQUIRED)
        .bail()
        .isMongoId().withMessage(ResponseMessages.room_inventory.INVALID_MONGODB_ID),

    query('room_id').optional().isMongoId().withMessage(ResponseMessages.room.VALID_ROOM_ID),

    query('status').optional().isIn(['available', 'occupied']).withMessage(ResponseMessages.room.VALID_ROOM_STATUS)
];

const validateDeleteRoomfromRoomInventory = [
    param('room_inventory_id').notEmpty().withMessage(ResponseMessages.room_inventory.ROOM_INVENTORY_ID_REQUIRED)
        .bail()
        .isMongoId().withMessage(ResponseMessages.room_inventory.INVALID_MONGODB_ID)
]

export default {
    validateGetHotelInventory,
    validateDeleteRoomfromRoomInventory
};
