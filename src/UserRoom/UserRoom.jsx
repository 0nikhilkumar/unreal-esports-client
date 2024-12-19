import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { getAllRoomsOfHost, getAllUserJoinedRooms, userJoinRoom } from "../http/index";
import Card from "../components/Card/Card";
import { IoClose } from "react-icons/io5";

function UserRoom() {
  const [selectedButton, setSelectedButton] = useState("T3");
  const [searchQuery, setSearchQuery] = useState("");
  const [allRooms, setAllRooms] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isJoinedRoomsSelected, setIsJoinedRoomsSelected] = useState(false); 

  const { id } = useParams();
  const searchInputRef = useRef(null);

  const getAllHostRoomById = async () => {
    const res = await getAllRoomsOfHost(id);
    setAllRooms(res.data.data);
  };

  const joinRoom = async (id) => {
    const res = await userJoinRoom(id);
    console.log(res.data);
    //todo -> add the toast here -> User Joined in Room
  }

  const getJoinedRooms = async () => {
    const res = await getAllUserJoinedRooms();
    console.log(res.data);
  }

  useEffect(() => {
    getAllHostRoomById();
  }, []);

  useEffect(()=> {
    getJoinedRooms();
  }, []);

  const filteredRooms = allRooms?.roomsCreated?.filter(
    (room) => room.tier === selectedButton
  );

  const filteredData = filteredRooms?.filter((room) =>
    room.roomName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)} // Close sidebar on backdrop click
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-56 transform  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="absolute top-14 left-6">
          <ul className="p-4 space-y-4">
            <li>
              <button
                onClick={() => {
                  setIsJoinedRoomsSelected(!isJoinedRoomsSelected); // Toggle the selected state
                }}
                className={`w-full py-2 px-4 rounded-lg text-white bg-blue-700 hover:bg-blue-600 hover:transition duration `}
              >
                Joined Rooms
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-6xl px-2 py-6 mx-auto">
        {/* Sidebar Toggle Button */}
        <button
          className="fixed top-2 left-2 z-50 bg-gray-800 px-3 py-2 rounded-full text-white hover:bg-gray-700"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <IoClose className="text-lg"/> : "☰"}
        </button>

        {/* Header Section with Banner Image */}
        <div className="relative w-full h-96 mb-8">
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl sm:text-6xl font-bold text-white uppercase tracking-wider">
              {allRooms?.preferredName}
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => setSelectedButton("T3")}
              className={`py-3 px-8 rounded-full text-white font-bold ${
                selectedButton === "T3"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl"
                  : "bg-gray-600"
              } hover:scale-105 transition duration-300`}
            >
              T3
            </button>
            <button
              onClick={() => setSelectedButton("T2")}
              className={`py-3 px-8 rounded-full text-white font-bold ${
                selectedButton === "T2"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl"
                  : "bg-gray-600"
              } hover:scale-105 transition duration-300`}
            >
              T2
            </button>
            <button
              onClick={() => setSelectedButton("T1")}
              className={`py-3 px-8 rounded-full text-white font-bold ${
                selectedButton === "T1"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl"
                  : "bg-gray-600"
              } hover:scale-105 transition duration-300`}
            >
              T1
            </button>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-md my-4 relative">
            <input
              type="text"
              ref={searchInputRef}
              placeholder="Search Bar"
              className="w-full p-3 pl-10 pr-20 rounded-lg border bg-gray-800 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <CiSearch size={20} />
            </span>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              (Ctrl + K)
            </span>
          </div>
        </div>

        {/* Section based on selected button */}
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 mb-20">
            {filteredData?.map((room, index) => (
              <Card
              joinRoom={joinRoom}
                room={room}
                key={room._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRoom;
