import express from 'express';
import bookingController from '../controllers/bookingController.js';
import bookingValidation from '../schema/bookingValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, bookingValidation.validateCreateBooking, handleValidationErrors, bookingController.createBooking);
router.get('/:booking_id', verifyToken, bookingValidation.validateBookingId, handleValidationErrors, bookingController.getBookingDetails);
router. put('/:booking_id/cancel', verifyToken, bookingValidation.validateBookingId, handleValidationErrors, bookingController.cancelBooking);
router.get('/user/:user_id/booking_history', verifyToken, bookingValidation.validateUserIdParam, handleValidationErrors, bookingController.getBookingHistory);

export default router;
