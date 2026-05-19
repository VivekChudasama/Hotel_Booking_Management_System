export class ResponseMessages {
    static hotel = {
        HOTEL_NAME_REQUIRED: 'Hotel name is required',
        EMAIL_REQUIRED: 'Email is required',
        EMAIL_ALREADY_EXISTS: 'Hotel with this email already exists',
        PHONE_NUMBER_REQUIRED: 'Phone number is required ',
        PHONE_NUMBER_EXISTS: 'Hotel with this phone number already exists',
        DESCRIPTION_REQUIRED: 'Description is required',
        VALID_DESCRIPTION_LENGTH: 'Description must be less than 1024 characters',
        ADDRESS_REQUIRED: 'Address is required',
        VALID_ADDRESS_LENGTH: 'Address must be less than 256 characters',
        VALID_ADDRESS_FORMATE: 'Address can only contain letters, number, spaces, hyphen, and dots ',
        CITY_NAME_REQUIRED: 'City Name is required',
        VALID_CITY_NAME_LENGTH: 'City Name must be less than 30 characters',
        VALID_CITY_NAME_FORMATE: 'City Name can only contain letters',
        HOTEL_NOT_FOUND: 'Hotel not found',
        HOTEL_ID_REQUIRED: 'Hotel ID is required',
        HOTEL_DELETED_SUCCESSFULLY: 'Hotel deleted successfully'
    }
    static booking = {
        USER_ID_REQUIRED: 'User ID is required',
        ROOM_ID_REQUIRED: 'Room ID is required',
        HOTEL_ID_REQUIRED: 'Hotel ID is required',
        BOOKING_ID_REQUIRED: 'Booking ID is required',
        ADULT_COUNT_MIN: 'Adult count must be at least 1',
        CHILD_COUNT_MIN: 'Child count cannot be negative',
        CHECK_IN_DATE: 'Check-in date is required',
        CHECK_OUT_DATE: 'Check-out date is required',
        VALID_BOOKING_DATE_FORMATE: 'Booking date must be a valid ISO8601 date',
        MIN_CHECK_OUT_DATE: 'Check-out date should be greater than the check-in date',
        BOOKING_CREATED_SUCCESSFULLY: "Booking successfully",
        BOOKING_NOT_FOUND: 'Booking not found',
        BOOKING_CANCELLED_SUCCESSFULLY: 'Booking cancelled successfully'
    } 
    static auth = {
        USER_REGISTERED_SUCCESS: 'User registered successfully',
        USER_LOGGED_IN_SUCCESS: 'User logged in successfully',
        USER_LOGGED_OUT_SUCCESS: 'User logged out successfully',
        USER_ALREADY_EXISTS: 'User is already exist',
        PASSWORD_REQUIRED: 'Password is Required',
        VALID_PASSWORD_REQUIRED: 'Password must be at least 8 characters long and include at least 3 of the following 4 conditions: one uppercase letter, one lowercase letter, one digit, and one special character',
        INCREDENTIALS: 'Email or password is incorrect',
        INVALID_CREDENTIALS: 'Email or password is incorrect',
        TOKEN_REQUIRED: 'Token is required',
        INVALID_TOKEN: 'Invalid or expired token',
        ACCESS_DENIED: 'Access denied. Admin role required',
        VALID_NAME_FORMATE: 'Name can only contain letters, spaces, and dots',
        VALID_NAME_LENGTH: 'Name must be between 3 and 70 characters',
        INVALID_EMAIL_FORMATE: 'Invalid email format',
        MAX_EMAIL_LENGTH: 'Email must be less than 254 characters',
        USER_EMAIL_ALREADY_EXISTS: 'User with this email already exists',
        USER_PHONE_NUMBER_EXISTS: 'User with this phone number already exists',
        NAME_REQUIRED: 'Name is required',
        EMAIL_REQUIRED: 'Email is required',
        USER_PHONE_NUMBER_REQUIRED: 'Phone number is required ',
        USER_PHONE_NUMBER_LENGTH: 'Phone number must be of 10 characters'
    }
    static payment = {
        BOOKING_ID_REQUIRED: 'Booking ID is required',
        PAYMENT_AMOUNT_REQUIRED: 'Total Payment amount is required',
        PAYMENT_METHOD_REQUIRED: 'Payment method is required',
        PAYMENT_STATUS_REQUIRED: 'Payment status is required',
    }
    static room = {
        HOTEL_ID_REQUIRED: 'Hotel ID is required',
        HOTEL_ROOM_TYPE_REQUIRED: 'Room type is required',
        HOTEL_ROOM_DESCRIPTION_REQUIRED: 'Room description is required',
        HOTEL_ROOM_AMENITIES_REQUIRED: 'Room amenities is required',
        HOTEL_ROOM_PRICE_PER_NIGHT_REQUIRED: 'Room price per night is required',
        HOTEL_ROOM_CAPACITY_REQUIRED: 'Room capacity is required',
        HOTEL_ROOM_IMAGE_REQUIRED: 'Room image is required',
        HOTEL_ROOM_COUNT_REQUIRED: 'Room count is required'
    }
    static user = {
        USER_NAME_REQUIRED: 'User name is required',
        EMAIL_REQUIRED: 'Email is required',
        USER_PHONE_NUMBER_REQUIRED: 'Phone number is required ',
        DESCRIPTION_REQUIRED: 'Description is required',
        ADDRESS_REQUIRED: 'Address is required',
        PROFILE_IMAGES_REQUIRED: 'User profile images is required',
        USER_ROLE_REQUIRED: 'User role is required',
        USER_IN_ROLE: 'User role must be either customer or admin',
        INVALID_IMAGE_URL: 'Invalid image URL'
    }
    static room_inventory = {
        ROOM_ID_REQUIRED: 'Room ID is required',
        HOTEL_ID_REQUIRED: ' Hotel ID is required',
        ROOM_NUMBER_REQUIRED: 'Room number is required',
        ROOM_STATUS: 'Room status is required',
        BOOKING_ID_REQUIRED: 'Booking ID is required',
    }
}