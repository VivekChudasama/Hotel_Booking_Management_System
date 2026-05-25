import hotelRepository from '../repositories/hotelRepository.js';
import { ResponseMessages } from '../config/response_messages.js'
import { Booking } from '../entities/booking.js';
import roomRepository from '../repositories/roomRepository.js';

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
        if (hotelWihSameEmail && hotelWihSameEmail._id.toString() !== id.toString()) {
                throw new Error(ResponseMessages.hotel.EMAIL_ALREADY_EXISTS);
            }
    }
 
    //check updated phone_number is used by any other hotel while updating 
    if (updateHotelData.phone_number) {
        const hotelWihSamePhone = await hotelRepository.getHotelByPhone(updateHotelData.phone_number);
        if (hotelWihSamePhone && hotelWihSamePhone._id.toString() !== id.toString()) {
                throw new Error(ResponseMessages.hotel.PHONE_NUMBER_EXISTS);
        }
    }
 
    return await hotelRepository.updateHotelById(id, updateHotelData);
};

const deleteHotelService = async (id) => {
    const existingHotel = await hotelRepository.getHotelById(id);
    if (!existingHotel) {
        throw new Error(ResponseMessages.hotel.HOTEL_NOT_FOUND);
    }

    // Find all rooms for the specific hotel
    const rooms = await roomRepository.getHotelSpecificRoomsList(id);
    const roomIds = rooms?.map(room => room._id) || [];

    // Check if there are active bookings for the rooms
    if (roomIds.length > 0) {
        const activeBookings = await Booking.find({
            room_id: { $in: roomIds },
            booking_status: { $in: ['pending', 'confirmed', 'checked in'] }
        });

        if (activeBookings.length > 0) {
            throw new Error(ResponseMessages.hotel.ACTIVE_BOOKINGS_EXIST);
        }
    }

    return await hotelRepository.deleteHotelById(id);
};
 
export default {
    getHotelListService,
    createHotelService,
    getHotelDetailsService,
    updateHotelService,
    deleteHotelService
}