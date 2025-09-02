import React from "react";
import { motion } from "framer-motion";

const SloganCard = ({ blue, number, step, description }) => {
  return (
    <motion.div
      initial={{ y: 18, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ amount: 0.7, once: true }}
    >
      <div className="flex flex-col gap-2 justify-center items-center w-[350px]">
        <div
          className={`w-20 h-20 rounded-full flex justify-center items-center ${
            blue ? "bg-blue-100" : " bg-green-100"
          }`}
        >
          <p
            className={`text-2xl font-medium ${
              blue ? "text-blue-500" : "text-green-500 "
            }`}
          >
            {number}
          </p>
        </div>
        <h1 className="text-2xl font-medium">{step}</h1>
        <p className="text-gray-700 text-center">{description}</p>
      </div>
    </motion.div>
  );
};

export default SloganCard;
