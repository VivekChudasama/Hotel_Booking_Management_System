import hotelRepository from '../repositories/hotelRepository.js';
import { ResponseMessages } from '../config/response_messages.js'

const getHotelListService = async () => {
    return await hotelRepository.getHotelList();
};

const createHotelService = async (hotelData) => {
    return await hotelRepository.createHotel(hotelData);
};

const getHotelDetailsService = async (id) => {
    return await hotelRepository.getHotelById(id);
};

const updateHotelService = async (id, updateHotelData) => {
    const existingHotel = await hotelRepository.getHotelById(id);

    if (!existingHotel) {
        throw new Error(ResponseMessages.hotel.HOTEL_NOT_FOUND)
    }

    //check updated email is used by any other user while updaing 
    if (updateHotelData.email) {
        const hotelWihSameEmail = await hotelRepository.getHotelByEmail(updateHotelData.email);
        if (hotelWihSameEmail && hotelWihSameEmail._id.toString() !== id) {
            throw new Error(ResponseMessages.hotel.USER_EMAIL_ALREADY_EXISTS);
        }
    }

    return await hotelRepository.updateHotelById(id, updateHotelData);
};

const deleteHotelService = async (id) => {
    return await hotelRepository.deleteHotelById(id);
};

export default {
    getHotelListService,
    createHotelService,
    getHotelDetailsService,
    updateHotelService,
    deleteHotelService
}