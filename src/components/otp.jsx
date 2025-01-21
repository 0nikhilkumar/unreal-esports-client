import React from "react";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const OTPEmail = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center py-4">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 flex justify-center items-center">
          <img
            src="/images/logo-fav.png"
            alt="Unreal Esports Logo"
            width={"100px"}
          />
          <span className="text-white font-bold text-lg tracking-wider">Unreal Esports</span>
        </div>

        {/* Body */}
        <div className="p-8">
          <h1 className="text-indigo-700 text-2xl font-semibold text-center mb-6">
            Your One-Time Password (OTP)
          </h1>
          <p className="text-gray-700 text-lg mb-4">Hello Gamer,</p>
          <p className="text-gray-700 text-lg mb-4">
            You've requested a one-time password for Unreal Esports
            account verification.
          </p>

          <div className="bg-gray-100 border rounded-lg py-6 text-center mb-6">
            <span className="text-4xl font-bold text-indigo-700 tracking-widest">
              123456
            </span>
          </div>

          <p className="text-gray-700 text-lg mb-4">
            This OTP will expire in 10 minutes. If you didn't request this code,
            please ignore this email or contact our support team immediately.
          </p>
          <p className="text-gray-700 text-lg mb-4">Game on!</p>
          <p className="text-gray-700 text-lg mb-4">The Unreal Esports Team</p>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700  py-6 text-center">
          <p className="text-white text-sm mb-4 tracking-wider">
            Follow us on social media:
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <Link to="#" className="w-8 h-8 flex justify-center items-center">
              <FaFacebook className="text-xl text-white"/>
            </Link>
            <Link to="#" className="w-8 h-8 flex justify-center items-center">
              <FaXTwitter className="text-xl text-white"/>
            </Link>
            <Link to="#" className="w-8 h-8 flex justify-center items-center">
              <FaInstagram className="text-xl text-white"/>
            </Link>
          </div>
          <p className="text-white tracking-wider text-xs">
            &copy; 2023 Unreal Esports. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPEmail;
