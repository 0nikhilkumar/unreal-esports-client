import { useEffect, useState } from "react";
import { getHostProfile, updateHostProfile } from "../../../http";
import HostSocialMediaLinks from "./HostSocialMedia";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";

const HostProfile = () => {
  const [avatar, setAvatar] = useState("/images/logo-fav.png");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    email: "",
    contact: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const updateProfile = async () => {
    try {
      const res = await updateHostProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        contact: profile.contact,
      });

      if (res.data.statusCode === 200) {
        toast.success(res.data.message);
        setIsEditing(false);
        await hostProfile();
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update profile error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const hostProfile = async () => {
    setIsLoading(true);
    try {
      const res = await getHostProfile();
      if (res.data.data) {
        setProfile({
          firstName: res.data.data.firstName || "",
          lastName: res.data.data.lastName || "",
          preferredName: res.data.data.preferredName || "",
          email: res.data.data.email || "",
          contact: res.data.data.contact || "",
        });
      }
    } catch (error) {
      toast.error("Failed to fetch profile");
      console.error("Get profile error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    hostProfile();
  }, []);

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

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      {/* Hero Banner */}
      <div
        className="relative h-[20rem] md:h-[40vh] lg:h-[20rem] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/esports-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-8">
            <div className="relative overflow-visible">
              <img
                src={avatar || "/placeholder.svg"}
                alt="Host Avatar"
                className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-purple-500 shadow-lg object-cover transition-all duration-300 hover:scale-105"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-2 -right-2 md:bottom-2 md:right-2 bg-purple-600 p-2 md:p-3 rounded-full cursor-pointer hover:bg-purple-700 transition-colors shadow-lg z-10"
              >
                <svg
                  className="w-6 h-6 md:w-7 md:h-7"
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
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {profile.firstName && profile.lastName
                  ? `${profile.firstName} ${profile.lastName}`
                  : profile.preferredName || "Unknown"}
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 text-purple-300">
                {profile.firstName && profile.lastName
                  ? profile.preferredName || ""
                  : ""}
              </h2>
              <p className="text-lg md:text-xl text-purple-200 mb-4">
                Esports Host & Streamer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Personal Details */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl md:rounded-3xl p-6 md:p-8 border border-gray-700 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-semibold text-purple-400">
                Personal Information
              </h3>
              {isEditing ? (
                <button
                  onClick={updateProfile}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 md:px-6 md:py-2 rounded-full transition-colors text-base md:text-lg font-semibold"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 md:px-6 md:py-2 rounded-full transition-colors text-base md:text-lg font-semibold"
                >
                  Edit
                </button>
              )}
            </div>
            <form className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full p-3 md:p-4 rounded-lg focus:outline-none text-base md:text-lg ${
                    isEditing
                      ? "bg-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                      : "bg-gray-600/50 text-gray-300 cursor-not-allowed"
                  }`}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full p-3 md:p-4 rounded-lg focus:outline-none text-base md:text-lg ${
                    isEditing
                      ? "bg-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                      : "bg-gray-600/50 text-gray-300 cursor-not-allowed"
                  }`}
                  placeholder="Last Name"
                />
              </div>
              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full p-3 md:p-4 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 cursor-not-allowed text-base md:text-lg"
                placeholder="Email"
              />
              <input
                type="tel"
                value={profile.contact}
                onChange={(e) =>
                  setProfile({ ...profile, contact: e.target.value })
                }
                disabled={!isEditing}
                className={`w-full p-3 md:p-4 rounded-lg focus:outline-none text-base md:text-lg ${
                  isEditing
                    ? "bg-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                    : "bg-gray-600/50 text-gray-300 cursor-not-allowed"
                }`}
                placeholder="Contact Number"
              />
            </form>
          </div>
          <HostSocialMediaLinks />
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
