import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIdp, getRoom } from "../../http";
import { initialTeams } from "../Slot Management/data/teams";
import Leaderboard from "./Leaderboard";
import RoomDetails from "./RoomDetails";
import RoomIdp from "./RoomIdp";
import TeamSlotManagement from "./TeamSlotManagement";
import Loader from "../Loader/Loader";
// import {socket} from "../../socket/index";

function HostRoom() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [idpData, setIdpData] = useState(null);
  const [getResponse, setGetResponse] = useState(false);
  const [teams, setTeams] = useState(initialTeams);
  const [leaderboard, setLeaderboard] = useState([]);
  const [inRoomTeam, setInRoomTeam] = useState([]);
  const [loading , setLoading] = useState(false)

  const fetchRoomData = async () => {
    setLoading(true)
    try {
      const res = await getRoom(id);
      const roomData = res.data.message;
      setData(roomData);
      setInRoomTeam(roomData.joinedTeam);
      setTeams(roomData.teams || []);
      setLeaderboard(roomData.leaderboard || []);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
    finally{
      setLoading(false)
    }
  };

  // Fetch IDP data
  const fetchIdpData = async () => {
    setLoading(true)
    try {
      const res = await getIdp(id);
      setIdpData(res.data.data.idp);
    } catch (error) {
      console.error("Error fetching IDP data:", error);
    }
    finally{
      setLoading(false)
    }
  };


  useEffect(() => {
    fetchIdpData();
  }, [getResponse]);

  useEffect(() => {
    fetchRoomData();
  }, []);

  if(loading) return <Loader/>
 
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex justify-center items-center py-10">
      <div className="w-full max-w-7xl space-y-6 px-6 py-8 bg-gray-800 rounded-lg shadow-md">
        <RoomDetails data={data} />
        <RoomIdp
          idpData={idpData}
          setIdpData={setIdpData}
          id={id}
          setGetResponse={setGetResponse}
          inRoomTeam={inRoomTeam}
          setInRoomTeam={setInRoomTeam}
        />
        <TeamSlotManagement inRoomTeam={inRoomTeam} setInRoomTeam={setInRoomTeam} teams={teams} setTeams={setTeams} />
        <Leaderboard leaderboard={leaderboard} setLeaderboard={setLeaderboard} inRoomTeam={inRoomTeam}/>
      </div>
    </div>
  );
}
export default HostRoom