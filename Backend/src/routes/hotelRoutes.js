import express from 'express';
import hotelController from '../controllers/hotelController.js';
import hotelValidation from '../schema/hotelValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

//get hotels list
router.get('/', hotelController.getHotelList);

// add new hotel(admin only)
router.post('/', verifyToken, isAdmin, hotelValidation.validateCreateHotel, handleValidationErrors, hotelController.createHotel);

//update hotel by id(admin only)
router.put('/:hotel_id', verifyToken, isAdmin, hotelValidation.validateUpdateHotel, handleValidationErrors, hotelController.updateHotel);

//delete hotel by id(admin only)
router.delete('/:hotel_id', verifyToken, isAdmin, hotelValidation.validateHotelIdParam, handleValidationErrors, hotelController.deleteHotel);

//get hotel details by id
router.get('/:hotel_id', hotelValidation.validateHotelIdParam, handleValidationErrors, hotelController.getHotelDetails)

export default router;
