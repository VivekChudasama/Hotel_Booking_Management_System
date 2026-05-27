import jwt from 'jsonwebtoken';
import { Constants } from '../config/Constants.js';
import { ResponseMessages } from '../config/response_messages.js';

//verify user token
export const verifyToken = (req, res, next) => {
    let token;
    const authHeader = req.headers['authorization'];
    
    if (authHeader) {
        if (authHeader.includes(' ')) {
            token = authHeader.split(' ')[1];
        } else {
            token = authHeader;
        }
    } else if (req.headers['token']) {
        token = req.headers['token'];
    }

    if (!token) {
        return res.status(Constants.RESPONSE_STATUS_CODE.UNAUTHORIZED_CODE).json({
            message: ResponseMessages.auth.TOKEN_REQUIRED
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(Constants.RESPONSE_STATUS_CODE.UNAUTHORIZED_CODE).json({
            message: ResponseMessages.auth.INVALID_TOKEN
        });
    }
};

//check user role is admin or not
export const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(Constants.RESPONSE_STATUS_CODE.UNAUTHORIZED_CODE).json({
            message: ResponseMessages.auth.TOKEN_REQUIRED
        });
    }

    if (req.user.role !== 'admin') {
        return res.status(Constants.RESPONSE_STATUS_CODE.FORBIDDEN_CODE).json({
            message: ResponseMessages.auth.ACCESS_DENIED
        });
    }
    next();
};
