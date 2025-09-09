import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Ending = () => {
  const navigator = useNavigate();
  return (
    <div className="flex flex-col gap-7 justify-center items-center w-screen px-2 sm:px-0">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ amount: 0.7, once: true }}
      >
        <p className="text-2xl sm:text-4xl font-medium text-center">
          Ready to take control of your career?
        </p>
      </motion.div>

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
        viewport={{ amount: 0.7, once: true }}
      >
        <p className="sm:text-[20px] font text-gray-500 text-center max-w-[700px]">
          Be part of the job seekers who have successfully landed their dream
          jobs using Career Tracker
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
            Start Free Today
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

export default Ending;
