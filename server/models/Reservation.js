const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', // Reference to the Room model
  },
  checkedIn: {
    type: Boolean,
    default: false, // Initially, the reservation is not checked in
  },
  checkedOut: {
    type: Boolean,
    default: false, // Initially, the reservation is not checked out
  },
});

module.exports = mongoose.model('Reservation', reservationSchema);