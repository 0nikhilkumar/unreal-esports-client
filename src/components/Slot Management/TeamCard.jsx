import React from 'react';

function TeamCard({ team, onSlotChange ,index}) {
  if (!team) {
    return null;
  }

  return (
    <div className="rounded-lg shadow-md h-fit p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white w-full">
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-5">
    {/* Team Info */}
    <div>
      <h3 className="font-semibold text-xs sm:text-base lg:text-xl text-black">
        {index}. {team.teamName || "Unnamed Team"}
      </h3>
      {/* Uncomment below if you want to display the number of players */}
      {/* <p className="text-xs text-gray-600">
        Players: {team.players ? team.players.length : 0}
      </p> */}
    </div>
    
    {/* Slot Input */}
    <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:justify-end">
      <input
        type="number"
        value={team.slot || ""}
        onChange={(e) => onSlotChange(team._id, Number(e.target.value))}
        className="border rounded border-gray-700 text-center text-black px-2 py-1 w-20 sm:w-24 lg:w-32"
        min={1}
        placeholder="Slot"
      />
    </div>
  </div>
</div>

  );
}

export default TeamCard;

