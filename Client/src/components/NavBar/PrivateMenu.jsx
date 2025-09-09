import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logoReal.png";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, MenuSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

const PrivateMenu = ({ setShowNavMenu, user, setLogout, logout }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowNavMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 bg-black/60 flex items-start justify-end z-[9999] p-2"
    >
      <motion.div
        ref={modalRef}
        initial={{ x: 70 }}
        animate={{ x: 0 }}
        exit={{ x: 70 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex flex-col gap-2 items-start top-full mt-2 right-7 bg-white px-7 py-2 min-w-[30vh] h-[90vh]"
      >
        <div className="border-gray-300 w-full flex flex-col gap-3">
          <h1 className="text-gray-700 font-black">PAGES</h1>
          <NavLink
            to={"/protected/dashboard"}
            className={({ isActive }) =>
              `text-gray-700 hover:font-medium transition-all duration-150 ease-in-out ${
                isActive ? "font-medium" : "font-normal"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"/protected/my-applications"}
            className={({ isActive }) =>
              `text-gray-700 hover:font-medium transition-all duration-150 ease-in-out ${
                isActive ? "font-medium" : "font-normal"
              }`
            }
          >
            Applications
          </NavLink>
          <NavLink
            to={"/protected/my-resumes"}
            className={({ isActive }) =>
              `text-gray-700 hover:font-medium transition-all duration-150 ease-in-out ${
                isActive ? "font-medium" : "font-normal"
              }`
            }
          >
            Resumes
          </NavLink>
          <NavLink
            to="/protected/chat"
            className={({ isActive }) =>
              `text-gray-700 hover:font-medium transition-all duration-150 ease-in-out ${
                isActive ? "font-medium" : "font-normal"
              }`
            }
          >
            Chat
          </NavLink>
          <h1 className="text-gray-700 font-black">PROFILE</h1>
          <div className="pb-2 border-b border-gray-300 w-full">
            <div className="flex flex-col items-start hover:scale-[1.1] transition-all duration-300 ease-in-out">
              <p className="text-gray-700 font-bold">{user.name || "None"}</p>
              <p className="text-gray-700">{user.email || "None"}</p>
            </div>
          </div>
          <div className="pb-2 border-b border-gray-300 w-full">
            <div
              onClick={() => setLogout(!logout)}
              className="flex gap-1 items-center justify-start cursor-pointer hover:scale-[1.1] transition-all duration-300 ease-in-out"
            >
              <LogOut className="size-[20px] text-red-600" />
              <p className="text-red-600 font-medium ">Logout</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById("modal-root")
  );
};

export default PrivateMenu;
