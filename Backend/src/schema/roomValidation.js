import { body, param } from "express-validator";
import { ResponseMessages } from "../config/response_messages.js";
import { Constants } from "../config/Constants.js";
import { validateImageURL } from "../util/imageValidator.js";

const validateCreateRoom = [
    param('hotel_id').notEmpty().withMessage(ResponseMessages.room.HOTEL_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.hotel.VALID_HOTEL_ID),

    body('room_type').trim().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_TYPE_REQUIRED).bail()
        .isString().withMessage(ResponseMessages.room.VALID_ROOM_TYPE_FORMATE),

    body('room_description').trim().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_DESCRIPTION_REQUIRED).bail()
        .isString().withMessage(ResponseMessages.room.VALID_ROOM_DESCRIPTION_FORMATE)
        .isLength({ max: 1024 }).withMessage(ResponseMessages.hotel.VALID_DESCRIPTION_LENGTH),

    body('amenities').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_AMENITIES_REQUIRED).bail()
        .isArray({ min: 1 }).withMessage(ResponseMessages.room.VALID_ROOM_AMENIRIES_FORMATE),

    body('amenities.*').trim().notEmpty().withMessage(ResponseMessages.room.VALID_ROOM_AMENIRIES_ARRAY).bail()
        .isString().withMessage(ResponseMessages.room.VALID_ROOM_AMENIRIES_ARRAY_FORMATE),

    body('price_per_night').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_PRICE_PER_NIGHT_REQUIRED).bail()
        .isInt({ min: 1 }).withMessage(ResponseMessages.room.MIN_ROOM_PRICE_PER_NIGHT),

    body('room_capacity.adult_count').notEmpty().withMessage(ResponseMessages.booking.ADULT_COUNT_MIN).bail()
        .isInt({ min: 1 }).withMessage(ResponseMessages.booking.ADULT_COUNT_MIN),

    body('room_capacity.children_count').notEmpty().withMessage(ResponseMessages.room.CHILD_COUNT_REQUIRED)
        .bail()
        .isInt({ min: 0 }).withMessage(ResponseMessages.booking.CHILD_COUNT_MIN),

    body('room_images').optional().isArray().withMessage(ResponseMessages.hotel.VALID_IMAGE_FORMATE),
    body('room_images.*').isURL().withMessage(ResponseMessages.room.ROOM_IMAGES_REQUIRED)
        .bail()
        .custom(validateImageURL),

    body('room_count').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_COUNT_REQUIRED).bail()
        .isInt({ min: 1 }).withMessage(ResponseMessages.room.MIN_ROOM_COUNT)
]

const validateUpdateRoom = [
    param('room_id').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.room.VALID_ROOM_ID_FORMATE),

    param('hotel_id').optional().notEmpty().withMessage(ResponseMessages.room.HOTEL_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.hotel.VALID_HOTEL_ID),

    body('room_type').optional().trim().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_TYPE_REQUIRED).bail()
        .isString().withMessage(ResponseMessages.room.VALID_ROOM_TYPE_FORMATE),

    body('room_description').optional().trim().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_DESCRIPTION_REQUIRED).bail()
        .isString().withMessage(ResponseMessages.room.VALID_ROOM_DESCRIPTION_FORMATE)
        .isLength({ max: 1024 }).withMessage(ResponseMessages.hotel.VALID_DESCRIPTION_LENGTH),

    body('amenities').optional().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_AMENITIES_REQUIRED).bail()
        .isArray({ min: 1 }).withMessage(ResponseMessages.room.VALID_ROOM_AMENIRIES_FORMATE),

    body('amenities.*').optional().trim().notEmpty().withMessage(ResponseMessages.room.VALID_ROOM_AMENIRIES_ARRAY).bail()
        .isString().withMessage(ResponseMessages.room.VALID_ROOM_AMENIRIES_ARRAY_FORMATE),

    body('price_per_night').optional().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_PRICE_PER_NIGHT_REQUIRED).bail()
        .isInt({ min: 1 }).withMessage(ResponseMessages.room.MIN_ROOM_PRICE_PER_NIGHT),

    body('room_capacity.adult_count').optional().notEmpty().withMessage(ResponseMessages.booking.ADULT_COUNT_MIN).bail()
        .isInt({ min: 1 }).withMessage(ResponseMessages.booking.ADULT_COUNT_MIN),

    body('room_capacity.children_count').optional().notEmpty().withMessage(ResponseMessages.room.CHILD_COUNT_REQUIRED).bail()
        .isInt({ min: 0 }).withMessage(ResponseMessages.booking.CHILD_COUNT_MIN),

    body('room_images').optional().isArray().withMessage(ResponseMessages.hotel.VALID_IMAGE_FORMATE),
    body('room_images.*').isURL().withMessage(ResponseMessages.room.ROOM_IMAGES_REQUIRED)
        .bail()
        .custom(validateImageURL),

    body('room_count').optional().notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_COUNT_REQUIRED).bail()
        .isInt({ min: 1 }).withMessage(ResponseMessages.room.MIN_ROOM_COUNT)
]

const validateRoomIdParam = [
    param('room_id').notEmpty().withMessage(ResponseMessages.room.HOTEL_ROOM_ID_REQUIRED).bail()
        .isMongoId().withMessage(ResponseMessages.room.VALID_ROOM_ID_FORMATE)
]

export default {
    validateCreateRoom,
    validateUpdateRoom,
    validateRoomIdParam
}