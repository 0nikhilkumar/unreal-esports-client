import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIdp, getRoom, getUpdateIdp } from "../../http";
import {
  FaGamepad,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaTrophy,
  FaCircle,
} from "react-icons/fa";
import { TbBadgesFilled } from "react-icons/tb";

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

function HostRoom() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [roomId, setRoomId] = useState("");
  const [roomPass, setRoomPass] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [getIdpData, setGetIdpData] = useState(null);
  const [getResponse, setGetResponse] =useState(false)

  const fetchedData = async () => {
    const res = await getRoom(id);
    setData(res.data.message);
  };

  const updatedIdp = async () => {
    const res = await getUpdateIdp(id, roomId, roomPass);
    if(res.data.success){
      setGetResponse(true)
    }
  };

  const gettingIdp = async () => {
    const res = await getIdp(id);
    setGetIdpData(res.data.data);
    setRoomId(res.data.data.id)
    setRoomPass(res.data.data.password)
  };

  useEffect(()=>{
    gettingIdp()
  },[getResponse])

  useEffect(() => {
    fetchedData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatedIdp();
    setIsEdit(false);
  };

  return (
    <>
      <style>{animatedBorderStyle}</style>
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-10">
        <div className="w-full px-12">
          <div className="relative bg-gradient-to-br from-gray-800 to-blue-900 rounded-3xl p-8 shadow-2xl">
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
              <div className="absolute inset-0 border-[#ffffff]"></div>
            </div>

            <div className="mt-5 text-center mb-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-wider">
                {data.roomName}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <InfoItem
                icon={<FaCalendarAlt />}
                label="Date"
                value={data.date}
              />
              <InfoItem icon={<FaClock />} label="Time" value={data.time} />
              <InfoItem icon={<FaTrophy />} label="Prize" value={data.prize} />
              <InfoItem
                icon={<FaUsers />}
                label="Capacity"
                value={data.maxTeam}
              />
              <InfoItem
                icon={<TbBadgesFilled />}
                label="Tier"
                value={data.tier}
              />
              <InfoItem
                icon={<FaGamepad />}
                label="Game"
                value={data.gameName}
              />
            </div>

            <div className="flex justify-between items-center">
              <StatusBadge status={data.status} />
              <div className="flex space-x-2">
                {[1, 2, 3].map((_, index) => (
                  <FaCircle
                    key={index}
                    className="text-blue-500 animate-pulse"
                    style={{ animationDelay: `${index * 200}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
          {!getIdpData || isEdit ? (
            <>
              <div className="relative my-8 border-t border-gray-700">
                <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-center text-blue-400">
                    Enter Room Details
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Room ID"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Room Password"
                      value={roomPass}
                      onChange={(e) => setRoomPass(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />

                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-8 space-y-4 bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-center text-blue-400">
                Room Details
              </h3>
              <button
                onClick={() => setIsEdit(true)}
                className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition-colors duration-300"
              >
                Edit
              </button>
              <p className="text-lg font-semibold">
                Room ID: <span className="text-blue-300">{getIdpData.id}</span>
              </p>
              <p className="text-lg font-semibold">
                Room Password: <span className="text-blue-300">{getIdpData.password}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function InfoItem({ icon, label, value, className }) {
  return (
    <div
      className={`flex items-center space-x-3 bg-gray-800/50 rounded-xl p-3 hover:bg-gray-700/50 transition-colors duration-300 ${className}`}
    >
      <div className="text-xl text-cyan-400">{icon}</div>
      <div>
        <span className="text-gray-400 text-sm">{label}</span>
        <p className="text-white font-semibold">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const isOpen =
    status === "Open" ||
    status === "Registration Open" ||
    status === "Coming Soon";
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
        isOpen
          ? "bg-green-500/20 text-green-400 border border-green-500"
          : "bg-red-500/20 text-red-400 border border-red-500"
      }`}
    >
      {status}
    </span>
  );
}

export default HostRoom;
