import express from 'express';
import userController from '../controllers/userController.js';
import userValidation from '../schema/userValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

//get user details by id
router.get('/:user_id', verifyToken, userValidation.validateUserId, handleValidationErrors, userController.getUserDetails);

//update update user details by id 
router.put('/:user_id', verifyToken, userValidation.validateUpdateUser, handleValidationErrors, userController.updateUserDetails);

export default router;
