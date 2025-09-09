import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigator = useNavigate();
  return (
    <div className="flex flex-col gap-7 justify-center items-center px-2 sm:px-0">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ amount: 0.7, once: true }}
      >
        <p className="font-medium text-center p-1.5 rounded-full bg-green-100 text-green-500">
          ✨Your Career Success Starts Here
        </p>
      </motion.div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ amount: 0.7, once: true }}
      >
        <p className="text-3xl sm:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-green-400 text-center">
          LOG IT. TRACK IT. LAND IT
        </p>
      </motion.div>

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
        viewport={{ amount: 0.7, once: true }}
      >
        <p className="sm:text-[20px] font text-gray-500 text-center max-w-[700px]">
          Take control of your career journey with our comprehensive job
          application tracking platform. Never lose track of opportunities
          again.
        </p>
      </motion.div>

      <div className="flex justify-center items-center gap-3">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ amount: 0.7, once: true }}
        >
          <button
            onClick={() => navigator("/auth")}
            className="bg-blue-500 text-[18px] text-white font-medium rounded-sm p-2 cursor-pointer hover:bg-[#3F90F5] hover:shadow-2xs"
          >
            Start Tracking Free
          </button>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ amount: 0.7, once: true }}
        >
          <button
            onClick={() => navigator("/about")}
            className="bg-transparent border text-[18px] border-gray-700 text-gray-700 font-medium rounded-sm p-2 cursor-pointer hover:bg-green-300 hover:shadow-2xs"
          >
            About
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Intro;
