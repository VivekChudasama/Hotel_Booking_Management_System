export class ResponseMessages {
    static auth = {
        ACCESS_DENIED: 'Access denied. Admin role required',
        EMAIL_REQUIRED: 'Email is required',
        INVALID_CREDENTIALS: 'Invalid username or password. Please try again.',
        INVALID_EMAIL_FORMATE: 'Invalid email format',
        INVALID_TOKEN: 'Invalid or expired token',
        MAX_EMAIL_LENGTH: 'Email must be less than 254 characters',
        NAME_REQUIRED: 'Name is required',
        PASSWORD_REQUIRED: 'Password is Required',
        TOKEN_REQUIRED: 'Token is required',
        USER_ALREADY_EXISTS: 'User is already exist',
        USER_EMAIL_ALREADY_EXISTS: 'User with this email already exists',
        USER_LOGGED_IN_SUCCESS: 'User logged in successfully',
        USER_LOGGED_OUT_SUCCESS: 'User logged out successfully',
        USER_PHONE_NUMBER_EXISTS: 'User with this phone number already exists',
        USER_PHONE_NUMBER_LENGTH: 'Phone number must be of 10 characters',
        USER_PHONE_NUMBER_REQUIRED: 'Phone number is required ',
        USER_REGISTERED_SUCCESS: 'User registered successfully',
        VALID_NAME_FORMATE: 'Name can only contain letters, spaces, and dots',
        VALID_NAME_LENGTH: 'Name must be between 3 and 70 characters',
        VALID_PASSWORD_REQUIRED: 'Password must be at least 8 characters long and include at least 3 of the following 4 conditions: one uppercase letter, one lowercase letter, one digit, and one special character'
    }

    static booking = {
        ADULT_COUNT_MIN: 'Adult count must be at least 1',
        BOOKING_CANCELLED_SUCCESSFULLY: 'Booking cancelled successfully',
        BOOKING_CREATED_SUCCESSFULLY: 'Booking successfully',
        BOOKING_ID_REQUIRED: 'Booking ID is required',
        BOOKING_NOT_FOUND: 'Booking not found',
        CHECK_IN_DATE: 'Check-in date is required',
        CHECK_OUT_DATE: 'Check-out date is required',
        CHILD_COUNT_MIN: 'Child count cannot be negative',
        HOTEL_ID_REQUIRED: 'Hotel ID is required',
        INVALID_BOOKING_STATUS: 'Invalid booking status',
        MIN_CHECK_OUT_DATE: 'Check-out date should be greater than the check-in date',
        NO_AVAILABLE_ROOMS: 'No available rooms in inventory for the selected room type in this hotel',
        ROOM_ALREADY_BOOKED: 'Room is already booked for these dates',
        ROOM_ID_REQUIRED: 'Room ID is required',
        TOTAL_AMOUNT_NUMERIC: 'Total amount must be a number',
        TOTAL_AMOUNT_REQUIRED: 'Total amount is required',
        USER_ID_REQUIRED: 'User ID is required',
        VALID_BOOKING_DATE_FORMATE: 'Booking date must be a valid ISO8601 date'
    }

    static hotel = {
        ACTIVE_BOOKINGS_EXIST: 'Cannot delete hotel because it has active bookings',
        VALID_HOTEL_ID: 'hotel ID must be a valid MongoId',
        ADDRESS_REQUIRED: 'Address is required',
        CITY_NAME_REQUIRED: 'City Name is required',
        DESCRIPTION_REQUIRED: 'Description is required',
        EMAIL_ALREADY_EXISTS: 'Hotel with this email already exists',
        EMAIL_REQUIRED: 'Email is required',
        HOTEL_DELETED_SUCCESSFULLY: 'Hotel deleted successfully',
        HOTEL_ID_REQUIRED: 'Hotel ID is required',
        HOTEL_NAME_REQUIRED: 'Hotel name is required',
        HOTEL_NOT_FOUND: 'Hotel not found',
        VALID_IMAGE_FORMATE: 'Images must be an array of URLs',
        PHONE_NUMBER_EXISTS: 'Hotel with this phone number already exists',
        PHONE_NUMBER_REQUIRED: 'Phone number is required ',
        VALID_ADDRESS_FORMATE: 'Address can only contain letters, number, spaces, hyphen, and dots ',
        VALID_ADDRESS_LENGTH: 'Address must be less than 256 characters',
        VALID_CITY_NAME_FORMATE: 'City Name can only contain letters',
        VALID_CITY_NAME_LENGTH: 'City Name must be less than 30 characters',
        VALID_DESCRIPTION_FORMATE: 'Description should be a string formate',
        VALID_DESCRIPTION_LENGTH: 'Description must be less than 1024 characters',
        VALID_HOTEL_NAME_FORMATE: 'hotel name can only contain letters, numbers, spaces, dots, commas, apostrophes, and hyphens'
    }

    static payment = {
        BOOKING_ID_REQUIRED: 'Booking ID is required',
        PAYMENT_AMOUNT_REQUIRED: 'Total payment amount is required',
        PAYMENT_METHOD_REQUIRED: 'Payment method is required',
        PAYMENT_STATUS_REQUIRED: 'Payment status is required'
    }

    static room = {
        ACTIVE_BOOKINGS_EXIST: 'Cannot delete hotel room because it has active bookings',
        VALID_ROOM_ID: 'room ID must be a valid MongoId',
        VALID_ROOM_NUMBER: 'room number must be a positive integer',
        VALID_ROOM_STATUS: 'Status must be either available or occupied',
        HOTEL_ID_REQUIRED: 'Hotel ID is required',
        HOTEL_ROOM_AMENITIES_REQUIRED: 'Room amenities is required',
        VALID_ROOM_AMENIRIES_FORMATE: 'Amenities must be a non-empty array',
        VALID_ROOM_AMENIRIES_ARRAY: 'Each amenity cannot be empty',
        VALID_ROOM_AMENIRIES_ARRAY_FORMATE: 'Each amenity must be a string',
        HOTEL_ROOM_CAPACITY_REQUIRED: 'Room capacity is required',
        HOTEL_ROOM_COUNT_REQUIRED: 'Room count is required',
        HOTEL_ROOM_DELETED_SUCCESSFULLY: 'Hotel room Deleted Successfully',
        HOTEL_ROOM_DESCRIPTION_REQUIRED: 'Room description is required',
        HOTEL_ROOM_IMAGE_REQUIRED: 'Room image is required',
        HOTEL_ROOM_ID_REQUIRED: 'Room_ID is required',
        VALID_ROOM_ID_FORMATE:'Invalid room ID format',
        HOTEL_ROOM_PRICE_PER_NIGHT_REQUIRED: 'Room price per night is required',
        MIN_ROOM_PRICE_PER_NIGHT: 'Price per night must be at least 1',
        MIN_ROOM_COUNT:'room count must be at least 1',
        HOTEL_ROOM_TYPE_REQUIRED: 'Room type is required',
        VALID_ROOM_TYPE_FORMATE: 'room type must be a string',
        VALID_ROOM_DESCRIPTION_FORMATE: 'room description must be a string',
        HOTEL_ROOM_UPDATED_SUCCESSFULLY: 'Hotel room Updated Successfully',
        ROOM_TYPE_ALREADY_EXISTS: 'This room type is already created for this hotel',
        CHILD_COUNT_REQUIRED: 'Children count is required',
        ROOM_IMAGES_REQUIRED: 'Room images is required'
    }

    static room_inventory = {
        BOOKING_ID_REQUIRED: 'Booking ID is required',
        HOTEL_ID_REQUIRED: ' Hotel ID is required',
        MAX_ROOMS_REACHED: 'Cannot create more physical rooms in inventory for this room type. Maximum allowed count is ',
        ROOM_ALREADY_CREATED: 'Room is already created for this hotel and room type with the given room number.',
        ROOM_ID_REQUIRED: 'Room ID is required',
        ROOM_NUMBER_REQUIRED: 'Room number is required',
        ROOM_STATUS: 'Room status is required',
        ROOM_TYPE_NOT_FOUND: 'Room type (room ID) not found.',
        ROOM_INVENTORY_DELETED_SUCCESSFULLY: 'Room from room inventory deleted successfully',
        ROOM_INVENTORY_NOT_FOUND: 'Room not found in room inventory',
        DUPLICATE_ROOM_NUMBER_IN_ROOM_INVENTORY: 'Duplicate room numbers found in the request payload',
        ROOM_INVENTORY_ROOM_DELETED_SUCCESSFULLY: 'Room deleted successfully from room inventory.'
    }

    static user = {
        ADDRESS_REQUIRED: 'Address is required',
        DESCRIPTION_REQUIRED: 'Description is required',
        EMAIL_REQUIRED: 'Email is required',
        INVALID_IMAGE_URL: 'Invalid image URL',
        PROFILE_IMAGES_REQUIRED: 'User profile images is required',
        USER_IN_ROLE: 'User role must be either customer or admin',
        USER_NAME_REQUIRED: 'User name is required',
        USER_PHONE_NUMBER_REQUIRED: 'Phone number is required ',
        USER_ROLE_REQUIRED: 'User role is required'
    }
}