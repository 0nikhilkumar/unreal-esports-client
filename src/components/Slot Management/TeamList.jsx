import React from 'react';
import { TeamCard } from './TeamCard';



export function TeamList({ teams, onSlotChange }) {
  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          onSlotChange={onSlotChange}
        />
      ))}
    </div>
  );
}