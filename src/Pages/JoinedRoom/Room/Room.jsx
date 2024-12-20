import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Mock data for demonstration
const mockPlayers = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Team ${i + 1}`,
  points: Math.floor(Math.random() * 1000),
  players: Array.from({ length: 4 }, (_, j) => ({
    ign: `Player${j + 1}`,
    igId: `IG${j + 1}_${i + 1}`,
  })),
}));

const Room = () => {
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(null);
  const roomId = "ABC123";
  const roomPassword = "pass123";

  const handleRowClick = (index) => {
    setSelectedTeamIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="min-h-screen pb-5 bg-gray-900 text-gray-100">
      {/* Header Section */}
      <header className="bg-gray-800 py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-100 tracking-wider uppercase">Game Metrics</h1>
          <p className="text-gray-400 text-sm">Competitive and Thrilling Matches</p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto mt-8 flex flex-col lg:flex-row gap-6 px-4">
        {/* Room Details Section */}
        <section className="lg:w-1/3 bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Room Details</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Room ID: <span className="font-semibold text-gray-200 bg-gray-700 px-2 py-1 rounded">{roomId}</span></p>
            <p className="text-sm text-gray-400">Password: <span className="font-semibold text-gray-200 bg-gray-700 px-2 py-1 rounded">{roomPassword}</span></p>
          </div>
        </section>

        {/* Room Point Table Section */}
        <section className="lg:w-2/3 bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Leaderboard</h2>
          <div
            className="border border-gray-700 rounded-lg overflow-hidden h-[calc(100vh-300px)]"
            style={{ overflowY: 'auto' }}
          >
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800 sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Teams
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {mockPlayers.sort((a, b) => b.points - a.points).map((team, index) => (
                  <React.Fragment key={team.id}>
                    <tr 
                      className="hover:bg-gray-800 transition-colors duration-150 ease-in-out cursor-pointer"
                      onClick={() => handleRowClick(index)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-100">{team.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {team.points}
                      </td>
                    </tr>

                    {/* Dropdown (expandable section) */}
                    {selectedTeamIndex === index && (
                      <tr>
                        <td colSpan={3} className="px-6 py-4">
                          <div className="bg-gray-800 rounded-lg shadow-inner p-4 animate-fadeIn">
                            <h4 className="text-lg font-semibold text-gray-100 mb-2">Team Players</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {team.players.map((player, playerIndex) => (
                                <div key={playerIndex} className="bg-gray-700 p-3 rounded-md">
                                  <p className="text-sm font-medium text-gray-200">IGN: {player.ign}</p>
                                  <p className="text-xs text-gray-400">IG ID: {player.igId}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Room;

