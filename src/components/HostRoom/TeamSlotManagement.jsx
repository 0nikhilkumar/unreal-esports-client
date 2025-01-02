import React, { useState, useEffect } from "react";
import TeamList from "../Slot Management/TeamList";

const scrollbarHideStyle = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

function TeamSlotManagement({ inRoomTeam }) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (Array.isArray(inRoomTeam)) {
      setTeams(inRoomTeam.map(team => ({ ...team, slot: null })));
    }
  }, [inRoomTeam]);

  const handleSlotChange = (teamId, slot) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team._id === teamId ? { ...team, slot } : team
      )
    );
  };


  return (
    <>
      <style>{scrollbarHideStyle}</style>
      <div className="bg-black rounded-lg shadow-md p-4 sm:p-6 md:p-8 w-full mt-5 scrollbar-hidden">
        <h1 className="text-center text-2xl text-white mb-4">
          Team Slot Management
        </h1>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assign Team Slots Section */}
          <div className="h-[calc(100vh-200px)]">
            <div className="bg-gradient-to-br from-gray-800 to-blue-900 rounded-lg shadow-lg p-4 sm:p-6 h-full flex flex-col">
              <h2 className="text-xl font-semibold text-white mb-6">
                Assign Team Slots
              </h2>
              <div className="overflow-y-auto flex-grow">
                <TeamList teams={teams} onSlotChange={handleSlotChange} />
              </div>
            </div>
          </div>

          {/* Slot Overview Section */}
          <div className="h-[calc(100vh-200px)]">
            <div className="bg-gradient-to-br from-gray-800 to-blue-900 rounded-lg shadow-lg p-4 sm:p-6 h-full flex flex-col">
              <h2 className="text-xl font-semibold text-white mb-4">
                Slot Overview
              </h2>
               <div className="overflow-y-auto flex-grow">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
                  {Array.from({ length: teams.length }, (_, i) => i + 1).map((slot) => {
                    const teamInSlot = teams.find((team) => team.slot === slot);
                    return (
                      <div
                        key={slot}
                        className={`p-3 sm:p-4 rounded-lg ${
                          teamInSlot
                            ? "bg-blue-50 border border-blue-200"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <div className="font-medium text-black">Slot {slot}</div>
                        <div className="text-sm mt-1 text-gray-600">
                          {teamInSlot ? teamInSlot.teamName : "Empty"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamSlotManagement;

