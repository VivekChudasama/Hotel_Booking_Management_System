import mongoose from 'mongoose';
import { Tables } from '../config/tables.js';

const roomSchema = new mongoose.Schema({
    hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    room_type: { type: String, required: true },
    room_description: { type: String, required: true },
    amenities: { type: [String], required: true },
    price_per_night: { type: Number, required: true },
    room_capacity: {
        adult_count: { type: Number, required: true },
        children_count: { type: Number, required: true }
    },
    room_images: [{ type: String }],
    roomCount: { type: Number, required: true }
}, { timestamps: true });

export const Room = mongoose.model(Tables.ROOM, roomSchema);
