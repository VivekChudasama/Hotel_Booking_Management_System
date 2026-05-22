import bookingRepository from '../repositories/bookingRepository.js';
import roomRepository from '../repositories/roomRepository.js';
import { ResponseMessages } from '../config/response_messages.js';

const createBookingService = async (bookingData) => {
    const { room_id, hotel_id, from, to } = bookingData;

    // Retrieve Room category details for snapshotting
    const room = await roomRepository.getRoomById(room_id);
    if (!room) {
        throw new Error(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND);
    }

    // Check room inventory for an available physical room of this type in this specific hotel
    const availableRoomInventory = await roomInventoryRepositories.findAvailableRoom(room_id, hotel_id);
    if (!availableRoomInventory) {
        throw new Error(ResponseMessages.booking.NO_AVAILABLE_ROOMS);
    }

    const overlappingBooking = await bookingRepository.findOverlappingBooking(room_id, from, to);
    
    if (overlappingBooking) {
        throw new Error(ResponseMessages.booking.ROOM_ALREADY_BOOKED);
    }

    // Snapshot the room details so that updates to Room don't change this booking
    bookingData.room_details = {
        room_type: room.room_type,
        room_description: room.room_description,
        price_per_night: room.price_per_night,
        room_images: room.room_images,
        amenities: room.amenities
    };

    const booking = await bookingRepository.createBooking(bookingData);

    // Update the room inventory table with the booking

    return booking;
};

const getBookingDetailsService = async (id) => {
    return await bookingRepository.getBookingById(id);
}

const updateBookingService = async (id, updateData) => {
    const booking = await bookingRepository.getBookingById(id);
    if (!booking) return null;

    if (updateData.booking_status) booking.booking_status = updateData.booking_status;
    if (updateData.check_in_date) booking.check_in_date = updateData.check_in_date;
    if (updateData.check_out_date) booking.check_out_date = updateData.check_out_date;

    await booking.save();
    return booking;
}

const cancelBookingService = async (id) => {
    const booking = await bookingRepository.getBookingById(id);
    if (!booking) {
        return null;
    }

    if (booking.booking_status === 'pending' || booking.booking_status === 'confirmed') {
        booking.booking_status = 'cancelled';
        await booking.save();

        // Release the associated room inventory
        await roomInventoryRepositories.releaseRoomInventory(booking._id);
    }
    
    return booking;
}

const getBookingHistoryService = async (userId) => {
    return await bookingRepository.getBookingsByUserId(userId)
}

const getAllUserBookingService = async () => {
    return await bookingRepository.getAllUserBookings()
}

export default {
    createBookingService,
    getBookingDetailsService,
    updateBookingService,
    cancelBookingService,
    getBookingHistoryService,
    getAllUserBookingService
}

