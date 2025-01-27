import React, { useState, useEffect } from "react"
import { getUserTeam } from "../../../http"
import { FaTwitch, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa"
import { SiRiotgames } from "react-icons/si"
import { FaEdit, FaSave } from "react-icons/fa"
import ResetPasswordPopup from "./ResetPasswordPopup"

const UserProfile = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "PlayerOne",
      ign: "player1IGN",
      igid: "player1IGID",
      email: "player1@example.com",
      isEditing: false,
    },
    {
      id: 2,
      name: "PlayerTwo",
      ign: "player2IGN",
      igid: "player2IGID",
      email: "player2@example.com",
      isEditing: false,
    },
    {
      id: 3,
      name: "PlayerThree",
      ign: "player3IGN",
      igid: "player3IGID",
      email: "player3@example.com",
      isEditing: false,
    },
    {
      id: 4,
      name: "PlayerFour",
      ign: "player4IGN",
      igid: "player4IGID",
      email: "player4@example.com",
      isEditing: false,
    },
    {
      id: 5,
      name: "PlayerFive",
      ign: "player5IGN",
      igid: "player5IGID",
      email: "player5@example.com",
      isEditing: false,
    },
  ])

  const [avatar, setAvatar] = useState("/images/valo1.jpeg")
  const [editableTeamName, setEditableTeamName] = useState(false)
  const [teamName, setTeamName] = useState("")
  const [resetPassword, setResetPassword] = useState(false)
  const [teams, setTeams] = useState(null)
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [contactNo, setContactNo] = useState("+1234567890")
  const [email, setEmail] = useState("john.doe@example.com")

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePasswordReset = () => {
    setResetPassword(true)
  }

  useEffect(() => {
    const getTeams = async () => {
      try {
        const res = await getUserTeam()
        setTeams(res.data.data)
        setTeamName(res.data.data?.teamName || "Team Name")
      } catch (error) {
        console.error("Failed to fetch team data:", error)
      }
    }
    getTeams()
  }, [])

  const toggleEdit = (id) => {
    setTeamMembers(
      teamMembers.map((member) => (member.id === id ? { ...member, isEditing: !member.isEditing } : member)),
    )
  }

  const handleMemberUpdate = (id, field, value) => {
    setTeamMembers(teamMembers.map((member) => (member.id === id ? { ...member, [field]: value } : member)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white pb-12">
      {/* Hero Banner */}
      <div className="relative h-[40vh] bg-[url('/images/esports-banner.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 px-6 py-8 max-w-7xl mx-auto">
          <div className="flex items-end space-x-8">
            <div className="relative">
              <img
                src={avatar || "/placeholder.svg"}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-indigo-600 shadow-lg object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </label>
              <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight mb-2">
                {firstName} {lastName}
              </h1>
              <h1 className="text-lg font-bold tracking-tight mb-2">PlayerName123</h1>
              <p className="text-md text-indigo-300 mb-4">Professional Valorant Player | Team Captain</p>
              <div className="flex gap-4">
                <button
                  className="bg-indigo-600 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
                  onClick={() => handlePasswordReset()}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {resetPassword && <ResetPasswordPopup setResetPassword={setResetPassword} />}

      {/* Personal Info */}

      <div className="max-w-7xl mx-auto px-6 pt-12 ">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl mb-12">
          <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Contact Number</label>
              <input
                type="tel"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email ID</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded bg-gray-700 text-white p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Career Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-indigo-300">Matches Played</p>
                <p className="text-3xl font-bold">1,234</p>
              </div>
              <div>
                <p className="text-indigo-300">Win Rate</p>
                <p className="text-3xl font-bold">68%</p>
              </div>
              <div>
                <p className="text-indigo-300">K/D Ratio</p>
                <p className="text-3xl font-bold">1.85</p>
              </div>
              <div>
                <p className="text-indigo-300">Headshot %</p>
                <p className="text-3xl font-bold">42%</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Recent Achievements</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">🏆</span>
                <span>1st Place - Valorant Champions Tour 2023</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-400 mr-2">🥈</span>
                <span>2nd Place - ESL One Rio 2023</span>
              </li>
              <li className="flex items-center">
                <span className="text-yellow-700 mr-2">🥉</span>
                <span>3rd Place - DreamHack Masters Spring 2023</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Social Media</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href="#" className="flex items-center text-indigo-300 hover:text-indigo-100 transition-colors">
                <FaTwitch className="mr-2" /> Twitch
              </a>
              <a href="#" className="flex items-center text-indigo-300 hover:text-indigo-100 transition-colors">
                <FaYoutube className="mr-2" /> YouTube
              </a>
              <a href="#" className="flex items-center text-indigo-300 hover:text-indigo-100 transition-colors">
                <FaTwitter className="mr-2" /> Twitter
              </a>
              <a href="#" className="flex items-center text-indigo-300 hover:text-indigo-100 transition-colors">
                <FaInstagram className="mr-2" /> Instagram
              </a>
              <a href="#" className="flex items-center text-indigo-300 hover:text-indigo-100 transition-colors">
                <SiRiotgames className="mr-2" /> Riot ID
              </a>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            {editableTeamName ? (
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="bg-gray-700 text-white p-3 rounded-lg text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
                onBlur={() => setEditableTeamName(false)}
              />
            ) : (
              <h2
                className="text-2xl font-bold cursor-pointer hover:text-indigo-400 transition-colors"
                onClick={() => setEditableTeamName(true)}
              >
                {teamName}
              </h2>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-6 text-indigo-300 font-semibold">Player Name</th>
                  <th className="text-left py-4 px-6 text-indigo-300 font-semibold">IGN</th>
                  <th className="text-left py-4 px-6 text-indigo-300 font-semibold">IGID</th>
                  <th className="text-left py-4 px-6 text-indigo-300 font-semibold">Email</th>
                  <th className="text-left py-4 px-6 text-indigo-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <td className="py-4 px-6">
                      {member.isEditing ? (
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleMemberUpdate(member.id, "name", e.target.value)}
                          className="bg-gray-700 text-white p-2 rounded w-full"
                        />
                      ) : (
                        member.name
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {member.isEditing ? (
                        <input
                          type="text"
                          value={member.ign}
                          onChange={(e) => handleMemberUpdate(member.id, "ign", e.target.value)}
                          className="bg-gray-700 text-white p-2 rounded w-full"
                        />
                      ) : (
                        member.ign
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {member.isEditing ? (
                        <input
                          type="text"
                          value={member.igid}
                          onChange={(e) => handleMemberUpdate(member.id, "igid", e.target.value)}
                          className="bg-gray-700 text-white p-2 rounded w-full"
                        />
                      ) : (
                        member.igid
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {member.isEditing ? (
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleMemberUpdate(member.id, "email", e.target.value)}
                          className="bg-gray-700 text-white p-2 rounded w-full"
                        />
                      ) : (
                        member.email
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleEdit(member.id)}
                        className={`p-2 rounded ${
                          member.isEditing ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"
                        } transition-colors`}
                        aria-label={member.isEditing ? "Save" : "Edit"}
                      >
                        {member.isEditing ? <FaSave className="w-5 h-5" /> : <FaEdit className="w-5 h-5" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

