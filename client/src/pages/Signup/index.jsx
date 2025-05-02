import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { axiosUser } from "../../axiosInstance";
import { signup } from "../../endpoint";
import { Toaster } from "react-hot-toast";
import { signupInitialPayload } from "../../payload";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupForm, setSignupForm] = useState(signupInitialPayload);
  const [showProfile, setShowProfile] = useState("");
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type != "file") {
      setSignupForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const file = files[0];
      setShowProfile(URL.createObjectURL(file));
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setSignupForm((prev) => ({
          ...prev,
          Profile: base64String.split(",")[1],
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async () => {
    try {
      const { data } = await axiosUser.post(signup, signupForm);
      if (data?.Success) {
        navigate("/login");
      }
    } catch (error) {
      console.log("signup-err", error);
    }
  };

  return (
    <div className="h-screen">
      <div className="grid-cols-12 h-full flex justify-center items-center bg-blue-100">
        <div className="w-80 lg:h-[70%] bg-gray-100 py-3 px-5 rounded-lg flex flex-col gap-3 shadow-lg">
          <div className="flex justify-center items-center">
            <label htmlFor="profile">
              <Toaster />
              <div className="h-15 w-15 flex justify-center items-center rounded-full border-2 border-gray-400 relative">
                <img
                  src={
                    showProfile ||
                    "https://i.pinimg.com/736x/59/37/5f/59375f2046d3b594d59039e8ffbf485a.jpg"
                  }
                  className="h-14 w-14 rounded-full object-cover object-top"
                  alt=""
                />
                <span className="absolute bottom-0 -right-1 text-gray-700 cursor-pointer">
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
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-gray-700">
              First Name
            </label>
            <input
              name="FirstName"
              type="text"
              placeholder="First Name"
              className="border-2 h-8 px-2 text-gray-700 border-gray-500 outline-0 rounded-sm"
              onChange={handleFormChange}
              value={signupForm?.FirstName}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              className="border-2 h-8 px-2 text-gray-700 border-gray-500 outline-0 rounded-sm"
              name="LastName"
              placeholder="Last Name"
              value={signupForm?.LastName}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-gray-700">
              Email
            </label>
            <input
              type="text"
              className="border-2 h-8 px-2 text-gray-700 border-gray-500 outline-0 rounded-sm"
              name="Email"
              placeholder="Email"
              value={signupForm?.Email}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-gray-700">
              Password
            </label>
            <input
              type="text"
              className="border-2 h-8 px-2 text-gray-700 border-gray-500 outline-0 rounded-sm"
              name="Password"
              placeholder="Password"
              value={signupForm?.Password}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-teal-500 py-1.5 px-3 text-gray-100 rounded cursor-pointer"
              onClick={handleSignup}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
