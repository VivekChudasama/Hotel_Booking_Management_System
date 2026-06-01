import hotelRepository from '../repositories/hotelRepository.js';
import { ResponseMessages } from '../config/response_messages.js'
import { Booking } from '../entities/booking.js';
import roomRepository from '../repositories/roomRepository.js';
import { RoomInventory } from '../entities/room_inventory.js';
import { Room } from '../entities/room.js';

const getHotelListService = async (query = {}) => {
    return await hotelRepository.getHotelList(query);
};

const createHotelService = async (hotelData) => {
    return await hotelRepository.createHotel(hotelData);
};

const getHotelDetailsService = async (id) => {
    const hotel = await hotelRepository.getHotelById(id)

    if (!hotel) {
        throw new Error(ResponseMessages.hotel.HOTEL_NOT_FOUND)
    }
    return hotel;
};

const updateHotelService = async (id, updateHotelData) => {
    const existingHotel = await hotelRepository.getHotelById(id);

    if (!existingHotel) {
        throw new Error(ResponseMessages.hotel.HOTEL_NOT_FOUND)
    }

    //check updated email is used by any other hotel while updating
    if (updateHotelData.email) {
        const hotelWithSameEmail = await hotelRepository.getHotelByEmail(updateHotelData.email);
        if (hotelWithSameEmail && hotelWithSameEmail._id.toString() !== id.toString()) {
            throw new Error(ResponseMessages.hotel.EMAIL_ALREADY_EXISTS);
        }
    }

    //check updated phone_number is used by any other hotel while updating
    if (updateHotelData.phone_number) {
        const hotelWithSamePhone = await hotelRepository.getHotelByPhone(updateHotelData.phone_number);
        if (hotelWithSamePhone && hotelWithSamePhone._id.toString() !== id.toString()) {
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

    // Check if there are active bookings for the hotel's rooms
    const inventories = await RoomInventory.find({ hotel_id: id }).select('_id');
    const inventoryIds = inventories.map(inv => inv._id);

    if (inventoryIds.length > 0) {
        const hasActiveBookings = await Booking.exists({
            room_inventory_ids: { $in: inventoryIds },
            booking_status: { $in: ['pending', 'confirmed', 'checked in'] }
        });

        if (hasActiveBookings) {
            throw new Error(ResponseMessages.hotel.ACTIVE_BOOKINGS_EXIST);
        }
    }

    await Room.deleteMany({ hotel_id: id });
    await RoomInventory.deleteMany({ hotel_id: id });
    return await hotelRepository.deleteHotelById(id);
};

export default {
    getHotelListService,
    createHotelService,
    getHotelDetailsService,
    updateHotelService,
    deleteHotelService
}