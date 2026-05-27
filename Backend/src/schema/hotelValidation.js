import { body, param } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';
import { Constants } from '../config/Constants.js';
import { validateImageURL } from '../util/imageValidator.js';

const validateCreateHotel = [
    body('name').trim().notEmpty().withMessage(ResponseMessages.auth.NAME_REQUIRED)
        .bail()
        .isLength({ min: 3, max: 70 }).withMessage(ResponseMessages.auth.VALID_NAME_LENGTH)
        .matches(Constants.REGEX.HOTEL_NAME_VALIDATION_REGEX).withMessage(ResponseMessages.hotel.VALID_HOTEL_NAME_FORMATE),

    body('email').trim().notEmpty().withMessage(ResponseMessages.hotel.EMAIL_REQUIRED)
        .bail()
        .isEmail().withMessage(ResponseMessages.auth.INVALID_EMAIL_FORMATE)
        .isLength({ max: 254 }).withMessage(ResponseMessages.auth.MAX_EMAIL_LENGTH)
        .normalizeEmail(),

    body('phone_number').isMobilePhone().trim().notEmpty().withMessage(ResponseMessages.hotel.PHONE_NUMBER_REQUIRED)
        .bail()
        .isLength({ min: 10, max: 10 }).withMessage(ResponseMessages.auth.USER_PHONE_NUMBER_LENGTH),

    body('images').optional().isArray().withMessage(ResponseMessages.common.MUST_BE_ARRAY),
    body('images.*').isURL().withMessage(ResponseMessages.common.MUST_BE_URL)
        .bail()
        .custom(validateImageURL),

    body('description').trim().notEmpty().withMessage(ResponseMessages.hotel.DESCRIPTION_REQUIRED)
        .bail()
        .isString().withMessage(ResponseMessages.common.MUST_BE_STRING)
        .isLength({ max: 1024 }).withMessage(ResponseMessages.hotel.VALID_DESCRIPTION_LENGTH),

    body('address').trim().notEmpty().withMessage(ResponseMessages.hotel.ADDRESS_REQUIRED)
        .bail()
        .isLength({ max: 256 }).withMessage(ResponseMessages.hotel.VALID_ADDRESS_LENGTH)
        .matches(Constants.REGEX.ADDRESS_VALIDATION_REGEX).withMessage(ResponseMessages.hotel.VALID_ADDRESS_FORMATE),

    body('city').trim().notEmpty().withMessage(ResponseMessages.hotel.CITY_NAME_REQUIRED)
        .bail()
        .isLength({ max: 30 }).withMessage(ResponseMessages.hotel.VALID_CITY_NAME_LENGTH)
        .matches(Constants.REGEX.CITY_NAME_VALIDATION_REGEX).withMessage(ResponseMessages.hotel.VALID_CITY_NAME_FORMATE)
];

const validateUpdateHotel = [
    param('hotel_id').isMongoId().withMessage(ResponseMessages.common.MUST_BE_MONGO_ID).notEmpty().withMessage(ResponseMessages.hotel.HOTEL_ID_REQUIRED),

    body('name').optional().trim().notEmpty().withMessage(ResponseMessages.auth.NAME_REQUIRED)
        .bail()
        .isLength({ min: 3, max: 70 }).withMessage(ResponseMessages.auth.VALID_NAME_LENGTH)
        .matches(Constants.REGEX.HOTEL_NAME_VALIDATION_REGEX).withMessage(ResponseMessages.hotel.VALID_HOTEL_NAME_FORMATE),

    body('email').optional().trim().notEmpty().withMessage(ResponseMessages.auth.EMAIL_REQUIRED)
        .bail()
        .isEmail().withMessage(ResponseMessages.auth.INVALID_EMAIL_FORMATE)
        .isLength({ max: 254 }).withMessage(ResponseMessages.auth.MAX_EMAIL_LENGTH)
        .normalizeEmail(),

    body('phone_number').isMobilePhone().optional().trim().notEmpty().withMessage(ResponseMessages.auth.USER_PHONE_NUMBER_REQUIRED)
        .bail()
        .isLength({ min: 10, max: 10 }).withMessage(ResponseMessages.auth.USER_PHONE_NUMBER_LENGTH),

    body('images').optional().isArray().withMessage(ResponseMessages.common.MUST_BE_ARRAY),
    body('images.*').isURL().withMessage(ResponseMessages.common.MUST_BE_URL)
        .bail()
        .custom(validateImageURL),

    body('description').optional().trim().notEmpty().withMessage(ResponseMessages.hotel.DESCRIPTION_REQUIRED)
        .bail()
        .isLength({ max: 1024 }).withMessage(ResponseMessages.hotel.VALID_DESCRIPTION_LENGTH),

    body('address').optional().trim().notEmpty().withMessage(ResponseMessages.hotel.ADDRESS_REQUIRED)
        .bail()
        .isLength({ max: 256 }).withMessage(ResponseMessages.hotel.VALID_ADDRESS_LENGTH)
        .matches(Constants.REGEX.ADDRESS_VALIDATION_REGEX).withMessage(ResponseMessages.hotel.VALID_ADDRESS_FORMATE),

    body('city').optional().trim().notEmpty().withMessage(ResponseMessages.hotel.CITY_NAME_REQUIRED)
        .bail()
        .isLength({ max: 30 }).withMessage(ResponseMessages.hotel.VALID_CITY_NAME_LENGTH)
        .matches(Constants.REGEX.CITY_NAME_VALIDATION_REGEX).withMessage(ResponseMessages.hotel.VALID_CITY_NAME_FORMATE)
];

const validateHotelIdParam = [
    param('hotel_id').isMongoId().withMessage(ResponseMessages.common.MUST_BE_MONGO_ID).notEmpty().withMessage(ResponseMessages.hotel.HOTEL_ID_REQUIRED)
]

export default {
    validateCreateHotel,
    validateUpdateHotel,
    validateHotelIdParam
}