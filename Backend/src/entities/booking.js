import mongoose from 'mongoose';
import { Tables } from '../config/tables.js';

const bookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true, index: true },
    room_inventory_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room_Inventorys', index: true }],
    guests: {
        adult_count: { type: Number, required: true },
        child_count: { type: Number, default: 0 }
    },
    from: { type: Date, required: true, index: true },
    to: { type: Date, required: true, index: true },
    check_in_date: { type: Date, default: null },
    check_out_date: { type: Date, default: null },
    total_amount: { type: Number, required: true },
    booking_status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'checked in', 'checked out'],
        default: 'pending',
        required: true,
        index: true
    }
}, { timestamps: true });

bookingSchema.index({ room_inventory_ids: 1, booking_status: 1, from: 1, to: 1 });

export const Booking = mongoose.models[Tables.BOOKING] || mongoose.model(Tables.BOOKING, bookingSchema);
