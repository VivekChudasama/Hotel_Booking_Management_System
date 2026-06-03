import { Hotel } from '../entities/hotel.js';

const getHotelList = async (query = {}, availableHotelIds = null) => {
    const filter = {};
    if (query.city) {
        filter.city = { $regex: query.city, $options: 'i' };
    }
    if (query.name) {
        filter.name = { $regex: query.name, $options: 'i' };
    }
    if (availableHotelIds !== null) {
        filter._id = { $in: availableHotelIds };
    }
    return await Hotel.find(filter);
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

//find hotel by name , city , address
const findHotelByNameCityAddress = async (name, city, address) => {
    return await Hotel.findOne({
        name: { $regex: name, $options: 'i' },
        city: { $regex: city, $options: 'i' },
        address: { $regex: address, $options: 'i' }
    });
};

//find hotel by email to validate email is already used by other hotel or not
const findHotelByEmail = async (email) => {
    return await Hotel.findOne({ email });
};

//find hotel by phone_number to validate phone_number is already used by other hotel or not
const findHotelByPhone = async (phone_number) => {
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
    findHotelByNameCityAddress,
    findHotelByEmail,
    findHotelByPhone,
    updateHotelById,
    deleteHotelById
}