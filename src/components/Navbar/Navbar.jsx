import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";


function Navbar({toggleAudio, isMuted}) {
    const [hamburger, setHamburger] = useState(false);

  return (
    <>
      {/* Navbar  */}
      <nav className="absolute top-0 left-0 w-full flex px-5 py-1 delay-100 bg-black bg-opacity-[0] hover:bg-opacity-[0.3] text-white items-center justify-between z-50">
        <div className="ml-0">
          <Link to={"/"} className="flex justify-center items-center ">
            <img
              src={"/images/logo-fav.png"}
              alt="Logo"
              className=" md:w-20 md:h-15 lg:w-24 lg:h-18 rounded-e-full"
            />
            <h1 className="text-[1.1rem] font-semibold md:display uppercase -ml-5 sm:-ml-6">
              Unreal <span className="">Esports</span>
            </h1>
          </Link>
        </div>
        <div className=" flex justify-center items-center hidden md:flex space-x-5 mr-5">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/tournament" className="hover:text-gray-300">
            Tournament
          </Link>
          <Link to="/faq" className="hover:text-gray-300">
            FAQ
          </Link>
          <div className="cursor-pointer text-2xl" onClick={toggleAudio}>
            {isMuted ? (
              <HiMiniSpeakerWave />
            ) : (
              <HiMiniSpeakerXMark className="text-red-800" />
            )}
          </div>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            className="text-xl hover-text-gray-300 focus:outline-none"
            onClick={() => setHamburger(!hamburger)}>
            ☰
          </button>
        </div>

        {/* Mobile Navbar */}
        {hamburger && (
          <div className="flex flex-col mt-4 space-y-4 md:hidden bg-black bg-opacity-90 p-4 rounded-lg">
            <a
              href="#home"
              className="hover:text-gray-300"
              onClick={() => setHamburger(false)}>
              Home
            </a>
            <a
              href="#about"
              className="hover:text-gray-300"
              onClick={() => setHamburger(false)}>
              About
            </a>
            <a
              href="#services"
              className="hover:text-gray-300"
              onClick={() => setHamburger(false)}>
              Services
            </a>
            <button
              onClick={() => {
                toggleAudio();
                setHamburger(false);
              }}
              className="hover:text-gray-300">
              {isMuted ? "Unmute" : "Mute"}
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
