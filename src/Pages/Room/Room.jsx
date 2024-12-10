import { useEffect, useState } from "react";
import RoomBox from "./RoomBox";
const jsonData = [
  {
    roomName: "Room 1",
    date: "2021-10-01",
    startTime: "10:00",
    prizePool: 1000,
    GameName: "Poker",
    maxPlayers: 10,
    image: "https://picsum.photos/300/200",
  },
  {
    roomName: "Room 2",
    date: "2021-10-02",
    startTime: "11:00",
    prizePool: 2000,
    GameName: "Blackjack",
    maxPlayers: 8,
    image: "https://picsum.photos/300/200",
  },
  {
    roomName: "Room 3",
    date: "2021-10-03",
    startTime: "12:00",
    prizePool: 1500,
    GameName: "Roulette",
    maxPlayers: 12,
    image: "https://picsum.photos/300/200",
  },
  {
    roomName: "Room 4",
    date: "2021-10-04",
    startTime: "13:00",
    prizePool: 2500,
    GameName: "Baccarat",
    maxPlayers: 6,
    image: "https://picsum.photos/300/200",
  },
  {
    roomName: "Room 5",
    date: "2021-10-05",
    startTime: "14:00",
    prizePool: 3000,
    GameName: "Craps",
    maxPlayers: 10,
    image: "https://picsum.photos/300/200",
  },
  {
    roomName: "Room 6",
    date: "2021-10-06",
    startTime: "15:00",
    prizePool: 3500,
    GameName: "Slots",
    maxPlayers: 15,
    image: "https://picsum.photos/300/200",
  },
  {
    roomName: "Room 7",
    date: "2021-10-07",
    startTime: "16:00",
    prizePool: 4000,
    GameName: "Keno",
    maxPlayers: 20,
    image: "https://picsum.photos/300/200",
  },
  {
    roomName: "Room 8",
    date: "2021-10-08",
    startTime: "17:00",
    prizePool: 4500,
    GameName: "Bingo",
    maxPlayers: 25,
    image: "https://picsum.photos/300/200",
  },
  {
    roomName: "Room 9",
    date: "2021-10-09",
    startTime: "18:00",
    prizePool: 5000,
    GameName: "Texas Hold'em",
    maxPlayers: 30,
    image: "https://picsum.photos/300/200",
  },
  {
    roomName: "Room 10",
    date: "2021-10-10",
    startTime: "19:00",
    prizePool: 5500,
    GameName: "Omaha",
    maxPlayers: 35,
    image: "https://picsum.photos/300/200",
  },
];
const Room = () => {
  const [currentTier, setCurrentTier] = useState(3); // Default tier is 3
  const onTierChange = (tier) => {
    console.log(tier);
    setCurrentTier(tier);
  };
  useEffect(() => {
    console.log(currentTier);
    // Should fetch rooms based on the current tier
  }, [currentTier]);
  return (
    <div className="bg-black min-h-screen flex flex-col justify-center">
      <div className="flex p-4 shadow-md justify-between m-5 max-sm:flex-col-reverse">
        <div className=" flex space-x-4 text-white items-center">
          <button
            className={`h-fit px-5 py-2 rounded-md ${
              currentTier === 1
                ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                : "bg-gray-700"
            }`}
            onClick={() => onTierChange(1)}
          >
            Tier 1
          </button>
          <button
            className={`h-fit px-5 py-2 rounded-md ${
              currentTier === 2
                ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                : "bg-gray-700"
            }`}
            onClick={() => onTierChange(2)}
          >
            Tier 2
          </button>
          <button
            className={`h-fit px-5 py-2 rounded-md ${
              currentTier === 3
                ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                : "bg-gray-700"
            }`}
            onClick={() => onTierChange(3)}
          >
            Tier 3
          </button>
        </div>
        <div className="flex ml-4 items-center flex-row-reverse min-w-fit max-sm:mb-4 max-sm:flex-col-reverse">
          <button className="bg-green-500 text-white py-2 px-2 rounded hover:bg-green-700 min-w-fit self-end">
            {" "}
            &#43; Create Room
          </button>
          <input
            type="text"
            placeholder="search room..."
            className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mx-4 max-sm:w-full"
          />
        </div>
      </div>
      <div className="flex-1 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {jsonData.map((room) => (
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
      </div>
    </div>
  );
};

export default Room;
