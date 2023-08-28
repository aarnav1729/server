import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationList.css';

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('/reservations/list');
      setReservations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/reservations/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReservations();
    fetchRooms();
  }, []);

  // Function to determine if a room is empty or booked
  const getRoomStatus = (roomId) => {
    const room = rooms.find((room) => room._id === roomId);
    return room ? room.roomNumber : 'Not Checked In';
  };

  // Function to format date to display only date (YYYY-MM-DD)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCheckIn = async (reservationId) => {
    try {
      const response = await axios.put(`/reservations/check-in/${reservationId}`);
      console.log(response.data);
      // Refresh the reservation list after a successful check-in
      fetchReservations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckOut = async (reservationId) => {
    try {
      const response = await axios.put(`/reservations/check-out/${reservationId}`);
      console.log(response.data);
      // Refresh the reservation list after a successful check-out
      fetchReservations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      // Send a request to delete the reservation
      await axios.delete(`/reservations/${reservationId}`);
      console.log(`Reservation with ID ${reservationId} deleted.`);
      // Refresh the reservation list after a successful delete
      fetchReservations();
    } catch (error) {
      console.error(error);
    }
  };  
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reservation List</h2>
      <div className="bg-white shadow-md rounded p-4">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Guest Name</th>
              <th className="border border-gray-300 p-2">Room</th>
              <th className="border border-gray-300 p-2">Check-In</th>
              <th className="border border-gray-300 p-2">Check-Out</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border-b border-gray-300 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td className="border border-gray-300 p-2">{reservation.guestName}</td>
                <td className="border border-gray-300 p-2">{getRoomStatus(reservation.roomId)}</td>
                <td className="border border-gray-300 p-2">{formatDate(reservation.checkInDate)}</td>
                <td className="border border-gray-300 p-2">{formatDate(reservation.checkOutDate)}</td>
                <td className="border border-gray-300 p-2">{reservation.status}</td>
                <td className="border-b border-gray-300 py-2">
                {reservation.status === 'pending' && (
                    <button
                    className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded-full"
                    onClick={() => handleCheckIn(reservation._id)}
                    >
                    Check-In
                    </button>
                )}
                {reservation.status === 'checkedIn' && (
                    <>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full"
                        onClick={() => handleCheckOut(reservation._id)}
                    >
                        Check-Out
                    </button>
                    </>
                )}
                {reservation.status === 'checkedOut' && (
                    <>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-full"
                        onClick={() => handleDeleteReservation(reservation._id)}
                    >
                        Delete
                    </button>
                    </>
                )}
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