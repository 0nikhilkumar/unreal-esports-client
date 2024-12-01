import React from "react";

const Join_Now = () => {
  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-black h-[400px] sm:h-[500px] md:h-[550px] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/valorant/8.jpeg')", // Replace with your image URL
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-white  max-w-lg px-4 sm:px-8">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              JOIN THE BATTLE NOW
            </h1>
            <button className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-md bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500">
              PLAY FOR FREE
            </button>
      </div>
    </div>
  );
};

export default Join_Now;
