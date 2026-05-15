import express from 'express';
import { createBooking, getBookingDetails, cancelBooking, getBookingHistory } from '../controllers/bookingController.js';
import { validateCreateBooking, validateBookingId, validateUserIdParam } from '../schema/bookingValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/', validateCreateBooking, handleValidationErrors, createBooking);
router.get('/:booking_id', validateBookingId, handleValidationErrors, getBookingDetails);
router. put('/:booking_id/cancel', validateBookingId, handleValidationErrors, cancelBooking);
router.get('/user/:user_id/booking_history', validateUserIdParam, handleValidationErrors, getBookingHistory);

export default router;
