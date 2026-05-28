import { Hotel } from '../entities/hotel.js';

//get hotel list
const getHotelList = async () => {
    return await Hotel.find();
};

//create hotel
const createHotel = async (hotelData) => {
    const hotel = new Hotel(hotelData);
    return await hotel.save();
};

//get hotel by id
const getHotelById = async (id) => {
    return await Hotel.findById(id);
};

//get hotel by email to validate email is already user by other hotel or not
const getHotelByEmail = async (email) => {
    return await Hotel.findOne({ email });
};

//get hotel by phone_number to validate phone_number is already user by other hotel or not
const getHotelByPhone = async (phone_number) => {
    return await Hotel.findOne({ phone_number });
};

//update hotel by id
const updateHotelById = async (id, updateHotelData) => {
    return await Hotel.findByIdAndUpdate(id, updateHotelData, { new: true });
};

//delete hotel by id
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