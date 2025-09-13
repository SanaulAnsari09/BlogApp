import React from "react";
import { NavLink } from "react-router-dom";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";

import { FaPenToSquare } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Brand section */}
          <div className="md:col-span-4">
            <NavLink to="/" className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg">
                B
              </div>
              <span className="font-bold text-xl">Blogosphere</span>
            </NavLink>
            <p className="text-gray-400 mb-6 max-w-md">
              Discover, share, and connect with the world's best ideas and
              stories. Join our community of writers and readers today.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-2xl text-gray-400 hover:text-[#E4405F] transition-colors"
              >
                <FaSquareInstagram />
              </a>
              <a
                href="#"
                className="text-2xl text-gray-400 hover:text-[#1877F2] transition-colors"
              >
                <FaFacebookSquare />
              </a>
              <a
                href="#"
                className="text-2xl text-gray-400 hover:text-black transition-colors"
              >
                <FaSquareTwitter />
              </a>
              <a
                href="#"
                className="text-2xl text-gray-400 hover:text-[#CD201F] transition-colors"
              >
                <FaSquareYoutube />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/category"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  All Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blogging Tips
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Newsletter
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GDPR
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 md:col-start-9 md:row-start-1">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and articles.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                <FaPenToSquare size={14} />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Blogosphere. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
