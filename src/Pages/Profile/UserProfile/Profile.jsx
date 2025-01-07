import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { getUserTeam } from "../../../http";

const Profile = () => {
  const [teamMembers, setTeamMembers] = useState([
    { name: 'PlayerOne', ign: 'player1IGN', igid: 'player1IGID', email: 'player1@example.com' },
    { name: 'PlayerTwo', ign: 'player2IGN', igid: 'player2IGID', email: 'player2@example.com' },
    { name: 'PlayerThree', ign: 'player3IGN', igid: 'player3IGID', email: 'player3@example.com' },
    { name: 'PlayerFour', ign: 'player4IGN', igid: 'player4IGID', email: 'player4@example.com' },
    { name: 'PlayerFive', ign: 'player5IGN', igid: 'player5IGID', email: 'player5@example.com' },
  ]);
  const [editableField, setEditableField] = useState({ playerIndex: null, field: null });
  const [avatar, setAvatar] = useState("https://via.placeholder.com/150");
  const [follow, setFollow] = useState(false);
  const [teams, setTeams] = useState(null);
  const [editableTeamName, setEditableTeamName] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

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
    setTeamName(res.data.data?.teamName);
  };

  const handleEmailVerify = () => {
    // Simulate email verification logic
    setEmailVerified(true);
    alert("Email Verified Successfully!");
  };

  const handlePasswordReset = () => {
    // Simulate password reset logic
    setResetPassword(true);
    alert("Password Reset Link Sent to Your Email!");
  };

  useEffect(() => {
    getTeams();
  }, []);

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
          </div>
        </div>

        <div className="mt-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              emailVerified ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            onClick={handleEmailVerify}
            disabled={emailVerified}
          >
            {emailVerified ? "Email Verified" : "Verify Email"}
          </button>
        </div>
        <div className="mt-4">
          <button
            className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700"
            onClick={handlePasswordReset}
          >
            Reset Password
          </button>
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
              onChange={(e) => setTeamName(e.target.value)}
              className="bg-gray-900 text-white p-2 rounded-lg"
            />
          ) : (
            <h4
              className="text-2xl font-semibold cursor-pointer"
              onClick={() => setEditableTeamName(true)}
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
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}`}
                >
                  <td className="py-2 px-4">{member.name}</td>
                  <td className="py-2 px-4">{member.ign}</td>
                  <td className="py-2 px-4">{member.igid}</td>
                  <td className="py-2 px-4">{member.email}</td>
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
