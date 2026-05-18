import authRepository from '../repositories/authRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const registerUserService = async (userData) => {
    const existingUser = await authRepository.findUserByEmail(userData.email);
    if (existingUser) {
        throw new Error('USER_ALREADY_EXISTS');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = await authRepository.createUser({
        ...userData,
        password: hashedPassword
    });

    const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return { user: newUser, token };
};

const loginUserService = async (email, password) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
        throw new Error('INVALID_CREDENTIALS');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('INVALID_CREDENTIALS');
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
