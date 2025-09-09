import React, { useState } from "react";
import logo from "../../assets/logoReal.png";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileModal from "../Modals/ProfileModal";
import { AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import PublicMenu from "./PublicMenu";
import PrivateMenu from "./PrivateMenu";

const ProtectedNavbar = ({ user, avatar, setLogout, logout }) => {
  const [viewProfile, setViewProfile] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);

  return (
    <div className="w-full flex justify-between bg-white/50 fixed z-30 backdrop-blur-sm py-3 px-2 border-white shadow-2xl rounded-lg">
      <NavLink
        className="flex items-center cursor-pointer gap-1"
        to="/protected/dashboard"
      >
        <img src={logo} className="w-[25px] sm:w-[35px]"></img>
        <p className="text-2xl font-medium text-gray-700">Career Tracker</p>
      </NavLink>
      <div className="hidden sm:flex items-center gap-3 py-1 px-4 bg-blue-500 rounded-full mr-30">
        <NavLink
          to="/protected/my-applications"
          className={({ isActive }) =>
            `text-white hover:font-black transition-all duration-150 ease-in-out ${
              isActive ? "font-black" : "font-medium"
            }`
          }
        >
          Applications
        </NavLink>
        <NavLink
          to="/protected/my-resumes"
          className={({ isActive }) =>
            `text-white hover:font-black transition-all duration-150 ease-in-out ${
              isActive ? "font-black" : "font-medium"
            }`
          }
        >
          Resumes
        </NavLink>
        <NavLink
          to="/protected/chat"
          className={({ isActive }) =>
            `text-white hover:font-black transition-all duration-150 ease-in-out ${
              isActive ? "font-black" : "font-medium"
            }`
          }
        >
          Chat
        </NavLink>
      </div>
      <div className="hidden sm:flex items-center gap-1.5">
        <button
          onClick={() => {
            setViewProfile(!viewProfile);
          }}
          className="relative bg-blue-100  rounded-full w-[40px] h-[40px] text-gray-700 font-medium cursor-pointer hover:scale-[1.1] transition-all duration-300 ease-in-out "
        >
          {avatar}
        </button>
        <AnimatePresence>
          {viewProfile && (
            <ProfileModal
              user={user}
              setLogout={setLogout}
              logout={logout}
              setViewProfile={setViewProfile}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="sm:hidden items-center gap-1.5">
        <Menu
          onClick={() => {
            setShowNavMenu(true);
          }}
          className="text-gray-500 size-[25px]"
        />
        <AnimatePresence>
          {showNavMenu && (
            <PrivateMenu
              setShowNavMenu={setShowNavMenu}
              user={user}
              setLogout={setLogout}
              logout={logout}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProtectedNavbar;
