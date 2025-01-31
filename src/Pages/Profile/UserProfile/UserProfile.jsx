import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaSave } from "react-icons/fa";
import { getUserProfile, getUserTeam, updateUserProfile, updateUserTeam } from "../../../http";
import ResetPasswordPopup from "./ResetPasswordPopup";
import SocialMediaLinks from "./SocialMedia";

const UserProfile = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [avatar, setAvatar] = useState("/images/valo1.jpeg");
  const [editableTeamName, setEditableTeamName] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [contact, setContact] = useState("+1234567890");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState();

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

  const handlePasswordReset = () => {
    setResetPassword(true);
  };

  useEffect(() => {
    const getTeams = async () => {
      try {
        const res = await getUserTeam();
        setTeamMembers(res.data.data.players);
        setTeamName(res.data.data?.teamName || "Team Name");
      } catch (error) {
        console.error("Failed to fetch team data:", error);
      }
    };
    getTeams();
  }, []);

  const toggleEdit = (id) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.playerNumber === id ? { ...member, isEditing: !member.isEditing } : member
      )
    );
  };

  const handleMemberUpdate = async(id, field, value) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.playerNumber === id ? { ...member, [field]: value } : member
      )
    );
  };

  const updatePlayerMember = async() =>{
    const res = await updateUserTeam(teamName, teamMembers)
    if(res.status === 201){
      toast.success(res.data.message)
    }
  }

  // Delete member function
  // const handleDeleteMember = (id) => {
  //   setTeamMembers(teamMembers.filter((member) => member.playerNumber !== id));
  // };

  // Get Profile Details

  const profileDetails = async () => {
    const res = await getUserProfile();
    setProfile(res.data.data);
    setEmail(res.data.data.email);
    setFirstName(res.data.data.firstName);
    setLastName(res.data.data.lastName);
    setContact(res.data.data.contact);
  };

  // updateProfile

  const updateProfile = async () => {
    const res = await updateUserProfile({ firstName, lastName, contact });
    if (res.data.statusCode === 200) {
      toast.success(res.data.message);
      setProfile((prevProfile) => ({
        ...prevProfile,
        firstName,
        lastName,
        contact,
      }));
      setIsEditing(false);
    }
  };

  useEffect(() => {
    profileDetails();
  }, []);

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
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight mb-2">
                {profile?.firstName && profile?.lastName
                  ? `${profile?.firstName} ${profile?.lastName}`
                  : profile?.username || "unknown"}
              </h1>

              <h1 className="text-lg font-bold tracking-tight mb-2">
                {profile?.firstName && profile?.lastName
                  ? profile?.username || "unknown"
                  : ""}
              </h1>
              <p className="text-md text-indigo-300 mb-4">
                Professional Valorant Player | Team Captain
              </p>
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

      {resetPassword && (
        <ResetPasswordPopup setResetPassword={setResetPassword} />
      )}

      {/* Personal Info */}

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            {/* <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {isEditing ? "Save" : "Edit"}
            </button> */}
            {isEditing ? (
              <button
                onClick={() => updateProfile()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Edit
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                readOnly={!isEditing}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full p-3 rounded-lg focus:outline-none ${
                  isEditing
                    ? "bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
                    : "bg-gray-600/50 text-gray-300 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                readOnly={!isEditing}
                onChange={(e) => setLastName(e.target.value)}
                className={`w-full p-3 rounded-lg focus:outline-none ${
                  isEditing
                    ? "bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
                    : "bg-gray-600/50 text-gray-300 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                value={contact}
                readOnly={!isEditing}
                onChange={(e) => setContact(e.target.value)}
                className={`w-full p-3 rounded-lg focus:outline-none ${
                  isEditing
                    ? "bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
                    : "bg-gray-600/50 text-gray-300 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email ID
              </label>
              <input
                type="email"
                value={email}
                readOnly
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 rounded-lg focus:outline-none ${
                  isEditing
                    ? "bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
                    : "bg-gray-600/50 text-gray-300 cursor-not-allowed"
                }`}
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
          {/* <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Social Media</h3>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="#"
                className="flex items-center text-indigo-300 hover:text-indigo-100 transition-colors"
              >
                <FaTwitch className="mr-2" /> Twitch
              </a>
              <a
                href="#"
                className="flex items-center text-indigo-300 hover:text-indigo-100 transition-colors"
              >
                <FaYoutube className="mr-2" /> YouTube
              </a>
              <a
                href="#"
                className="flex items-center text-indigo-300 hover:text-indigo-100 transition-colors"
              >
                <FaTwitter className="mr-2" /> Twitter
              </a>
              <a
                href="#"
                className="flex items-center text-indigo-300 hover:text-indigo-100 transition-colors"
              >
                <FaInstagram className="mr-2" /> Instagram
              </a>
              <a
                href="#"
                className="flex items-center text-indigo-300 hover:text-indigo-100 transition-colors"
              >
                <SiRiotgames className="mr-2" /> Riot ID
              </a>
            </div>
          </div> */}
          <SocialMediaLinks/>
        </div>

        {/* Team Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              {editableTeamName ? (
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="bg-gray-700 text-white p-3 rounded-lg text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
              ) : (
                <h2 className="text-2xl font-bold">{teamName}</h2>
              )}
            </div>
            <button
              onClick={() => setEditableTeamName(!editableTeamName)}
              className={`p-2 rounded transition-colors ${
                editableTeamName
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {editableTeamName ? (
                <FaSave className="w-5 h-5" onClick={ ()=>updatePlayerMember()} />
              ) : (
                <FaEdit className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700"></tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr
                    key={member.playerNumber}
                    className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                  >
                    {/* Name Column */}
                    <td className="py-4 px-6">
                      {member.isEditing ? (
                        <input
                          type="text"
                          value={member.playerNumber || ""}
                          onChange={(e) =>
                            handleMemberUpdate(
                              member.playerNumber,
                              "playerNumber",
                              e.target.value
                            )
                          }
                          className="bg-gray-700 text-white p-2 rounded w-full"
                        />
                      ) : (
                        member.playerNumber || "-"
                      )}
                    </td>

                    {/* IGN Column */}
                    <td className="py-4 px-6">
                      {member.isEditing ? (
                        <input
                          type="text"
                          value={member.ign || ""}
                          onChange={(e) =>
                            handleMemberUpdate(member.playerNumber, "ign", e.target.value)
                          }
                          className="bg-gray-700 text-white p-2 rounded w-full"
                        />
                      ) : (
                        member.ign || "-"
                      )}
                    </td>
                    {/* IGID Column */}
                    <td className="py-4 px-6">
                      {member.isEditing ? (
                        <input
                          type="text"
                          value={member.igId || ""}
                          onChange={(e) =>
                            handleMemberUpdate(
                              member.playerNumber,
                              "igId",
                              e.target.value
                            )
                          }
                          className="bg-gray-700 text-white p-2 rounded w-full"
                        />
                      ) : (
                        member.igId || "-"
                      )}
                    </td>

                    {/* Email Column */}
                    <td className="py-4 px-6">
                      {member.isEditing ? (
                        <input
                          type="email"
                          value={member.email || ""}
                          onChange={(e) =>
                            handleMemberUpdate(
                              member.playerNumber,
                              "email",
                              e.target.value
                            )
                          }
                          className="bg-gray-700 text-white p-2 rounded w-full"
                        />
                      ) : (
                        member.email || "-"
                      )}
                    </td>

                    <td className="py-4 px-6 flex gap-2">
                      <button
                        onClick={() => toggleEdit(member.playerNumber)}
                        className={`p-2 rounded ${
                          member.isEditing
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        } transition-colors`}
                      >
                        {member.isEditing ? (
                          <FaSave className="w-5 h-5" onClick={ ()=>updatePlayerMember()} />
                        ) : (
                          <FaEdit className="w-5 h-5" />
                        )}
                      </button>
                      {/* <button
                        onClick={() => handleDeleteMember(member.playerNumber)}
                        className="p-2 rounded bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
