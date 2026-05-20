import { body, param } from "express-validator";
import { ResponseMessages } from "../config/response_messages.js";
import { Constants } from "../config/constants.js";
import { validateImageURL } from "../util/imageValidator.js";

const validateCreateRoom = [
    body('hotel_id').notEmpty().withMessage().bail()
        .isMongoId(),

    body('room_type').trim().notEmpty().withMessage().bail()
        .isString().withMessage()
        .isLength({ max: 30 }).withMessage()
        .matches({}).withMessage(),

    body('room_description').trim().notEmpty().withMessage()
        .bail()
        .isString().withMessage()
        .isLength({ max: 1024 }).withMessage(),

    body('amenities').trim().notEmpty().withMessage()
        .bail()
        .isArray().withMessage(),

    body('price_per_night').notEmpty().withMessage()
        .bail()
        .isInt({ min: 1 }).withMessage(),

    body('room_capacity.adult_count').notEmpty().withMessage()
        .bail()
        .isInt({ min: 1 }).withMessage(),

    body('room_capacity.adult_count').notEmpty().withMessage()
        .bail()
        .isInt({ min: 0 }).withMessage(),

    body('room_images').optional().isArray().withMessage('Images must be an array of URLs'),
    body('room_images.*').isURL().withMessage()
        .bail()
        .custom(validateImageURL),

    body('roomCount').notEmpty().withMessage()
        .bail()
        .isInt({ min: 1 }).withMessage()
]

const validateUpdateRoom = [
    param('room_id').notEmpty().withMessage().bail()
        .isMongoId(),

    body('hotel_id').optional().notEmpty().withMessage().bail()
        .isMongoId(),

    body('room_type').optional().trim().notEmpty().withMessage().bail()
        .isString().withMessage()
        .isLength({ max: 30 }).withMessage()
        .matches({}).withMessage(),

    body('room_description').optional().trim().notEmpty().withMessage()
        .bail()
        .isString().withMessage()
        .isLength({ max: 1024 }).withMessage(),

    body('amenities').optional().trim().notEmpty().withMessage()
        .bail()
        .isArray().withMessage(),

    body('price_per_night').optional().notEmpty().withMessage()
        .bail()
        .isInt({ min: 1 }).optional().withMessage(),

    body('room_capacity.adult_count').optional().notEmpty().withMessage()
        .bail()
        .isInt({ min: 1 }).withMessage(),

    body('room_capacity.children_count').optional().notEmpty().withMessage()
        .bail()
        .isInt({ min: 0 }).withMessage(),

    body('room_images').optional().isArray().withMessage('Images must be an array of URLs'),
    body('room_images.*').isURL().withMessage()
        .bail()
        .custom(validateImageURL),

    body('roomCount').optional().notEmpty().withMessage()
        .bail()
        .isInt({ min: 1 }).withMessage()
]

const validateRoomIdParam = [
    param('room_id').notEmpty().withMessage().bail()
        .isMongoId()
]

export default {
    validateCreateRoom,
    validateUpdateRoom,
    validateRoomIdParam
}