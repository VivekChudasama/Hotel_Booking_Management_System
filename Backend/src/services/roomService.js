import mongoose from 'mongoose';
import roomRepository from '../repositories/roomRepository.js';
import bookingRepository from '../repositories/bookingRepository.js';
import { Room } from '../entities/room.js';
import { Booking } from '../entities/booking.js';
import { RoomInventory } from '../entities/room_inventory.js';
import { ResponseMessages } from '../config/response_messages.js';

const getRoomListService = async (id, role, query = {}) => {
    let bookedInventoryIds = [];
    if (query.from && query.to) {
        bookedInventoryIds = await bookingRepository.getBookedInventoryIdsForHotelDates(id, query.from, query.to);
    }
    return await roomRepository.getHotelSpecificRoomsList(id, role, query, bookedInventoryIds);
};

// Creates a new room or update room if the room type already exists.
const createRoomService = async (roomData) => {
    const { room_inventories, hotel_id, room_type, ...roomFields } = roomData;

    // Validate inventories before initiating DB transactions
    if (room_inventories && room_inventories.length > 0) {
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
        // Check if this room type already exists in the hotel
        let room = await Room.findOne({ hotel_id, room_type }).session(session);

        if (room) {
            // if Room type already exists then update room_count and append new inventories
            const currentInventoryCount = await RoomInventory.countDocuments({ room_id: room._id }).session(session);
            const newInventoryCount = (room_inventories && room_inventories.length) || 0;
            const updatedRoomCount = room.room_count + (roomData.room_count || 0);

            // Ensure total inventories won't exceed updated room_count
            if (currentInventoryCount + newInventoryCount > updatedRoomCount) {
                throw new Error(`Total room inventories (${currentInventoryCount + newInventoryCount}) cannot exceed room count (${updatedRoomCount}).`);
            }

            // Update room_count on the existing room
            await Room.updateOne(
                { _id: room._id },
                { $set: { room_count: updatedRoomCount } }
            ).session(session);

            // Insert the new room inventories
            if (room_inventories && room_inventories.length > 0) {
                const inventoryData = room_inventories.map(inv => ({
                    ...inv,
                    hotel_id: room.hotel_id,
                    room_id: room._id
                }));
                await RoomInventory.insertMany(inventoryData, { session });
            }
        } else {
            // Room type does not exist so create a new room
            if (room_inventories && room_inventories.length > 0) {
                if (roomData.room_count && room_inventories.length > roomData.room_count) {
                    throw new Error(`Cannot create more than ${roomData.room_count} rooms in room inventories.`);
                }
            }

            const newRoomData = { hotel_id, room_type, ...roomFields, room_count: roomData.room_count };
            const [savedRoom] = await Room.create([newRoomData], { session });
            room = savedRoom;

            // Insert the room inventories
            if (room_inventories && room_inventories.length > 0) {
                const inventoryData = room_inventories.map(inv => ({
                    ...inv,
                    hotel_id: room.hotel_id,
                    room_id: room._id
                }));
                await RoomInventory.insertMany(inventoryData, { session });
            }
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

        // Fetch existing inventories
        const newRoomNumbers = room_inventories
            .filter(inv => !inv.room_inventory_id && inv.room_number)
            .map(inv => inv.room_number);

        const existingInventories = newRoomNumbers.length > 0
            ? await RoomInventory.find({ hotel_id: existingRoom.hotel_id, room_number: { $in: newRoomNumbers } })
            : [];

        for (const inv of room_inventories) {
            // Find the inventory ID for update operations
            const inventoryId = inv.room_inventory_id;

            if (inventoryId) {
                // Update specific existing inventory item by inventory ID
                const { room_inventory_id, ...updateFields } = inv;
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

// Deletes a room and its associated inventories, ensuring no active bookings exist.

const deleteRoomService = async (id) => {
    const existingRoom = await roomRepository.getRoomById(id);
    if (!existingRoom) {
        throw new Error(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND);
    }

    // Verify no active bookings exist for this room
    const inventories = await RoomInventory.find({ room_id: id }).select('_id');
    const inventoryIds = inventories.map(inv => inv._id);

    const hasActiveBookings = await Booking.exists({
        room_inventory_ids: { $in: inventoryIds },
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] }
    });

    if (hasActiveBookings) {
        throw new Error(ResponseMessages.room.ACTIVE_BOOKINGS_EXIST);
    }

    // delete inventories and the room
    await RoomInventory.deleteMany({ room_id: id });
    return await Room.findOneAndDelete({ _id: id });
}

export default {
    getRoomListService,
    createRoomService,
    updateRoomService,
    deleteRoomService
};