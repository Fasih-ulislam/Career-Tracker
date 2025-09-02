import React, { useEffect, useRef } from "react";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

const ProfileModal = ({ user, setLogout, logout, setViewProfile }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setViewProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <motion.div
      ref={modalRef}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-2 items-start absolute top-full mt-2 right-7 bg-white px-7 py-2 rounded-2xl shadow-2xl"
    >
      <div className="pb-2 border-b border-gray-300 w-full">
        <div className="flex flex-col items-start hover:scale-[1.1] transition-all duration-300 ease-in-out">
          <p className="text-gray-700 font-black">{user.name || "None"}</p>
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
    </motion.div>
  );
};

export default ProfileModal;
