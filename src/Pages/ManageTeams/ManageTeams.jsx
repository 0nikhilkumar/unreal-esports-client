import React, { useEffect, useRef, useState } from "react";
import { Camera, ChevronDown, ChevronUp, Search } from "lucide-react";
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
    await updateTierForHost({ teamId, newTier });
  };

  const getUpdateTeamTier = async () => {
    try {
      const res = await getUpdateTierFor();
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

  const getTierBadgeStyle = (tier) => {
    switch (tier) {
      case "T1":
        return "bg-yellow-500";
      case "T2":
        return "bg-blue-500";
      case "T3":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredTeams = teamTiers.filter(
    (team) =>
      team.teamName?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
      (selectedTier === "All" || team.updateTeamTier[0]?.tier === selectedTier)
  );

  const TeamCard = ({ team }) => {
    const currentTier =
      teamTiers.find((t) => t._id === team._id)?.tier ||
      team.updateTeamTier[0].tier;
    const isExpanded = expandedTeam === team._id;

    return (
      <div
        className={`rounded-lg overflow-hidden ${
          isExpanded ? "bg-[#111]" : ""
        }`}
      >
        <div
          className={`p-4 cursor-pointer border border-[#333] ${
            isExpanded ? "bg-[#111]" : "bg-[#1A1A1A]"
          }`}
          onClick={() => toggleTeam(team._id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="relative group"
                onClick={(e) => handleImageClick(team._id, e)}
              >
                <img
                  src={
                    teamLogos[team._id] || team.logo || "/images/logo-fav.png"
                  }
                  alt={`${team.teamName} logo`}
                  className="w-12 h-12 object-cover rounded-full bg-[#222]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100">
                  <Camera className="w-4 h-4" />
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
                <h2 className="font-medium text-lg text-white">
                  {team.teamName}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-0.5 text-xs rounded ${getTierBadgeStyle(
                      currentTier
                    )} text-black font-medium`}
                  >
                    {currentTier}
                  </span>
                </div>
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="border-x border-b border-[#333] p-4 bg-[#111]">
            <div className="mb-4 pl-5">
              <h3 className="text-sm font-medium text-gray-400 mb-3">ROSTER</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-0">
                  <thead>
                    <tr className="text-xs text-gray-400">
                      <th className="text-left pb-2">IGN</th>
                      <th className="text-left pb-2">IGID</th>
                      <th className="text-left pb-2">EMAIL</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {team.players.map((player, index) => (
                      <tr key={index} className="border-t border-[#222]">
                        <td className="py-2">{player.ign}</td>
                        <td className="py-2">{player.igId}</td>
                        <td className="py-2">{player.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pl-5">
              <span className="text-sm text-gray-400">Tier:</span>
              <select
                value={currentTier}
                onChange={(e) => updateTier(e, team._id)}
                className="h-8 px-3 bg-[#222] border border-[#333] rounded text-sm focus:outline-none focus:border-[#666] py-1"
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
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 sm:mb-10">
          Team Management
        </h1>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Tier Filter */}
          <div className="relative flex-1 max-w-full md:max-w-xs">
            <select
              className="w-full h-10 px-3 sm:px-4 bg-[#1A1A1A] border border-[#333] rounded focus:outline-none focus:border-[#666] text-sm sm:text-base"
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
            >
              <option value="All">All</option>
              <option value="T3">T3</option>
              <option value="T2">T2</option>
              <option value="T1">T1</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              ref={searchInputRef}
              placeholder="Search teams..."
              className="w-full h-10 px-3 sm:px-4 pl-8 sm:pl-10 bg-[#1A1A1A] border border-[#333] rounded focus:outline-none focus:border-[#666] text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <span className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
              Ctrl + K
            </span>
          </div>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredTeams.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 text-sm sm:text-base">
              Team doesn't exist
            </div>
          ) : (
            filteredTeams.map((team) => <TeamCard key={team._id} team={team} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageTeams;
