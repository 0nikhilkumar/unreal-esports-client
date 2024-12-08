import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Practice = () => {
  const [rooms, setRooms] = useState([]);
  const socket = io('http://localhost:3000');

  useEffect(() => {
    // Listen for the 'rooms' event from the server
    console.log();
    socket.on('roomsUpdate', (rooms) => {
    //   console.log(rooms); // This will give you the array of rooms
      setRooms(rooms); // Directly set the rooms data instead of appending
    });

    // Cleanup the socket listener when the component unmounts
    return () => {
      socket.off('roomsUpdate');
    };
  }, []);

  return (
    <div>
      <h1>OYO Rooms</h1>
      {rooms.map((room) => (
        <div key={room.id}>
          <h1>{room.id}</h1>  
          <h2>{room.name}</h2>
          <p>{room.available ? 'Available' : 'Not Available'}</p>
        </div>
      ))}
    </div>
  );
};

export default Practice;
