import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../schema/authValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);

export default router;
