import { body, param } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';

const validateCreateRoomInventory = [
    body('hotel_id').notEmpty().withMessage(ResponseMessages.room_inventory.HOTEL_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.hotel.VALID_HOTEL_ID),

    body('room_id').notEmpty().withMessage(ResponseMessages.room_inventory.ROOM_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.room.VALID_ROOM_ID),

    body('room_number').notEmpty().withMessage(ResponseMessages.room_inventory.ROOM_NUMBER_REQUIRED).bail()
        .isInt({ min: 1 }).withMessage(ResponseMessages.room.VALID_ROOM_NUMBER),

    body('status').optional().isIn(['available', 'occupied'])
        .withMessage(ResponseMessages.room.VALID_ROOM_STATUS)
];

const validateGetAvailableRooms = [
    param('hotel_id').notEmpty().withMessage(ResponseMessages.hotel.HOTEL_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.hotel.VALID_HOTEL_ID)
];

const validateGetAllRoomNumbers = [
    param('hotel_id').notEmpty().withMessage(ResponseMessages.hotel.HOTEL_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.hotel.VALID_HOTEL_ID),

    param('room_id').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.room.VALID_ROOM_ID)
];

export default {
    validateCreateRoomInventory,
    validateGetAvailableRooms,
    validateGetAllRoomNumbers
};
