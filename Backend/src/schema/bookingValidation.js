import { body, param } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';

const validateCreateBooking = [
    body('user_id').isMongoId().notEmpty().withMessage(ResponseMessages.booking.USER_ID_REQUIRED),
    
    body('guests.adult_count').notEmpty().withMessage(ResponseMessages.booking.ADULT_COUNT_MIN)
        .bail()
        .isInt({ min: 1 }).withMessage(ResponseMessages.booking.ADULT_COUNT_MIN),

    body('guests.child_count').optional().isInt({ min: 0 }).withMessage(ResponseMessages.booking.CHILD_COUNT_MIN),

    body('from').notEmpty().withMessage(ResponseMessages.booking.CHECK_IN_DATE)
        .bail()
        .isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE),

    body('to').notEmpty().withMessage(ResponseMessages.booking.CHECK_OUT_DATE)
        .bail()
        .isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE)
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.from)) {
                throw new Error(ResponseMessages.booking.MIN_CHECK_OUT_DATE);
            }
            return true;
        }),

    body('check_in_date').optional({ nullable: true }).isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE),
    
    body('check_out_date').optional({ nullable: true }).isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE),

    body('total_amount').notEmpty().withMessage(ResponseMessages.booking.TOTAL_AMOUNT_REQUIRED)
        .bail()
        .isNumeric().withMessage(ResponseMessages.booking.TOTAL_AMOUNT_NUMERIC),

    body('booking_status').optional().isIn(['pending', 'confirmed', 'cancelled', 'checked in', 'checked out']).withMessage(ResponseMessages.booking.INVALID_BOOKING_STATUS)
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