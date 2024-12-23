import React from 'react';
import { GripVertical } from 'lucide-react';

export function TeamCard({ team, onSlotChange }) {
  return (
    <div
      className={`rounded-lg shadow-md p-4 flex items-center gap-4 ${
        team.premium ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-white'
      }`}
    >
      <img
        src={team.logo}
        alt={`${team.name} logo`}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3
          className={`font-semibold text-lg ${
            team.premium ? 'text-yellow-600' : 'text-black'
          }`}
        >
          {team.name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <GripVertical className="text-gray-400" size={20} />
          <input
            type="number"
            value={team.slot || ''}
            onChange={(e) => onSlotChange(team.id, Number(e.target.value))}
            className="border rounded px-2 py-1 w-16"
            min={1}
            max={8}
            placeholder="Slot"
          />
        </div>
      </div>
    </div>
  );
}
