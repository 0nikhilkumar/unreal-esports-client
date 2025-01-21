import React, { useState } from "react"
import { FaPlus, FaTrash, FaYoutube, FaTwitch, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa"

const HostProfile = () => {
  const [avatar, setAvatar] = useState("/images/logo-fav.png")
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [preferredName, setPreferredName] = useState("Johnny")
  const [email, setEmail] = useState("johndoe@example.com")
  const [mobile, setMobile] = useState("1234567890")
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: "YouTube", link: "", icon: FaYoutube },
    { id: 2, platform: "Twitch", link: "", icon: FaTwitch },
    { id: 3, platform: "Instagram", link: "", icon: FaInstagram },
    { id: 4, platform: "Facebook", link: "", icon: FaFacebookF },
    { id: 5, platform: "Twitter", link: "", icon: FaTwitter },
  ])

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

  const handleSocialLinkChange = (id, value) => {
    setSocialLinks(socialLinks.map((link) => (link.id === id ? { ...link, link: value } : link)))
  }

  const addSocialLink = () => {
    const newId = socialLinks.length + 1
    setSocialLinks([...socialLinks, { id: newId, platform: "New Platform", link: "", icon: FaPlus }])
  }

  const removeSocialLink = (id) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id))
  }

  const saveProfile = () => {
    alert("Profile saved successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      {/* Hero Banner */}
      <div
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/esports-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 px-6 py-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative group">
              <img
                src={avatar || "/placeholder.svg"}
                alt="Host Avatar"
                className="w-40 h-40 rounded-full border-4 border-purple-500 shadow-lg object-cover transition-all duration-300 group-hover:scale-105"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors shadow-lg"
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
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {firstName} {lastName}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <input
                  type="text"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                  className="w-full max-w-xs p-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                  placeholder="Preferred Name"
                />
              </div>
              <p className="text-xl text-purple-300 mb-4">Esports Host & Streamer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Personal Details */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-3xl p-8 border border-gray-700 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <h3 className="text-2xl font-semibold mb-6 text-purple-400">Personal Information</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                  placeholder="Last Name"
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                placeholder="Email"
              />
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                placeholder="Mobile Number"
              />
            </form>
          </div>

          {/* Social Media Links */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-3xl p-8 border border-gray-700 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <h3 className="text-2xl font-semibold mb-6 text-purple-400">Social Media Links</h3>
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <div key={link.id} className="flex items-center gap-4">
                  <div className="text-2xl text-purple-500">
                    <link.icon />
                  </div>
                  <input
                    type="text"
                    value={link.link}
                    onChange={(e) => handleSocialLinkChange(link.id, e.target.value)}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                    placeholder={link.platform}
                  />
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    onClick={() => removeSocialLink(link.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                className="flex items-center gap-2 text-purple-500 hover:text-purple-400 transition-colors duration-300"
                onClick={addSocialLink}
              >
                <FaPlus />
                Add New Link
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={saveProfile}
            className="group relative inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-lg shadow-lg transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Save Profile</span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HostProfile

