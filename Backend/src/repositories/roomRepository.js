import mongoose from 'mongoose';
import { Room } from '../entities/room.js'

const getHotelSpecificRoomsList = async (id, role) => {
    const pipeline = [
        { $match: { hotel_id: new mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: 'room_inventorys',
                localField: '_id',
                foreignField: 'room_id',
                as: 'room_inventories'
            }
        }
    ];

    if (role !== 'admin') {
        pipeline.push({
            $addFields: {
                room_inventories: {
                    $filter: {
                        input: '$room_inventories',
                        as: 'inventory',
                        cond: { $eq: ['$$inventory.status', 'available'] }
                    }
                }
            }
        });
        pipeline.push({
            $match: {
                $expr: { $gt: [{ $size: '$room_inventories' }, 0] }
            }
        });
    }

    return await Room.aggregate(pipeline);
}

const createRoom = async (roomData) => {
    const room = new Room(roomData);
    return await room.save();
}

const deleteRoomById = async (id) => {
    return await Room.findByIdAndDelete(id)
}

const getRoomById = async (id) => {
    return await Room.findById(id)
}

export default {
    getHotelSpecificRoomsList,
    createRoom,
    deleteRoomById,
    getRoomById,
}