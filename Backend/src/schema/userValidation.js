import { body, param } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';
import { Constants } from '../config/Constants.js';
import { validateImageURL } from '../util/imageValidator.js';

const validateUpdateUser = [
    body('name').optional().trim().notEmpty().withMessage(ResponseMessages.auth.NAME_REQUIRED)
        .bail()
        .isLength({ min: 3, max: 70 }).withMessage(ResponseMessages.auth.VALID_NAME_LENGTH).bail()
        .matches(Constants.REGEX.USER_NAME_VALIDATION_REGEX).withMessage(ResponseMessages.auth.VALID_NAME_FORMATE),

    body('email').optional().trim().notEmpty().withMessage(ResponseMessages.auth.EMAIL_REQUIRED)
        .bail()
        .isEmail().withMessage(ResponseMessages.auth.INVALID_EMAIL_FORMATE).bail()
        .isLength({ max: 254 }).withMessage(ResponseMessages.auth.MAX_EMAIL_LENGTH)
        .normalizeEmail(),

    body('phone_number').optional().isMobilePhone().trim().notEmpty().withMessage(ResponseMessages.auth.USER_PHONE_NUMBER_REQUIRED)
        .bail()
        .isLength({ min: 10, max: 10 }).withMessage(ResponseMessages.auth.USER_PHONE_NUMBER_LENGTH),

    body('profile_image').optional().bail().custom(validateImageURL),

    body('password').optional().notEmpty().withMessage(ResponseMessages.auth.PASSWORD_REQUIRED).bail()
        .isLength({ min: 8 }).withMessage(ResponseMessages.auth.VALID_PASSWORD_REQUIRED)
        .bail()
        .matches(Constants.REGEX.PASSWORD_VALIDATION_REGEX)
        .withMessage(ResponseMessages.auth.VALID_PASSWORD_REQUIRED),

    body('role').optional().notEmpty().withMessage(ResponseMessages.user.USER_ROLE_REQUIRED)
        .bail()
        .isIn(['customer', 'admin']).withMessage(ResponseMessages.user.USER_IN_ROLE)
];

const validateUserId = [
    param('user_id').notEmpty().isMongoId().withMessage(ResponseMessages.booking.USER_ID_REQUIRED)
]

export default {
    validateUpdateUser,
    validateUserId
}