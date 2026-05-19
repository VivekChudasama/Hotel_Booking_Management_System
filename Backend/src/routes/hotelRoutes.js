import express from 'express';
import hotelController from '../controllers/hotelController.js';
import hotelValidation from '../schema/hotelValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

//get hotels list
router.get('/', hotelController.getHotelList);

// add new hotel
router.post('/', isAdmin, hotelValidation.validateCreateHotel, handleValidationErrors, hotelController.createHotel);

//update hotel by id 
router.put('/:hotel_id', isAdmin, hotelValidation.validateUpdateHotel, handleValidationErrors, hotelController.updateHotel);

//delete hotel by id
router.delete('/:hotel_id', isAdmin, hotelValidation.validateHotelIdParam, handleValidationErrors, hotelController.deleteHotel);

//get hotel details by id
router.get('/:hotel_id', hotelValidation.validateHotelIdParam, handleValidationErrors, hotelController.getHotelDetails)

export default router;
