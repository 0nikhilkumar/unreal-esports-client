import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginHost, loginUser } from "../../http";
import { socketInit } from "../../socket";
import { setAuth } from "../../Store/authSlice";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeForm, setActiveForm] = useState("user");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function togglePasswordVisibility(){
    setShowIcon(!showIcon)
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response;
      if (activeForm === "user") {
        response = await loginUser(formData);
      } else {
        response = await loginHost(formData);
      }
      if (response.data.statusCode === 200) {
        // socketInit().emit("login", response.data.message);
        toast.success(response.data.message);
        setIsSubmitting(true);
        dispatch(setAuth({ user: response.data, role: activeForm }));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.data);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 z-[30] ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login an account
              </h1>

              <Link to={"/"}>
                <RxCross2 className="text-white text-xl cursor-pointer" />
              </Link>
            </div>

            {/* Create User and Create Host Buttons */}
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

            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              {activeForm === "host" ? (
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="host@gmail.com"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email or username
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="email or username"
                    required
                  />
                </div>
              )}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={showIcon?"text":"password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-7 inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 "
                >
                  {showIcon ? <FaRegEyeSlash className="text-white text-lg" /> : <FaRegEye className="text-white text-lg"/>}
                </button>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
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
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to={"/signup"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
