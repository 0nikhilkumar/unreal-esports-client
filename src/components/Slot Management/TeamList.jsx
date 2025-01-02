import React from 'react';
import TeamCard from './TeamCard';

function TeamList({ teams, onSlotChange }) {
  if (!teams || teams.length === 0) {
    return <div className="text-white text-center">No teams available.</div>;
  }

  return (
    <div className="space-y-4">
      {teams.map((team,index) => (
        <TeamCard
          key={team._id}
          team={team}
          index= {index+1}
          onSlotChange={onSlotChange}
        />
      ))}
    </div>
  );
}

export default TeamList;

