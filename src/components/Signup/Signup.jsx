import { useState } from "react";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { signUpHost, signUpUser } from "../../http";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function togglePasswordVisibility(){
    setShowIcon(!showIcon)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if(activeForm === "user"){
        response = await signUpUser(formData);
      }
      else {
        response = await signUpHost(formData);
      }
      if (response.data.statusCode == 201) {
        toast.success("Registered Successfully");
        navigate("/login");
      } else {
        toast.error(response.data.data);
      }
    } catch (err) {
      toast.error(err.response.data.errors[0]);
    }
  };

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

            {/* Form Section */}
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
                  className="w-full p-2.5 mt-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="John12"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 mt-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
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
                 type={showIcon?"text":"password"}
                  name="password"
                  id="password"
                  placeholder="*************"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 mt-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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
                className="w-full py-2 px-4 font-medium text-white rounded-lg text-sm transition-all duration-300 ease-in-out bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >

                Sign up
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
