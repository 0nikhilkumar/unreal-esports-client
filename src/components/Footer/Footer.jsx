import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    
    <footer className="bg-[#0A1623] text-white py-14 px-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center space-y-5 lg:space-y-0">
        {/* Logo and Copyright Section */}
        <div className="text-center lg:text-left">
          <div className="flex justify-center text-xs sm:text-xl lg:justify-start mb-5">
            <img
              src="/images/logo-fav.png"
              alt="logo"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full"
            />
            <p className="flex justify-center items-center -ml-2 sm:-ml-2 uppercase">Unreal Esports</p>
          </div>
          <div className="text-xs text-center sm:text-sm">&copy; 2024 Unreal Esports. All rights reserved</div>
        </div>

        {/* Links Section */}
        <div className="text-center lg:text-right space-y-6">
          <div className="flex justify-center lg:justify-end space-x-6 text-xs sm:text-lg">
            <Link to={"/about"} className="hover:text-gray-300">
              About
            </Link>
            <Link to={"/tournament"} className="hover:text-gray-300">
              Tournament
            </Link>
            <Link to={"/faq"} className="hover:text-gray-300">
              FAQ
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center items-center text-xs sm:text-xl lg:justify-end space-x-4">
            <Link className="bg-gray-800 hover:bg-gray-600 text-white w-10 h-10 flex items-center justify-center rounded-full transition duration-300 text-xl">
              <FaFacebook />
            </Link>
            <Link className="bg-gray-800 hover:bg-gray-600 text-white w-10 h-10 flex items-center justify-center rounded-full transition duration-300 text-xl">
              <FaInstagram />
            </Link>
            <Link className="bg-gray-800 hover:bg-gray-600 text-white w-10 h-10 flex items-center justify-center rounded-full transition duration-300 text-xl">
              <FaYoutube />
            </Link>
            <Link className="bg-gray-800 hover:bg-gray-600 text-white w-10 h-10 flex items-center justify-center rounded-full transition duration-300 text-xl">
              <FaTwitter />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;