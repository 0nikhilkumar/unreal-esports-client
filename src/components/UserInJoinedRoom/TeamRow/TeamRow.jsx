import React from 'react';
import { ChevronDown, ChevronUp, Medal, Users } from 'lucide-react';
import TeamMemberCard  from '../TeamMemberCard/TeamMemberCard';

const TeamRow = ({ team, isExpanded, onToggle, rankColor }) => {
  return (
    <div className="group bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden">
      <div 
        className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-800/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-6">
          <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${rankColor} bg-gray-800/50`}>
            <Medal className="w-6 h-6" />
          </div>
          <div>
            <p className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">{team.name}</p>
            <p className="text-sm text-gray-400">Rank #{team.rank}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="text-yellow-400 font-bold text-xl">{team.points}</p>
            <p className="text-sm text-gray-400">points</p>
          </div>
          <div className="w-8 h-8 flex items-center justify-center">
            {isExpanded ? (
              <ChevronUp className="text-gray-400 group-hover:text-yellow-400 transition-colors" />
            ) : (
              <ChevronDown className="text-gray-400 group-hover:text-yellow-400 transition-colors" />
            )}
          </div>
        </div>
      </div>
      
      <div className={`transition-all duration-300 ${
        isExpanded ? 'max-h-[100%] opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="p-6 border-t border-gray-700/50 bg-gray-900/30">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="text-yellow-400 w-5 h-5" />
            <span className="text-sm font-medium text-gray-300">Team Members</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {team.members.map((member) => (
              <TeamMemberCard key={member.id} {...member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default TeamRow;