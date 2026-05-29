import mongoose from 'mongoose';
import { Room } from '../entities/room.js'

const getHotelSpecificRoomsList = async (id, role, query = {}, bookedInventoryIds = []) => {
    const pipeline = [
        { $match: { hotel_id: new mongoose.Types.ObjectId(id) } }
    ];

    if (query.min_price || query.max_price) {
        const priceFilter = {};
        if (query.min_price) priceFilter.$gte = Number(query.min_price);
        if (query.max_price) priceFilter.$lte = Number(query.max_price);
        pipeline[0].$match.price_per_night = priceFilter;
    }

    pipeline.push({
        $lookup: {
            from: 'room_inventorys',
            localField: '_id',
            foreignField: 'room_id',
            as: 'room_inventories'
        }
    });

    const inventoryFilterConditions = [];
    if (role !== 'admin') {
         inventoryFilterConditions.push({ $eq: ['$$inventory.status', 'available'] });
    }
    
    if (bookedInventoryIds && bookedInventoryIds.length > 0) {
         const bookedObjectIds = bookedInventoryIds.map(bId => new mongoose.Types.ObjectId(bId));
         inventoryFilterConditions.push({ $not: { $in: ['$$inventory._id', bookedObjectIds] } });
    }

    if (inventoryFilterConditions.length > 0) {
        pipeline.push({
            $addFields: {
                room_inventories: {
                    $filter: {
                        input: '$room_inventories',
                        as: 'inventory',
                        cond: { $and: inventoryFilterConditions }
                    }
                }
            }
        });
        
        // For customers or if dates are provided, exclude rooms with no available inventory
        pipeline.push({
            $match: {
                $expr: { $gt: [{ $size: '$room_inventories' }, 0] }
            }
        });
    }

    if (query.sort_price) {
        pipeline.push({ $sort: { price_per_night: query.sort_price === 'desc' ? -1 : 1 } });
    }

    if (role !== 'admin') {
        pipeline.push({
            $project: {
                "room_inventories.bookings": 0
            }
        });
    }

    return await Room.aggregate(pipeline);
}

const createRoom = async (roomData) => {
    const room = new Room(roomData);
    return await room.save();
}

const getRoomById = async (id) => {
    return await Room.findById(id)
}

const getRoomsByIds = async (ids) => {
    return await Room.find({ _id: { $in: ids } })
}


export default {
    getHotelSpecificRoomsList,
    createRoom,
    getRoomById,
    getRoomsByIds,
}