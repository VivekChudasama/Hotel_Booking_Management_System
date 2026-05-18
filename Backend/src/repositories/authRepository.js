import { User } from '../entities/User.js';

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export default {
    findUserByEmail,
    createUser
}