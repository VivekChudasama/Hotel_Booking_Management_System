import { body } from 'express-validator';
import { ResponseMessages } from '../config/response_messages.js';

const validateCreateBooking = [
    
    body('from').notEmpty().withMessage()
        .bail()
        .isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE),

    body('to').notEmpty().withMessage()
        .bail()
        .isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE),

    body('checkInDate').default(null).notEmpty().withMessage()
        .bail()
        .isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE),

    body('checkOutDate').default(null).notEmpty().withMessage()
        .bail()
        .isISO8601().withMessage(ResponseMessages.booking.VALID_BOOKING_DATE_FORMATE),

    body('totalAmount').notEmpty().withMessage()
    .bail()
    .isNumeric(),
    
    body('booking_status')


]

const validateBookingId = [

]

const validateUserIdParam = [

]

export default {
    validateCreateBooking,
    validateBookingId,
    validateUserIdParam
}