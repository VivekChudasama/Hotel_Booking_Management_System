import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    guests: {
        adultCount: { type: Number, required: true },
        childCount: { type: Number, default: 0 }
    },
    from: { type: Date, required: true },
    to: { type: Date, required: true }, 
    checkInDate: { type: Date, default: null},
    checkOutDate: { type: Date, default: null},
    totalAmount: { type: Number, required: true },
    booking_status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'checked in', 'checked out'], default: 'pending' }
}, { timestamps: true });

export const Booking = mongoose.model('Bookings', bookingSchema);
