import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logoReal.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, MenuSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

const PublicMenu = ({ setShowNavMenu }) => {
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
        className="flex flex-col gap-2 items-start top-full mt-2 right-7 bg-white px-7 py-2 w-[30vh] h-[90vh]"
      >
        <div className="border-gray-300 w-full flex flex-col gap-3">
          <h1 className="text-gray-700 font-black">PAGES</h1>
          <NavLink to={"/"} className="text-gray-700 font-medium">
            Home
          </NavLink>
          <NavLink className="text-gray-700 font-medium">About</NavLink>
          <NavLink
            to="/auth"
            className="bg-blue-500 text-white font-medium rounded-sm p-2 cursor-pointer hover:bg-[#3F90F5] hover:shadow-2xs"
          >
            Get started
          </NavLink>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById("modal-root")
  );
};

export default PublicMenu;
