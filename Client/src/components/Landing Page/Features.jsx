import React from "react";
import { useInView } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { Target, Calendar, DollarSign } from "lucide-react";

const Features = () => {
  return (
    <div className="flex flex-col gap-7 justify-center items-center px-2 sm:px-0">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ amount: 0.7, once: true }}
      >
        <p className="text-[23px] sm:text-4xl font-bold">
          Everything you need to
          <span className="text-blue-500">{" succeed."}</span>
        </p>
      </motion.div>
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ amount: 0.7, once: true }}
      >
        <p className="sm:text-[20px] font text-gray-500 text-center max-w-[700px]">
          Comprehensive tools to manage every aspect of your job search journey.
        </p>
      </motion.div>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-[50px] md:px-2">
        <FeatureCard
          blue={true}
          Icon={Target}
          feature="Application Tracking"
          description="Keep detailed records of every job application with status updates and notes"
        />
        <FeatureCard
          blue={false}
          Icon={Calendar}
          feature="Interview Scheduler"
          description="Never miss an interview with automated reminders (coming soon)"
        />
        <FeatureCard
          blue={true}
          Icon={DollarSign}
          feature="Salary Tracking"
          description="Track salary ranges for applications to make informed decisions"
        />
      </div>
    </div>
  );
};

export default Features;
