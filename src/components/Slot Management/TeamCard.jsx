import React from 'react';
import { GripVertical } from 'lucide-react';



 function TeamCard({ team, onSlotChange }) {
  return (
    <div
      className={`rounded-lg shadow-md h-fit p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-4 ${
        team.premium ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-white'
      }`}
    >
      {/* <img
        src={team.logo}
        alt={`${team.name} logo`}
        className="w-16 h-16 rounded-full object-cover"
      /> */}
      <div className="flex flex-row px-4 items-center gap-5 sm:justify-between sm:items-center sm:w-full">
        <h3
          className={`font-semibold text-xs sm:text-xl ${
            team.premium ? 'text-yellow-600' : 'text-black'
          }`}
        >
          {team.id}.{team.name}
        </h3>
        <div className="flex items-center justify-center gap-2 mt-2 w-10 rounded-sm">
          {/* <GripVertical className="text-gray-400" size={20} /> */}
          <input
            type="number"
            value={team.slot || ''}
            onChange={(e) => onSlotChange(team.id, Number(e.target.value))}
            className="border rounded border-gray-700 text-center text-black px-1 py-0 w-10 sm:w-24 lg:w-32"
            min={1}
            max={8}
            placeholder="Slot"
          />
        </div>
      </div>
    </div>
  );
}
export default TeamCard