import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";
import { AiFillProfile } from "react-icons/ai";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isProfile, setIsProfile] = useState(false);

  return (
    <nav className="h-16 w-full bg-[#F5F5F5] shadow-sm">
      <div className="h-full w-full max-w-[1200px] mx-auto flex items-center justify-between">
        <div className="w-[20%]">
          <div className="h-8 w-16">
            <img
              src="/assets/blog-logo.png"
              alt="logo"
              className="h-full w-full object-fill"
            />
          </div>
        </div>
        <div className="w-[80%] hidden md:flex justify-between items-center">
          <div className="flex items-center">
            <ul className="flex gap-5">
              <NavLink
                to="/"
                className={`list-none cursor-pointer hover:bg-blue-400 hover:rounded hover:text-white py-1 px-2 transition-colors duration-400 rounded ${
                  pathname == "/" && "bg-blue-400 text-white"
                }`}
              >
                Home
              </NavLink>
              <NavLink
                to="/blog"
                className={`list-none cursor-pointer hover:bg-blue-400 hover:rounded hover:text-white py-1 px-2 transition-colors duration-400 rounded ${
                  pathname == "/blog" && "bg-blue-400 text-white"
                }`}
              >
                Blog's
              </NavLink>
              <NavLink
                to="/category"
                className={`list-none cursor-pointer hover:bg-blue-400 hover:rounded hover:text-white py-1 px-2 transition-colors duration-400 rounded
                  ${pathname == "/category" && "bg-blue-400 text-white"}
                `}
              >
                Category
              </NavLink>
            </ul>
          </div>
          <div className="flex items-center gap-8 overflow-hidden">
            <NavLink
              to="/createblog"
              className={`list-none cursor-pointe hover:bg-blue-400 hover:rounded hover:text-white py-1 px-2 transition-colors duration-400 rounded 
                    ${
                      pathname == "/createblog"
                        ? "bg-blue-400 text-white"
                        : "bg-gray-200 text-black"
                    }
                  `}
            >
              <div className="w-full flex gap-2 items-center">
                <span>
                  <FaPenToSquare />
                </span>
                <span>Write</span>
              </div>
            </NavLink>
            <button className="bg-orange-400 py-1 px-2 text-white rounded font-semibold cursor-pointer">
              Logout
            </button>
            <div className="flex relative">
              <div
                className="h-12 w-12 border-2 border-gray-400 rounded-full cursor-pointer"
                onClick={() => setIsProfile(!isProfile)}
              >
                <img
                  src="https://i.pinimg.com/736x/59/37/5f/59375f2046d3b594d59039e8ffbf485a.jpg"
                  alt=""
                  className="h-full w-full rounded-full"
                />
              </div>
              <NavLink
                to={"/profile"}
                className={`absolute h-8 rounded w-20 bg-gray-600 flex items-center justify-center text-white font-light gap-2 cursor-pointer top-[0.5rem] z-50 transition-[right] duration-150 ease-in-out ${
                  isProfile ? "right-[4.5rem]" : "right-[-5.5rem]"
                }`}
              >
                <AiFillProfile />
                <span>Profile</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
