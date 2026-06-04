import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/booking';

export const createBooking = async (bookingDetails) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/`, bookingDetails);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }   
};

export const getBookingDetails = async (bookingDetails) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/:booking_id`, bookingDetails);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }   
};

export const cancelBooking = async (bookingDetails) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/:booking_id/cancel`, bookingDetails);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }   
};


