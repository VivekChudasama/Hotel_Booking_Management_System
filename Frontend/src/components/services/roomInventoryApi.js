import apiClient from './apiClient';

export const deleteRoomOfRoomInventory = async (roomInventoryId) => {
    try {
        const response = await apiClient.delete(`/room_inventory/${roomInventoryId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}
