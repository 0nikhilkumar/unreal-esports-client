import PropTypes from "prop-types";

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
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white">
      <img
        src={image}
        alt={`${roomName} image`}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h2 className="text-2xl font-bold mb-2 text-center">{roomName}</h2>
      <div className="p-4 grid grid-cols-2">
        <p className="text-sm mb-1">
          <strong>Date:</strong> {date}
        </p>
        <p className="text-sm mb-1">
          <strong>Start Time:</strong> {startTime}
        </p>
        <p className="text-sm mb-1 ">
          <strong>Game Name:</strong> {GameName}
        </p>
        <p className="text-sm mb-1">
          <strong>Prize Pool:</strong> ${prizePool}
        </p>
        <p className="text-sm mb-1">
          <strong>Max Players:</strong> {maxPlayers}
        </p>
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
