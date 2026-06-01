export class Validation {
    static REGEX = {
        PASSWORD_VALIDATION_REGEX: /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])|(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])|(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]))[A-Za-z\d@$!%*?&]{8,}$/,
        USER_NAME_VALIDATION_REGEX: /^[a-zA-Z\s.]+$/,
        HOTEL_NAME_VALIDATION_REGEX: /^[a-zA-Z0-9\s.,'&-]+$/,
        ADDRESS_VALIDATION_REGEX: /^[a-zA-Z0-9 .-]+$/,
        CITY_NAME_VALIDATION_REGEX: /^[a-zA-Z]+$/,
        VALID_HOUR: /^(0{1,3}|[0-9]{2,3})$/,
        VALID_MINUTE: /^[0-5][0-9]$/,
        VALID_SECONDS: /^[0-5][0-9]$/
    }
}