// import React, { useState } from "react";
// import { axiosUser } from "../../axiosInstance";
// import { login } from "../../endpoint";
// import { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// // sanaul@gmail.com - email
// // sanaul - password

// // ansar@gmail.com - email
// // ansar  - password

// const Login = () => {
//   const [loginForm, setLoginForm] = useState({
//     Email: "sanaulansari@gmail.com",
//     Password: "sanaul123",
//   });

//   const navigate = useNavigate();

//   const handleLoginForm = (e) => {
//     const { name, value } = e.target;

//     setLoginForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async () => {
//     try {
//       const { data } = await axiosUser.post(login, loginForm);
//       if (data?.Success) {
//         localStorage.setItem("authToken", JSON.stringify(data?.User));
//         // notifySuccess(data?.Message);
//         // setLoginForm({
//         //   Password: "",
//         //   Email: "",
//         // });
//         navigate("/");
//       }
//     } catch (error) {
//       console.log("login-error", error);
//     }
//   };

//   return (
//     <div className="h-screen">
//       <div className="grid-cols-12 h-full flex justify-center items-center bg-blue-100">
//         <div className="w-80 h-80 bg-gray-100 py-3 px-5 rounded-lg flex flex-col gap-4 shadow-lg justify-center">
//           <div className="flex justify-center">
//             <Toaster />
//             <h1 className="text-center lg:text-2xl text-gray-600">
//               Login Profile
//             </h1>
//           </div>
//           <div className="flex flex-col gap-1">
//             <label htmlFor="" className="text-gray-700">
//               Email
//             </label>
//             <input
//               name="Email"
//               type="text"
//               placeholder="Enter your email"
//               className="border-2 h-8 px-2 text-gray-700 border-gray-500 outline-0 rounded-sm"
//               value={loginForm?.Email}
//               onChange={handleLoginForm}
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label htmlFor="" className="text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               className="border-2 h-8 px-2 text-gray-700 border-gray-500 outline-0 rounded-sm"
//               name="Password"
//               placeholder="Enter your password"
//               value={loginForm?.Password}
//               onChange={handleLoginForm}
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               className="bg-teal-500 py-1.5 px-3 text-gray-100 rounded cursor-pointer"
//               onClick={handleLogin}
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { axiosUser } from "../../axiosInstance";
import { login } from "../../endpoint";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    Email: "sanaulansari@gmail.com",
    Password: "sanaul123",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginForm = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!loginForm.Email || !loginForm.Password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axiosUser.post(login, loginForm);

      if (data?.Success) {
        
        localStorage.setItem( 
          "authToken", 
          JSON.stringify(data?.User)
        );

        toast.success(data?.Message || "Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.log("login-error", error);
      toast.error(
        error.response?.data?.Message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-indigo-600 py-5 px-6 text-center">
          <h1 className="text-2xl font-bold text-white">Blogosphere</h1>
          <p className="text-indigo-100 mt-1">
            Welcome back to your writing community
          </p>
        </div>

        <div className="px-8 py-6">
          <Toaster position="top-right" />

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign In</h2>
          <p className="text-gray-600 mb-6">
            Enter your credentials to access your account
          </p>

          {/* Email Input */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="Email"
                type="email"
                placeholder="Enter your email"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                value={loginForm?.Email}
                onChange={handleLoginForm}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                name="Password"
                placeholder="Enter your password"
                value={loginForm?.Password}
                onChange={handleLoginForm}
                onKeyPress={handleKeyPress}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <FiEye className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Login Button */}
          <button
            className={`w-full py-3 px-4 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>

        {/* Demo Accounts Info */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Demo accounts: sanaul@gmail.com (sanaul) | ansar@gmail.com (ansar)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
