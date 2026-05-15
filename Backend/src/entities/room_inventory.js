import mongoose from 'mongoose';

const roomInventorySchema = new mongoose.Schema({
    hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    room_number: {type: Number, required: true},
    status: { type: String, enum: ['available', 'occupied'], default: 'available' },
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },

}, { timestamps: true });

export const Room = mongoose.model('Room_Inventorys', roomInventorySchema);
