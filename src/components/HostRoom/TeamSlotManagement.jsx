import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { sendSlotUpdate, socketInit } from "../../socket";
import TeamList from "../Slot Management/TeamList";
import { updateUserTeamSlot } from "../../http";

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
  const { id } = useParams();
  const [allTeamDataWithSlot, setAllTeamDataWithSlot] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(() => {
    socketInit(id);
  }, [id]);
  
  const sendSlotDataToBackend = async () => {
    try {
      await updateUserTeamSlot(id, allTeamDataWithSlot);
      toast.success("Team slots successfully assigned!");
    } catch (error) {
      console.error("Failed to submit data:", error);
      toast.error("Failed to submit team slots. Please try again.");
    }
  };

  useEffect(() => {
    if (Array.isArray(inRoomTeam)) {
      setTeams(
        inRoomTeam.map((team) => ({
          ...team.teamId,
          slot: team.slot || null,
        }))
      );

      const preFilledData = inRoomTeam.map((team) => ({
        teamId: team.teamId?._id || team.teamId,
        slot: team.slot || null,
        teamName: team.teamId?.teamName,
      }));
      setAllTeamDataWithSlot(preFilledData);
    }
  }, [inRoomTeam]);

  const handleSlotChange = (teamId, slot) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team?._id === teamId ? { ...team, slot: String(slot) } : team
      )
    );

    setAllTeamDataWithSlot((prevData) => {
      const updatedData = prevData.map((item) =>
        item.teamId === teamId ? { ...item, slot: String(slot) } : item
      );

      if (!updatedData.find((item) => item.teamId === teamId)) {
        const team = teams.find((team) => team?._id === teamId);
        updatedData.push({
          teamId,
          slot: Number(slot),
          teamName: team?.teamName || "Unknown",
        });
      }

      // Emit socket event with slot update
      updatedData.forEach(data => {
        sendSlotUpdate({
          roomId: id,
          slot: data.slot,
          teamId: data.teamId
        });
      });

      return updatedData;
    });
  };

  const handleSubmitDisable = () => {
    const allTeamsHaveSlot = inRoomTeam.every((team) => team.slot !== null && team.slot !== undefined);
    setIsSubmitDisabled(false); // Always keep the button enabled
  };
  
  useEffect(() => {
    handleSubmitDisable();
  }, [inRoomTeam]);

  const handleSubmitData = async () => {
    const allSlotsFilled = allTeamDataWithSlot.every(team => team.slot !== null && team.slot !== undefined);
    if (allSlotsFilled) {
      await sendSlotDataToBackend();
      setIsSubmitDisabled(true);
    } else {
      toast.error("Please assign all slots before submitting.");
    }
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
                <TeamList teams={teams} onSlotChange={handleSlotChange} isSubmitDisabled={isSubmitDisabled} />
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
                  {Array.from({ length: teams.length }, (_, i) => i + 1).map(
                    (slot) => {
                      const teamInSlot = allTeamDataWithSlot.find(
                        (data) => Number(data.slot) === slot
                      );
                      return (
                        <div
                          key={slot}
                          className={`p-3 sm:p-4 rounded-lg ${
                            teamInSlot
                              ? "bg-blue-50 border border-blue-200"
                              : "bg-gray-50 border border-gray-200"
                          }`}>
                          <div className="font-medium text-black">
                            Slot {slot}{" "}
                          </div>
                          <div className="text-sm mt-1 text-gray-600">
                            {teamInSlot ? teamInSlot?.teamName : "Empty"}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center pt-6">
          <button
            className={`bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:from-blue-700 active:to-purple-800 text-white rounded-lg px-6 py-2 tracking-wider shadow-lg transform transition duration-300 hover:scale-105 active:scale-95 font-bold`}
            onClick={handleSubmitData}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default TeamSlotManagement;

