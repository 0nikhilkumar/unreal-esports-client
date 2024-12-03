import React from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const Join_Now = () => {
  return (
    <div>
      {/* Headline */}
      <div className="text-center pt-10 bg-black">
        <h1 className="text-3xl sm:text-4xl font-bold uppercase relative inline-block text-white">
          Get A Experience
          <span className="block h-1 bg-blue-500 w-16 mx-auto mt-2"></span>
        </h1>
      </div>

      {/* Content Section */}
      <div className="w-full px-6 flex justify-center items-center bg-gradient-to-b from-black to-black h-[400px] sm:h-[500px] md:h-[450px] overflow-hidden">
        {/* Background Image */}
        <div className="flex justify-center w-1/2 mx-auto items-center hidden sm:block px-10">
          <div className="bg-gray-900 text-white p-10 rounded m-auto shadow-md">
            <p className="text-blue-600 font-oswald font-medium text-lg uppercase mb-4">
              Get all team member
            </p>
            <h2 className="font-oswald text-2xl uppercase leading-snug mb-5">
              Experience just for gamers{" "}
              <strong className="text-blue-600">offer</strong>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-5 text-justify">
              Ready to compete and show off your gaming skills? Join our esports
              tournaments for the opportunity to win amazing prizes! Simply
              register on our website with your team. Don’t miss out on this
              chance to take your gaming skills to the next level – register now
              and begin your esports journey!
            </p>
            <p className="text-gray-400 text-base leading-relaxed flex items-center gap-2">
              <MdOutlineDoubleArrow className="text-blue-600 text-2xl" />
              <span className="uppercase">Will give you an edge</span>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-8 text-white m-auto sm:text-left flex flex-col justify-center items-center gap-8 bg-center bg-cover w-1/2 h-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 flex justify-center items-center flex-col gap-2">
            <span className="block sm:text-center mb-2 text-4xl">
              JOIN THE BATTLE
            </span>
            <span className="block sm:text-center text-sm tracking-widest">
              Step into the arena and conquer your fears
            </span>
          </h1>
          <Link
            href="#_"
            class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-blue-600 rounded-lg group">
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-700 rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-blue-500"></span>
              <span class="relative flex justify-center items-center gap-2 uppercase tracking-wide">
                Register Now <IoIosArrowDroprightCircle />
              </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join_Now;
