import React, { useEffect, useState } from 'react';
import MatchCard from './MatchCard';
import { getAllUserJoinedRooms } from '../../../http';

export default function LeaderboardPage() {
  const [openMatchId, setOpenMatchId] = useState(null);
  const [joinedRoomData, setJoinedRoomData] = useState([]);


  const joinedRoom = async() => {
    const res = await getAllUserJoinedRooms();
    const sortedData = res.data.data.sort((a, b) =>{
      const dateAndTime = `${a.date}T${a.time}:00`
      const dateAndTime1 = `${b?.date}T${b?.time}:00`

      return new Date(dateAndTime1) - new Date(dateAndTime)
    });
    setJoinedRoomData(sortedData);
  };

  useEffect(() => {
    joinedRoom();
  }, []);

  const handleToggle = (matchId) => {
    setOpenMatchId(openMatchId === matchId ? null : matchId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8">
          Leaderboard
        </h1>
        
        {/* Enhanced Recent Matches heading */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-blue-500/30"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-lg">
              Recent Matches
            </span>
          </div>
        </div>

        {/* Match cards container */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {joinedRoomData?.map((match) => (
            <MatchCard
              key={match._id}
              match={match}
              isOpen={openMatchId === match._id}
              onToggle={() => handleToggle(match._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}