import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  ChevronDown,
  ChevronUp,
  Trophy,
  Users,
  Search,
} from "lucide-react";
import { getUpdateTierFor, updateTierForHost } from "../../http";

function ManageTeams() {
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [teamTiers, setTeamTiers] = useState([]);
  const [teamLogos, setTeamLogos] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("All");
  const fileInputRefs = useRef({});
  const searchInputRef = useRef(null);

  const updateTier = async (e, teamId) => {
    e.stopPropagation();
    const newTier = e.target.value;

    setTeamTiers((prevTiers) =>
      prevTiers.map((team) =>
        team._id === teamId ? { ...team, tier: newTier } : team
      )
    );

    // Update the tier in the backend
    await updateTierForHost({ teamId, newTier });
  };

  console.log(teamTiers);

  const getUpdateTeamTier = async () => {
    try {
      const res = await getUpdateTierFor();
      console.log(res.data.data);
      setTeamTiers(res.data.data);
    } catch (error) {
      console.error("Error fetching team data: ", error);
    }
  };

  useEffect(() => {
    getUpdateTeamTier();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleTeam = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  const handleImageClick = (teamId, e) => {
    e.stopPropagation();
    fileInputRefs.current[teamId].click();
  };

  const handleImageUpload = (teamId, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamLogos((prev) => ({
          ...prev,
          [teamId]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "T1":
        return "text-yellow-500";
      case "T2":
        return "text-blue-500";
      case "T3":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const filteredTeams = teamTiers.filter(
    (team) =>
      team.teamName?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
      (selectedTier === "All" || team.tier === selectedTier)
  );

  return (
    <div className="container w-full min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold my-14 mb-20 text-center">
        Team Management
      </h1>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-14">
        <div className="relative">
          <select
            className="py-3 px-6 bg-gray-800 text-white border border-gray-700 rounded-xl shadow-lg focus:outline-none cursor-pointer"
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
          >
            <option value="All">All</option>
            <option value="T3">T3</option>
            <option value="T2">T2</option>
            <option value="T1">T1</option>
          </select>
        </div>

        <div className="relative w-full max-w-md">
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search by Team Name"
            className="w-full p-3 pl-10 pr-20 rounded-xl border border-gray-700 bg-gray-800 text-white focus:outline-none shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </span>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            (Ctrl + K)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeams.map((team) => {
          console.log(team.updateTeamTier[0].tier)
          const currentTier =
            teamTiers.find((t) => t._id === team._id)?.tier || team.updateTeamTier[0].tier; // Use 'T1' as fallback if not found
          return (
            <div
              key={team._id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleTeam(team._id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className="relative group"
                      onClick={(e) => handleImageClick(team._id, e)}
                    >
                      <img
                        src={
                          teamLogos[team._id] || team.logo || "/placeholder.svg"
                        }
                        alt={`${team.teamName} logo`}
                        className="w-16 h-16 object-cover rounded-full border-2 border-blue-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <input
                        type="file"
                        ref={(el) => (fileInputRefs.current[team._id] = el)}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(team._id, e)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{team.teamName}</h2>
                      <div className="flex items-center mt-1">
                        <Trophy className="w-5 h-5 mr-2" />
                        <span
                          className={`font-semibold ${getTierColor(
                            currentTier
                          )}`}
                        >
                          {currentTier}
                        </span>
                      </div>
                    </div>
                  </div>
                  {expandedTeam === team._id ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </div>
              </div>
              {expandedTeam === team._id && (
                <div className="bg-gray-700 p-6 rounded-b-lg">
                  <h3 className="font-semibold text-xl mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Team Roster
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-400">
                          <th className="pb-2">IGN</th>
                          <th className="pb-2">IGID</th>
                          <th className="pb-2">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {team.players.map((player, index) => (
                          <tr key={index} className="border-t border-gray-600">
                            <td className="py-2">{player.ign}</td>
                            <td className="py-2">{player.igId}</td>
                            <td className="py-2">{player.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <label className="font-semibold text-white mr-4">
                      Change Tier:
                    </label>
                    <select
                      value={currentTier} // Display the current tier for this team
                      onChange={(e) => updateTier(e, team._id)}
                      className="py-2 px-4 bg-gray-800 text-white border border-gray-700 rounded-md shadow-lg"
                    >
                      <option value="T1">T1</option>
                      <option value="T2">T2</option>
                      <option value="T3">T3</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageTeams;
