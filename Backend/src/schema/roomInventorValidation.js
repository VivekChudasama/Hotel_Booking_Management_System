import { body, param } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';

const validateCreateRoomInventory = [
    body('hotel_id').notEmpty().withMessage(ResponseMessages.room_inventory.HOTEL_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.hotel.HOTEL_ID_REQUIRED),

    body('room_id').notEmpty().withMessage(ResponseMessages.room_inventory.ROOM_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.room_inventory.ROOM_ID_REQUIRED),

    body('room_number').notEmpty().withMessage(ResponseMessages.room_inventory.ROOM_NUMBER_REQUIRED).bail()
        .isInt({ min: 1, max: 999 }).withMessage(ResponseMessages.room_inventory.ROOM_NUMBER_TYPE),

    body('status').optional().isIn(['available', 'occupied']).withMessage(ResponseMessages.room_inventory.ROOM_STATUS_TYPE)
];

const validateUpdateRoomInventory = [
    param('room_inventory_id').notEmpty().withMessage(ResponseMessages.room_inventory.ROOM_INVENTORY_ID_REQUIRED),

    body('hotel_id').optional().notEmpty().withMessage(ResponseMessages.room_inventory.HOTEL_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.hotel.HOTEL_ID_REQUIRED),

    body('room_id').optional().notEmpty().withMessage(ResponseMessages.room_inventory.ROOM_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.room_inventory.ROOM_ID_REQUIRED),

    body('room_number').optional().notEmpty().withMessage(ResponseMessages.room_inventory.ROOM_NUMBER_REQUIRED).bail()
        .isInt({ min: 1, max: 999 }).withMessage(ResponseMessages.room_inventory.ROOM_NUMBER_TYPE),

    body('status').optional().isIn(['available', 'occupied']).withMessage(ResponseMessages.room_inventory.ROOM_STATUS_TYPE)
];

const validateGetAvailableRooms = [
    param('hotel_id').notEmpty().withMessage(ResponseMessages.hotel.HOTEL_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.hotel.HOTEL_ID_REQUIRED)
];

const validateGetAllRoomNumbers = [
    param('hotel_id').notEmpty().withMessage(ResponseMessages.hotel.HOTEL_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.hotel.HOTEL_ID_REQUIRED),

    param('room_id').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND).bail()
        .isMongoId().withMessage(ResponseMessages.room_inventory.ROOM_ID_REQUIRED)
];

const validatedeleteRoomOfRoomInventory = [
        param('room_inventory_id').notEmpty().withMessage(ResponseMessages.room_inventory.ROOM_INVENTORY_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.room_inventory.ROOM_INVENTORY_ID_REQUIRED),
]

export default {
    validateCreateRoomInventory,
    validateGetAvailableRooms,
    validateGetAllRoomNumbers,
    validatedeleteRoomOfRoomInventory
};
