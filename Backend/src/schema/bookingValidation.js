import { body, param } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';

const validateCreateBooking = [
    body('user_id').isMongoId().withMessage(ResponseMessages.common.MUST_BE_MONGO_ID)
        .notEmpty().withMessage(ResponseMessages.booking.USER_ID_REQUIRED),

    body('rooms').isArray({ min: 1 }).withMessage(ResponseMessages.room.HOTEL_ROOM_FORMAT),

    body('rooms.*.room_id').isMongoId().withMessage(ResponseMessages.common.MUST_BE_MONGO_ID)
        .notEmpty().withMessage(ResponseMessages.room_inventory.ROOM_ID_REQUIRED),

    body('rooms.*.count').optional().isInt({ min: 1 }).withMessage(ResponseMessages.room.VALID_ROOM_COUNT_RANGE),

    body('guests.adult_count').notEmpty().withMessage(ResponseMessages.booking.ADULT_COUNT_REQUIRED)
        .bail()
        .isInt({ min: 1, max: 10 }).withMessage(ResponseMessages.booking.VALID_ADULT_COUNT_RANGE),

    body('guests.child_count').optional().isInt({ min: 0, max: 10 })
        .withMessage(ResponseMessages.booking.VALID_CHILDREN_COUNT_RANGE),

    body('from').notEmpty().withMessage(ResponseMessages.booking.CHECK_IN_DATE)
        .bail()
        .isISO8601().withMessage(ResponseMessages.common.MUST_BE_DATE)
        .custom((value) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const fromDate = new Date(value);
            if (fromDate < today) {
                throw new Error(ResponseMessages.booking.PAST_DATE_BOOKING);
            }
            // Max 6 months in future
            const maxDate = new Date(today);
            maxDate.setMonth(maxDate.getMonth() + 6);
            if (fromDate > maxDate) {
                throw new Error(ResponseMessages.booking.MAX_BOOKING_DATE);
            }
            return true;
        }),

    body('to').notEmpty().withMessage(ResponseMessages.booking.CHECK_OUT_DATE)
        .bail()
        .isISO8601().withMessage(ResponseMessages.common.MUST_BE_DATE)
        .custom((value, { req }) => {
            const toDate = new Date(value);
            const fromDate = new Date(req.body.from);
            if (toDate < fromDate) {
                throw new Error(ResponseMessages.booking.MIN_CHECK_OUT_DATE);
            }
            const diffTime = Math.abs(toDate - fromDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 60) {
                throw new Error(ResponseMessages.booking.MAX_BOOKING_DURATION);
            }
            return true;
        }),

    body('check_in_date').optional({ nullable: true })
        .notEmpty().withMessage(ResponseMessages.booking.CHECK_IN_DATE)
        .isISO8601().withMessage(ResponseMessages.common.MUST_BE_DATE),

    body('check_out_date').optional({ nullable: true })
        .notEmpty().withMessage(ResponseMessages.booking.CHECK_OUT_DATE)
        .isISO8601().withMessage(ResponseMessages.common.MUST_BE_DATE),

    body('total_amount').optional().notEmpty().withMessage(ResponseMessages.payment.PAYMENT_AMOUNT_REQUIRED)
        .bail()
        .isFloat({ min: 1 }).withMessage(ResponseMessages.booking.VALID_TOTAL_AMOUNT_RANGE),

    body('booking_status').optional().isIn(['pending', 'confirmed', 'cancelled', 'checked in', 'checked out'])
        .withMessage(ResponseMessages.booking.INVALID_BOOKING_STATUS),

    body('payment_method').notEmpty().withMessage(ResponseMessages.payment.PAYMENT_METHOD_REQUIRED)
        .bail()
        .isString().withMessage(ResponseMessages.payment.VALID_PAYMENT_METHOD_FORMAT)
        .isIn(['Card Payment', 'Digital Payment', 'Cash Payment']).withMessage(ResponseMessages.payment.ACCEPTED_PAYMENT_METHODS),

    body('payment_status').optional().notEmpty().withMessage(ResponseMessages.payment.PAYMENT_STATUS_REQUIRED)
        .isIn(['pending', 'confirmed', 'cancelled']).withMessage(ResponseMessages.payment.INVALID_PAYMENT_STATUS)
]

const validateBookingId = [
    param('booking_id').isMongoId().withMessage(ResponseMessages.common.MUST_BE_MONGO_ID)
        .notEmpty().withMessage(ResponseMessages.booking.BOOKING_ID_REQUIRED),
]

const validateUpdateBooking = [
    param('booking_id').isMongoId().withMessage(ResponseMessages.common.MUST_BE_MONGO_ID)
        .notEmpty().withMessage(ResponseMessages.booking.BOOKING_ID_REQUIRED),

    body('booking_status').optional().notEmpty().withMessage(ResponseMessages.payment.PAYMENT_STATUS_REQUIRED)
        .isIn(['pending', 'confirmed', 'cancelled', 'checked in', 'checked out']).withMessage(ResponseMessages.booking.INVALID_BOOKING_STATUS),

    body('check_in_date').optional({ nullable: true })
        .notEmpty().withMessage(ResponseMessages.booking.CHECK_IN_DATE)
        .isISO8601().withMessage(ResponseMessages.common.MUST_BE_DATE),

    body('check_out_date').optional({ nullable: true })
        .notEmpty().withMessage(ResponseMessages.booking.CHECK_OUT_DATE)
        .isISO8601().withMessage(ResponseMessages.common.MUST_BE_DATE)
]

const validateUserIdParam = [
    param('user_id').isMongoId().withMessage(ResponseMessages.common.MUST_BE_MONGO_ID)
        .notEmpty().withMessage(ResponseMessages.booking.USER_ID_REQUIRED)
]


export default {
    validateCreateBooking,
    validateBookingId,
    validateUpdateBooking,
    validateUserIdParam
}