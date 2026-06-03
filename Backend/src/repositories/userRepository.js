import { User } from '../entities/user.js'

// get user by user_id
const getUserById = async (id) => {
    return await User.findById(id).select("-password");
}

// update user by user_id
const updateUserById = async (id, updateUserData) => {
    return await User.findByIdAndUpdate(id, updateUserData , {new : true}).select("-password");
}

//find user by email
const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

//find user by phone_number
const findUserByPhoneNumber = async (phone_number) => {
    return await User.findOne({ phone_number });
};

//create new user
const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export default {
    getUserById,
    updateUserById,
    findUserByEmail,
    findUserByPhoneNumber,
    createUser
}