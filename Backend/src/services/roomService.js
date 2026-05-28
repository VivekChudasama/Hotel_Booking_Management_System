import mongoose from 'mongoose';
import roomRepository from '../repositories/roomRepository.js';
import { Room } from '../entities/room.js';
import { Booking } from '../entities/booking.js';
import { RoomInventory } from '../entities/room_inventory.js';
import { ResponseMessages } from '../config/response_messages.js';

const getroomListService = async (id, role) => {
    return await roomRepository.getHotelSpecificRoomsList(id, role);
};

// Creates a new room or updates the room count if the room type already exists.

const createRoomService = async (roomData) => {
    const { room_inventories, hotel_id, room_type, ...roomFields } = roomData;

    // Validate inventories before initiating DB transactions
    if (room_inventories && room_inventories.length > 0) {
        if (roomData.room_count && room_inventories.length > roomData.room_count) {
            throw new Error(`Cannot create more than ${roomData.room_count} rooms in room inventories.`);
        }

        const roomNumbers = room_inventories.map(inv => inv.room_number);
        const uniqueNumbers = new Set(roomNumbers);
        if (uniqueNumbers.size !== roomNumbers.length) {
            throw new Error(ResponseMessages.room_inventory.DUPLICATE_ROOM_NUMBER_IN_ROOM_INVENTORY);
        }

        const duplicates = await RoomInventory.find({
            hotel_id: hotel_id,
            room_number: { $in: roomNumbers }
        });

        if (duplicates.length > 0) {
            const dupNumbers = duplicates.map(d => d.room_number).join(', ');
            throw new Error(`room number(s) ${dupNumbers} already exist in this hotel.`);
        }
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find existing room or create a new one
        let room = await Room.findOne({ hotel_id, room_type }).session(session);

        if (room) {
            // Update existing room's capacity if needed
            if (roomData.room_count && roomData.room_count > room.room_count) {
                room.room_count = roomData.room_count;
                await room.save({ session });
            }
        } else {
            // Create a new room
            const newRoomData = { hotel_id, room_type, ...roomFields, room_count: roomData.room_count };
            const [savedRoom] = await Room.create([newRoomData], { session });
            room = savedRoom;
        }

        // Insert the room inventories
        if (room_inventories && room_inventories.length > 0) {
            const inventoryData = room_inventories.map(inv => ({
                ...inv,
                hotel_id: room.hotel_id,
                room_id: room._id
            }));
            await RoomInventory.insertMany(inventoryData, { session });
        }

        await session.commitTransaction();
        session.endSession();

        return await roomRepository.getRoomById(room._id);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// Updates an existing room's details and manages its inventories.

const updateRoomService = async (id, updateRoomData) => {
    const existingRoom = await roomRepository.getRoomById(id);
    if (!existingRoom) {
        throw new Error(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND);
    }

    const { room_inventories, ...roomFields } = updateRoomData;

    // Validate room count logic
    if (roomFields.room_count !== undefined) {
        const currentCount = await RoomInventory.countDocuments({ room_id: id });
        if (roomFields.room_count < currentCount) {
            throw new Error(`Cannot decrease room_count below the current inventory count (${currentCount}).`);
        }
    }

    // Update room fields
    if (Object.keys(roomFields).length > 0) {
        await Room.updateOne({ _id: id }, { $set: roomFields });
    }

    // Process room inventories
    if (room_inventories && Array.isArray(room_inventories)) {
        const inventoryUpdateOperations = [];
        const newInventories = [];

        // Fetch existing inventories in bulk 
        const newRoomNumbers = room_inventories
            .filter(inv => !inv.room_inventory_id && inv.room_number)
            .map(inv => inv.room_number);

        const existingInventories = newRoomNumbers.length > 0
            ? await RoomInventory.find({ hotel_id: existingRoom.hotel_id, room_number: { $in: newRoomNumbers } })
            : [];

        for (const inv of room_inventories) {
            // Find the inventory ID from possible aliases
            const inventoryId = inv.room_inventory_id || inv.Room_inventory_id || inv._id || inv.id;

            if (inventoryId) {
                // Update specific existing inventory item by inventory ID
                const { room_inventory_id, Room_inventory_id, _id, id, ...updateFields } = inv;
                inventoryUpdateOperations.push({
                    updateOne: {
                        filter: { _id: inventoryId },
                        update: { $set: updateFields }
                    }
                });
            } else if (inv.room_number) {
                // Check if the inventory already exists by room number
                const existing = existingInventories.find(e => e.room_number === inv.room_number);

                if (existing) {
                    inventoryUpdateOperations.push({
                        updateOne: {
                            filter: { _id: existing._id },
                            update: { $set: inv }
                        }
                    });
                } else {
                    newInventories.push({
                        ...inv,
                        hotel_id: existingRoom.hotel_id,
                        room_id: existingRoom._id
                    });
                }
            }
        }

        if (inventoryUpdateOperations.length > 0) {
            await RoomInventory.bulkWrite(inventoryUpdateOperations);
        }

        if (newInventories.length > 0) {
            await RoomInventory.insertMany(newInventories);
        }
    }

    return await roomRepository.getRoomById(id);
};

/*
Deletes a room and its associated inventories, ensuring no active bookings exist.
 */
const deleteRoomService = async (id) => {
    const existingRoom = await roomRepository.getRoomById(id);
    if (!existingRoom) {
        throw new Error(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND);
    }

    // Verify no active bookings exist for this room
    const inventories = await RoomInventory.find({ room_id: id }).select('_id');
    const inventoryIds = inventories.map(inv => inv._id);

    const activeBookings = await Booking.find({
        room_inventory_id: { $in: inventoryIds },
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] }
    });

    if (activeBookings.length > 0) {
        throw new Error(ResponseMessages.room.ACTIVE_BOOKINGS_EXIST);
    }

    // Safely delete inventories and the room
    await RoomInventory.deleteMany({ room_id: id });
    return await Room.findOneAndDelete({ _id: id });
}

export default {
    getroomListService,
    createRoomService,
    updateRoomService,
    deleteRoomService
};