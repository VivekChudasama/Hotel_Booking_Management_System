import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/hotels';

export const getHotelsList = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const getHotelsDetails = async () => {

}

export const addNewHotel = async () => {

}

export const updateHotel = async () => {

}

export const deleteHotel = async () => {
    
}
