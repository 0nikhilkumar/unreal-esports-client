import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [hamburger, setHamburger] = useState(false);

  return (
    <>
      {/* Navbar  */}
      <nav className="absolute top-0 left-0 w-full flex p-5 bg-black bg-opacity-0 text-white items-center justify-between z-50">
        <div className="ml-10">
          <img src={"/images/logo.jpg"} alt="Logo" className="w-20 h-15 rounded-e-full" />
        </div>
        <div className="hidden md:flex space-x-5 mr-5">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="tournament" className="hover:text-gray-300">
            Tournament
          </Link>
          <Link to="faq" className="hover:text-gray-300">
            FAQ
          </Link>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            className="text-xl hover-text-gray-300 focus:outline-none"
            onClick={() => setHamburger(!hamburger)}
          >
            ☰
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
