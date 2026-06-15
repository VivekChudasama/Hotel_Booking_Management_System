import express from 'express';
import roomController from '../controllers/roomController.js';
import roomValidation from '../schema/roomValidation.js'
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import roomInventoryController from '../controllers/roomInventoryController.js';
import roomInventoryValidation from '../schema/roomInventorValidation.js';

const router = express.Router();

// get room list
router.get('/:hotel_id', roomValidation.validateGetRoomList, handleValidationErrors, roomController.getRoomList);

// add new room(admin only)
router.post('/:hotel_id/room', verifyToken, isAdmin, roomValidation.validateCreateRoom, handleValidationErrors, roomController.createRoom);

// update room by id(admin only)
router.put('/:room_id', verifyToken, isAdmin, roomValidation.validateUpdateRoom, handleValidationErrors, roomController.updateRoom);

// delete room by id(admin only)
router.delete('/:room_id', verifyToken, isAdmin, roomValidation.validateRoomIdParam, handleValidationErrors, roomController.deleteRoom);

// Get hotel inventory room numbers by room_id (admin only)
router.get('/inventory/:room_id', verifyToken, isAdmin, roomInventoryValidation.validateGetHotelInventory, handleValidationErrors, roomInventoryController.getHotelInventory);

export default router;
