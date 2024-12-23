import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllRoomsOfHost, getAllUserJoinedRooms, userJoinRoom } from "../http/index";
import Card from "../components/Card/Card";
import toast from "react-hot-toast";

function UserRoom() {
  const [selectedButton, setSelectedButton] = useState("T3");
  const [searchQuery, setSearchQuery] = useState("");
  const [allRooms, setAllRooms] = useState(null);
  const [joinedRooms, setJoinedRooms] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getAllHostRoomById = async () => {
    try {
      const res = await getAllRoomsOfHost(id);
      setAllRooms(res.data.data);
    } catch (error) {
      console.error("Error fetching host rooms:", error);
    }
  };

  const fetchJoinedRooms = async () => {
    try {
      const res = await getAllUserJoinedRooms();
      const joinedRoomIds = res.data.data.map((room) => room._id);
      setJoinedRooms(joinedRoomIds);
    } catch (error) {
      console.error("Error fetching joined rooms:", error);
    }
  };

  const joinRoom = async (roomId) => {
    try {
      const res = await userJoinRoom(roomId);
      toast.success(res.data.message);
      fetchJoinedRooms(); // Refresh joined rooms after joining
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to join room");
    }
  };

  useEffect(() => {
    getAllHostRoomById();
    fetchJoinedRooms();
  }, []);

  const filteredRooms = allRooms?.roomsCreated?.filter(
    (room) => room.tier === selectedButton
  );

  const filteredData = filteredRooms
    ?.filter((room) =>
      room.roomName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    // Sort rooms: move joined rooms to the bottom
    .sort((a, b) => {
      const isAJoined = joinedRooms.includes(a._id);
      const isBJoined = joinedRooms.includes(b._id);
      return isAJoined === isBJoined ? 0 : isAJoined ? 1 : -1;
    });

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Main Content */}
      <div className="relative w-full max-w-6xl px-2 py-6 mx-auto">
        {/* Header */}
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
            {["T3", "T2", "T1"].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedButton(tier)}
                className={`py-3 px-8 rounded-full text-white font-bold ${
                  selectedButton === tier
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl"
                    : "bg-gray-600"
                } hover:scale-105 transition duration-300`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 mb-20">
          {filteredData?.map((room) => (
            <Card
              key={room._id}
              room={room}
              joinRoom={joinRoom}
              joinedRooms={joinedRooms}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserRoom;
