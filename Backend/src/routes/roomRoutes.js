import express from 'express';
import roomController from '../controllers/roomController.js';
import roomValidation from '../schema/roomValidation.js'
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// get rooms list
router.get('/:hotel_id/rooms', verifyToken,  roomController.getRoomList);

// add new room and room inventory to hotel by hotel id
router.post('/:hotel_id/room', verifyToken, isAdmin, roomValidation.validateCreateRoom , handleValidationErrors, roomController.createRoom);

// update room and room inventory by room id and hotel id 
router.put('/:hotel_id/:room_id', verifyToken, isAdmin, roomController.updateRoom);

// delete room and all room of room_inventory by id
router.delete('/:hotel_id/:room_id', verifyToken, isAdmin, roomController.deleteRoom);

export default router;
