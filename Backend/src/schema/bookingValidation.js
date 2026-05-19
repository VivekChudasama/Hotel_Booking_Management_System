import { body, param } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';

const validateCreateBooking = [
    param('user_id').isMongoId().notEmpty().withMessage(ResponseMessages.booking.USER_ID_REQUIRED),
    param('room_id').isMongoId().notEmpty().withMessage(ResponseMessages.booking.ROOM_ID_REQUIRED),
    body('from').notEmpty().withMessage()
        .bail()
        .isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE),

    body('to').notEmpty().withMessage()
        .bail()
        .isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE),

    body('check_in_date').default(null).notEmpty().withMessage()
        .bail()
        .isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE),

    body('check_out_date').default(null).notEmpty().withMessage()
        .bail()
        .isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE),

    body('total_amount').notEmpty().withMessage()
        .bail()
        .isNumeric().withMessage(),

    body('booking_status').notEmpty().withMessage()
        .bail()
]

const validateBookingId = [
    param('booking_id').notEmpty().withMessage(ResponseMessages.booking.BOOKING_ID_REQUIRED),
]

const validateUserIdParam = [
    param('user_id').notEmpty().withMessage(ResponseMessages.booking.USER_ID_REQUIRED)
]


export default {
    validateCreateBooking,
    validateBookingId,
    validateUserIdParam
}