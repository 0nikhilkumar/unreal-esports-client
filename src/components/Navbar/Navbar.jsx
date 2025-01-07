import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutHost, logoutUser } from "../../http";
import { setAuth } from "../../Store/authSlice";
import toast from "react-hot-toast";

function Navbar() {
  const [hamburger, setHamburger] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { isAuth, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  async function handleLogout() {
    let response;
    if (role === "user") {
      response = await logoutUser();
      toast.success(response.data.message);
    } else {
      response = await logoutHost();
      toast.success(response.data.message);
    }
    dispatch(setAuth({ user: response.data.data }));
  }

  return (
    <nav
      className={`absolute top-0 left-0 w-full flex px-5 py-2 items-center md:hover:bg-opacity-[0.3] md:bg-black md:bg-opacity-[0] justify-between transition-all z-[1] duration-300 ${
        hamburger ? "bg-black" : "bg-transparent"
      } text-white`}>
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
        {/* <Link
          to="/tournament"
          className="hover:text-gray-300 transition-colors">
          Tournament
        </Link> */}
        <a href="#faq" className="hover:text-gray-300 transition-colors">
          FAQ
        </a>

        {isAuth ? (
          role === "user" ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-white text-2xl">
                <CgProfile />
              </button>
              {showDropdown && (
                <div className="absolute top-8 right-0 bg-black text-white rounded shadow-lg w-40">
                  <Link
                    to="/profile"
                    className="block py-2 px-4 hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}>
                    Profile
                  </Link>
                  <Link
                    to="/arena"
                    className="block py-2 px-4 hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}>
                    Rooms
                  </Link>
                  {/* <Link
                    to="/tournament"
                    className="block py-2 px-4 hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}>
                    Tournament
                  </Link> */}
                  <Link
                    to="/leaderboard"
                    className="block py-2 px-4 hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}>
                    Leaderboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-4 w-full text-left hover:bg-gray-700">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-white text-2xl">
                <CgProfile />
              </button>
              {showDropdown && (
                <div className="absolute top-8 right-0 bg-black text-white rounded shadow-lg w-40">
                  <Link
                    to="/profile"
                    className="block py-2 px-4 hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}>
                    Profile
                  </Link>
                  {/* <Link
                    to="/hosting-tournament"
                    className="block py-2 px-4 hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}>
                    Create Tournament
                  </Link> */}
                  <Link
                    to="/hosting-room"
                    className="block py-2 px-4 hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}>
                    Create Room
                  </Link>
                  <div
                    className="block py-2 px-4 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}>
                    Logout
                  </div>
                </div>
              )}
            </div>
          )
        ) : (
          <Link
            to="/login"
            className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold rounded-lg py-2 px-6 text-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
            Login 
          </Link>
        )}
      </div>

      {/* Hamburger Button */}
      <button
        className="md:hidden text-xl sm:text-2xl focus:outline-none"
        onClick={() => setHamburger(!hamburger)}>
        {hamburger ? "X" : "☰"}
      </button>

      {/* Mobile Navbar */}
      <div
        className={`absolute top-0 left-0 w-full ${
          hamburger ? "bg-black" : "bg-transparent"
        } bg-opacity-100 text-white flex flex-col items-center py-5 space-y-5 md:hidden z-40 transform transition-transform duration-300 ease-in-out ${
          hamburger ? "translate-y-16" : "-translate-y-full"
        }`}>
        <Link
          to="/"
          className="hover:text-gray-300"
          onClick={() => setHamburger(false)}>
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-gray-300"
          onClick={() => setHamburger(false)}>
          About
        </Link>
        {/* <Link
          to="/tournament"
          className="hover:text-gray-300"
          onClick={() => setHamburger(false)}>
          Tournament
        </Link> */}
        <a
          href="#faq"
          className="hover:text-gray-300"
          onClick={() => setHamburger(false)}>
          FAQ
        </a>

        {isAuth ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="block py-2 px-4 text-white text-2xl">
              <CgProfile />
            </button>
            {showDropdown && (
              <div className="absolute top-8 right-0 bg-black text-white rounded shadow-lg w-40">
                <Link
                  to="/profile"
                  className="block py-2 px-4 hover:bg-gray-700"
                  onClick={() => setShowDropdown(false)}>
                  Profile
                </Link>
                <Link
                  to="/leaderboard"
                  className="block py-2 px-4 hover:bg-gray-700"
                  onClick={() => setShowDropdown(false)}>
                  Leaderboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block py-2 px-4 w-full text-left hover:bg-gray-700">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold rounded-lg py-2 px-6 text-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
