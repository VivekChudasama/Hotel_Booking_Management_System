import express from 'express';
import bookingController from '../controllers/bookingController.js';
import bookingValidation from '../schema/bookingValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/', bookingValidation.validateCreateBooking, handleValidationErrors, bookingController.createBooking);
router.get('/:booking_id', bookingValidation.validateBookingId, handleValidationErrors, bookingController.getBookingDetails);
router. put('/:booking_id/cancel', bookingValidation.validateBookingId, handleValidationErrors, bookingController.cancelBooking);
router.get('/user/:user_id/booking_history', bookingValidation.validateUserIdParam, handleValidationErrors, bookingController.getBookingHistory);

export default router;
