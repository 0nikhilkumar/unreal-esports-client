import React from "react";

const tournaments = [
  {
    name: "Epic Clash",
    date: "January 15, 2025",
    prizePool: "₹50,000",
    image: "/images/valo1.jpeg",
  },
  {
    name: "Battle Arena",
    date: "February 10, 2025",
    prizePool: "₹1,00,000",
    image: "/images/valo1.jpeg",
  },
  {
    name: "Ultimate Showdown",
    date: "March 5, 2025",
    prizePool: "₹75,000",
    image: "/images/valo2.png",
  },
  {
    name: "Victory Royale",
    date: "April 20, 2025",
    prizePool: "₹2,00,000",
    image: "/images/valo2.png",
  },
];

function TournamentComponent() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Section */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/body-bg.jpg')" }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-90"></div>

      {/* Heading */}
      <div className="relative z-10 text-center pt-10">
        <h1 className="text-lg sm:text-3xl md:text-4xl font-bold uppercase text-white">
          Rooms
          <span className="block h-1 bg-blue-500 w-16 mx-auto mt-2"></span>
        </h1>
      </div>

      {/* Card Section */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 py-10 max-w-7xl mx-auto top-20">
        {tournaments.map((tournament, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
            {/* Card Image */}
            <div className="relative">
              <img
                src={tournament.image}
                alt={tournament.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
              <p className="absolute bottom-3 left-3 bg-blue-600 text-xs px-2 py-1 rounded">
                Prize: {tournament.prizePool}
              </p>
            </div>

            {/* Card Content */}
            <div className="p-5">
              <h2 className="text-lg font-bold">{tournament.name}</h2>
              <p className="text-gray-400 text-sm mt-2">
                Date: {tournament.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TournamentComponent;
