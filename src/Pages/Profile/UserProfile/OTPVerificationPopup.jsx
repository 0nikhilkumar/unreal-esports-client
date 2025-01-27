import React, { useState, useRef, useEffect } from "react"
import { X, ArrowRight } from "lucide-react"

const OTPVerificationPopup = ({ setResetPassword, onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = useRef([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp]
      newOtp[index] = element.value
      return newOtp
    })

    if (element.value && element.nextSibling) {
      element.nextSibling.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleResendOTP = () => {
    // Implement OTP resend logic here
    console.log("Resending OTP...")
  }

  const handleVerify = () => {
    onVerify(otp.join(""))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full relative animate-fade-in-up">
        <button
          onClick={()=>setResetPassword(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">Verify Your Account</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          We've sent a 4-digit code to your email. Enter it below to confirm your account.
        </p>
        <div className="flex justify-between mb-8">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={data}
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            Verify
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default OTPVerificationPopup

