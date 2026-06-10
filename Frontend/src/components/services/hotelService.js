import apiClient from './apiClient';

export const getHotelList = async (params = {}) => {
    try {
        const response = await apiClient.get('/hotels', { params });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const getHotelDetails = async (hotelId) => {
    try {
        const response = await apiClient.get(`/hotels/${hotelId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const createHotel = async (hotelData) => {
    try {
        const response = await apiClient.post('/hotels', hotelData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const updateHotel = async (hotelId, hotelData) => {
    try {
        const response = await apiClient.put(`/hotels/${hotelId}`, hotelData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const deleteHotel = async (hotelId) => {
    try {
        const response = await apiClient.delete(`/hotels/${hotelId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};
