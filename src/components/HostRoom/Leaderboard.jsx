import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { useParams } from "react-router-dom";
import { hostGetLeaderboardData, updateLeaderboardApi } from "../../http";
import toast from "react-hot-toast";

const Leaderboard = ({ inRoomTeam }) => {
  const [teams, setTeams] = useState([]);
  const [editingCell, setEditingCell] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const res = await hostGetLeaderboardData(id);
        if (
          res.data.leaderboard.leaderboardData &&
          Array.isArray(res.data.leaderboard.leaderboardData)
        ) {
          const updatedTeams = inRoomTeam.map((team) => {
            const backendData = res.data.leaderboard.leaderboardData.find(
              (item) => item.teamId === team.teamId._id
            );
            return {
              id: team.teamId._id,
              teamName: team.teamId?.teamName || "Unknown Team",
              finishes: backendData ? backendData.finishes : 0,
              placePts: backendData ? backendData.placePts : 0,
              total: backendData ? backendData.total : 0,
            };
          });
          setTeams(updatedTeams);
        } else {
          // If no backend data, initialize with inRoomTeam data
          const initialTeams = inRoomTeam.map((team) => ({
            id: team.teamId._id,
            teamName: team.teamId?.teamName || "Unknown Team",
            finishes: 0,
            placePts: 0,
            total: 0,
          }));
          setTeams(initialTeams);
        }
      } catch (error) {
        // console.error("Error fetching leaderboard data:", error);
        // Initialize with inRoomTeam data if fetch fails
        const initialTeams = inRoomTeam.map((team) => ({
          id: team.teamId._id,
          teamName: team.teamId?.teamName || "Unknown Team",
          finishes: 0,
          placePts: 0,
          total: 0,
        }));
        setTeams(initialTeams);
      }
    };

    fetchLeaderboardData();
  }, [id, inRoomTeam]);

  const handleScoreChange = (teamId, field, value) => {
    const numValue = parseInt(value) || 0;
    setTeams(
      teams.map((team) => {
        if (team.id === teamId) {
          const updatedTeam = { ...team, [field]: numValue };
          updatedTeam.total = updatedTeam.finishes + updatedTeam.placePts;
          return updatedTeam;
        }
        return team;
      })
    );
  };

  const handleSubmit = async () => {
    const isComplete = teams.every(
      (team) => team.teamName && (team.finishes > 0 || team.placePts > 0)
    );
    if (isComplete) {
      // Create the array of objects with required properties
      const leaderboardData = teams.map((team) => ({
        teamId: team.id,
        finishes: team.finishes,
        placePts: team.placePts,
        total: team.total,
      }));
      try {
        // Send the data to the backend
        const response = await updateLeaderboardApi(id, leaderboardData);
        if (response.status === 200) {
          toast.success("Leaderboard data has been saved successfully!");
        }
      } catch (error) {
        toast.error("There was an error sending the data to the backend.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-2  sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-4 sm:mb-8">
          Esports Leaderboard
        </h1>

        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm">
                    Team Name
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm">
                    Finishes
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm">
                    Place Points
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id} className="border-t border-gray-700">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                      <div className="bg-gray-700 rounded px-2 py-1 text-center">
                        {team.teamName}
                      </div>
                    </td>
                    {["finishes", "placePts"].map((field) => (
                      <td
                        key={field}
                        className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm"
                      >
                        {editingCell?.teamId === team.id &&
                        editingCell?.field === field ? (
                          <input
                            type="number"
                            value={team[field]}
                            onChange={(e) =>
                              handleScoreChange(team.id, field, e.target.value)
                            }
                            onBlur={() => setEditingCell(null)}
                            autoFocus
                            className="bg-gray-700 rounded px-2 py-1 w-12 sm:w-20 text-center"
                          />
                        ) : (
                          <div
                            onClick={() =>
                              setEditingCell({ teamId: team.id, field })
                            }
                            className="cursor-pointer hover:bg-gray-700 rounded py-1"
                          >
                            {team[field]}
                          </div>
                        )}
                      </td>
                    ))}
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm">
                      {team.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 sm:mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-8 rounded-lg transition-colors text-xs sm:text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
