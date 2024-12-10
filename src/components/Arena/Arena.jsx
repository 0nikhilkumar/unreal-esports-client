import React, { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { dummyData } from "./dummyData";


const UserRoom = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  // Focus on the search bar when Ctrl + K is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault(); // Prevent default browser action
        searchInputRef.current?.focus(); // Focus on the input
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredData = dummyData.filter((card) =>
    card.preferredName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center p-4">
        <div className="text-center text-4xl pt-10 tracking-widest">
            <h1>Arena</h1>
            <span className="block h-1 bg-blue-500 w-16 mx-auto mt-2"></span>
        </div>
      {/* Search Bar */}
      <div className="w-full max-w-md my-4 mt-20 mb-32 relative">
        {/* Input Field */}
        <input
          type="text"
          ref={searchInputRef}
          placeholder="Search Bar" // Simplified placeholder
          className="w-full p-3 pl-10 pr-20 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Search Icon */}
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <CiSearch size={20} />
        </span>
        {/* Ctrl + K */}
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
          (Ctrl + K)
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4 mb-20">
        {filteredData.map((card) => (
          <div
            key={card.id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={card.img}
              alt={card.preferredName}
              className="w-full h-40 sm:h-32 md:h-40 object-cover"
            />
            <Link to={`/arena/${card.id}`}>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-bold">{card.preferredName}</h3>
                <p className="text-sm text-gray-400">Game: {card.game}</p>
                <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none transition-colors duration-300">
                  Details
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRoom;
