import authRepository from '../repositories/authRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { ResponseMessages } from '../config/response_messages.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const registerUserService = async (userData) => {
    //verify email is already exist or not
    if (userData.email) {
        const existingUserByEmail = await authRepository.findUserByEmail(userData.email);
        if (existingUserByEmail) {
            throw new Error(ResponseMessages.auth.USER_EMAIL_ALREADY_EXISTS);
        }
    }

    //verify phone_number is already exist or not
    if (userData.phone_number) {
        const existingUserByPhone = await authRepository.findUserByPhone(userData.phone_number);
        if (existingUserByPhone) {
            throw new Error(ResponseMessages.auth.USER_PHONE_NUMBER_EXISTS);
        }
    }

    //hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = await authRepository.createUser({
        ...userData,
        password: hashedPassword
    });

    // generate JWT token for the registered user
    const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return { user: newUser, token };
};

const loginUserService = async (email, password) => {
    //validate email is valid or not
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
        throw new Error(ResponseMessages.auth.INVALID_CREDENTIALS);
    }

    //validate password is valid or not
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error(ResponseMessages.auth.INVALID_CREDENTIALS);
    }

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return { user, token };
};

export default {
    registerUserService,
    loginUserService
}
