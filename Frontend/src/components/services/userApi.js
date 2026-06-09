import apiClient from './apiClient';

export const getUserData = async (userId) => {
    try {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }   
};

export const updateUserData = async (userId, updatedUserData) => {
    try {
        const response = await apiClient.put(`/users/${userId}`, updatedUserData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};
