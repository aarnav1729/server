const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation'); // We'll create this model in the next step
const Room = require('../models/Room'); // Import your Room model

// Create a new reservation
router.post('/create', async (req, res) => {
    try {
      const { guestName, checkInDate, checkOutDate, roomId } = req.body;
      
      // Verify if the roomId exists
      const room = await Room.findById(roomId);
  
      if (!room) {
        return res.status(400).json({ error: 'Invalid roomId' });
      }
  
      // Create a new reservation document
      const reservation = new Reservation({
        guestName,
        checkInDate,
        checkOutDate,
        roomId,
      });
  
      // Save the reservation to the database
      await reservation.save();
  
      res.status(201).json({ message: 'Reservation created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/available-rooms', async (req, res) => {
    try {
      const { checkInDate, checkOutDate } = req.query;
      
      // Query the database to find rooms that are available for the specified date range
      const availableRooms = await Room.find({
        _id: { $nin: await getReservedRoomIds(checkInDate, checkOutDate) },
      });
  
      res.status(200).json(availableRooms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

async function getReservedRoomIds(checkInDate, checkOutDate) {
    const reservations = await Reservation.find({
      $or: [
        { checkInDate: { $lte: checkInDate }, checkOutDate: { $gte: checkInDate } },
        { checkInDate: { $lte: checkOutDate }, checkOutDate: { $gte: checkOutDate } },
      ],
    });
  
    return reservations.map((reservation) => reservation.roomId);
}

// Define a route to retrieve and list reservations
router.get('/list', async (req, res) => {
    try {
      // Fetch reservations from the database
      const reservations = await Reservation.find();
      res.status(200).json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/check-in/:reservationId', async (req, res) => {
    const { reservationId } = req.params;
    try {
      // Update the reservation's check-in status
      await Reservation.findByIdAndUpdate(reservationId, { checkedIn: true });
      res.status(200).json({ message: 'Check-in successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/check-out/:reservationId', async (req, res) => {
    const { reservationId } = req.params;
    try {
      // Update the reservation's check-out status
      await Reservation.findByIdAndUpdate(reservationId, { checkedOut: true });
      res.status(200).json({ message: 'Check-out successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Define a route to retrieve and list rooms
router.get('/rooms', async (req, res) => {
    try {
      // Fetch rooms from the database
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  

module.exports = router;