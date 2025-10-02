import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { axiosUser } from "../../axiosInstance";
import { signup } from "../../endpoint";
import { Toaster, toast } from "react-hot-toast";
import { signupInitialPayload } from "../../payload";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const [signupForm, setSignupForm] = useState(signupInitialPayload);
  const [showProfile, setShowProfile] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type !== "file") {
      setSignupForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const file = files[0];
      setShowProfile(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignupForm((prev) => ({
          ...prev,
          Profile: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async () => {
    const { FirstName, LastName, Email, Password, Bio } = signupForm;
    if (!FirstName || !LastName || !Email || !Password || !Bio) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axiosUser.post(signup, signupForm);
      if (data?.Success) {
        toast.success(data?.Message || "Signup successful!");
        navigate("/login");
      }
    } catch (error) {
      console.log("signup-err", error);
      toast.error(error.response?.data?.Message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] h-auto bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Image / Decoration */}
        <div className="hidden md:flex w-1/2 bg-indigo-600 justify-center items-center p-10">
          <h2 className="text-white text-3xl font-bold text-center">
            Welcome to Blogosphere
          </h2>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col gap-5">
          <Toaster position="top-right" />

          {/* Profile Upload */}
          <div className="flex justify-center items-center mb-4">
            <label htmlFor="profile">
              <div className="h-20 w-20 flex justify-center items-center rounded-full border-2 border-gray-400 relative cursor-pointer hover:border-indigo-500 transition">
                <img
                  src={
                    showProfile ||
                    "https://i.pinimg.com/736x/59/37/5f/59375f2046d3b594d59039e8ffbf485a.jpg"
                  }
                  className="h-20 w-20 rounded-full object-cover"
                  alt="Profile"
                />
                <span className="absolute bottom-0 -right-1 text-gray-700">
                  <FaCamera />
                </span>
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              id="profile"
              name="Profile"
              onChange={handleFormChange}
            />
          </div>

          {/* First & Last Name */}
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-gray-700">First Name</label>
              <input
                name="FirstName"
                type="text"
                placeholder="First Name"
                className="border-2 h-10 px-3 text-gray-700 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
                onChange={handleFormChange}
                value={signupForm?.FirstName}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-gray-700">Last Name</label>
              <input
                name="LastName"
                type="text"
                placeholder="Last Name"
                className="border-2 h-10 px-3 text-gray-700 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
                onChange={handleFormChange}
                value={signupForm?.LastName}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700">Email</label>
            <input
              name="Email"
              type="email"
              placeholder="Email"
              className="border-2 h-10 px-3 text-gray-700 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onChange={handleFormChange}
              value={signupForm?.Email}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-gray-700">Password</label>
            <input
              name="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border-2 h-10 px-3 text-gray-700 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition pr-10"
              onChange={handleFormChange}
              value={signupForm?.Password}
            />
            <span
              className="absolute right-3 top-[33px] cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700">Bio</label>
            <textarea
              name="Bio"
              rows={3}
              placeholder="Tell us about yourself"
              className="border-2 px-3 py-2 text-gray-700 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
              onChange={handleFormChange}
              value={signupForm?.Bio}
            />
          </div>

          {/* Signup Button */}
          <button
            className={`w-full py-3 px-4 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            onClick={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>

          {/* Login Link */}
          <div className="text-center mt-2">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                className="text-indigo-600 font-medium cursor-pointer hover:text-indigo-500"
                onClick={() => navigate("/login")}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
