import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaEdit,
  FaInstagram,
  FaLink,
  FaSave,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { getHostSocialMedia, updateHostSocialMedia } from "../../../http";

export default function HostSocialMediaLinks() {
  const [links, setLinks] = useState({
    youtube: "",
    twitter: "",
    instagram: "",
  });
  const [errors, setErrors] = useState({
    youtube: "",
    twitter: "",
    instagram: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchSocialMediaLinks = async () => {
      try {
        const res = await getHostSocialMedia();
        if (res.status === 200 && res.data.socialMedia) {
          const updatedLinks = { youtube: "", twitter: "", instagram: "" };
          res.data.socialMedia.forEach((item) => {
            updatedLinks[item.platform] = item.url;
          });
          setLinks(updatedLinks);
        }
      } catch (error) {
        console.error("Error fetching social media links:", error);
        toast.error("Failed to fetch social media links");
      }
    };
    fetchSocialMediaLinks();
  }, []);

  const validateLink = (type, url) => {
    if (!url) return "";
    try {
      new URL(url);
      const domains = {
        youtube: ["youtube.com", "www.youtube.com", "youtu.be"],
        twitter: ["twitter.com", "www.twitter.com", "x.com", "www.x.com"],
        instagram: ["instagram.com", "www.instagram.com"],
      };
      const urlObject = new URL(url);
      const hostname = urlObject.hostname.toLowerCase();
      if (!domains[type].includes(hostname)) {
        return `Please enter a valid ${type} URL`;
      }
      return "";
    } catch (e) {
      return `Please enter a valid URL`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinks({ ...links, [name]: value });
    const error = validateLink(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSave = async () => {
    const newErrors = {
      youtube: validateLink("youtube", links.youtube),
      twitter: validateLink("twitter", links.twitter),
      instagram: validateLink("instagram", links.instagram),
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      const socialMediaLinks = [];
      if (links.youtube)
        socialMediaLinks.push({ platform: "youtube", url: links.youtube });
      if (links.twitter)
        socialMediaLinks.push({ platform: "twitter", url: links.twitter });
      if (links.instagram)
        socialMediaLinks.push({ platform: "instagram", url: links.instagram });

      try {
        const res = await updateHostSocialMedia({ socialMedia: socialMediaLinks });
        if (res.status === 200) {
          toast.success("Social media links updated successfully!");
          setIsEditing(false);
        }
      } catch (error) {
        console.error("Error updating social media links:", error);
        toast.error("Failed to update social media links");
      }
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case "youtube":
        return "bg-red-500";
      case "twitter":
        return "bg-blue-400";
      case "instagram":
        return "bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "youtube":
        return <FaYoutube className="w-5 h-5" />;
      case "twitter":
        return <FaTwitter className="w-5 h-5" />;
      case "instagram":
        return <FaInstagram className="w-5 h-5" />;
      default:
        return <FaLink className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 md:p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl md:text-2xl font-bold text-white flex-grow">
              Social Links
            </h3>

            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-300 text-white"
            >
              {isEditing ? (
                <FaSave className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <FaEdit className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {isEditing ? (
            <div className="space-y-3 md:space-y-4">
              {Object.keys(links).map((platform) => (
                <div key={platform} className="relative">
                  <div className={`absolute left-3 top-3 text-gray-400 ${errors[platform] ? "text-red-500" : ""}`}>
                    {getPlatformIcon(platform)}
                  </div>
                  <input
                    type="url"
                    name={platform}
                    placeholder={`Enter ${platform} link`}
                    value={links[platform]}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 md:py-3 bg-gray-800 rounded-lg border-2 transition-all duration-300
                      ${
                        errors[platform]
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-700 focus:border-blue-500"
                      } 
                      text-sm md:text-base text-white placeholder-gray-500 focus:outline-none`}
                  />
                  {errors[platform] && (
                    <p className="text-red-500 text-xs md:text-sm mt-1 ml-1">
                      {errors[platform]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 md:space-y-3">
              {Object.entries(links).map(
                ([platform, link]) =>
                  link && (
                    <a
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center p-2 md:p-3 rounded-lg ${getPlatformColor(platform)} 
                      text-white transform hover:scale-[1.02] transition-all duration-300`}
                    >
                      <span className="mr-2 md:mr-3">{getPlatformIcon(platform)}</span>
                      <span className="text-sm md:text-base font-medium capitalize">{platform}</span>
                    </a>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}