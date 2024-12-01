import React from "react";

const Join_Now = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black h-[400px] sm:h-[500px] md:h-[450px] flex items-center justify-between overflow-hidden flex-row-reverse">
      {/* Background Image */}
      <div
        className=" w-1/2 flex justify-center items-center h-[450px] z-50 bg-cover bg-center hidden sm:block sm:h-full"
        style={{
          backgroundImage: "url('/images/valorant/5.jpeg')", // Set the background image URL
        }}
      ></div>

      {/* <div
        className="w-full sm:w-[600px] md:w-[500px] lg:w-[700px] h-[450px] z-50 bg-cover transition-all duration-700 ease-in-out hover:grayscale-0 hover:scale-105 hidden"
        style={{
          backgroundImage: "url('/images/valorant/5.jpeg')", // Right-side image
        }}
      > */}
      {/* Fade Overlay to Merge with Left Color */}
      {/* <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
      </div> */}

      {/* Fade Overlay to Merge with Left Color */}
      {/* <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-black to-transparent pointer-events-none"></div> */}

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-20"></div> */}

      {/* Fade Overlay on Left Side */}
      {/* <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-gray-900 to-transparent pointer-events-none"></div> */}

      {/* Content */}
      <div className="px-4 sm:px-8 text-white m-auto sm:text-left flex flex-col justify-center items-center bg-center bg-cover w-1/2 h-full">

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <span className="block sm:text-center mb-2 text-xl">JOIN THE</span>
          <span className="block sm:text-center text-sm">BATTLE NOW</span>
        </h1>
        <button className="px-6 py-3 sm:px-8 sm:py-4 sm:text-base font-semibold rounded-md bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110 text-balance">
          PLAY FOR FREE
        </button>
      </div>
    </div>
  );
};

export default Join_Now;
