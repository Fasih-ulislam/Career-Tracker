import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ blue, Icon, feature, description }) => {
  return (
    <motion.div
      initial={{ y: 18, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ amount: 0.7, once: true }}
    >
      <div className="flex flex-col gap-2 items-start bg-white rounded-lg p-4 w-[350px]  transition-all duration-300 ease-in-out shadow-2xs hover:shadow-2xl">
        <div
          className={`p-3.5 rounded-lg ${
            blue ? "bg-blue-100" : " bg-green-100"
          }`}
        >
          <Icon
            className={`size-[30px] ${
              blue ? "text-blue-500" : "text-green-500 "
            }`}
          />
        </div>
        <h1 className="text-2xl font-medium">{feature}</h1>
        <p className="text-gray-700">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
