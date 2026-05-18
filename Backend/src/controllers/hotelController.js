import hotelService from '../services/hotelService.js';
import { Constants } from '../config/constants.js';
import { ResponseMessages } from '../config/response_messages.js';
import mongoose from 'mongoose';

const getHotelList = async (req, res) => {
    try {
        const hotelList = await hotelService.getHotelListService();
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(hotelList);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
}

const createHotel = async (req, res) => {
    try {
        const savedHotel = await hotelService.createHotelService(req.body);
        res.status(Constants.RESPONSE_STATUS_CODE.CREATED_SUCCESS_CODE).json(savedHotel);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
}

const getHotelDetails = async (req, res) => {
    try {
        const hotel_id = req.params.hotel_id;
        const hotel = await hotelService.getHotelDetailsService({ "_id": new mongoose.Types.ObjectId(hotel_id) });
        if (!hotel) return res.status(Constants.RESPONSE_STATUS_CODE.NOT_FOUND_CODE).json({ message: ResponseMessages.hotel.HOTEL_NOT_FOUND })
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(hotel);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
}

const updateHotel = async (req, res) => {
    try {
        const hotel_id = req.params.hotel_id;
        const updateHotelData = req.body
        const hotel = await hotelService.updateHotelService({ "_id": new mongoose.Types.ObjectId(hotel_id) } , updateHotelData);
        if (!hotel) return res.status(Constants.RESPONSE_STATUS_CODE.NOT_FOUND_CODE).json({ message: ResponseMessages.hotel.HOTEL_NOT_FOUND })
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(hotel);
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
}

const deleteHotel = async (req, res) => {
    try {
        const hotel_id = req.params.hotel_id;
        const hotel = await hotelService.deleteHotelService({ "_id": new mongoose.Types.ObjectId(hotel_id) });
        if (!hotel) return res.status(Constants.RESPONSE_STATUS_CODE.NOT_FOUND_CODE).json({ message: ResponseMessages.hotel.HOTEL_NOT_FOUND })
        res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json({ message: ResponseMessages.hotel.HOTEL_DELETED_SUCCESSFULLY })
    } catch (error) {
        res.status(Constants.RESPONSE_STATUS_CODE.FAIL_CODE).json({ message: error.message });
    }
}

export default {
    getHotelList,
    createHotel,
    getHotelDetails,
    updateHotel,
    deleteHotel
}