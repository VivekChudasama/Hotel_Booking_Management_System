export class Messages {
    static auth = {
        ERR_EMAIL_REQUIRED: 'Email is required!',
        ERR_EMAIL_INVALID: 'Please input valid email',
        ERR_EMAIL_MAXLENGTH: 'Email should have maximum 254 charaters!',
        ERR_PASSWORD_REQUIRED: 'Password is required!',
        ERR_CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required!',
        ERR_PASSWORD_INVALID: 'Please input valid password',
        ERR_EMAIL_ALREADY_EXIST: 'Email already exists',
        ERR_MOBILE_NUMBER: 'Mobile number already exists',
    };

    static register = {
        ERR_NAME_REQUIRED: 'Name is required!',
        VALID_NAME_FORMAT: 'Name can only contain letters, spaces, and dots',
        VALID_NAME_LENGTH: 'Name must be between 3 and 70 characters',
        ERR_MOBILE_NUMBER_REQUIRED: 'Mobile number required!',
        ERR_USER_PHONE_NUMBER_LENGTH: 'Phone number must be of 10 digit',
        ERR_PASSWORD_REQUIRED: 'Password is required',
        VALID_PASSWORD_REQUIRED: 'Password must be at least 8 characters long and include at least 3 of the following 4 conditions: one uppercase letter, one lowercase letter, one digit, and one special character',
        ERR_IMAGE_URL: 'Enter valid image URL',
    };

    static permissions = {
        UNAUTHORIZED_PAGE: 'You do not have permission to access this page.'
    };

    static common_error = {
        NO_RECORDS_FOUND: 'No records found'
    };

    static booking = {
        ERR_ADULT_COUNT_REQUIRED: 'Adult count is required',
        BOOKING_CANCELLED_SUCCESSFULLY: 'Booking cancelled successfully',
        ERR_ROOM_COUNT: 'Room count must be at least 1',
        ERR_ADULT_COUNT: 'Adult count must be at least 1 and at most 10',
        ERR_CHILD_COUNT: 'Children count must be either 0 or a maximum of 10.',
        BOOKING_NOT_FOUND: 'Booking not found',
        ERR_FROM_DATE: 'From date is required',
        ERR_TO_DATE: 'To date is required',
        MIN_CHECK_IN_DATE: 'Check-out date must be after check-in date.',
        PAST_DATE_BOOKING: 'From date cannot be in the past',
        MAX_BOOKING_DATE: 'Cannot book a room more than 6 months in advance.',
        MAX_BOOKING_DURATION: 'Cannot book a room for more than 60 days.',
    };

    static hotel = {
        ERR_ADDRESS_REQUIRED: 'Address is required',
        ERR_CITY_NAME_REQUIRED: 'City Name is required',
        ERR_DESCRIPTION_REQUIRED: 'Description is required',
        ERR_EMAIL_ALREADY_EXISTS: 'Hotel with this email already exists',
        ERR_EMAIL_REQUIRED: 'Email is required',
        ERR_HOTEL_NOT_FOUND: 'Hotel not found',
        ERR_PHONE_NUMBER_REQUIRED: 'Phone number is required',
        ERR_PHONE_NUMBER_EXISTS: 'Hotel with this phone number already exists',
        VALID_ADDRESS_FORMAT: 'Address can only contain letters, numbers, spaces, hyphens, and dots',
        VALID_ADDRESS_LENGTH: 'Address must be less than 256 characters',
        VALID_CITY_NAME_FORMAT: 'City Name can only contain letters',
        VALID_CITY_NAME_LENGTH: 'City Name must be less than 30 characters',
        VALID_DESCRIPTION_LENGTH: 'Description must be less than 10024 characters',
        VALID_HOTEL_NAME_FORMAT: 'Hotel name can only contain letters, numbers, spaces, dots, commas, apostrophes, and hyphens',
        HOTEL_DELETED_SUCCESSFULLY: 'Hotel deleted successfully',
        ACTIVE_BOOKINGS_EXIST: 'Cannot delete hotel because it has active bookings',
    };

    static room = {
        ACTIVE_ROOM_BOOKINGS_EXIST: 'Cannot delete hotel room because it has active bookings',
        HOTEL_ROOM_AMENITIES_REQUIRED: 'Room amenities are required',
        VALID_ROOM_AMENITIES_ARRAY: 'Amenity cannot be empty',
        HOTEL_ROOM_COUNT_REQUIRED: 'Room count is required',
        VALID_ROOM_COUNT_RANGE: 'Room count must be an integer between 1 and 1000',
        HOTEL_ROOM_DESCRIPTION_REQUIRED: 'Room description is required',
        HOTEL_ROOM_PRICE_PER_NIGHT_REQUIRED: 'Room price per night is required',
        VALID_PRICE_PER_NIGHT_RANGE: 'Price per night must be an integer between 1 and 1000000',
        HOTEL_ROOM_TYPE_REQUIRED: 'Room type is required',
        HOTEL_ROOM_UPDATED_SUCCESSFULLY: 'Hotel room Updated Successfully',
        CHILD_COUNT_REQUIRED: 'Children count is required',
        VALID_CHILDREN_COUNT_RANGE: 'Children count must be an integer between 0 and 10',
        ADULT_COUNT_REQUIRED: 'Adult count is required',
        VALID_ADULT_COUNT_RANGE: 'Adult count must be an integer between 1 and 10',
        MIN_PRICE_POSITIVE: 'Min_price must be a positive number',
        MAX_PRICE_POSITIVE: 'Max_price must be a positive number',
        MAX_PRICE_GREATER: 'Max_price must be greater than min_price',
        TO_DATE_AFTER_FROM: 'To date must be after from date',
        HOTEL_ROOM_FORMAT: 'Rooms must be an array with at least one item.',
        HOTEL_ROOM_DELETED_SUCCESSFULLY: 'Hotel room Deleted Successfully',
        HOTEL_ROOM_NOT_FOUND: 'Room not found'
    };

    static room_inventory = {
        ROOM_NUMBER_REQUIRED: 'Room number is required',
        VALID_ROOM_NUMBER_RANGE: 'Room number must be an integer 1 to 10000',
        ROOM_INVENTORY_DELETED_SUCCESSFULLY: 'Room from room inventory deleted successfully',
        ROOM_INVENTORY_NOT_FOUND: 'Room not found in room inventory',
        DUPLICATE_ROOM_NUMBER_IN_ROOM_INVENTORY: 'Duplicate room numbers found',
        ROOM_INVENTORY_ROOM_DELETED_SUCCESSFULLY: 'Room deleted successfully from room inventory.',
    };

    static payment = {
        PAYMENT_METHOD_REQUIRED: 'Payment method is required',
    };
}