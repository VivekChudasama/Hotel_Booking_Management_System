export class ResponseMessages {
    static common = {
        MUST_BE_STRING: 'This field must be a valid string',
        MUST_BE_ARRAY: 'This field must be an array',
        MUST_BE_MONGO_ID: 'Invalid ID format. Must be a valid MongoId',
        MUST_BE_URL: 'This field must be a valid URL',
        MUST_BE_DATE: 'This field must be a valid ISO8601 formate date',
    }
    static auth = {
        ACCESS_DENIED: 'Access denied. Admin role required',
        JWT_NOT_PROVIDED: 'JWT token is required',
        EMAIL_REQUIRED: 'Email is required',
        INVALID_CREDENTIALS: 'Invalid username or password. Please try again.',
        INVALID_EMAIL_FORMAT: 'Invalid email format',
        INVALID_TOKEN: 'Invalid or expired token',
        MAX_EMAIL_LENGTH: 'Email must be less than 254 characters',
        NAME_REQUIRED: 'Name is required',
        PASSWORD_REQUIRED: 'Password is Required',
        TOKEN_REQUIRED: 'Token is required',
        USER_EMAIL_ALREADY_EXISTS: 'User with this email already exists',
        USER_LOGGED_IN_SUCCESS: 'User logged in successfully',
        USER_PHONE_NUMBER_EXISTS: 'User with this phone number already exists',
        USER_PHONE_NUMBER_LENGTH: 'Phone number must be of 10 characters',
        USER_PHONE_NUMBER_REQUIRED: 'Phone number is required',
        USER_REGISTERED_SUCCESS: 'User registered successfully',
        VALID_NAME_FORMAT: 'Name can only contain letters, spaces, and dots',
        VALID_NAME_LENGTH: 'Name must be between 3 and 70 characters',
        VALID_PASSWORD_REQUIRED: 'Password must be at least 8 characters long and include at least 3 of the following 4 conditions: one uppercase letter, one lowercase letter, one digit, and one special character'
    }

    static booking = {
        ADULT_COUNT_REQUIRED: 'Adult count is required',
        BOOKING_CANCELLED_SUCCESSFULLY: 'Booking cancelled successfully',
        BOOKING_ID_REQUIRED: 'Booking ID is required',
        BOOKING_NOT_FOUND: 'Booking not found',
        CHECK_IN_DATE: 'Check-in date is required',
        CHECK_OUT_DATE: 'Check-out date is required',
        INVALID_BOOKING_STATUS: 'Invalid booking status',
        MIN_CHECK_OUT_DATE: 'Check-out date should be greater than the check-in date',
        PAST_DATE_BOOKING: 'Check-in date cannot be in the past',
        USER_ID_REQUIRED: 'User ID is required',
        MAX_BOOKING_DATE: 'Cannot book a room more than 6 months in advance.',
        MAX_BOOKING_DURATION: 'Cannot book a room for more than 60 days.',
        ROOM_INVENTORY_ID_REQUIRED: 'Room inventory ID is required',
        VALID_ADULT_COUNT_RANGE: 'Adult count must be an integer between 1 and 10',
        VALID_CHILDREN_COUNT_RANGE: 'Children count must be an integer between 0 and 10',
        VALID_TOTAL_AMOUNT_RANGE: 'Total amount must be a number greater than or equal to 1',
    }

    static hotel = {
        ACTIVE_BOOKINGS_EXIST: 'Cannot delete hotel because it has active bookings',
        VALID_HOTEL_ID: 'Hotel ID must be a valid MongoId',
        ADDRESS_REQUIRED: 'Address is required',
        CITY_NAME_REQUIRED: 'City Name is required',
        DESCRIPTION_REQUIRED: 'Description is required',
        HOTEL_ALREADY_EXISTS: 'Hotel with same name, city and address already exists',
        EMAIL_ALREADY_EXISTS: 'Hotel with this email already exists',
        EMAIL_REQUIRED: 'Email is required',
        HOTEL_DELETED_SUCCESSFULLY: 'Hotel deleted successfully',
        HOTEL_ID_REQUIRED: 'Hotel ID is required',
        HOTEL_NOT_FOUND: 'Hotel not found',
        PHONE_NUMBER_EXISTS: 'Hotel with this phone number already exists',
        PHONE_NUMBER_REQUIRED: 'Phone number is required',
        VALID_ADDRESS_FORMAT: 'Address can only contain letters, numbers, spaces, hyphens, and dots',
        VALID_ADDRESS_LENGTH: 'Address must be less than 256 characters',
        VALID_CITY_NAME_FORMAT: 'City Name can only contain letters',
        VALID_CITY_NAME_LENGTH: 'City Name must be less than 30 characters',
        VALID_DESCRIPTION_LENGTH: 'Description must be less than 1024 characters',
        VALID_HOTEL_NAME_FORMAT: 'Hotel name can only contain letters, numbers, spaces, dots, commas, apostrophes, and hyphens'
    }

    static room = {
        ACTIVE_BOOKINGS_EXIST: 'Cannot delete hotel room because it has active bookings',
        VALID_ROOM_ID: 'Room ID must be a valid MongoId',
        VALID_ROOM_STATUS: 'Status must be either available or Out of Service',
        HOTEL_ID_REQUIRED: 'Hotel ID is required',
        HOTEL_ROOM_AMENITIES_REQUIRED: 'Room amenities are required',
        VALID_ROOM_AMENITIES_ARRAY: 'Each amenity cannot be empty',
        HOTEL_ROOM_COUNT_REQUIRED: 'Room count is required',
        HOTEL_ROOM_DELETED_SUCCESSFULLY: 'Hotel room Deleted Successfully',
        HOTEL_ROOM_DESCRIPTION_REQUIRED: 'Room description is required',
        HOTEL_ROOM_ID_REQUIRED: 'Room_ID is required',
        HOTEL_ROOM_PRICE_PER_NIGHT_REQUIRED: 'Room price per night is required',
        HOTEL_ROOM_TYPE: 'Room type must be one of the following: Standard Room, Deluxe Room, Suite, Executive Room, or Family Room.',
        HOTEL_ROOM_TYPE_REQUIRED: 'Room type is required',
        HOTEL_ROOM_UPDATED_SUCCESSFULLY: 'Hotel room Updated Successfully',
        CHILD_COUNT_REQUIRED: 'Children count is required',
        HOTEL_ROOM_NOT_FOUND: 'Room not found',
        VALID_PRICE_PER_NIGHT_RANGE: 'Price per night must be an integer between 1 and 1000000',
        VALID_ADULT_COUNT_RANGE: 'Adult count must be an integer between 1 and 10',
        VALID_CHILDREN_COUNT_RANGE: 'Children count must be an integer between 0 and 10',
        VALID_ROOM_COUNT_RANGE: 'Room count must be an integer between 1 and 1000',
        MIN_PRICE_POSITIVE: 'min_price must be a positive number',
        MAX_PRICE_POSITIVE: 'max_price must be a positive number',
        MAX_PRICE_GREATER: 'max_price must be greater than min_price',
        SORT_PRICE_INVALID: "sort_price must be either 'asc' or 'desc'",
        TO_DATE_AFTER_FROM: 'to date must be after from date',
        HOTEL_ROOM_FORMAT: 'Rooms must be an array with at least one item.'
    }

    static room_inventory = {
        BOOKING_ID_REQUIRED: 'Booking ID is required',
        HOTEL_ID_REQUIRED: 'Hotel ID is required',
        ROOM_ID_REQUIRED: 'Room ID is required',
        ROOM_NUMBER_REQUIRED: 'Room number is required',
        ROOM_INVENTORY_DELETED_SUCCESSFULLY: 'Room from room inventory deleted successfully',
        ROOM_INVENTORY_NOT_FOUND: 'Room not found in room inventory',
        DUPLICATE_ROOM_NUMBER_IN_ROOM_INVENTORY: 'Duplicate room numbers found in the request payload',
        ROOM_INVENTORY_ROOM_DELETED_SUCCESSFULLY: 'Room deleted successfully from room inventory.',
        VALID_ROOM_NUMBER_RANGE: 'Room number must be an integer 1 to 10000'
    }

    static user = {
        ADDRESS_REQUIRED: 'Address is required',
        DESCRIPTION_REQUIRED: 'Description is required',
        EMAIL_REQUIRED: 'Email is required',
        INVALID_IMAGE_URL: 'Invalid image URL',
        USER_IN_ROLE: 'User role must be either customer or admin',
        USER_NAME_REQUIRED: 'User name is required',
        USER_PHONE_NUMBER_REQUIRED: 'Phone number is required',
        USER_ROLE_REQUIRED: 'User role is required',
        USER_NOT_FOUND: 'User not found',
    }

    static payment = {
        PAYMENT_AMOUNT_REQUIRED: 'Total payment amount is required',
        PAYMENT_METHOD_REQUIRED: 'Payment method is required',
        PAYMENT_STATUS_REQUIRED: 'Payment status is required',
        ACCEPTED_PAYMENT_METHODS: 'Payment method must be one of the following: Card Payment, Digital Payment, or Cash Payment.',
        INVALID_PAYMENT_STATUS: 'Invalid payment status. Payment status must be one of the following: pending, confirmed, or cancelled.',
        VALID_PAYMENT_METHOD_FORMAT: 'Payment method must be a string',
        VALID_PAYMENT_STATUS_FORMAT: 'Payment status must be a string'
    }
}