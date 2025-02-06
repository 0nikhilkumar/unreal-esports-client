import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { HiArrowSmRight } from "react-icons/hi";
import OTPVerificationPopup from "./OTPVerificationPopup";
import { useSelector } from "react-redux";
import { forgotHostPassword, forgotPassword, sendOtpToEmailForForgotPassword, sendOtpToHostEmailForForgotPassword, verifyOtpForForgotPassword, verifyOtpForHostForgotPassword } from "../../../http";
import toast from "react-hot-toast";

const ResetPasswordPopup = ({ setResetPassword }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtpp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { role } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      // Send OTP to email
      const response = role === "user" ? await sendOtpToEmailForForgotPassword(email) : await sendOtpToHostEmailForForgotPassword(email);
      if(response.data.statusCode === 200){
        toast.success(response.data.message);
        setStep(2);
      } else {
        toast.error(response.data.data);
      }
      // console.log(response.data);
    } else if (step === 2) {
      // Verify OTP
      const data = {
        email,
        otp
      };

      // console.log(email, otp);
      const response = await (role === "user" ? verifyOtpForForgotPassword(data) : verifyOtpForHostForgotPassword(data));
      if(response.data.statusCode === 200){
        toast.success(response.data.message);
        setStep(3);
      } else {
        toast.error(response.data.data);
      }
    } else {
      // Change password
      const data = {
        email,
        password: newPassword,
        confirmPassword
      };
      const response = await (role === "user" ? forgotPassword(data): forgotHostPassword(data));
      if(response.data.statusCode === 200){
        toast.success(response.data.message);
        setResetPassword(false);
      } else {
        toast.error(response.data.data);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 py-4 px-8 md:min-w-[30rem] md:py-8 rounded-lg relative">
        <h2 className=" text-md md:text-2xl font-bold mb-4">Change Password</h2>
        <div
          className="absolute top-10 right-10"
          onClick={() => setResetPassword(false)}
        >
          <RxCross2 className="text-white text-md md:text-2xl relative bottom-7 left-7 cursor-pointer" />
        </div>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <label className="block mb-2 ">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 text-white p-2 rounded mb-4 "
                required
              />
            </div>
          )}
          {step === 2 && (
            <OTPVerificationPopup email={email} setOtpp={setOtpp} setResetPassword={setResetPassword}/>
          )}
          {step === 3 && (
            <>
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
