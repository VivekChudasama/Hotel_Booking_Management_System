import express from 'express';
import roomInventoryController from '../controllers/roomInventoryController.js';
import roomInventoryValidation from '../schema/roomInventorValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Delete specific room inventory(admin only)
router.delete('/:room_inventory_id', verifyToken, isAdmin, roomInventoryValidation.validateDeleteRoomfromRoomInventory, handleValidationErrors, roomInventoryController.deleteRoomInventory);

export default router;
