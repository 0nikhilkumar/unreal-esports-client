import { useEffect, useState } from "react";
import RoomBox from "./RoomBox";
import CreateRoom from "../Tournament/CreateRoom/CreateRoom";
import { FaSearch, FaPlus } from "react-icons/fa";

const jsonData = [
  {
    roomName: "Room 1",
    date: "2021-10-01",
    startTime: "10:00",
    prizePool: 1000,
    GameName: "Poker",
    maxPlayers: 10,
    image: "https://picsum.photos/300/200",
    tier: 1,
  },
  {
    roomName: "Room 2",
    date: "2021-10-02",
    startTime: "11:00",
    prizePool: 2000,
    GameName: "Blackjack",
    maxPlayers: 8,
    image: "https://picsum.photos/300/200",
    tier: 2,
  },
  {
    roomName: "Room 3",
    date: "2021-10-03",
    startTime: "12:00",
    prizePool: 1500,
    GameName: "Roulette",
    maxPlayers: 12,
    image: "https://picsum.photos/300/200",
    tier: 3,
  },
  {
    roomName: "Room 4",
    date: "2021-10-04",
    startTime: "13:00",
    prizePool: 2500,
    GameName: "Baccarat",
    maxPlayers: 6,
    image: "https://picsum.photos/300/200",
    tier: 1,
  },
  {
    roomName: "Room 5",
    date: "2021-10-05",
    startTime: "14:00",
    prizePool: 3000,
    GameName: "Craps",
    maxPlayers: 10,
    image: "https://picsum.photos/300/200",
    tier: 2,
  },
  {
    roomName: "Room 6",
    date: "2021-10-06",
    startTime: "15:00",
    prizePool: 3500,
    GameName: "Slots",
    maxPlayers: 15,
    image: "https://picsum.photos/300/200",
    tier: 3,
  },
  {
    roomName: "Room 7",
    date: "2021-10-07",
    startTime: "16:00",
    prizePool: 4000,
    GameName: "Keno",
    maxPlayers: 20,
    image: "https://picsum.photos/300/200",
    tier: 1,
  },
  {
    roomName: "Room 8",
    date: "2021-10-08",
    startTime: "17:00",
    prizePool: 4500,
    GameName: "Bingo",
    maxPlayers: 25,
    image: "https://picsum.photos/300/200",
    tier: 2,
  },
  {
    roomName: "Room 9",
    date: "2021-10-09",
    startTime: "18:00",
    prizePool: 5000,
    GameName: "Texas Hold'em",
    maxPlayers: 30,
    image: "https://picsum.photos/300/200",
    tier: 3,
  },
  {
    roomName: "Room 10",
    date: "2021-10-10",
    startTime: "19:00",
    prizePool: 5500,
    GameName: "Omaha",
    maxPlayers: 35,
    image: "https://picsum.photos/300/200",
    tier: 1,
  },
];

const Room = () => {
  const [currentTier, setCurrentTier] = useState(3); // Default tier is 3
  const [rooms, setRooms] = useState(jsonData);
  const [createRoom, setCreateRoom] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const onTierChange = (tier) => {
    setCurrentTier(tier);
  };

  const handleRoomShow = () => {
    setCreateRoom(!createRoom);
  };

  const handleRoomAdded = (newRoom) => {
    setRooms([...rooms, newRoom]);
    setCreateRoom(false);
  };

  useEffect(() => {
    console.log(currentTier);
    // Should fetch rooms based on the current tier
  }, [currentTier]);

  const filteredRooms = rooms.filter(
    (room) =>
      room.roomName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      room.tier === currentTier
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center text-purple-500 mb-8">
          Welcome to the Ultimate Esports Room Hub
        </h1>

        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-8">
          <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
            <button
              onClick={() => onTierChange(1)}
              className={`py-2 px-4 rounded-lg text-lg font-semibold transition-all ${
                currentTier === 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Tier 1
            </button>
            <button
              onClick={() => onTierChange(2)}
              className={`py-2 px-4 rounded-lg text-lg font-semibold transition-all ${
                currentTier === 2
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Tier 2
            </button>
            <button
              onClick={() => onTierChange(3)}
              className={`py-2 px-4 rounded-lg text-lg font-semibold transition-all ${
                currentTier === 3
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Tier 3
            </button>
          </div>

          {/* Right side: Search Bar */}
          <div className="relative w-full sm:w-1/3 mt-4 sm:mt-0">
            <input
              type="text"
              placeholder="Search Rooms"
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-800 text-white border border-gray-600"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex justify-center">
            <div
              onClick={handleRoomShow}
              className="flex items-center cursor-pointer gap-2 px-6 py-3 rounded-lg font-semibold transition-all bg-purple-600 text-white"
            >
              <FaPlus />
              Create Room
            </div>
          </div>
        </div>

        {createRoom ? (
          <CreateRoom
            handleRoomAdded={handleRoomAdded}
            handleRoomShow={handleRoomShow}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <RoomBox
                key={room.roomName}
                roomName={room.roomName}
                date={room.date}
                startTime={room.startTime}
                prizePool={room.prizePool}
                GameName={room.GameName}
                maxPlayers={room.maxPlayers}
                image={room.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
