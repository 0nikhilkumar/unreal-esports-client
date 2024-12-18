import React, { useState } from "react";
import { FaGamepad, FaUsers } from "react-icons/fa";

function Card({
  image,
  date,
  time,
  roomName,
  prize,
  capacity,
  type,
  tier,
  status,
}) {
  const [join, setJoin] = useState(false);

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden transition-transform hover:transform hover:scale-105">
      <img
        src={image}
        alt={roomName}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1542751371-adc38448a05e";
        }}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{roomName}</h3>
        <div className="flex justify-start gap-x-5 items-center flex-wrap">
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaUsers />
            <span>Date: {date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaUsers />
            <span>Time: {time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaUsers />
            <span>Prize Pool: {prize}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaUsers />
            <span>Capacity: {capacity}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaGamepad />
            <span>{type}</span>
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
            disabled={join}
            className={`mt-4 ${
              join ? "bg-gray-600" : "bg-blue-600"
            } text-white py-2 px-6 rounded-full hover:${
              join ? "bg-gray-700" : "bg-blue-700"
            } transition-all `}
            onClick={() => setJoin(true)}
          >
            {join ? "Joined" : "Join Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
