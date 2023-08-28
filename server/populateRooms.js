const mongoose = require('mongoose');
const Room = require('./models/Room'); // Import your Room model
const mongoURI = 'mongodb+srv://aarrated:8kJgRcHbS18qbUcd@rr.oldse8x.mongodb.net/?retryWrites=true&w=majority';

// Connect to your MongoDB database (replace with your actual MongoDB URI)
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });  

// Example data to insert
const roomsData = [
    { roomNumber: '101', roomType: 'AC' },
    { roomNumber: '102', roomType: 'AC' },
    { roomNumber: '103', roomType: 'AC' },
    { roomNumber: '104', roomType: 'AC' },
    { roomNumber: '105', roomType: 'AC' },
    { roomNumber: '106', roomType: 'AC' },
    { roomNumber: '107', roomType: 'AC' },
    { roomNumber: '108', roomType: 'AC' },
    { roomNumber: '109', roomType: 'AC' },
    { roomNumber: '110', roomType: 'AC' },
    { roomNumber: '111', roomType: 'AC' },
    { roomNumber: '112', roomType: 'AC' },
    { roomNumber: '113', roomType: 'AC' },
    { roomNumber: '114', roomType: 'AC' },
    { roomNumber: '115', roomType: 'AC' },
    { roomNumber: '116', roomType: 'AC' },
    { roomNumber: '117', roomType: 'AC' },
    { roomNumber: '118', roomType: 'AC' },
    { roomNumber: '119', roomType: 'AC' },
    { roomNumber: '201', roomType: 'Non-AC' },
    { roomNumber: '202', roomType: 'Non-AC' },
    { roomNumber: '203', roomType: 'Non-AC' },
    { roomNumber: '204', roomType: 'Non-AC' },
    { roomNumber: '205', roomType: 'Non-AC' },
    { roomNumber: '206', roomType: 'Non-AC' },
    { roomNumber: '207', roomType: 'Non-AC' },
    { roomNumber: '208', roomType: 'Non-AC' },
    { roomNumber: '209', roomType: 'Non-AC' },
    { roomNumber: '210', roomType: 'Non-AC' },
    { roomNumber: '211', roomType: 'Non-AC' },
    { roomNumber: '212', roomType: 'Non-AC' },
    { roomNumber: '213', roomType: 'Non-AC' },
    { roomNumber: '214', roomType: 'Non-AC' },
    { roomNumber: '215', roomType: 'Non-AC' },
    { roomNumber: '216', roomType: 'Non-AC' },
    { roomNumber: '217', roomType: 'Non-AC' },
    { roomNumber: '218', roomType: 'Non-AC' },
    { roomNumber: '219', roomType: 'Non-AC' },
    { roomNumber: '220', roomType: 'Non-AC' },
    { roomNumber: '221', roomType: 'Non-AC' },
    { roomNumber: '222', roomType: 'Non-AC' },
    { roomNumber: '223', roomType: 'Non-AC' },
    { roomNumber: '301', roomType: 'Non-AC' },
    { roomNumber: '302', roomType: 'Non-AC' },
    { roomNumber: '303', roomType: 'Non-AC' },
    { roomNumber: '304', roomType: 'Non-AC' },
    { roomNumber: '305', roomType: 'Non-AC' },
    { roomNumber: '306', roomType: 'Non-AC' },
    { roomNumber: '307', roomType: 'Non-AC' },
    { roomNumber: '308', roomType: 'Non-AC' },
    { roomNumber: '309', roomType: 'Non-AC' },
    { roomNumber: '310', roomType: 'Non-AC' },
    { roomNumber: '311', roomType: 'Non-AC' },
    { roomNumber: '312', roomType: 'Non-AC' },
    { roomNumber: '313', roomType: 'Non-AC' },
    { roomNumber: '314', roomType: 'Non-AC' },
    { roomNumber: '315', roomType: 'Non-AC' },
    { roomNumber: '316', roomType: 'Non-AC' },
    { roomNumber: '317', roomType: 'Non-AC' },
    { roomNumber: '318', roomType: 'Non-AC' },
    { roomNumber: '319', roomType: 'Non-AC' },
    { roomNumber: '320', roomType: 'Non-AC' },
    { roomNumber: '321', roomType: 'Non-AC' },
    { roomNumber: '322', roomType: 'Non-AC' },
    { roomNumber: '323', roomType: 'Non-AC' },
  // Add more rooms as needed
];

// Insert the data into the rooms collection
Room.insertMany(roomsData)
  .then(() => {
    console.log('Rooms inserted successfully');
  })
  .catch((error) => {
    console.error('Error inserting rooms:', error);
  })
  .finally(() => {
    // Close the database connection when done
    mongoose.connection.close();
  });