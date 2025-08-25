import React from "react";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutubeSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full h-60 bg-white flex justify-center" style={{color:'white'}}>
      <div className="w-full max-w-[1200px] flex flex-col items-center justify-center">
        <div className="w-full h-30 gap-20 flex items-center justify-center">
          <div className="h-8 w-16">
            <img
              src="/assets/blog-logo.png"
              alt="logo"
              className="h-full w-full object-fill"
            />
          </div>
          <div className="flex items-center">
            <ul className="flex gap-5">
              <li className="list-none cursor-pointer hover:bg-blue-400 hover:rounded hover:text-white py-1 px-2 transition-colors duration-400 rounded">
                Home
              </li>
              <li className="list-none cursor-pointer hover:bg-blue-400 hover:rounded hover:text-white py-1 px-2 transition-colors duration-400 rounded">
                Category
              </li>
              <li className="list-none cursor-pointer hover:bg-blue-400 hover:rounded hover:text-white py-1 px-2 transition-colors duration-400 rounded">
                All Post
              </li>
              <li className="list-none cursor-pointer hover:bg-blue-400 hover:rounded hover:text-white py-1 px-2 transition-colors duration-400 rounded">
                Create Blog
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full h-30 border-t border-gray-400 flex justify-center items-center">
          <div className="w-full flex justify-center gap-5">
            <span className="text-3xl cursor-pointer hover:text-red-500 duration-100">
              <FaYoutubeSquare />
            </span>
            <span className="text-3xl cursor-pointer hover:text-black-400 duration-100">
              <FaSquareXTwitter />
            </span>
            <span className="text-3xl cursor-pointer hover:text-blue-500 duration-100">
              <FaFacebookSquare />
            </span>
            <span className="text-3xl cursor-pointer hover:text-rose-500 duration-100">
              <FaSquareInstagram />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
