import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    roomType: { type: String, required: true },
    room_description: { type: String, required: true },
    amenities: { type: String, required: true },
    price_per_night: { type: Number, required: true },
    room_capacity: {
        adult_count: { type: Number, required: true },
        children_count: { type: Number, required: true }
    },
    images: [{ type: String }],
    roomCount: { type: Number, required: true }
}, { timestamps: true });

export const Room = mongoose.model('Rooms', roomSchema);
