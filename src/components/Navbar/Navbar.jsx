import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";

function Navbar({ toggleAudio, isMuted }) {
  const [hamburger, setHamburger] = useState(false);

  return (
    <nav
      className={`absolute top-0 left-0 w-full flex px-5 py-2 items-center md:hover:bg-opacity-[0.3] md:bg-black md:bg-opacity-[0] justify-between transition-all z-[1] duration-300 ${
        hamburger ? "bg-black" : "bg-transparent"
      } text-white`} 
      // Apply black background on both the navbar and hamburger icon section when hamburger is true
    >
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to={"/"} className="flex items-center">
          <img
            src={"/images/logo-fav.png"}
            alt="Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-e-full"
          />
          <h1 className="text-[1.1rem] sm:text-lg font-semibold uppercase -ml-2">
            Unreal <span>Esports</span>
          </h1>
        </Link>
      </div>

      {/* Links for Medium & Large Screens */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="hover:text-gray-300 transition-colors">
          Home
        </Link>
        <Link to="/about" className="hover:text-gray-300 transition-colors">
          Games
        </Link>
        <Link
          to="/tournament"
          className="hover:text-gray-300 transition-colors"
        >
          Tournament
        </Link>
        <Link to="/faq" className="hover:text-gray-300 transition-colors">
          Teams
        </Link>
        <button className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-md transition-transform hover:scale-105 focus:outline-none">
          <Link to="/login">Login</Link>
        </button>
        <div className="cursor-pointer text-2xl" onClick={toggleAudio}>
          {isMuted ? (
            <HiMiniSpeakerWave />
          ) : (
            <HiMiniSpeakerXMark className="text-red-800" />
          )}
        </div>
      </div>

      {/* Hamburger Button */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setHamburger(!hamburger)}
      >
        {hamburger ? "X" : "☰"} {/* Conditional rendering of hamburger or cross icon */}
      </button>

      {/* Mobile Navbar */}
      <div
        className={`absolute top-0 left-0 w-full ${
          hamburger ? "bg-black" : "bg-transparent"
        } bg-opacity-90 text-white flex flex-col items-center py-5 space-y-5 md:hidden z-40 transform transition-transform duration-300 ease-in-out ${
          hamburger ? "translate-y-16" : "-translate-y-full"
        }`}
      >
        <Link
          to="/"
          className="hover:text-gray-300"
          onClick={() => setHamburger(false)}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-gray-300"
          onClick={() => setHamburger(false)}
        >
          Games
        </Link>
        <Link
          to="/tournament"
          className="hover:text-gray-300"
          onClick={() => setHamburger(false)}
        >
          Tournament
        </Link>
        <Link
          to="/faq"
          className="hover:text-gray-300"
          onClick={() => setHamburger(false)}
        >
          Teams
        </Link>
        <button
          onClick={() => {
            toggleAudio();
            setHamburger(false);
          }}
          className="hover:text-gray-300"
        >
          {isMuted ? (
            <HiMiniSpeakerWave />
          ) : (
            <HiMiniSpeakerXMark className="text-red-800" />
          )}
        </button>
        <button
          className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-md"
          onClick={() => setHamburger(false)}
        >
          <Link to="/login">Login</Link>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
