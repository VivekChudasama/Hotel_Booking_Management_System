export class Constants {
    static RESPONSE_STATUS_CODE = {
        SUCCESS_CODE: 200,
        CREATED_SUCCESS_CODE: 201,
        FAIL_CODE: 400,
        NOT_FOUND_CODE: 404,
        UNAUTHORIZED_CODE: 401,
        FORBIDDEN_CODE: 403,
        INTERNAL_SERVER_ERROR_CODE: 500,
    };

    static REGEX = {
        PASSWORD_VALIDATION_REGEX: /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])|(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])|(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]))[A-Za-z\d@$!%*?&]{8,}$/,
        USER_NAME_VALIDATION_REGEX: /^[a-zA-Z\s.]+$/,
        HOTEL_NAME_VALIDATION_REGEX: /^[a-zA-Z0-9\s.,'&-]+$/,
        ADDRESS_VALIDATION_REGEX: /^[a-zA-Z0-9 .-]+$/,
        CITY_NAME_VALIDATION_REGEX: /^[a-zA-Z]+$/,
    }
}