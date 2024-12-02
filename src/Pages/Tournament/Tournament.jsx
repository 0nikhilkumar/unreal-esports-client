import React from "react";

function Tournament() {
  return (
    <div className="relative h-[80vh] bg-black">
      {/* Wrapper to enable group hover */}
      <div className="relative group h-full">
        {/* Light Effect Behind Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-transparent opacity-70 group-hover:opacity-0 transition-all duration-500"></div>
        
        {/* Background Image */}
        <div
          className="absolute rounded-lg inset-0 bg-cover bg-center grayscale transition-all duration-700 ease-in-out group-hover:grayscale-[50px]"
          style={{
            margin: "15px",
            backgroundImage: "url('/images/valo2.png')",
          }}
        ></div>

        {/* Animated Gradient Overlay for Top-to-Bottom Color Reveal */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 group-hover:animate-gradient transition-all duration-10 ease-in-out"></div>

        {/* Animated Gradient Overlay for Top-to-Bottom Color Reveal */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 group-hover:animate-gradient transition-all duration-700 ease-in-out"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-5">
          <h1 className="text-5xl text-white text-center mb-5">Tournament</h1>
          <p className="text-white text-lg text-center max-w-3xl">
            Join Valorant leaderboards showcasing skills and team gameplay !
          </p>
          <p className="text-4xl mt-5">Coming Soon...</p>
        </div>
      </div>
    </div>
  );
}

export default Tournament;
