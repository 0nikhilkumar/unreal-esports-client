import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  checkHostUsername,
  checkUsername,
  sendOTPToEmail
} from "../../http";
import OTPVerification from "./OTPVerification";

// Zod validation schemas
const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "Invalid email format",
  });

const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: "Password must be at least of 8 Characters" })
  .max(16, { message: "Password can't be more than 16 Characters" })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }
  );

const Signup = () => {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState("user");
  const [showIcon, setShowIcon] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    preferredName: "",
  });
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");

  // Validation states
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  // Username validation states
  const [usernameStatus, setUsernameStatus] = useState({
    message: "",
    isValid: false,
    checking: false,
  });
  const [typingTimeout, setTypingTimeout] = useState(null);

  const validateField = (name, value) => {
    if (!value) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    try {
      if (name === "email") {
        emailSchema.parse(value);
        setValidationErrors((prev) => ({ ...prev, email: "" }));
      } else if (name === "password") {
        passwordSchema.parse(value);
        setValidationErrors((prev) => ({ ...prev, password: "" }));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors((prev) => ({
          ...prev,
          [name]: error.errors[0].message,
        }));
      }
    }
  };

  const checkUsernameAvailability = async (username) => {
    try {
      console.log(isHost);
      const isHost = activeForm === "host";
      const response = isHost
        ? await checkHostUsername(username)
        : await checkUsername(username);
  
      if (response.status === 200) {
        setUsernameStatus({
          message: response.data.success
            ? "Username is available!"
            : "Username already exists",
          isValid: response.data.success,
          checking: false,
        });
      } else {
        setUsernameStatus({
          message: "Username already exists",
          isValid: false,
          checking: false,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setUsernameStatus({
          message: "Username already exists",
          isValid: false,
          checking: false,
        });
      } else {
        setUsernameStatus({
          message: "Error checking username",
          isValid: false,
          checking: false,
        });
      }
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    validateField(name, value);
  
    if (name === "username") {
      setUsernameStatus((prev) => ({ ...prev, checking: true }));
  
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
  
      const newTimeout = setTimeout(async () => {
        if (value.length > 0) {
          await checkUsernameAvailability(value);
        } else {
          setUsernameStatus({
            message: "",
            isValid: false,
            checking: false,
          });
        }
      }, 500);
  
      setTypingTimeout(newTimeout);
    }
  };

  function togglePasswordVisibility() {
    setShowIcon(!showIcon);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all required fields");
        return;
      }

      emailSchema.parse(formData.email);
      passwordSchema.parse(formData.password);

      if (formData.username && !usernameStatus.isValid) {
        toast.error("Please choose a different username");
        return;
      }

      // if (!showOTP) {
      //   setEmail(formData.email);
      //   setShowOTP(true);
      // } else {
        try {
          let response;
          if (activeForm === "user") {
            response = await sendOTPToEmail(formData.email, formData.username);
            console.log(response.data);
          } else {
            response = await sendOTPToEmail(formData.email, formData.username);
          }
          if (response.data.statusCode == 200) {
            toast.success("Otp Sent to your email");
            setShowOTP(true);
          } else {
            toast.error(response.data.data);
            navigate("/signup");
          }
        } catch (err) {
          toast.error(err.response.data.errors[0]);
        }
      // }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          setValidationErrors((prev) => ({
            ...prev,
            [err.path[0]]: err.message,
          }));
        });
        toast.error("Please fix the validation errors");
      }
    }
  };

  // Reset username validation when switching between user and host forms
  useEffect(() => {
    setUsernameStatus({
      message: "",
      isValid: false,
      checking: false,
    });
    setFormData((prev) => ({
      ...prev,
      username: "",
    }));
  }, [activeForm]);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 z-[30]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full md:h-screen h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <Link to={"/"}>
                <RxCross2 className="text-white text-xl cursor-pointer" />
              </Link>
            </div>

            <div className="flex">
              <button
                onClick={() => setActiveForm("user")}
                className={`w-full py-2 px-4 font-medium text-white rounded-l-lg text-sm transition-all duration-300 ease-in-out ${
                  activeForm === "user"
                    ? "bg-blue-600 border-2 border-blue-700"
                    : "bg-gray-400 hover:bg-blue-500"
                }`}
              >
                User
              </button>
              <button
                onClick={() => setActiveForm("host")}
                className={`w-full py-2 px-4 font-medium text-white rounded-r-lg text-sm transition-all duration-300 ease-in-out ${
                  activeForm === "host"
                    ? "bg-blue-600 border-2 border-blue-700"
                    : "bg-gray-400 hover:bg-blue-500"
                }`}
              >
                Host
              </button>
            </div>

            {!showOTP ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full p-2.5 mt-2 text-sm bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                      validationErrors.email && formData.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {validationErrors.email && formData.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="John12"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className={`w-full p-2.5 mt-2 text-sm bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                        formData.username &&
                        (usernameStatus.isValid
                          ? "border-green-500"
                          : "border-red-500")
                      }`}
                    />
                    {formData.username && (
                      <div
                        className={`mt-1 text-sm ${
                          usernameStatus.checking
                            ? "text-gray-500"
                            : usernameStatus.isValid
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {usernameStatus.checking
                          ? "Checking..."
                          : usernameStatus.message}
                      </div>
                    )}
                  </div>
                </div>

                {activeForm === "host" && (
                  <div>
                    <label
                      htmlFor="preferredName"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Preferred Name
                    </label>
                    <input
                      type="text"
                      name="preferredName"
                      id="preferredName"
                      placeholder="JohnEsports"
                      value={formData.preferredName}
                      onChange={handleChange}
                      required
                      className="w-full p-2.5 mt-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                )}

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type={showIcon ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="*************"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`w-full p-2.5 mt-2 text-sm bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                      validationErrors.password && formData.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {validationErrors.password && formData.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {validationErrors.password}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-7 inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showIcon ? (
                      <FaRegEyeSlash className="text-white text-lg" />
                    ) : (
                      <FaRegEye className="text-white text-lg" />
                    )}
                  </button>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus::ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 font-medium text-white rounded-lg text-sm transition-all duration-300 ease-in-out bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {showOTP ? "Verify OTP" : "Sign up"}
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login
                  </Link>
                </p>
              </form>
            ) : (
              <OTPVerification data={formData} role={activeForm} setShowOTP={setShowOTP}/>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
