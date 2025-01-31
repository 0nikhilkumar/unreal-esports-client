import React, { useEffect, useState } from "react";
import {
  FaGamepad,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaTrophy,
  FaCircle,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import { TbBadgesFilled } from "react-icons/tb";
import { BsFillMapFill } from "react-icons/bs";
import InfoItem from "./InfoItem";
import StatusBadge from "./StatusBadge";
import { MdTimer } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  leaveRoom,
  onlineUsers,
  socketInit,
  toggleStatus,
  updatedStatus,
} from "../../socket";
import { updateStatus } from "../../http";

const animatedBorderStyle = `
  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }

  .animated-border {
    position: relative;
    z-index: 0;
    border-radius: 10px;
    overflow: hidden;
    padding: 2px;
  }
  .animated-border::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #ffffff;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(#ffffff, #ffffff), linear-gradient(#ffffff, #ffffff), linear-gradient(#ffffff, #ffffff), linear-gradient(#ffffff, #ffffff);
    animation: rotate 4s linear infinite;
  }
  .animated-border::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background: black;
    border-radius: 5px;
  }
`;

function RoomDetails({ data }) {
  const [timer, setTimer] = useState(null);
  // const [socketStatus, setSocketStatus] = useState("")
  const [toggleData, setToggleData] = useState(data.status || "Open");
  const [onlineUserCount, setOnlineUserCount] = useState(0);
  const { id } = useParams();
  const socket = socketInit();

  useEffect(() => {
    const socket = socketInit(id);
    onlineUsers((count) => {
      setOnlineUserCount(count);
    });

    return () => {
      leaveRoom(id);
    };
  }, [id]);

  useEffect(() => {
    setToggleData(data.status || "Open");
  }, [data.status]);

  const handleChangeStatus = async (newStatus) => {
    try {
      setToggleData(newStatus);
      const res = await updateStatus(id, newStatus);
      socket.emit("statusUpdated", { id, newStatus });
      toggleStatus({ id, newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    socketInit();

    // Listen for 'statusUpdated' event
    const handleStatusUpdate = (data) => {
      if (data.id === id) {
        setToggleData(data.newStatus);
      }
      console.log("room details", data);
    };
    // Attach the socket listener
    updatedStatus(handleStatusUpdate);
  }, [id]);

  useEffect(() => {
    if (data.time && data.time <= 30 * 60) {
      // Check if time is less than or equal to 30 minutes (in seconds)
      const interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime && prevTime > 0) {
            return prevTime - 1;
          }
          clearInterval(interval);
          return null;
        });
      }, 1000);

      setTimer(data.time);

      return () => clearInterval(interval);
    }
  }, [data.time]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <style>{animatedBorderStyle}</style>
      <div className="relative bg-gradient-to-br from-gray-800 to-blue-900 rounded-3xl p-8 shadow-2xl">
        {/* Room Image */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[90%] h-64 animated-border shadow-xl">
          <div className="w-full h-full overflow-hidden rounded-lg shadow-gray-700 shadow-sm">
            <img
              src={data.image}
              alt={data.roomName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1542751371-adc38448a05e";
              }}
            />
          </div>
        </div>

        {/* Room Name */}
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-wider">
            {data.roomName}
          </h2>
        </div>

        {/* Info Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <InfoItem icon={<FaCalendarAlt />} label="Date" value={data.date} />
          <InfoItem icon={<FaClock />} label="Time" value={data.time} />
          <InfoItem icon={<FaTrophy />} label="Prize" value={data.prize} />
          <InfoItem icon={<FaUsers />} label="Capacity" value={data.maxTeam} />
          <InfoItem icon={<TbBadgesFilled />} label="Tier" value={data.tier} />
          <InfoItem icon={<FaGamepad />} label="Game" value={data.gameName} />

          <InfoItem
            icon={toggleData === "Open" ? <FaToggleOn /> : <FaToggleOff />}
            label="Status"
            value={
              <select
                value={toggleData}
                onChange={(e) => handleChangeStatus(e.target.value)}
                className="bg-transparent text-white border border-gray-300 rounded-md px-4 py-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-300 ease-in-out flex justify-center items-center "
              >
                <option value="Open" className="text-black">
                  Open
                </option>
                <option value="Live" className="text-black">
                  Live
                </option>
                <option value="Closed" className="text-black">
                  Closed
                </option>
              </select>
            }
          />

          <InfoItem
            icon={<BsFillMapFill />}
            label="Map"
            value={data.gameMap || "Erangle"}
          />
        </div>

        {/* Status and Loading Dots */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
          <StatusBadge status={toggleData} />
          <StatusBadge onlineUserCount={onlineUserCount} />
          </div>
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <FaCircle
                key={index}
                className="text-blue-500 animate-pulse"
                style={{ animationDelay: `${index * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default RoomDetails;
