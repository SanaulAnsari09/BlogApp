import React, { useState } from "react";
import { axiosUser } from "../../axiosInstance";
import { login } from "../../endpoint";
import { notifyError, notifySuccess } from "../../notifyMessage";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  const handleLoginForm = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const { data } = await axiosUser.post(login, loginForm);
      if (data?.Success) {
        localStorage.setItem("authToken", data?.Token);
        // notifySuccess(data?.Message);
        // setLoginForm({
        //   Password: "",
        //   Email: "",
        // });
        navigate("/");
      }
    } catch (error) {
      console.log("login-error", error);
    }
  };

  return (
    <div className="h-screen">
      <div className="grid-cols-12 h-full flex justify-center items-center bg-blue-100">
        <div className="w-80 h-80 bg-gray-100 py-3 px-5 rounded-lg flex flex-col gap-4 shadow-lg justify-center">
          <div className="flex justify-center">
            <Toaster />
            <h1 className="text-center lg:text-2xl text-gray-600">
              Login Profile
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-gray-700">
              Email
            </label>
            <input
              name="Email"
              type="text"
              placeholder="Enter your email"
              className="border-2 h-8 px-2 text-gray-700 border-gray-500 outline-0 rounded-sm"
              value={loginForm?.Email}
              onChange={handleLoginForm}
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
              placeholder="Enter your password"
              value={loginForm?.Password}
              onChange={handleLoginForm}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-teal-500 py-1.5 px-3 text-gray-100 rounded cursor-pointer"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
