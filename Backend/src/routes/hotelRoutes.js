import express from 'express';
import hotelController from '../controllers/hotelController.js';
import hotelValidation from '../schema/hotelValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = express.Router();

//get hotels list
router.get('/', hotelController.getHotelList);

// add new hotel
router.post('/', hotelValidation.validateCreateHotel, handleValidationErrors , hotelController.createHotel);

//update hotel by id 
router.put('/:hotel_id' , hotelController.updateHotel);

//delete hotel by id
router.delete('/:hotel_id', hotelController.deleteHotel);

//get hotel details by id
router.get('/:hotel_id', hotelController.getHotelDetails)  

export default router;
