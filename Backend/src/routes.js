import express from 'express';
import cors from 'cors';

import bookingRoutes from './routes/bookingRoutes.js';
import authRoutes from './routes/authRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());

// Middleware to parse request body 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/hotels', hotelRoutes);
app.use('/Booking', bookingRoutes);
app.use('/rooms', roomRoutes);

export default app;
