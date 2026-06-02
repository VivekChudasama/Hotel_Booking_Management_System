import userRepository from '../repositories/userRepository.js'
import { ResponseMessages } from '../config/response_messages.js'

const getUserService = async (id) => {
    const existingUser = await userRepository.getUserById(id)

    if (!existingUser) {
        throw new Error(ResponseMessages.user.USER_NOT_FOUND);
    }

    return existingUser
}

const updateUserService = async (id, updateUserData) => {
    updateUserData = updateUserData || {};
    const existingUser = await userRepository.getUserById(id)

    if (!existingUser) {
        throw new Error(ResponseMessages.user.USER_NOT_FOUND);
    }

    if (updateUserData.email) {
        const userWithSameEmail = await userRepository.findUserByEmail(updateUserData.email);
        if (userWithSameEmail && userWithSameEmail._id.toString() !== id.toString()) {
            throw new Error(ResponseMessages.auth.USER_EMAIL_ALREADY_EXISTS);
        }
    }

    if (updateUserData.phone_number) {
        const userWithSamePhone_Number = await userRepository.findUserByPhoneNumber(updateUserData.phone_number);
        if (userWithSamePhone_Number && userWithSamePhone_Number._id.toString() !== id.toString()) {
            throw new Error(ResponseMessages.auth.USER_PHONE_NUMBER_EXISTS);
        }
    }

    return await userRepository.updateUserById(id, updateUserData)
}

export default {
    getUserService,
    updateUserService
}