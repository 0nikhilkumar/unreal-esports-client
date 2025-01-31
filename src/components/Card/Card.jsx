import React, { useEffect, useState } from "react";
import { FaGamepad, FaUsers } from "react-icons/fa";
import { socketInit, updatedStatus } from "../../socket";

function Card({ room, joinRoom, joinedRooms }) {
  const [status, setStatus] = useState(room?.status); // Local state for room status
  const isJoined = joinedRooms?.includes(room?._id);
  const [isRoomFull, setIsRoomFull] = useState(false);

  useEffect(()=> {
    if(room.joinedTeam.length >= room.maxTeam) setIsRoomFull(true);
  }, [])

  socketInit(); // Initialize socket once

  useEffect(() => {
    // Listen for 'statusUpdated' event
    const handleStatusUpdate = (data) => {
      if (data.id === room._id) {
        setStatus(data.newStatus); // Update status for specific room
      }
    };

    // Attach the socket listener
    updatedStatus(handleStatusUpdate);

    // Cleanup the listener
    return () => {
      // Detach the listener on component unmount
      socketInit().off("statusUpdated", handleStatusUpdate);
    };
  }, [room._id, status]);

  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-transform hover:transform hover:scale-105 duration-100 ${
        isJoined ? "bg-gray-900 grayscale hover:grayscale-0" : "bg-gray-800 grayscale-0"
      }`}
    >
      {isJoined && (
        <div className="absolute top-1/3 w-full h-8 bg-black text-white flex justify-center items-center">
          For Room, Click On Side bar
        </div>
      )}
      <img
        src={room?.image}
        alt={room?.roomName}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1542751371-adc38448a05e";
        }}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{room?.roomName}</h3>
        <div className="flex justify-start gap-x-5 items-center flex-wrap">
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaUsers />
            <span>Date: {room?.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaUsers />
            <span>Time: {room?.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaUsers />
            <span>Prize Pool: {room?.prize}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaUsers />
            <span>Capacity: {room?.maxTeam}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaGamepad />
            <span>{room?.gameName}</span>
          </div>
        </div>
        <div className="w-full flex justify-between items-center ">
          <div
            className={`inline-block px-4 py-2 rounded-full text-sm mt-4 ${
              status === "Open" || status === "Upcoming"
                ? "bg-green-500/20 text-green-500"
                : status === "Live"
                ? "bg-[#D21A1A] text-white"
                : "bg-red-500/20 text-red-500"
            }`}
          >
            {status}
          </div>
          <button
            disabled={isJoined || isRoomFull}
            className={`mt-4 ${
              isJoined || isRoomFull
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600"
            } text-white py-2 px-6 rounded-full hover:${
              isJoined || isRoomFull ? "bg-gray-600" : "bg-blue-700"
            } transition-all `}
            onClick={() => {
              if (isRoomFull) {
                alert("Room is full. No more teams can join.");
                return;
              }
              joinRoom(room?._id);
            }}
          >
            {isRoomFull ? "Full" : isJoined ? "Joined" : "Join Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
