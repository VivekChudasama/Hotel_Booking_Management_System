import express from 'express';
import roomInventoryController from '../controllers/roomInventoryController.js';
import roomInventorValidation from '../schema/roomInventorValidation.js'
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router()

//delete room form room_inventory by room id
router.delete('/:room_inventory_id/', verifyToken, isAdmin, roomInventorValidation.validatedeleteRoomOfRoomInventory, handleValidationErrors, roomInventoryController.deleteRoomFromRoomInventory);

export default router;
