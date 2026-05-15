import { body } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';

export const validateRegister = [
    body('name').trim().notEmpty().withMessage(ResponseMessages.auth.NAME_REQUIRED).bail()
        .length({ min: 3, max: 70 }).withMessage()
        .matches(/^[a-zA-Z\s.]+$/).withMessage(ResponseMessages.auth.VALID_NAME_FORMATE),

    body('email').trim().notEmpty().withMessage(ResponseMessages.auth.EMAIL_REQUIRED)
        .bail()
        .isEmail().withMessage(ResponseMessages.auth.INVALID_EMAIL_FORMATE)
        .isLength({ max: 254 }).withMessage(ResponseMessages.auth.MAX_EMAIL_LENGTH)
        .normalizeEmail,

    body('password').isLength({ min: 6 })
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/, "i")
        .withMessage(ResponseMessages.auth.VALID_PASSWORD_REQUIRED)
];

export const validateLogin = [
    body('email').trim().notEmpty().withMessage(ResponseMessages.auth.EMAIL_REQUIRED)
        .bail()
        .isEmail().withMessage(ResponseMessages.auth.INVALID_EMAIL_FORMATE)
        .isLength({ max: 254 }).withMessage(ResponseMessages.auth.MAX_EMAIL_LENGTH)
        .normalizeEmail,

    body('password').isLength({ min: 6 })
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/, "i")
        .withMessage(ResponseMessages.auth.VALID_PASSWORD_REQUIRED)
];
