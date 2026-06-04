export class Validation {
    static REGEX = {
        PASSWORD_VALIDATION_REGEX: /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])|(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])|(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]))[A-Za-z\d@$!%*?&]{8,}$/,
        EMAIL_VALIDATION_REGEX:/^(?!.*\.{2})[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
        USER_NAME_VALIDATION_REGEX: /^[a-zA-Z\s.]+$/,
        HOTEL_NAME_VALIDATION_REGEX: /^[a-zA-Z0-9\s.,'&-]+$/,
        ADDRESS_VALIDATION_REGEX: /^[a-zA-Z0-9 .-]+$/,
        CITY_NAME_VALIDATION_REGEX: /^[a-zA-Z]+$/,
    }
}