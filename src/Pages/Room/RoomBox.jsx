import PropTypes from "prop-types";
import { FaGamepad, FaUsers } from "react-icons/fa";
const RoomBox = ({
  roomName,
  date,
  startTime,
  prizePool,
  GameName,
  maxPlayers,
  image,
}) => {
  
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden transition-transform hover:transform hover:scale-105">
      <img
        src={image}
        alt={`${roomName} image`}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1542751371-adc38448a05e";
        }}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{roomName}</h3>
        <div className="flex justify-start gap-x-5 items-cente flex-wrap">
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaUsers />
            <span>Date: {date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaUsers />
            <span>Time: {startTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaUsers />
            <span>Prize Pool: {prizePool}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <FaUsers />
            <span>Capacity: {maxPlayers}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mb-4">
            <FaGamepad />
            <span>{GameName}</span>
          </div>
        </div>
        {/* <div
          className={`inline-block px-3 py-1 rounded-full text-sm ${
            room.status === "Open" ||
            room.status === "Registration Open" ||
            room.status === "Coming Soon"
              ? "bg-green-500/20 text-green-500"
              : "bg-red-500/20 text-red-500"
          }`}
        >
          {room.status}
        </div> */}
      </div>
    </div>
  );
};

RoomBox.propTypes = {
  roomName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  prizePool: PropTypes.number.isRequired,
  GameName: PropTypes.string.isRequired,
  maxPlayers: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default RoomBox;
