import userService from "../services/userService.js";
import { Constants } from "../config/Constants.js";
import { ResponseMessages } from "../config/response_messages.js";

const getUserDetails = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const getUserDetails = await userService.getUserService(user_id);
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(getUserDetails);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message })
    }
}

const updateUserDetails = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const updateUserData = req.body;
        const user = await userService.updateUserService(user_id, updateUserData);
        if (!user) return res.status(Constants.RESPONSE_STATUS_CODE.NOT_FOUND_CODE).json({ message: ResponseMessages.user.USER_NOT_FOUND })
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(user);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
}

export default {
    getUserDetails,
    updateUserDetails
}