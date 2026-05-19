import { User } from '../entities/User.js';

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const findUserByPhone = async (phone_number) => {
    return await User.findOne({ phone_number });
};

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export default {
    findUserByEmail,
    findUserByPhone,
    createUser
}