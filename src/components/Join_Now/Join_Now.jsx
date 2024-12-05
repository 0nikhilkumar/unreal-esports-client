import React from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const Join_Now = () => {
  return (
    <div>
      {/* Headline */}
      <div className="text-center pt-10 bg-black">
        <h1 className="text-lg sm:text-3xl md:text-4xl font-bold uppercase relative inline-block text-white">
          Get A Experience
          <span className="block h-1 bg-blue-500 w-16 mx-auto mt-2"></span>
        </h1>
      </div>

      {/* Content Section */}
      <div className="w-full px-6 flex flex-col-reverse lg:flex-row justify-center items-center bg-gradient-to-b from-black to-black h-auto py-10">
        {/* Background Image and Info */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
          <div className="bg-gray-900 text-white p-6 sm:p-10 rounded shadow-md w-[28rem] sm:w-full mx-auto lg:mx-0">
            <p className="text-blue-600 text-[14px] sm:text-lg font-oswald font-medium text-lg uppercase mb-4 text-center lg:text-left">
              Get all team members
            </p>
            <h2 className="font-oswald w-full mx-auto sm: mx-0 sm:w-3/4 transition-all duration-200 hover:bg-white hover:text-black rounded text-[10px] sm:text-lg hover:md:p-4 uppercase leading-snug mb-4 text-center lg:text-left">
              Experience just for gamers{" "}
              <strong className="text-blue-600">offer</strong>
            </h2>
            <p className="text-gray-400 text-[8px] sm:text-base leading-relaxed mb-5 text-justify">
              Ready to compete and show off your gaming skills? Join our esports
              tournaments for the opportunity to win amazing prizes! Simply
              register on our website with your team. Don’t miss out on this
              chance to take your gaming skills to the next level – register now
              and begin your esports journey!
            </p>
            <p className="text-gray-400 text-sm sm:text-base flex items-center gap-2">
              <MdOutlineDoubleArrow className="text-blue-600 text-sm sm:text-xl" />
              <span className="uppercase text-[8px] sm:text-xl">Will give you an edge</span>
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="w-full lg:w-1/2 px-6 flex flex-col justify-center items-center text-center lg:text-left my-10">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="block text-white text-center ">JOIN THE BATTLE</span>
            <span className="block text-xs sm:text-base tracking-wide mt-2 text-white text-center">
              Step into the arena and conquer your fears
            </span>
          </h1>
          <Link
            to="/signup"
            className=" overflow-hidden relative text-xs sm:text-lg inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 font-mono font-medium tracking-tighter text-white bg-blue-600 rounded-lg group">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-700 rounded-full group-hover:w-full group-hover:h-56"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-blue-500"></span>
            <span className="relative flex justify-center items-center gap-2 uppercase tracking-wide">
              Register Now <IoIosArrowDroprightCircle />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join_Now;
