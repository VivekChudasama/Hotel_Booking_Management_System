import mongoose from 'mongoose';
import { Tables } from '../config/tables.js';

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    images: [{ type: String }]
}, { timestamps: true });

// Handle duplicate key errors
hotelSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    next(new Error(`${field} already exists`));
  } else {
    next(error);
  }
});

export const Hotel = mongoose.model(Tables.HOTEL, hotelSchema);
