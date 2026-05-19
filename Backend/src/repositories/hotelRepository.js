import { Hotel } from '../entities/hotel.js';

const getHotelList = async () => {
    return await Hotel.find();
};

const createHotel = async (hotelData) => {
    const hotel = new Hotel(hotelData);
    return await hotel.save();
};

const getHotelById = async (id) => {
    return await Hotel.findById(id);
};

const getHotelByEmail = async (email) => {
    return await Hotel.findOne({ email });
};

const getHotelByPhone = async (phone_number) => {
    return await Hotel.findOne({ phone_number });
};

const updateHotelById = async (id, updateHotelData) => {
    return await Hotel.findByIdAndUpdate(id, updateHotelData, { useFindAndModify: true });
};

const deleteHotelById = async (id) => {
    return await Hotel.findByIdAndDelete(id);
};

export default {
    getHotelList,
    createHotel,
    getHotelById,
    getHotelByEmail,
    getHotelByPhone,
    updateHotelById,
    deleteHotelById
}