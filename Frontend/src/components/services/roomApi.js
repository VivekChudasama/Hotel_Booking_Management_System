import apiClient from './apiClient';

export const getRoomList = async (hotelId) => {
    try {
        const response = await apiClient.get(`/rooms/${hotelId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const addNewRoom = async (hotelId, roomData) => {
    try {
        const response = await apiClient.post(`/rooms/${hotelId}/room`, roomData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

export const updateRoom = async (roomId, roomData) => {
    try {
        const response = await apiClient.put(`/rooms/${roomId}`, roomData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

export const deleteRoom = async (roomId) => {
    try {
        const response = await apiClient.delete(`/rooms/${roomId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

export const getHotelInventory = async (roomId) => {
    try {
        const response = await apiClient.get(`/rooms/inventory/${roomId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}
