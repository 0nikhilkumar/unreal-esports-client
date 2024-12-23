import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import TeamRow  from '../TeamRow/TeamRow';
import { mockTeams } from '../data/mockTeams';
import { getRankColor } from '../utils/rankColor';

const LeaderboardSection = () => {
  const [expandedTeam, setExpandedTeam] = useState(null);

  const toggleTeam = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  const sortedTeams = [...mockTeams]
  .sort((a, b) => b.points - a.points) // Sort by points in descending order
  .map((team, index) => ({ ...team, rank: index + 1 })); // Assign rank based on position


  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 overflow-hidden">
  <div className="flex items-center justify-center space-x-3 sm:space-y-0 sm:space-x-3 mb-6 md:mb-8">
    <Trophy className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8" />
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
      Tournament Leaderboard
    </h2>
  </div>

  <div className="space-y-4 h-[calc(100vh-20rem)] sm:h-[calc(100vh-22rem)] md:h-[calc(100vh-24rem)] overflow-y-auto scrollbar-hidden">
    {sortedTeams.map((team) => (
      <TeamRow
        key={team.id}
        team={team}
        isExpanded={expandedTeam === team.id}
        onToggle={() => toggleTeam(team.id)}
        rankColor={getRankColor(team.rank)}
      />
    ))}
  </div>
</div>

  );
};

export default LeaderboardSection;  