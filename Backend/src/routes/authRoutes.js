import express from 'express';
import authController from '../controllers/authController.js';
import authValidation from '../schema/authValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = express.Router();

// register route
router.post('/register', authValidation.validateRegister, handleValidationErrors, authController.register);

// login route
router.post('/login', authValidation.validateLogin, handleValidationErrors, authController.login);

export default router;

