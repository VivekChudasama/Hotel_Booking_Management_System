import express from 'express';
import roomController from '../controllers/roomController.js';
import roomValidation from '../schema/roomValidation.js'
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// get room list
router.get('/:hotel_id/rooms', verifyToken,  roomController.getRoomList);

// add new room(admin only)
router.post('/:hotel_id/room', verifyToken, isAdmin, roomValidation.validateCreateRoom , handleValidationErrors, roomController.createRoom);

// update room by id(admin only)
router.put('/:hotel_id/room/:room_id', verifyToken, isAdmin, roomController.updateRoom);

// delete room by id(admin only)
router.delete('/:room_id', verifyToken, isAdmin, roomController.deleteRoom);

export default router;
