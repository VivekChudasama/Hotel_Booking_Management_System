import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    images: [{ type: String }]
}, { timestamps: true });

export const Hotel = mongoose.model('Hotels', hotelSchema);
