import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/users';

export const getUserData = async (userData) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/:user_id`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }   
};

export const updateUserData = async (updatedUserData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/:user_id`, updatedUserData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

