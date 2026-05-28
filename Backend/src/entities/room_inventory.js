import mongoose from 'mongoose';
import { Tables } from '../config/tables.js';

const roomInventorySchema = new mongoose.Schema({
    hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotels', required: true, index: true },
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Rooms', required: true, index: true },
    room_number: { type: Number, required: true },
    status: {
        type: String,
        default: 'available',
        required: true
    },
    bookings: [{
        booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Bookings' },
        from: { type: Date },
        to: { type: Date }
    }],

}, { timestamps: true });

export const RoomInventory = mongoose.model(Tables.ROOM_INVENTORY, roomInventorySchema);
