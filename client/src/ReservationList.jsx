import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationList.css'

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/reservations/list');
        console.log(response.data);
        setReservations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await axios.get('/reservations/rooms'); // Use the correct route
        setRooms(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservations();
    fetchRooms();
  }, []);

  // Function to determine if a room is empty or booked
  const getRoomStatus = (roomId) => {
    const room = rooms.find((room) => room._id === roomId);
    return room ? room.roomNumber : 'Unknown';
  };

  // Function to format date to display only date (YYYY-MM-DD)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
   };

   return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reservation List</h2>
      <div className="bg-white shadow-md rounded p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Guest Name</th>
              <th className="border border-gray-300 p-2">Room</th>
              <th className="border border-gray-300 p-2">Check-In</th>
              <th className="border border-gray-300 p-2">Check-Out</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td className="border border-gray-300 p-2">
                  {reservation.guestName}
                </td>
                <td className="border border-gray-300 p-2">
                  {getRoomStatus(reservation.roomId)}
                </td>
                <td className="border border-gray-300 p-2">
                  {formatDate(reservation.checkInDate)}
                </td>
                <td className="border border-gray-300 p-2">
                  {formatDate(reservation.checkOutDate)}
                </td>
                <td className="border border-black p-2">
                  {reservation.checkedIn ? 'Checked In' : 'Not Checked In'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReservationList;