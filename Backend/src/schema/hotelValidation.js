import { body } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';

const validateCreateHotel = [
    body('name').trim().notEmpty().withMessage(ResponseMessages.auth.NAME_REQUIRED)
        .bail()
        .isLength({ min: 3, max: 70 }).withMessage()
        .matches(/^[a-zA-Z\s.]+$/).withMessage(ResponseMessages.auth.VALID_NAME_FORMATE),

    body('email').trim().notEmpty().withMessage(ResponseMessages.auth.EMAIL_REQUIRED)
        .bail()
        .isEmail().withMessage(ResponseMessages.auth.INVALID_EMAIL_FORMATE)
        .isLength({ max: 254 }).withMessage(ResponseMessages.auth.MAX_EMAIL_LENGTH)
        .normalizeEmail(),

    body('phone_number').trim().notEmpty().withMessage(ResponseMessages.auth.USER_PHONE_NUMBER_REQUIRED)
        .bail()
        .isLength({ min: 10, max: 10 }).withMessage(ResponseMessages.auth.USER_PHONE_NUMBER_LENGTH),

    body('description').trim().notEmpty().withMessage(ResponseMessages.hotel.DESCRIPTION_REQUIRED)
        .bail()
        .isLength({ max: 1024 }).withMessage(ResponseMessages.hotel.VALID_DESCRIPTION_LENGTH),

    body('address').trim().notEmpty().withMessage(ResponseMessages.hotel.ADDRESS_REQUIRED)
        .bail()
        .isLength({ max: 256 }).withMessage(ResponseMessages.hotel.VALID_ADDRESS_LENGTH)
        .matches(/^[a-zA-Z0-9 .-]+$/).withMessage(ResponseMessages.hotel.VALID_ADDRESS_FORMATE),

    body('city').trim().notEmpty().withMessage(ResponseMessages.hotel.CITY_NAME_REQUIRED)
        .bail()
        .isLength({ max: 30 }).withMessage(ResponseMessages.hotel.VALID_CITY_NAME_LENGTH)
        .matches(/^[a-zA-Z]+$/).withMessage(ResponseMessages.hotel.VALID_CITY_NAME_FORMATE)
];


export default {
    validateCreateHotel
}