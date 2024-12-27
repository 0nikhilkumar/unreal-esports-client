import React, { useEffect, useState } from 'react'
import Header from '../../../components/UserInJoinedRoom/Header/Header'
import CredentialsSection from "../../../components/UserInJoinedRoom/CredentialsSection/CredentialsSection"
import LeaderboardSection from "../../../components/UserInJoinedRoom/LeaderboardSection/LeaderboardSection"
import { socketInit, receiveIdp } from '../../../socket'
import { useParams } from 'react-router-dom'
import { getRoomDetails } from '../../../http'

const Room = () => {

  const [status, setStatus] = useState("Offline");
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [presentRoomData, setPresentRoomData] = useState(null);
  const roomId = useParams().id;
  const socket = socketInit();

  const getRoom = async ()=> {
    const res = await getRoomDetails(roomId);
    setPresentRoomData(res.data.data);
  }

  useEffect(()=> {
    getRoom();
  }, []);

  // Room start time (set dynamically or via props/context)
  const roomStartTime = new Date();
  roomStartTime.setHours(0, 18, 0);

  

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      const diff = roomStartTime - currentTime;

      if (diff <= 0) {
        // Room is live
        setStatus("Live");
        setTimeRemaining(null); // Stop showing timer
        clearInterval(timer); // Stop interval
      } else if (diff <= 30 * 60 * 1000) {
        // Show countdown if within 30 minutes
        setStatus("Room starts in:");
        setTimeRemaining(diff);
      } else {
        // Default offline state
        setStatus("Offline");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [roomStartTime]);

  // Format remaining time (mm:ss)
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen w-fit sm:w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto p-8">
        <Header />
        <div 
        // className="grid lg:grid-cols-2 gap-8"
        >
          <CredentialsSection presentRoomData={presentRoomData} />
          {/* <LeaderboardSection /> */}
        </div>
      </div>

      {/* Footer Section */}
      <div className="fixed bottom-4 left-4 flex items-center space-x-3 bg-gray-800 text-white p-3 rounded-lg shadow-lg">
        <div
          className={`w-3 h-3 rounded-full ${
            status === "Live" ? "bg-green-500" : "bg-gray-500"
          }`}
        ></div>
        <div className="text-sm sm:text-base">
          {status === "Room starts in:" && timeRemaining ? (
            <>
              {status} <span className="font-bold">{formatTime(timeRemaining)}</span>
            </>
          ) : (
            status
          )}
        </div>
      </div>
    </div>
  )
}

export default Room