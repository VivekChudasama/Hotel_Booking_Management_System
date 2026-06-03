import userService from "../services/userService.js";
import { Constants } from "../config/Constants.js";
import { ResponseMessages } from "../config/response_messages.js";

const getUserDetails = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        if (req.user.role !== 'admin' && req.user.userId !== user_id) {
            return res.status(Constants.RESPONSE_STATUS_CODE.FORBIDDEN_CODE).json({ message: ResponseMessages.auth.ACCESS_DENIED });
        }

        const userDetails = await userService.getUserService(user_id);
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(userDetails);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message })
    }
}

const updateUserDetails = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        if (req.user.role !== 'admin' && req.user.userId !== user_id) {
            return res.status(Constants.RESPONSE_STATUS_CODE.FORBIDDEN_CODE).json({ message: ResponseMessages.auth.ACCESS_DENIED });
        }

        const updateUserData = req.body;
        const user = await userService.updateUserService(user_id, updateUserData);
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(user);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
}

export default {
    getUserDetails,
    updateUserDetails
}