import express from 'express';

const router = express.Router();

//get hotels list
router.get('/hotels');

// add new hotel
router.post('/hotels');

//update hotel by id 
router.put('/hotels/:hotel_id');

//delete hotel by id
router.delete('/hotels/:hotel_id');

//get hotel details by id
router.get('/hotels/:hotel_id')

export default router;
