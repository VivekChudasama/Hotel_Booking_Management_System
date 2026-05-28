import { User } from '../entities/user.js'

const getUserById = async (id) => {
    return await User.findById(id).select("-password");
}

const updateUserById = async (id, updateUserData) => {
    return await User.findByIdAndUpdate(id, updateUserData , {new : true}).select("-password");
}

const getUserEmail = async (email) => {
    return await User.findOne({ email });
}

const getUserPhoneNumber = async (phone_number) => {
    return await User.findOne({ phone_number })
}

export default {
    getUserById,
    updateUserById,
    getUserEmail,
    getUserPhoneNumber
}