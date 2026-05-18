import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns'

dns.setServers(['8.8.8.8', '8.8.4.4']); // Fix for DNS blocking MongoDB SRV lookups

dotenv.config();
 
export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}; 
 