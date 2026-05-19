import express from 'express';
// import roomController from '../controllers/roomController.js';
// import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// // get room list
// router.get('/:hotel_id/rooms', roomController.getRoomList);

// // add new room
// router.post('/:hotel_id/room', verifyToken, isAdmin, roomController.createRoom);

// // update room by id 
// router.put('/:hotel_id/:room_id', verifyToken, isAdmin, roomController.updateRoom);

// // delete room by id
// router.delete('/:hotel_id/:room_id', verifyToken, isAdmin, roomController.deleteRoom);

export default router;
