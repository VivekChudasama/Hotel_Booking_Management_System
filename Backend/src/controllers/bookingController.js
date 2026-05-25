import bookingService from '../services/bookingService.js';
import { Constants } from '../config/Constants.js';
import { ResponseMessages } from '../config/response_messages.js';

const createBooking = async (req, res) => {
    try {
        const savedBooking = await bookingService.createBookingService(req.body);
        res.status(Constants.RESPONSE_STATUS_CODE.CREATED_SUCCESS_CODE).json(savedBooking);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
};

const getBookingDetails = async (req, res) => {
    try {
        const booking = await bookingService.getBookingDetailsService(req.params.booking_id);
        if (!booking) return res.status(Constants.RESPONSE_STATUS_CODE.NOT_FOUND_CODE).json({ message: ResponseMessages.booking.BOOKING_NOT_FOUND });
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(booking);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
};

const updateBooking = async (req, res) => {
    try {
        const booking = await bookingService.updateBookingService(req.params.booking_id, req.body);
        if (!booking) return res.status(Constants.RESPONSE_STATUS_CODE.NOT_FOUND_CODE).json({ message: ResponseMessages.booking.BOOKING_NOT_FOUND });
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(booking);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const booking = await bookingService.cancelBookingService(req.params.booking_id);
        if (!booking) return res.status(Constants.RESPONSE_STATUS_CODE.NOT_FOUND_CODE).json({ message: ResponseMessages.booking.BOOKING_NOT_FOUND });
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json({ message: ResponseMessages.booking.BOOKING_CANCELLED_SUCCESSFULLY });
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
};

const getBookingHistory = async (req, res) => {
    try {
        const bookings = await bookingService.getBookingHistoryService(req.params.user_id);
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(bookings);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
};

const getAllUsersBooking = async (req, res) => {
    try {
        const bookings = await bookingService.getAllUserBookingService();
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(bookings);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
}

export default {
    createBooking,
    getBookingDetails,
    updateBooking,
    cancelBooking,
    getBookingHistory,
    getAllUsersBooking
}