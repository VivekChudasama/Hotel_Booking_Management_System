import { body } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';

const validateRegister = [
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

    body('password').notEmpty().withMessage(ResponseMessages.auth.PASSWORD_REQUIRED).isLength({ min: 6 })
        .bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
        .withMessage(ResponseMessages.auth.VALID_PASSWORD_REQUIRED),

    body('role').notEmpty().withMessage(ResponseMessages.user.USER_ROLE_REQUIRED)
        .bail()
        .isIn(['customer', 'admin']).withMessage(ResponseMessages.user.USER_IN_ROLE)
];

const validateLogin = [
    body('email').trim().notEmpty().withMessage(ResponseMessages.auth.EMAIL_REQUIRED)
        .bail()
        .isEmail().withMessage(ResponseMessages.auth.INVALID_EMAIL_FORMATE)
        .isLength({ max: 254 }).withMessage(ResponseMessages.auth.MAX_EMAIL_LENGTH)
        .normalizeEmail(),

    body('password').notEmpty().withMessage(ResponseMessages.auth.PASSWORD_REQUIRED)
];

export default {
    validateRegister,
    validateLogin
}