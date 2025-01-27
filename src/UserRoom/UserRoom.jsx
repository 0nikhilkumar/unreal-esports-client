import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Card from "../components/Card/Card";
import Loader from "../components/Loader/Loader";
import { getAllRoomsOfHost, getAllUserJoinedRooms, getUserTeam, userJoinRoom } from "../http/index";

function UserRoom() {
  const [selectedButton, setSelectedButton] = useState("T3");
  const [searchQuery, setSearchQuery] = useState("");
  const [allRooms, setAllRooms] = useState(null);
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  // Fetch all rooms of the host
  const getAllHostRoomById = async () => {
    setLoading(true);
    try {
      const res = await getAllRoomsOfHost(id);
      setAllRooms(res.data.data);
    } catch (error) {
      console.error("Error fetching host rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch team data
  const getTeam = async () => {
    try {
      const res = await getUserTeam();
      const userTeam = res.data.data.updateTeamTier.find((team) => team.hostId === id);
      setTeam(userTeam); // Filter data for the current host
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  // Fetch joined rooms
  const fetchJoinedRooms = async () => {
    setLoading(true);
    try {
      const res = await getAllUserJoinedRooms();
      const joinedRoomIds = res.data.data.map((room) => room._id);
      setJoinedRooms(joinedRoomIds);
    } catch (error) {
      console.error("Error fetching joined rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  // Join a room
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

  // Restrict access based on tier
  const isAuthorized = (roomTier) => {
    if (!team || !team.tier) return false;

    const allowedTiers = {
      T3: ["T3"],
      T2: ["T3", "T2"],
      T1: ["T3", "T2", "T1"],
    };

    return allowedTiers[team.tier]?.includes(roomTier);
  };

  // Filter rooms based on tier and search query
  const filteredRooms = allRooms?.roomsCreated
    ?.filter((room) => selectedButton === "ALL" || room.tier === selectedButton) // Button filter
    ?.filter((room) => room.roomName.toLowerCase().includes(searchQuery.toLowerCase())) // Search filter
    ?.filter((room) => isAuthorized(room.tier)) // Authorization filter
    ?.sort((a, b) => {
      const isAJoined = joinedRooms.includes(a._id);
      const isBJoined = joinedRooms.includes(b._id);
      return isAJoined === isBJoined ? 0 : isAJoined ? 1 : -1; // Sort: joined rooms at the bottom
    });

  useEffect(() => {
    getTeam();
    getAllHostRoomById();
    fetchJoinedRooms();
  }, []);

  if (loading) return <Loader />;

  if (team && !isAuthorized(selectedButton)) {
    return (
      <div className="text-white text-center mt-10">
        <h2 className="text-3xl font-bold">You are not authorized to access this tier.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="text-white">
        <Link to={"/joined-rooms"}>Joined Rooms</Link>
      </div>
      <div className="relative w-full max-w-6xl px-2 py-6 mx-auto">
        <div className="relative w-full h-96 mb-8">
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl sm:text-6xl font-bold text-white uppercase tracking-wider">
              {allRooms?.preferredName || "Rooms"}
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex justify-center space-x-6">
            {["T3", "T2", "T1"].map((tier) => {
              const isDisabled = tier !== "ALL" && !isAuthorized(tier); // Disable inaccessible tiers
              return (
                <button
                  key={tier}
                  onClick={() => !isDisabled && setSelectedButton(tier)}
                  className={`py-3 px-8 rounded-full text-white font-bold flex items-center justify-center space-x-2 ${
                    selectedButton === tier
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl"
                      : "bg-gray-600"
                  } hover:scale-105 transition duration-300 ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isDisabled}
                >
                  {isDisabled && <span className="text-lg">🔒</span>}
                  <span>{tier}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 mb-20">
          {filteredRooms?.length === 0 ? (
            <div className="col-span-full text-center text-white text-xl">
              Room doesn't exist
            </div>
          ) : (
            filteredRooms?.map((room) => (
              <Card
                key={room._id}
                room={room}
                joinRoom={joinRoom}
                joinedRooms={joinedRooms}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UserRoom;
