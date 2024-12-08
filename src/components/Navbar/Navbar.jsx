import React, { useState } from "react";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";

function Navbar({ toggleAudio, isMuted }) {
  const [hamburger, setHamburger] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false)

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
          <h1 className="text-[0.8rem] sm:text-lg font-semibold uppercase -ml-2">
            Unreal <span>Esports</span>
          </h1>
        </Link>
      </div>

      {/* Links for Medium & Large Screens */}
      <div className="hidden md:flex items-center space-x-5">
        <Link to="/" className="hover:text-gray-300 transition-colors">
          Home
        </Link>
        <Link to="/about" className="hover:text-gray-300 transition-colors">
          About
        </Link>
        <Link
          to="/tournament"
          className="hover:text-gray-300 transition-colors"
        >
          Tournament
        </Link>
        <a href="#faq" className="hover:text-gray-300 transition-colors">
          FAQ
        </a>
        <Link
          to="/login"
          className=" overflow-hidden relative sm:text-xs inline-flex items-center justify-center px-6 sm:px-7 py-2 sm:py-3 font-mono font-medium tracking-tighter text-white bg-blue-600 rounded-lg group"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-700 rounded-full group-hover:w-full group-hover:h-56"></span>
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-blue-500"></span>
          <span className="relative flex justify-center items-center gap-2 uppercase tracking-wide">
            Login
          </span>
        </Link>
        <div
          className="cursor-pointer bg-blue-600 rounded py-2 px-3 text-2xl"
          onClick={toggleAudio}
        >
          {isMuted ? (
            <HiMiniSpeakerWave />
          ) : (
            <HiMiniSpeakerXMark className="text-white" />
          )}
        </div>
      </div>

      {/* Hamburger Button */}
      <button
        className="md:hidden text-xl sm:text-2xl focus:outline-none"
        onClick={() => setHamburger(!hamburger)}
      >
        {hamburger ? "X" : "☰"}{" "}
        {/* Conditional rendering of hamburger or cross icon */}
      </button>

      {/* Mobile Navbar */}
      <div
        className={`absolute top-0 left-0 w-full ${
          hamburger ? "bg-black" : "bg-transparent"
        } bg-opacity-100 text-white flex flex-col items-center py-5 space-y-5 md:hidden z-40 transform transition-transform duration-300 ease-in-out ${
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
          About
        </Link>
        <Link
          to="/tournament"
          className="hover:text-gray-300"
          onClick={() => setHamburger(false)}
        >
          Tournament
        </Link>
        <a
          href="#faq"
          className="hover:text-gray-300"
          onClick={() => setHamburger(false)}
        >
          FAQ
        </a>
        <button
          onClick={() => {
            toggleAudio();
            setHamburger(false);
          }}
          className="hover:text-gray-300 cursor-pointer bg-blue-600 rounded py-[0.4rem] px-7 text-xl"
        >
          {isMuted ? (
            <HiMiniSpeakerWave />
          ) : (
            <HiMiniSpeakerXMark className="text-white" />
          )}
        </button>
        <Link
          to="/login"
          className=" overflow-hidden relative sm:text-xs inline-flex items-center justify-center text-xs px-5 sm:px-7 py-2 sm:py-3 font-mono font-medium tracking-tighter text-white bg-blue-600 rounded group"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-700 rounded-full group-hover:w-full group-hover:h-56"></span>
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-blue-500"></span>
          <span className="relative flex justify-center items-center gap-2 uppercase tracking-wide">
            Login
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
