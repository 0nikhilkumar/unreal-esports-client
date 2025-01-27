import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { HiArrowSmRight } from "react-icons/hi";
import OTPVerificationPopup from "./OTPVerificationPopup";

const ResetPasswordPopup = ({ setResetPassword }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      // TODO: Send OTP to email
      setStep(2);
    } else if (step === 2) {
      // TODO: Verify OTP
      setStep(3);
    } else {
      // TODO: Change password
      setResetPassword(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <div
          className="absolute top-10 right-10"
          onClick={() => setResetPassword(false)}
        >
          <RxCross2 className="text-white text-xl cursor-pointer" />
        </div>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 text-white p-2 rounded mb-4"
                required
              />
            </div>
          )}
          {step === 2 && (
            <OTPVerificationPopup setResetPassword={setResetPassword}/>
          )}
          {step === 3 && (
            <>
              <div>
                <label className="block mb-2">Old Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white p-2 rounded mb-4"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white p-2 rounded mb-4"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white p-2 rounded mb-4"
                  required
                />
              </div>
            </>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              {step === 3 ? "Change Password" : <HiArrowSmRight className="text-xl" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPopup;
