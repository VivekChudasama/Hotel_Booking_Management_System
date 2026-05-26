import { body, param } from 'express-validator';
import { ResponseMessages } from '../config/response_messages';

const validateCreateBooking = [
    body('user_id').isMongoId().notEmpty().withMessage(ResponseMessages.booking.USER_ID_REQUIRED),

    body('room_id').isMongoId().notEmpty().withMessage(ResponseMessages.booking.ROOM_ID_REQUIRED),

    body('hotel_id').isMongoId().notEmpty().withMessage(ResponseMessages.booking.HOTEL_ID_REQUIRED),

    body('guests.adult_count').notEmpty().withMessage(ResponseMessages.booking.ADULT_COUNT_MIN)
        .bail()
        .isInt()
        .custom(value => {
            if (value < 1) {
                throw new Error(ResponseMessages.booking.ADULT_COUNT_MIN)
            } else if (value > 10) {
                throw new Error(ResponseMessages.booking.ADULT_COUNT_MAX)
            }
            return true
        }),

    body('guests.child_count').optional().isInt()
        .custom(value => {
            if (value < 0) {
                throw new Error(ResponseMessages.booking.CHILD_COUNT_MIN);
            } else if (value > 10) {
                throw new Error(ResponseMessages.booking.CHILD_COUNT_MAX);
            }
            return true;
        }),

    body('from').notEmpty().withMessage(ResponseMessages.booking.CHECK_IN_DATE)
        .bail()
        .isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE)
        .custom((value) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (new Date(value) < today) {
                throw new Error(ResponseMessages.booking.PAST_DATE_BOOKING);
            }
            return true;
        }),

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

    body('booking_status').optional().isIn(['pending', 'confirmed', 'cancelled', 'checked in', 'checked out'])
        .withMessage(ResponseMessages.booking.INVALID_BOOKING_STATUS)
]

const validateBookingId = [
    param('booking_id').notEmpty().withMessage(ResponseMessages.booking.BOOKING_ID_REQUIRED),
]

const validateUpdateBooking = [
    param('booking_id').notEmpty().withMessage(ResponseMessages.booking.BOOKING_ID_REQUIRED),
    body('booking_status').optional().isIn(['pending', 'confirmed', 'cancelled', 'checked in', 'checked out'])
        .withMessage(ResponseMessages.booking.INVALID_BOOKING_STATUS),
    body('check_in_date').optional({ nullable: true }).isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE),
    body('check_out_date').optional({ nullable: true }).isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE)
]

const validateUserIdParam = [
    param('user_id').notEmpty().withMessage(ResponseMessages.booking.USER_ID_REQUIRED)
]


export default {
    validateCreateBooking,
    validateBookingId,
    validateUpdateBooking,
    validateUserIdParam
}