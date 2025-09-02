import React from "react";
import { motion } from "framer-motion";
import SloganCard from "./SloganCard";

const Slogan = () => {
  return (
    <div className="flex flex-col gap-7 justify-center items-center px-2 sm:px-0">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ amount: 0.7, once: true }}
      >
        <p className="text-2xl sm:text-4xl font-bold flex gap-2">
          Simple. Powerful.<span className="text-blue-500"> Effective.</span>
        </p>
      </motion.div>
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ amount: 0.7, once: true }}
      >
        <p className="sm:text-[20px] font text-gray-500 text-center max-w-[700px]">
          Get started in minutes with our intuitive three-step process
        </p>
      </motion.div>
      <div className="grid lg:grid-cols-3 gap-[50px]">
        <SloganCard
          number="1"
          blue={true}
          step="Log Applications"
          description="Add job applications with company details, position info, and application status"
        />
        <SloganCard
          number="2"
          blue={false}
          step="Track Progress"
          description="Monitor application status, schedule interviews, and set follow-up reminders"
        />
        <SloganCard
          number="3"
          blue={true}
          step="Land Your Dream Job"
          description="Use insights and analytics to optimize your approach and secure offers"
        />
      </div>
    </div>
  );
};

export default Slogan;
