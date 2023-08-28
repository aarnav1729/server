const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  roomType: { type: String, required: true },
  // Add more room details here as needed
});

module.exports = mongoose.model('Room', roomSchema);