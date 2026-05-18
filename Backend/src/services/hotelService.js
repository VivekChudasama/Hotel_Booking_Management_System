import hotelRepository from '../repositories/hotelRepository.js';

const getHotelListService = async() => {
    return await hotelRepository.getHotelList;
};

const createHotelService = async(hotelData) => {
    return await hotelRepository.createHotel(hotelData);
};

const getHotelDetailsService = async(id) => {
    return await hotelRepository.getHotelById(id);
};

const updateHotelService = async(id) => {
    return await hotelRepository.updateHotelById(id);
};

const deleteHotelService = async(id) => {
    return await hotelRepository.deleteHotelById(id);
};

export default {
    getHotelListService,
    createHotelService,
    getHotelDetailsService,
    updateHotelService,
    deleteHotelService
}