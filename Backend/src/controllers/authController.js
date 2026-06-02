import authService from '../services/authService.js';
import { Constants } from '../config/Constants.js';
import { ResponseMessages } from '../config/response_messages.js';

const register = async (req, res, next) => {
    try {
        const result = await authService.registerUserService(req.body);

        // Remove password from response
        const userObj = result.user.toObject();
        delete userObj.password;

        res.status(Constants.RESPONSE_STATUS_CODE.CREATED_SUCCESS_CODE).json({
            message: ResponseMessages.auth.USER_REGISTERED_SUCCESS,
            data: { user: userObj, token: result.token }
        });
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR_CODE).json({ message: error.message });
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUserService(email, password);

        // Remove password from response
        const userObj = result.user.toObject();
        delete userObj.password;

        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json({
            message: ResponseMessages.auth.USER_LOGGED_IN_SUCCESS,
            data: { user: userObj, token: result.token }
        });
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR_CODE).json({ message: error.message });
    }
};


export default {
    register,
    login
}
