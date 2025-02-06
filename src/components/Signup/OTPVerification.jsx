import React, { useState, useRef, useEffect } from "react"
import { X, ArrowRight } from "lucide-react"
import { signUpHost, signUpUser } from "../../http";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OTPVerificationPopup = ({ data, role, setShowOTP }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = element.value;
      return newOtp;
    });

    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendOTP = async () => {
    try {
      // Add your resend OTP API call here
      toast.success("OTP resent successfully!");
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      const otpString = otp.join("");
      
      // Add debug logging
      // console.log('OTP String before request:', otpString);
      
      // Validate OTP
      if (otpString.length !== 4) {
        toast.error("Please enter a valid 4-digit OTP");
        return;
      }
  
      // Ensure all required fields are included
      const requestData = {
        username: data.username,
        email: data.email,
        password: data.password,
        otp: otpString    // Make sure this is being set correctly
      };
  
      // Debug log the full request data
      // console.log('Full request data:', JSON.stringify(requestData, null, 2));
  
      // If it's a host signup, include preferred name
      if (role === "host" && data.preferredName) {
        requestData.preferredName = data.preferredName;
      }
  
      // Log the actual request being made
      // console.log('Making signup request as:', role);
      
      const response = await (role === "user" ? signUpUser(requestData) : signUpHost(requestData));
      
      // Log the response
      // console.log('Response received:', response);
  
      if (response?.data?.statusCode === 201) {
        toast.success(`${role} registered successfully!`);
        navigate("/login");
      } else {
        throw new Error(response?.data?.data || "Verification failed");
      }
    } catch (err) {
      console.error("Verification error:", err);
      console.error("Error response:", err.response); // Add this line
      toast.error(err.response?.data?.message || err.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full relative animate-fade-in-up">
        <button
          onClick={() => setShowOTP(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Verify Your Account
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          We've sent a 4-digit code to {data.email}. Enter it below to confirm your account.
        </p>
        <div className="flex justify-between mb-8 gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-2xl border-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={handleResendOTP}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors text-sm font-medium"
          >
            Resend Code
          </button>
          <button
            onClick={handleVerify}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify"}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPopup;