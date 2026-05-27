import { validationResult } from 'express-validator';
import { Constants } from '../config/Constants.js';

//handle validation error of the schema validation
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ 
            message: "Validation failed",
            errors: errors.array().map(err => ({ field: err.path || err.param, message: err.msg })) 
        });
    }
    next();
};
