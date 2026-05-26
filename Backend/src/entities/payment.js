import mongoose from 'mongoose';
import { Tables } from '../config/tables.js';

const paymentSchema = new mongoose.Schema({
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Bookings', required: true, index: true },
    amount: { type: Number, required: true },
    payment_date: { type: Date, default: Date.now },
    payment_method: { type: String, required: true },
    payment_status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
        required: true
    }
}, { timestamps: true });

export const Payment = mongoose.model(Tables.PAYMENT, paymentSchema);
