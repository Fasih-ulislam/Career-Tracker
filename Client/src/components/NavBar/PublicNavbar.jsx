import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logoReal.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, MenuSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import PublicMenu from "./PublicMenu";

const PublicNavbar = () => {
  const navigator = useNavigate();
  const [showNavMenu, setShowNavMenu] = useState(false);

  return (
    <div className="w-full flex justify-between bg-white/50 fixed z-30 backdrop-blur-sm py-3 px-2 border-white shadow-2xl rounded-lg">
      <NavLink className="flex items-center cursor-pointer gap-1" to="/">
        <img src={logo} className="w-[25px] sm:w-[35px]"></img>
        <p className="text-2xl font-medium text-gray-700">Career Tracker</p>
      </NavLink>
      <div className="hidden sm:flex items-center gap-1.5">
        <NavLink className="text-gray-700 font-medium">About</NavLink>
        <NavLink
          to="/auth"
          className="bg-blue-500 text-white font-medium rounded-sm p-2 cursor-pointer hover:bg-[#3F90F5] hover:shadow-2xs"
        >
          Get started
        </NavLink>
      </div>
      <div className="sm:hidden items-center gap-1.5">
        <Menu
          onClick={() => {
            setShowNavMenu(true);
          }}
          className="text-gray-500 size-[25px]"
        />
        <AnimatePresence>
          {showNavMenu && <PublicMenu setShowNavMenu={setShowNavMenu} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PublicNavbar;
