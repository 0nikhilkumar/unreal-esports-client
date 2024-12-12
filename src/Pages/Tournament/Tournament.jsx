import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

import {
  FaCalendarAlt,
  FaGamepad,
  FaMedal,
  FaSearch,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import CreateRoom from "../../Pages/Tournament/CreateRoom/CreateRoom";

const Tournament = () => {
  const [isCreateRoomVisible, setIsCreateRoomVisible] = useState(false);

  const handleCreateRoomClick = () => {
    setIsCreateRoomVisible(!isCreateRoomVisible);
  };

  const [activeTab, setActiveTab] = useState("rooms");
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "League Champions Cup",
      date: "2024-03-15",
      prize: "$10,000",
      game: "League of Legends",
      status: "Registration Open",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    },
    {
      id: 2,
      name: "Battle Royale Masters",
      date: "2024-03-20",
      prize: "$15,000",
      game: "Fortnite",
      status: "Coming Soon",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    },
    {
      id: 3,
      name: "CS:GO Ultimate Challenge",
      date: "2024-03-25",
      prize: "$20,000",
      game: "CS:GO",
      status: "Registration Open",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    },
  ]);
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      name: "League Champions Cup",
      date: "2024-03-15",
      prize: "$10,000",
      game: "League of Legends",
      status: "Registration Open",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    },
    {
      id: 2,
      name: "Battle Royale Masters",
      date: "2024-03-20",
      prize: "$15,000",
      game: "Fortnite",
      status: "Coming Soon",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    },
    {
      id: 3,
      name: "CS:GO Ultimate Challenge",
      date: "2024-03-25",
      prize: "$20,000",
      game: "CS:GO",
      status: "Registration Open",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    },
  ]);

  const handleRoomAdded = (newRoom) => {
    setRooms([...rooms, newRoom]);
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room?.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeFilter === "available"
        ? room.available
        : activeFilter === "completed"
        ? !room.available
        : true)
  );

  const filteredTournaments = tournaments.filter(
    (tournament) =>
      tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeFilter === "upcoming"
        ? new Date(tournament.date) > new Date()
        : activeFilter === "completed"
        ? new Date(tournament.date) < new Date()
        : true)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center text-purple-500 mb-8">
          Welcome to the Ultimate Esports Tournament Hub
        </h1>

        {/* Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-8">
          {/* Left side: Filter buttons */}
          <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
            <button
              onClick={() => setActiveFilter("upcoming")}
              className={`py-2 px-4 rounded-lg text-lg font-semibold transition-all ${
                activeFilter === "upcoming"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveFilter("available")}
              className={`py-2 px-4 rounded-lg text-lg font-semibold transition-all ${
                activeFilter === "available"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setActiveFilter("completed")}
              className={`py-2 px-4 rounded-lg text-lg font-semibold transition-all ${
                activeFilter === "completed"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Completed
            </button>
          </div>

          {/* Right side: Search Bar */}
          <div className="relative w-full sm:w-1/3 mt-4 sm:mt-0">
            <input
              type="text"
              placeholder="Search Rooms or Tournaments"
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-800 text-white border border-gray-600"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* Tabs: Rooms and Tournaments */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("rooms")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "rooms"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              aria-label="View Gaming Rooms"
            >
              <FaGamepad className="text-xl" />
              Rooms
            </button>
            <button
              onClick={() => setActiveTab("tournament")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "tournament"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              aria-label="View Tournaments"
            >
              <FaTrophy className="text-xl" />
              Tournament
            </button>
          </div>

          <div className="flex justify-center mb-8">
            <div
              onClick={handleCreateRoomClick}
              className="flex items-center cursor-pointer gap-2 px-6 py-3 rounded-lg font-semibold transition-all bg-purple-600 text-white"
            >
              <FaPlus />
              {activeTab === "rooms" ? "Create Room" : "Create Tournament"}
            </div>
          </div>
        </div>
        {isCreateRoomVisible && (
          <CreateRoom handleRoomAdded={handleRoomAdded} />
        )}

        {/* Display Rooms or Tournaments based on activeTab */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === "rooms" &&
            filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-gray-800 rounded-xl overflow-hidden transition-transform hover:transform hover:scale-105"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1542751371-adc38448a05e";
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                  <div className="flex justify-start gap-x-5 items-cente flex-wrap">
                    <div className="flex items-center gap-2 text-gray-300 mb-2">
                      <FaUsers />
                      <span>Date: {room.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 mb-2">
                      <FaUsers />
                      <span>Time: {room.startTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 mb-2">
                      <FaUsers />
                      <span>Prize Pool: {room.prize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 mb-2">
                      <FaUsers />
                      <span>Capacity: {room.maxPlayers}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 mb-4">
                      <FaGamepad />
                      <span>{room.game}</span>
                    </div>
                  </div>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      room.status === "Open" ||
                      room.status === "Registration Open" ||
                      room.status === "Coming Soon"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {room.status}
                  </div>
                </div>
              </div>
            ))}

          {activeTab === "tournament" &&
            filteredTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="bg-gray-800 rounded-xl overflow-hidden transition-transform hover:transform hover:scale-105"
              >
                <img
                  src={tournament.image}
                  alt={tournament.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1542751371-adc38448a05e";
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{tournament.name}</h3>
                  <div className="flex items-center gap-2 text-gray-300 mb-2">
                    <FaCalendarAlt />
                    <span>{tournament.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 mb-2">
                    <FaMedal />
                    <span>Prize: {tournament.prize}</span>
                  </div>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      tournament.status === "Registration Open"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {tournament.status}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tournament;
