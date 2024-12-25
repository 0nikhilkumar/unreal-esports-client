import React, { useEffect, useState } from "react";
import { FaGamepad, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Card({ room }) {
  const navigate = useNavigate();
  const [canEnter, setCanEnter] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Extracting date and time details from the room object
  const [hour, minute] = room.time.split(":");
  const [year, month, day] = room.date.split("-");

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const currentTime = new Date();
      const startTime = new Date(year, month - 1, day, hour, minute, 0); // Adjusting month (0-indexed)
      const diff = startTime - currentTime;

      if (room.status === "Closed") {
        // Room is closed, block entry
        setCanEnter(false);
        setTimeRemaining(null);
      } else if (room.status === "Live") {
        // Room is live, allow entry
        setCanEnter(true);
        setTimeRemaining(null);
      } else if (diff <= 0) {
        // Room start time has passed, allow entry
        setTimeRemaining(null);
        setCanEnter(true);
      } else if (diff <= 30 * 60 * 1000) {
        // Timer should start if it's within 30 minutes
        setTimeRemaining(diff);
        setCanEnter(true);
      } else {
        // Too early, block entry
        setTimeRemaining(null);
        setCanEnter(false);
      }
    };

    calculateTimeRemaining(); // Run initially
    const interval = setInterval(calculateTimeRemaining, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [room.status, year, month, day, hour, minute]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`bg-gray-800 cursor-pointer rounded-xl overflow-hidden transition-transform hover:scale-105 ${
        canEnter ? "" : "opacity-50 pointer-events-none"
      }`}
      onClick={() => canEnter && navigate(`/joined-rooms/${room._id}`)}>
      <div className="relative">
        <img
          src={room?.image}
          alt={room?.roomName}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1542751371-adc38448a05e";
          }}
        />
        <div
          className={`absolute bottom-0 px-4 py-1 rounded-md rounded-l-none bg-white text-black`}>
          {room.hostId.preferredName}
        </div>
      </div>
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
              room?.status === "Open"
                ? "bg-green-500/20 text-green-500"
                : room?.status === "Live"
                ? "bg-[#D21A1A] text-white"
                : "bg-red-500/20 text-red-500"
            }`}>
            {room?.status}
          </div>
        </div>
      </div>
      {timeRemaining && (
        <div className="h-10 bg-[#111825] w-full flex justify-center items-center">
          <p className="tracking-wider flex justify-center items-center font-bold ">
            Room starts in: {formatTime(timeRemaining)}
          </p>
        </div>
      )}
      {!timeRemaining && !canEnter && (
        <div className="h-10 bg-[#111825] w-full flex justify-center items-center">
          <p className="tracking-wider flex justify-center items-center font-bold ">
            Entry not allowed
          </p>
        </div>
      )}
    </div>
  );
}

export default Card;
