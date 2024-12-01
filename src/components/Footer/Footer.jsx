import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0A1623] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center ">
        <div>
          {/* Logo Section */}
          <div className="flex items-center space-x-3 mb-5">
            <img
              src="/images/logo.jpg"
              alt="logo"
              className="w-15 h-12 md:w-20 md:h-15 lg:w-24 lg:h-18 rounded-e-full"
            />
          </div>

          {/* Copyright Section */}

          <div className="text-white hover:text-gray-200 text-sm">
            &copy; 2024 UnReal Esports. All rights reserved
          </div>
        </div>

        <div>
          {/* Links Section */}
          <div className="flex space-x-6 mt-4 md:mt-0  mb-8">
            <Link to={"/about"} className="text-white hover:text-gray-200">
              About
            </Link>
            <Link to={"/tournament"} className="text-white hover:text-gray-200">
              Tournament
            </Link>
            <Link to={"/faq"} className="text-white hover:text-gray-200">
              FAQ
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
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
