const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  guestName: String,
  checkInDate: Date,
  checkOutDate: Date,
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  status: {
    type: String,
    enum: ['pending', 'checkedIn', 'checkedOut'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Reservation', reservationSchema);