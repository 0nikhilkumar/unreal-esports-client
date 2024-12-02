import React from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";


const Join_Now = () => {
  return (
    <div
      style={{backgroundImage: "url('/images/body-bg.jpg')"}}
      className="w-full flex justify-center items-center bg-gradient-to-b from-black to-black h-[400px] sm:h-[500px] md:h-[450px] overflow-hidden">
      {/* Background Image */}
      <div className="flex justify-center w-1/2 mx-auto items-center hidden sm:block px-10">
        <div className="bg-gray-900 text-white p-10 rounded m-auto shadow-md">
          <p className="text-orange-500 font-oswald font-medium text-lg uppercase mb-4">
            Get all team member
          </p>
          <h2 className="font-oswald text-2xl uppercase leading-snug mb-5">
            Experience just for gamers{" "}
            <strong className="text-orange-500">offer</strong>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-5">
            Nullam quis ante. Maecenas ullamcorper, dui et placerat feugiat,
            eros pede varius nisi, condimentum viverra felis nunc et lorem. In
            auctor lobortis lacus. Phasellus gravida semper nisi. Aliquam
            lobortis.
          </p>
          <p className="text-gray-400 text-base leading-relaxed flex items-center gap-2">
            <MdOutlineDoubleArrow className="text-orange-500 text-2xl" />
            <span className="uppercase">Will give you an edge</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-8 text-white m-auto sm:text-left flex flex-col justify-center items-center bg-center bg-cover w-1/2 h-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <span className="block sm:text-center mb-2 text-2xl">JOIN THE BATTLE</span>
          <span className="block sm:text-center text-sm">EXPERIENCES GIVES A FEAR</span>
        </h1>
        <button className="px-6 py-3 sm:px-8 sm:py-4 sm:text-base font-semibold rounded-md bg-gradient-to-r from-red-500 to-red-500 hover:from-red-500 hover:to-red-500 transition-all duration-300 transform hover:scale-110 text-balance">
          TRY NOW !
        </button>
      </div>
    </div>
  );
};

export default Join_Now;
