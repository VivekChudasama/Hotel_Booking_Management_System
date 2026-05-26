import mongoose from 'mongoose';
import roomRepository from '../repositories/roomRepository.js';
import { Room } from '../entities/room.js';
import { Booking } from '../entities/booking.js';
import { RoomInventory } from '../entities/room_inventory.js';
import { ResponseMessages } from '../config/response_messages.js';

const getroomListService = async (id) => {
    return await roomRepository.getHotelSpecificRoomsList(id);
};

const createRoomService = async (roomData) => {
    // Check if the room type already exists for this hotel
    const existingRoom = await Room.findOne({
        hotel_id: roomData.hotel_id,
        room_type: roomData.room_type
    });

    if (existingRoom) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            if (roomData.room_inventories && roomData.room_inventories.length > 0) {
                const roomNumbers = roomData.room_inventories.map(inv => inv.room_number);
                const duplicates = await RoomInventory.find({
                    hotel_id: roomData.hotel_id,
                    room_number: { $in: roomNumbers }
                }).session(session);

                if (roomData.room_inventories && roomData.room_inventories.length > roomData.room_count) {
                    throw new Error(`Cannot create more than ${roomData.room_count} rooms in room inventories.`);
                }

                const duplicateNumbers = duplicates.map(d => d.room_number);

                // Filter out the duplicates, only insert the NEW ones
                const newInventoriesData = roomData.room_inventories.filter(inv => !duplicateNumbers.includes(inv.room_number));

                if (newInventoriesData.length > 0) {
                    const uniqueNumbers = new Set(newInventoriesData.map(inv => inv.room_number));
                    if (uniqueNumbers.size !== newInventoriesData.length) {
                        throw new Error(ResponseMessages.room_inventory.DUPLICATE_ROOM_NUMBER_IN_ROOM_INVENTORY);
                    }

                    const inventoryData = newInventoriesData.map(inv => ({
                        ...inv,
                        hotel_id: existingRoom.hotel_id,
                        room_id: existingRoom._id
                    }));
                    await RoomInventory.insertMany(inventoryData, { session });
                }

                if (roomData.room_count && roomData.room_count > existingRoom.room_count) {
                    await Room.updateOne({ _id: existingRoom._id }, { $set: { room_count: roomData.room_count } }, { session });
                }
            }
            await session.commitTransaction();
            session.endSession();
            return await roomRepository.getRoomById(existingRoom._id);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { room_inventories, ...roomFields } = roomData;

        if (room_inventories && room_inventories.length > roomFields.room_count) {
            throw new Error(`Cannot create more than ${roomFields.room_count} rooms in room inventories.`);
        }

        // Validate unique room numbers
        if (room_inventories && room_inventories.length > 0) {
            const roomNumbers = room_inventories.map(inventories => inventories.room_number);
            const duplicates = await RoomInventory.find({
                hotel_id: roomData.hotel_id,
                room_number: { $in: roomNumbers }
            }).session(session);

            if (duplicates.length > 0) {
                const dupNumbers = duplicates.map(d => d.room_number).join(', ');
                throw new Error(`room number(s) ${dupNumbers} already exist in this hotel.`);
            }

            // Also check for duplicates within the payload itself
            const uniqueNumbers = new Set(roomNumbers);
            if (uniqueNumbers.size !== roomNumbers.length) {
                throw new Error(ResponseMessages.room_inventory.DUPLICATE_ROOM_NUMBER_IN_ROOM_INVENTORY);
            }
        }

        // Create the room
        const [savedRoom] = await Room.create([roomFields], { session });

        if (room_inventories && room_inventories.length > 0) {
            const inventoryData = room_inventories.map(inventories => ({
                ...inventories,
                hotel_id: savedRoom.hotel_id,
                room_id: savedRoom._id
            }));
            await RoomInventory.insertMany(inventoryData, { session });
        }

        await session.commitTransaction();
        session.endSession();

        return savedRoom;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

const updateRoomService = async (id, updateRoomData) => {
    const existingRoom = await roomRepository.getRoomById(id);

    if (!existingRoom) {
        throw new Error(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND);
    }

    const { room_inventories, ...roomFields } = updateRoomData;

    if (roomFields.room_count !== undefined) {
        const currentCount = await RoomInventory.countDocuments({ room_id: id });
        if (roomFields.room_count < currentCount) {
            throw new Error(`Cannot decrease room_count below the current inventory count (${currentCount}).`);
        }
    }

    if (Object.keys(roomFields).length > 0) {
        await Room.updateOne({ _id: id }, { $set: roomFields });
    }

    if (room_inventories && Array.isArray(room_inventories)) {
        const roomNumbers = room_inventories.map(inv => inv.room_number).filter(Boolean);
        const existingInventories = await RoomInventory.find({
            hotel_id: existingRoom.hotel_id,
            room_number: { $in: roomNumbers }
        });

        const inventoryUpdateOperations = [];
        const newInventories = [];

        for (const inv of room_inventories) {
            if (!inv.room_number) continue;
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

        if (inventoryUpdateOperations.length > 0) {
            await RoomInventory.bulkWrite(inventoryUpdateOperations);
        }

        if (newInventories.length > 0) {
            await RoomInventory.insertMany(newInventories);
        }
    }

    return await roomRepository.getRoomById(id);
};

const deleteRoomService = async (id) => {
    const existingRoom = await roomRepository.getRoomById(id);

    if (!existingRoom) {
        throw new Error(ResponseMessages.room.HOTEL_ROOM_NOT_FOUND);
    }

    // Check if there are active bookings for this specific room
    const activeBookings = await Booking.find({
        room_id: id,
        booking_status: { $in: ['pending', 'confirmed', 'checked in'] }
    });

    if (activeBookings.length > 0) {
        throw new Error(ResponseMessages.room.ACTIVE_BOOKINGS_EXIST);
    }

    // Delete associated room inventory entries
    await RoomInventory.deleteMany({ room_id: id });

    return await Room.findOneAndDelete({ _id: id });
}

export default {
    getroomListService,
    createRoomService,
    updateRoomService,
    deleteRoomService
}