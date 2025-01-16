import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { getLeaderboardData } from "../../../http";
import Loader from "../../../components/Loader/Loader";

export default function MatchCard({ match, isOpen, onToggle }) {
  const [leaderboardTeamData, setLeaderboardTeamData] = useState(
    match.joinedTeam
  ); // Default value as joinedTeam
  const [loading, setLoading] = useState(false);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    try {
      const res = await getLeaderboardData(match._id);
      const apiData = res.data.data.leaderboardData;
      setLeaderboardTeamData(apiData || match.joinedTeam); 
    } catch (error) {
      // console.log("Error fetching leaderboard data:");
      console.log("ERROR: fetching data")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [match._id]);


  if (loading) return <Loader />;

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-blue-500">
      <div
        className="px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-700"
        onClick={onToggle}
      >
        <div className="flex-1 mb-2 sm:mb-0">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-400">
            {match.roomName}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-300">
            {match.hostId.preferredName}
          </p>
        </div>
        <div>{}</div>
        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
          <span className="font-medium text-purple-400">{"Erangle"}</span>
          <span className="font-medium text-green-400">{match.date}</span>
          <span className="font-medium text-green-400">{match.time}</span>
          <ChevronDownIcon
            className={`h-5 w-5 sm:h-6 sm:w-6 text-blue-400 transition-transform duration-300 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="border-t border-blue-500 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                  Pts
                </th>
                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                  Finishes
                </th>
                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {leaderboardTeamData
                ?.sort((a, b) => b.total - a.total)
                .map((team, index) => (
                  <tr
                    key={index}
                    className="transition-colors duration-200 ease-in-out hover:bg-gray-700"
                  >
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-purple-400">
                      {index + 1 || "#"}
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                      {team.teamId.teamName}
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                      {team.placePts || 0}
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                      {team.finishes || 0}
                    </td>
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-green-400">
                      {team.total || 0}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
