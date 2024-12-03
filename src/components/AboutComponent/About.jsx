import React from "react";

const About_Us = () => {
  return (
    <div className="bg-black text-white py-10 px-8">
      {/* Headline */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold uppercase relative inline-block">
          About Us
          <span className="block h-1 bg-blue-500 w-16 mx-auto mt-2"></span>
        </h1>
      </div>

      {/* Container */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-12 px-4 sm:px-10">
        {/* Left Content */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center">
          <p className="text-blue-500 font-oswald font-medium text-lg uppercase mb-4">
            Who We Are
          </p>
          <h2 className="font-oswald text-2xl sm:text-3xl uppercase leading-snug mb-5">
            Empowering Gamers with{" "}
            <strong className="text-blue-500">Unique Experiences</strong>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-5">
            We are a team of passionate individuals committed to providing
            gamers with the tools, knowledge, and support they need to excel.
            Our mission is to create a community where every gamer feels
            valued, connected, and empowered to achieve their full potential.
          </p>
          <p className="text-gray-400 text-base leading-relaxed mb-5">
            Whether you’re a professional gamer or just starting your journey,
            we have something special for you. Join us to unlock exclusive
            benefits and be part of a thriving gaming ecosystem.
          </p>
          <button className="px-6 py-3 sm:px-8 sm:py-4 sm:text-base font-semibold rounded-md bg-blue-600 hover:bg-blue-500 transition-all duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>

        {/* Right Image */}
        <div
          style={{
            backgroundImage: "url('/images/body-bg.jpg')",
          }}
          className="w-full sm:w-1/2 h-[300px] sm:h-[400px] bg-cover bg-center rounded"
        ></div>
      </div>
    </div>
  );
};

export default About_Us;
