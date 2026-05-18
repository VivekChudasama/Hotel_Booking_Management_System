export class Constants {
    static RESPONSE_STATUS_CODE = {
        SUCCESS_CODE: 200,
        CREATED_SUCCESS_CODE: 201,
        UPDATE_SUCCESS_CODE: 204,
        FAIL_CODE: 400,
        NOT_FOUND_CODE: 404,
        INTERNAL_SERVER_ERROR_CODE: 500,
    };

    static REGEX = {
        PASSWORD_VALIDATION_REGEX :/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        USER_NAME_VALIDATION_REGEX : /^[a-zA-Z\s.]+$/,
        ADDRESS_VALIDATION_REGEX : /^[a-zA-Z0-9 .-]+$/,
        CITY_NAME_VALIDATION_REGEX : /^[a-zA-Z]+$/,
    }
}