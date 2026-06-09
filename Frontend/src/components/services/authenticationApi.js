import apiClient from './apiClient';

export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post(`/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }   
};

export const loginUser = async (credentials) => {
    try {
        const response = await apiClient.post(`/auth/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};
