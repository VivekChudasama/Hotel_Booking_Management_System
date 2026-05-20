import express from 'express';
import bookingController from '../controllers/bookingController.js';
import bookingValidation from '../schema/bookingValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { verifyToken , isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

//create booking
router.post('/',isAdmin , verifyToken, bookingValidation.validateCreateBooking, handleValidationErrors, bookingController.createBooking);

//get booking details by booking_id
router.get('/:booking_id', verifyToken, bookingValidation.validateBookingId, handleValidationErrors, bookingController.getBookingDetails);

//cancle booking by booking_id
router. put('/:booking_id/cancel', verifyToken, bookingValidation.validateBookingId, handleValidationErrors, bookingController.cancelBooking);

//user booking history by user_id
router.get('/user/:user_id/booking_history', verifyToken, bookingValidation.validateUserIdParam, handleValidationErrors, bookingController.getBookingHistory);

//all user's booking(admin only)
router.get('/', isAdmin, verifyToken , bookingController.getAllUsersBooking)

export default router;
