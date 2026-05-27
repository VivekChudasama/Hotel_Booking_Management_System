import { body, param } from "express-validator";
import { ResponseMessages } from "../config/response_messages.js";
import { Constants } from "../config/Constants.js";
import { validateImageURL } from "../util/imageValidator.js";

const validateCreateRoom = [
    param('hotel_id').notEmpty().withMessage(ResponseMessages.room.HOTEL_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.common.MUST_BE_MONGO_ID),

    body('room_type').trim().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_TYPE_REQUIRED).bail()
        .isString().withMessage(ResponseMessages.common.MUST_BE_STRING)
        .isIn(['Standard Room', 'Deluxe Room', 'Suite', 'Executive Room', 'Family Room'])
        .withMessage(ResponseMessages.room.HOTEL_ROOM_TYPE),

    body('room_description').trim().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_DESCRIPTION_REQUIRED).bail()
        .isString().withMessage(ResponseMessages.common.MUST_BE_STRING)
        .isLength({ max: 1024 }).withMessage(ResponseMessages.hotel.VALID_DESCRIPTION_LENGTH),

    body('amenities').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_AMENITIES_REQUIRED).bail()
        .isArray({ min: 1 }).withMessage(ResponseMessages.common.MUST_BE_ARRAY),

    body('amenities.*').trim().notEmpty().withMessage(ResponseMessages.room.VALID_ROOM_AMENIRIES_ARRAY).bail()
        .isString().withMessage(ResponseMessages.common.MUST_BE_STRING),

    body('price_per_night').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_PRICE_PER_NIGHT_REQUIRED).bail()
        .isInt({ min: 1, max: 1000000 }).withMessage(ResponseMessages.common.MUST_BE_INTEGER),

    body('room_capacity.adult_count').notEmpty().withMessage(ResponseMessages.booking.ADULT_COUNT_MIN).bail()
        .isInt({ min: 1, max: 20 }).withMessage(ResponseMessages.common.MUST_BE_INTEGER),

    body('room_capacity.children_count').notEmpty().withMessage(ResponseMessages.room.CHILD_COUNT_REQUIRED)
        .bail()
        .isInt({ min: 0, max: 20 }).withMessage(ResponseMessages.common.MUST_BE_INTEGER),

    body('room_images').optional().isArray().withMessage(ResponseMessages.common.MUST_BE_ARRAY),
    body('room_images.*').isURL().withMessage(ResponseMessages.common.MUST_BE_URL)
        .bail()
        .custom(validateImageURL),

    body('room_count').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_COUNT_REQUIRED).bail()
        .isInt({ min: 1, max: 1000 }).withMessage(ResponseMessages.common.MUST_BE_INTEGER),

    body('room_inventories').optional().isArray().withMessage(ResponseMessages.common.MUST_BE_ARRAY),
    body('room_inventories.*.room_number').notEmpty().withMessage(ResponseMessages.room_inventory.ROOM_NUMBER_REQUIRED).bail()
        .isInt({ min: 1 }).withMessage(ResponseMessages.common.MUST_BE_INTEGER),
    body('room_inventories.*.status').optional().isIn(['available', 'occupied']).withMessage(ResponseMessages.room.VALID_ROOM_STATUS)
]

const validateUpdateRoom = [
    param('room_id').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.common.MUST_BE_MONGO_ID),

    param('hotel_id').optional().notEmpty().withMessage(ResponseMessages.room.HOTEL_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.common.MUST_BE_MONGO_ID),

    body('room_type').optional().trim().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_TYPE_REQUIRED).bail()
        .isString().withMessage(ResponseMessages.common.MUST_BE_STRING)
        .isIn(['Standard Room', 'Deluxe Room', 'Suite', 'Executive Room', 'Family Room'])
        .withMessage(ResponseMessages.room.HOTEL_ROOM_TYPE),

    body('room_description').optional().trim().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_DESCRIPTION_REQUIRED).bail()
        .isString().withMessage(ResponseMessages.common.MUST_BE_STRING)
        .isLength({ max: 1024 }).withMessage(ResponseMessages.hotel.VALID_DESCRIPTION_LENGTH),

    body('amenities').optional().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_AMENITIES_REQUIRED).bail()
        .isArray({ min: 1 }).withMessage(ResponseMessages.common.MUST_BE_ARRAY),

    body('amenities.*').optional().trim().notEmpty().withMessage(ResponseMessages.room.VALID_ROOM_AMENIRIES_ARRAY).bail()
        .isString().withMessage(ResponseMessages.common.MUST_BE_STRING),

    body('price_per_night').optional().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_PRICE_PER_NIGHT_REQUIRED).bail()
        .isInt({ min: 1, max: 1000000 }).withMessage(ResponseMessages.common.MUST_BE_INTEGER),

    body('room_capacity.adult_count').optional().notEmpty().withMessage(ResponseMessages.booking.ADULT_COUNT_MIN).bail()
        .isInt({ min: 1, max: 20 }).withMessage(ResponseMessages.common.MUST_BE_INTEGER),

    body('room_capacity.children_count').optional().notEmpty().withMessage(ResponseMessages.room.CHILD_COUNT_REQUIRED).bail()
        .isInt({ min: 0, max: 20 }).withMessage(ResponseMessages.common.MUST_BE_INTEGER),

    body('room_images').optional().isArray().withMessage(ResponseMessages.common.MUST_BE_ARRAY),
    body('room_images.*').isURL().withMessage(ResponseMessages.common.MUST_BE_URL)
        .bail()
        .custom(validateImageURL),

    body('room_count').optional().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_COUNT_REQUIRED).bail()
        .isInt({ min: 1, max: 1000 }).withMessage(ResponseMessages.common.MUST_BE_INTEGER),

    body('room_inventories').optional().isArray().withMessage(ResponseMessages.common.MUST_BE_ARRAY),
    body('room_inventories.*.room_number').notEmpty().withMessage(ResponseMessages.room_inventory.ROOM_NUMBER_REQUIRED).bail()
        .isInt({ min: 1 }).withMessage(ResponseMessages.common.MUST_BE_INTEGER),
    body('room_inventories.*.status').optional().isIn(['available', 'occupied']).withMessage(ResponseMessages.room.VALID_ROOM_STATUS)
]

const validateRoomIdParam = [
    param('room_id').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.common.MUST_BE_MONGO_ID)
]

export default {
    validateCreateRoom,
    validateUpdateRoom,
    validateRoomIdParam
}