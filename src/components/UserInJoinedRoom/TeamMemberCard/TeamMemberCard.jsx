import React from 'react';

const TeamMemberCard = ({ ign, id }) => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300">
      <p className="text-white font-medium mb-1">{ign}</p>
      <p className="text-sm text-gray-400">ID: {id}</p>
    </div>
  );
};

export default TeamMemberCard;