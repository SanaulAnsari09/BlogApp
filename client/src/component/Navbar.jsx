import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaPenToSquare, FaChevronDown } from "react-icons/fa6";
import { AiFillProfile, AiOutlineLogout } from "react-icons/ai";
import { axiosUser } from "../axiosInstance";
import { getUserDetais } from "../endpoint";

const pathItem = [
  {
    name: "Home",
    path: "/",
    active: ["/"],
    icon: null,
  },
  {
    name: "Blogs",
    path: "/blog",
    active: ["/blog"],
    icon: null,
  },
  {
    name: "Categories",
    path: "/category",
    active: ["/category"],
    icon: null,
  },
  {
    name: "About",
    path: "/about",
    active: ["/about"],
    icon: null,
  },
  {
    name: "Contact",
    path: "/contact",
    active: ["/contact"],
    icon: null,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const authData = localStorage.getItem("authToken");
  const parsedAuth = JSON.parse(authData);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  async function getUserDetails() {
    try {
      const { data } = await axiosUser.get(getUserDetais, {
        params: { userId: parsedAuth?.Id },
      });
      setUserDetails(data?.User);
    } catch (error) {
      console.log("allpost-err", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-16 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="h-full w-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg">
            B
          </div>
          <span className="font-bold text-xl text-gray-900 hidden sm:block">
            Blogosphere
          </span>
        </NavLink>

        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
          <ul className="flex gap-1">
            {pathItem?.map((item, ind) => (
              <li key={ind}>
                <NavLink
                  to={item?.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {item?.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <NavLink
            to="/createblog"
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg"
          >
            <FaPenToSquare size={16} />
            <span>Write</span>
          </NavLink>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 rounded-full p-1 border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img
                  src={userDetails?.Profile}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden lg:block">
                {userDetails?.FirstName}
              </span>
              <FaChevronDown
                size={12}
                className={`text-gray-500 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{`${userDetails?.FirstName} ${userDetails?.LastName}`}</p>
                  <p className="text-xs text-gray-500">{userDetails?.Email}</p>
                </div>
                <NavLink
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <AiFillProfile size={16} />
                  <span>Profile</span>
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100 mt-1"
                >
                  <AiOutlineLogout size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <button className="md:hidden flex flex-col gap-1.5 w-6 h-6">
          <span className="w-full h-0.5 bg-gray-600 rounded"></span>
          <span className="w-full h-0.5 bg-gray-600 rounded"></span>
          <span className="w-full h-0.5 bg-gray-600 rounded"></span>
        </button>
      </div>
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsSearchOpen(false)}
        >
          <div className="bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none"
              />
              <button
                type="submit"
                className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white"
              >
                <FaSearch size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
