import React, { useEffect, useState } from "react";
import { FaGamepad, FaUsers } from "react-icons/fa";
import { getAllUserJoinedRooms, userJoinRoom } from "../../../http";
import { useNavigate } from "react-router-dom";




function Card({
  room,
  joinRoom
}) {

  const [join, setJoin] = useState(false);

  const navigate = useNavigate()
  

  return (
    <div onClick={()=> navigate(`/joined-rooms/${room._id}`)} className="bg-gray-800 cursor-pointer rounded-xl overflow-hidden transition-transform hover:transform hover:scale-105">
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
    
          <div className={`absolute bottom-0 px-4 py-1 rounded-md rounded-l-none bg-white text-black`}>{room.hostId.preferredName}</div>
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
            <span>{room?.gameNam}</span>
          </div>
        </div>
        <div className="w-full flex justify-between items-center ">
          <div
            className={`inline-block px-4 py-2 rounded-full text-sm mt-4 ${
              room?.status === "Open" || room?.status === "Upcoming"
                ? "bg-green-500/20 text-green-500"
                : room?.status === "Live"
                ? "bg-[#D21A1A] text-white"
                : "bg-red-500/20 text-red-500"
            }`}>
            {room?.status}
          </div>
        </div>
      </div>
        <div className="h-10 bg-[#111825] w-full flex justify-center items-center"><p className="tracking-wider flex justify-center items-center font-bold ">Now you can enter the room</p></div>
    </div>
  );
}

export default Card;
