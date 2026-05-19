import jwt from 'jsonwebtoken';
import { Constants } from '../config/constants.js';
import { ResponseMessages } from '../config/response_messages.js';

// export const verifyToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(Constants.RESPONSE_STATUS_CODE.UNAUTHORIZED_CODE).json({
//             message: ResponseMessages.auth.TOKEN_REQUIRED
//         });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(Constants.RESPONSE_STATUS_CODE.UNAUTHORIZED_CODE).json({
//             message: ResponseMessages.auth.INVALID_TOKEN
//         });
//     }
// };

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
