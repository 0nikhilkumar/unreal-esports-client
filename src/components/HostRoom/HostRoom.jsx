import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIdp, getRoom } from "../../http";
import RoomDetails from "./RoomDetails";
import RoomIdp from "./RoomIdp";
import TeamSlotManagement from "./TeamSlotManagement";
import Leaderboard from "./Leaderboard";
import { Team, LeaderboardEntry } from "./types";
import { initialTeams } from "../Slot Management/data/teams";


function HostRoom() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [idpData, setIdpData] = useState(null);
  const [getResponse, setGetResponse] = useState(false);
  const [teams, setTeams] = useState(initialTeams);
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch room data
  const fetchRoomData = async () => {
    try {
      const res = await getRoom(id);
      const roomData = res.data.message;
      setData(roomData);
      setTeams(roomData.teams || []);
      setLeaderboard(roomData.leaderboard || []);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  // Fetch IDP data
  const fetchIdpData = async () => {
    try {
      const res = await getIdp(id);
      setIdpData(res.data.data);
    } catch (error) {
      console.error("Error fetching IDP data:", error);
    }
  };

  useEffect(() => {
    fetchIdpData();
  }, [getResponse]);

  useEffect(() => {
    fetchRoomData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex justify-center items-center py-10">
      <div className="w-full max-w-7xl space-y-6 px-6 py-8 bg-gray-800 rounded-lg shadow-md">
        <RoomDetails data={data} />
        <RoomIdp
          idpData={idpData}
          setIdpData={setIdpData}
          id={id}
          setGetResponse={setGetResponse}
        />
        <TeamSlotManagement teams={teams} setTeams={setTeams} />
        <Leaderboard leaderboard={leaderboard} setLeaderboard={setLeaderboard} />
      </div>
    </div>
  );
}
export default HostRoom