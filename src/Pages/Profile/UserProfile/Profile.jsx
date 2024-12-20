import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { getUserTeam } from "../../../http";

const Profile = () => {
  const [teamMembers, setTeamMembers] = useState([
    { name: 'PlayerOne', ign: 'player1IGN', igid: 'player1IGID', email: 'player1@example.com' },
    { name: 'PlayerTwo', ign: 'player2IGN', igid: 'player2IGID', email: 'player2@example.com' },
    { name: 'PlayerThree', ign: 'player3IGN', igid: 'player3IGID', email: 'player3@example.com' },
    { name: 'PlayerFour', ign: 'player4IGN', igid: 'player4IGID', email: 'player4@example.com' },
    { name: 'PlayerFive', ign: 'player5IGN', igid: 'player5IGID', email: 'player5@example.com' }
  ]);
  const [editableField, setEditableField] = useState({ playerIndex: null, field: null });
  const [avatar, setAvatar] = useState("https://via.placeholder.com/150");
  const [follow, setFollow] = useState(false);
  const [teams, setTeams] = useState(null);
  const [editableTeamName, setEditableTeamName] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [editedFields, setEditedFields] = useState(false); // Track if any field is edited
  const [originalTeamMembers, setOriginalTeamMembers] = useState([]); // Track original data

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getTeams = async () => {
    const res = await getUserTeam();
    setTeams(res.data.data);
    setTeamName(res.data.data?.teamName); // Set initial team name
    setOriginalTeamMembers(res.data.data?.teamMembers || []); // Store original data
  };

  useEffect(() => {
    getTeams();
  }, []);

  const leaderboardPlayers = Array.from({ length: 50 }, (_, index) => ({
    name: `Player ${index + 1}`,
    score: Math.floor(Math.random() * 1000), // Random score for demo purposes
  })).sort((a, b) => b.score - a.score);

  const handleFieldClick = (index, field) => {
    if (editableField.playerIndex === index && editableField.field === field) {
      return;
    }
    setEditableField({ playerIndex: index, field: field });
  };

  const handleInputChange = (index, field, value) => {
    setTeamMembers((prevMembers) =>
      prevMembers.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      )
    );

    // Check if the updated value is same as the original value
    const isEdited = value !== originalTeamMembers[index][field];

    if (isEdited) {
      setEditedFields(true); // Mark as edited if value is changed
    } else {
      setEditedFields(false); // Hide submit if value is same as original
    }
  };

  const handleTeamNameEdit = () => {
    setEditableTeamName(!editableTeamName);
  };

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);

    // Check if the updated team name is same as the original
    if (event.target.value !== teams?.teamName) {
      setEditedFields(true);
    } else {
      setEditedFields(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8">
      {/* Header Section */}
      <header className="w-full max-w-4xl text-center mb-6">
        <h1 className="text-4xl font-bold">Esports Profile</h1>
        <p className="text-gray-400 mt-2">Level up and dominate the leaderboard!</p>
      </header>

      {/* Profile Section */}
      <section className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center">
          <div className="relative">
            <img src={avatar} alt="Player Avatar" className="w-32 h-32 rounded-full" />
            <label
              htmlFor="avatarUpload"
              className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700"
            >
              <span className="text-md">
                <MdModeEdit />
              </span>
            </label>
            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold">PlayerName123</h2>
            <p className="text-gray-400">Professional Gamer | Streamer</p>
            <div className="flex mt-4 space-x-4">
              <button
                className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700"
                onClick={() => setFollow(!follow)}
              >
                {follow ? "Followed" : "Follow"}
              </button>
              <button className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
                Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold mb-5 text-center">Your Team</h3>
        <div className="text-center">
          {editableTeamName ? (
            <input
              type="text"
              value={teamName}
              onChange={handleTeamNameChange}
              className="bg-gray-900 text-white p-2 rounded-lg"
            />
          ) : (
            <h4
              className="text-2xl font-semibold cursor-pointer"
              onClick={handleTeamNameEdit}
            >
              {teamName}
            </h4>
          )}
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left bg-gray-900">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 px-4">Player Name</th>
                <th className="py-2 px-4">IGN</th>
                <th className="py-2 px-4">IGID</th>
                <th className="py-2 px-4">Email</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <tr key={index} className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}`}>
                  <td className="py-2 px-4">{member.name}</td>
                  <td className="py-2 px-4">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleFieldClick(index, 'ign')}
                    >
                      {editableField.playerIndex === index && editableField.field === 'ign' ? (
                        <input
                          type="text"
                          value={member.ign}
                          onChange={(e) => handleInputChange(index, 'ign', e.target.value)}
                          className="bg-gray-700 text-white p-2 mb-2 rounded-lg"
                        />
                      ) : (
                        member.ign || 'Enter IGN'
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleFieldClick(index, 'igid')}
                    >
                      {editableField.playerIndex === index && editableField.field === 'igid' ? (
                        <input
                          type="text"
                          value={member.igid}
                          onChange={(e) => handleInputChange(index, 'igid', e.target.value)}
                          className="bg-gray-700 text-white p-2 mb-2 rounded-lg"
                        />
                      ) : (
                        member.igid || 'Enter IGID'
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleFieldClick(index, 'email')}
                    >
                      {editableField.playerIndex === index && editableField.field === 'email' ? (
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                          className="bg-gray-700 text-white p-2 mb-2 rounded-lg"
                        />
                      ) : (
                        member.email || 'Enter Email'
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        {editedFields && (
          <div className="mt-4 text-center">
            <button
              className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700"
              onClick={() => alert('Changes Submitted!')}
            >
              Submit Changes
            </button>
          </div>
        )}
      </section>

      {/* Leaderboard Section */}
      <section className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-5 text-center">Leaderboard</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-gray-900">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Player Name</th>
                <th className="py-2 px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardPlayers.map((player, index) => (
                <tr key={index} className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}`}>
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{player.name}</td>
                  <td className="py-2 px-4">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Profile;
