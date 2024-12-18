import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [avatar, setAvatar] = useState("https://via.placeholder.com/150");
  const [follow, setFollow] = useState(false);

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

  const leaderboardPlayers = Array.from({ length: 50 }, (_, index) => ({
    name: `Player ${index + 1}`,
    score: Math.floor(Math.random() * 1000), // Random score for demo purposes
  })).sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8">
      {/* Header Section */}
      <header className="w-full max-w-4xl text-center mb-6">
        <h1 className="text-4xl font-bold">Esports Profile</h1>
        <p className="text-gray-400 mt-2">
          Level up and dominate the leaderboard!
        </p>
      </header>

      {/* Profile Section */}
      <section className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={avatar}
              alt="Player Avatar"
              className="w-32 h-32 rounded-full"
            />
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

      {/* Stats and Team Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Stats Section */}
        <section className="bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-5 text-center">Player Stats</h3>
          <div className="grid grid-rows-3 gap-4">
            <div className="text-center bg-gray-900 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Games Played</h4>
              <p className="text-3xl font-bold text-indigo-600">125</p>
            </div>
            <div className="text-center bg-gray-900 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Wins</h4>
              <p className="text-3xl font-bold text-green-600">78</p>
            </div>
            <div className="text-center bg-gray-900 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Win Rate</h4>
              <p className="text-3xl font-bold text-yellow-500">62%</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-5 text-center">Team Members</h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              "PlayerOne",
              "PlayerTwo",
              "PlayerThree",
              "PlayerFour",
              "PlayerFive",
            ].map((member, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-900 p-4 rounded-lg"
              >
                <div className="text-lg font-semibold">{member}</div>
                <button className="rounded-lg">
                  <FaEdit />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Leaderboard Section */}
      <section className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-md p-6 mt-6 hide-scrollbar">
        <h3 className="text-xl font-bold mb-5 text-center">Leaderboard</h3>
        <div className="overflow-y-auto max-h-96">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Player Name</th>
                <th className="py-2 px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardPlayers.map((player, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  }`}
                >
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
