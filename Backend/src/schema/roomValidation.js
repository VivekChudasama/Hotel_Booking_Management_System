import { body, param } from "express-validator";
import { ResponseMessages } from "../config/response_messages.js";
import { Constants } from "../config/constants.js";
import { validateImageURL } from "../util/imageValidator.js";

const validateCreateRoom = [
    body('hotel_id').notEmpty().withMessage(ResponseMessages.room.HOTEL_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.room.INVALID_HOTEL_ID),

    body('room_type').trim().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_TYPE_REQUIRED).bail()
        .isString().withMessage(ResponseMessages.room.HOTEL_ROOM_TYPE_FORMATE)
        .bail()
        .isIn(['Standard Room', 'Deluxe Room', 'Suite', 'Executive Room', 'Family Room'])
        .withMessage(ResponseMessages.room.HOTEL_ROOM_TYPE),

    body('room_description').trim().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_DESCRIPTION_REQUIRED).bail()
        .isString().withMessage(ResponseMessages.room.HOTEL_ROOM_DESCRIPTION_FORMATE)
        .isLength({ max: 1024 }).withMessage(ResponseMessages.hotel.VALID_DESCRIPTION_LENGTH),

    body('amenities').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_AMENITIES_REQUIRED).bail()
        .isArray({ min: 1 }).withMessage(ResponseMessages.room.HOTEL_ROOM_AMENITIES_LENGTH),

    body('amenities.*').trim().notEmpty().withMessage().bail(ResponseMessages.room.HOTEL_ROOM_AMENITIES_ARRAY)
        .isString().withMessage(ResponseMessages.room.HOTEL_ROOM_AMENITIES_FORMATE),

    body('price_per_night').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_PRICE_PER_NIGHT_REQUIRED).bail()
        .isInt({ min: 1, max: 100000000 }).withMessage(ResponseMessages.room.MIN_HOTEL_ROOM_PRICE_PER_NIGHT),

    body('room_capacity.adult_count').notEmpty().withMessage(ResponseMessages.booking.ADULT_COUNT_MIN).bail()
        .isInt({ min: 1, max: 5 }).withMessage(ResponseMessages.booking.ADULT_COUNT_MIN),

    body('room_capacity.children_count').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_CHILDREN_COUNT_REQUIRED).bail()
        .isInt({ min: 0, max: 5 }).withMessage(ResponseMessages.booking.CHILD_COUNT_MIN),

    body('room_images').optional().isArray().withMessage(ResponseMessages.room.HOTEL_ROOM_IMAGE_REQUIRED),
    body('room_images.*').isURL().withMessage(ResponseMessages.room.HOTEL_ROOM_IMAGE_REQUIRED)
        .bail()
        .custom(validateImageURL),

    body('roomCount').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_COUNT_REQUIRED).bail()
        .isInt({ min: 1, max: 100 }).withMessage(ResponseMessages.room.MIN_HOTEL_ROOM_COUNT)
]

const validateUpdateRoom = [
    param('room_id').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND).bail()
        .isMongoId().withMessage(ResponseMessages.room.INVALID_ROOM_ID),

    body('hotel_id').optional().notEmpty().withMessage(ResponseMessages.room.HOTEL_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.room.INVALID_HOTEL_ID),

    body('room_type').optional().trim().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_TYPE_REQUIRED).bail()
        .isString().withMessage(ResponseMessages.room.HOTEL_ROOM_TYPE_FORMATE)
        .bail()
        .isIn(['Standard Room', 'Deluxe Room', 'Suite', 'Executive Room', 'Family Room'])
        .withMessage(ResponseMessages.room.HOTEL_ROOM_TYPE),

    body('room_description').optional().trim().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_DESCRIPTION_REQUIRED).bail()
        .isString().withMessage(ResponseMessages.room.HOTEL_ROOM_DESCRIPTION_FORMATE)
        .isLength({ max: 1024 }).withMessage(ResponseMessages.hotel.VALID_DESCRIPTION_LENGTH),

    body('amenities').optional().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_AMENITIES_REQUIRED).bail()
        .isArray({ min: 1 }).withMessage(ResponseMessages.room.HOTEL_ROOM_AMENITIES_LENGTH),

    body('amenities.*').optional().trim().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_AMENITIES_ARRAY).bail()
        .isString().withMessage(ResponseMessages.room.HOTEL_ROOM_AMENITIES_FORMATE),

    body('price_per_night').optional().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_PRICE_PER_NIGHT_REQUIRED).bail()
        .isInt({ min: 1, max: 100000000 }).withMessage(ResponseMessages.room.MIN_HOTEL_ROOM_PRICE_PER_NIGHT),

    body('room_capacity.adult_count').optional().notEmpty().withMessage(ResponseMessages.booking.ADULT_COUNT_MIN).bail()
        .isInt({ min: 1, max: 5 }).withMessage(ResponseMessages.booking.ADULT_COUNT_MIN),

    body('room_capacity.children_count').optional().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_CHILDREN_COUNT_REQUIRED).bail()
        .isInt({ min: 0, max: 5 }).withMessage(ResponseMessages.booking.CHILD_COUNT_MIN),

    body('room_images').optional().isArray().withMessage(ResponseMessages.room.HOTEL_ROOM_IMAGE_REQUIRED),
    body('room_images.*').isURL().withMessage()
        .bail()
        .custom(validateImageURL),

    body('roomCount').optional().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_COUNT_REQUIRED).bail()
        .isInt({ min: 1, max: 100 }).withMessage(ResponseMessages.room.MIN_HOTEL_ROOM_COUNT)
]

const validateRoomIdParam = [
    param('room_id').notEmpty().withMessage(ResponseMessages.room_inventory.ROOM_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.room.INVALID_ROOM_ID)
]

export default {
    validateCreateRoom,
    validateUpdateRoom,
    validateRoomIdParam
}