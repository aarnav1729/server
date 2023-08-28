import React from 'react';
import ReservationForm from './ReservationForm'; // Import your custom ReservationForm component
import ReservationList from './ReservationList';

function App() {
  return (
    <div className="App">
      <ReservationForm /> {/* Render your ReservationForm component */}
      <ReservationList />
    </div>
  );
}

export default App;