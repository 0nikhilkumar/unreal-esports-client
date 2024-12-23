import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Trophy } from 'lucide-react';
import { getIdp, getRoom, getUpdateIdp } from "../../http";
import { TeamList } from "../Slot Management/TeamList";
import { initialTeams } from "../Slot Management/data/teams";
import {
  FaGamepad,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaTrophy,
  FaCircle,
  FaEdit,
  FaSave
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

const scrollbarHideStyle = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
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
  const [teams, setTeams] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);
  const [editingLeaderboard, setEditingLeaderboard] = useState(null);
  const [idpData, setIdpData] = useState(null)
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamSlots, setNewTeamSlots] = useState(0);
  const [newLeaderboardName, setNewLeaderboardName] = useState('');
  const [newLeaderboardPoints, setNewLeaderboardPoints] = useState(0);

  const [teamss, setTeamss] = useState(initialTeams);

  const handleSlotChange = (teamId, slot) => {
    setTeamss((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, slot } : team
      )
    );
  };


  const handleSubmitt = (e) => {
    e.preventDefault()
    setIdpData({ id: roomId, password: roomPass })
    setIsEdit(false)
  }

  const handleEdit = () => {
    setRoomId(idpData?.id || '')
    setRoomPass(idpData?.password || '')
    setIsEdit(true)
  }

  const fetchedData = async () => {
    const res = await getRoom(id);
    setData(res.data.message);
    setTeams(res.data.message.teams || []);
    setLeaderboard(res.data.message.leaderboard || []);
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

  const handleSlotUpdate = (teamId, newSlots) => {
    const updatedTeams = teams.map(team => 
      team.id === teamId ? { ...team, slots: parseInt(newSlots, 10) } : team
    );
    setTeams(updatedTeams);
    // You might want to send this update to the server here
  };

  const handlePointsUpdate = (teamId, newPoints) => {
    const updatedLeaderboard = leaderboard.map(team =>
      team.id === teamId ? { ...team, points: parseInt(newPoints, 10) } : team
    );
    setLeaderboard(updatedLeaderboard);
    // You might want to send this update to the server here
  };

  const handleAddTeam = (e) => {
    e.preventDefault();
    // Add your logic to add a new team here.  This would likely involve a server call.
    setTeams([...teams, {id: teams.length +1, name: newTeamName, slots: newTeamSlots}])
    setNewTeamName('');
    setNewTeamSlots(0);
  };

  const handleAddLeaderboardEntry = (e) => {
    e.preventDefault();
    // Add your logic to add a new leaderboard entry here. This would likely involve a server call.
    setLeaderboard([...leaderboard, {id: leaderboard.length + 1, name: newLeaderboardName, points: newLeaderboardPoints}])
    setNewLeaderboardName('');
    setNewLeaderboardPoints(0);
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

          {/* Room IDP */}
          <div className="bg-gray-800 rounded-lg shadow-md p-8 w-full mt-5 text-black">
            <h2 className="text-2xl font-semibold text-center text-white mb-6">
              {!idpData || isEdit ? "Enter Room IDP" : "Room IDP"}
            </h2>
            <div>
              {!idpData || isEdit ? (
                <form onSubmit={handleSubmitt} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Room ID"
                  />
                  <input
                    type="text"
                    placeholder="Room Password"
                    value={roomPass}
                    onChange={(e) => setRoomPass(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Room Password"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
                    {isEdit ? "Update" : "Submit"}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={handleEdit}
                    className="mb-4 bg-gray-200 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-300 transition-colors duration-300">
                    Edit
                  </button>
                  <p className="text-lg text-white">
                    Room ID:{" "}
                    <span className="font-semibold text-blue-600">
                      {idpData.id}
                    </span>
                  </p>
                  <p className="text-lg text-white">
                    Room Password:{" "}
                    <span className="font-semibold text-blue-600">
                      {idpData.password}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Team Slots Section */}
          {/* <style>{scrollbarHideStyle}</style> */}
          <div className="bg-black rounded-lg shadow-md p-4 sm:p-6 md:p-8 w-full mt-5">
          <h1 className="text-center text-2xl mb-4">Team Slot Management</h1>
        <div className="w-full text-black">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full h-[calc(100vh-200px)]">
              <div className="bg-gradient-to-br from-gray-800 to-blue-900 rounded-lg shadow-lg p-4 sm:p-6 h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-6 text-white">
                  Assign Team Slots
                </h2>
                <div className="overflow-y-auto scrollbar-hide scrollbar-hidden flex-grow">
                  <TeamList teams={teamss} onSlotChange={handleSlotChange} />
                </div>
              </div>
            </div>

            <div className="w-full h-[calc(100vh-200px)]">
              <div className="bg-gradient-to-br from-gray-800 to-blue-900 rounded-lg shadow-lg p-4 sm:p-6 h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-4 text-white">Slot Overview</h2>
                <div className="overflow-y-auto scrollbar-hide scrollbar-hidden flex-grow">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {Array.from({ length: initialTeams.length }, (_, i) => i + 1).map((slot) => {
                      const teamInSlot = teamss.find(
                        (team) => team.slot === slot
                      );
                      return (
                        <div
                          key={slot}
                          className={`p-3 sm:p-4 rounded-lg ${
                            teamInSlot
                              ? "bg-blue-50 border border-blue-200"
                              : "bg-gray-50 border border-gray-200"
                          }`}>
                          <div className="font-medium text-black">Slot {slot}</div>
                          <div className="text-sm mt-1 text-gray-600">
                            {teamInSlot ? teamInSlot.name : "Empty"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

          {/* Leaderboard Section */}
          <div className="bg-gray-800 rounded-lg shadow-md p-8 w-full mt-5 text-white">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Leaderboard
            </h2>
            <div className="space-y-4">
              {leaderboard.map((team) => (
                <div
                  key={team.id}
                  className="flex items-center justify-between">
                  <span>{team.name}</span>
                  {editingLeaderboard === team.id ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={team.points}
                        onChange={(e) =>
                          handlePointsUpdate(team.id, e.target.value)
                        }
                        className="w-16 px-2 py-1 text-black rounded-md mr-2"
                      />
                      <FaSave
                        onClick={() => setEditingLeaderboard(null)}
                        className="cursor-pointer text-green-500 hover:text-green-600"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="mr-2">{team.points} points</span>
                      <FaEdit
                        onClick={() => setEditingLeaderboard(team.id)}
                        className="cursor-pointer text-blue-500 hover:text-blue-600"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <form onSubmit={handleAddLeaderboardEntry} className="mt-6">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newLeaderboardName}
                  onChange={(e) => setNewLeaderboardName(e.target.value)}
                  placeholder="Team Name"
                  className="flex-grow px-3 py-2 text-black rounded-md"
                />
                <input
                  type="number"
                  value={newLeaderboardPoints}
                  onChange={(e) => setNewLeaderboardPoints(e.target.value)}
                  placeholder="Points"
                  className="w-20 px-3 py-2 text-black rounded-md"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Add Entry
                </button>
              </div>
            </form>
          </div>
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

