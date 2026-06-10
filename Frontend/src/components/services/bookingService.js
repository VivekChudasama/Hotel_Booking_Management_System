import apiClient from './apiClient';

export const createBooking = async (bookingDetails) => {
    try {
        const response = await apiClient.post(`/booking/`, bookingDetails);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }   
};

export const getBookingDetails = async (bookingId) => {
    try {
        const response = await apiClient.get(`/booking/${bookingId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }   
};

export const cancelBooking = async (bookingId) => {
    try {
        const response = await apiClient.put(`/booking/${bookingId}/cancel`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }   
};

export const updateBooking = async (bookingId, bookingDetails) => {
    try {
        const response = await apiClient.put(`/booking/${bookingId}`, bookingDetails);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const getBookingHistory = async (userId) => {
    try {
        const response = await apiClient.get(`/booking/${userId}/booking_history`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const getAllUsersBooking = async () => {
    try {
        const response = await apiClient.get(`/booking/`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};
