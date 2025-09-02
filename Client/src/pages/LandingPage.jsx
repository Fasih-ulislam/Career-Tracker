import React from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Intro from "../components/Landing Page/Intro";
import Features from "../components/Landing Page/Features";
import Slogan from "../components/Landing Page/Slogan";
import Ending from "../components/Landing Page/Ending";
import ContactInfo from "../components/Landing Page/ContactInfo";

const LandingPage = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen mb-[-20rem]">
        <div className="flex flex-col gap-20 sm:gap-28 md:gap-36 lg:gap-[150px] justify-center items-center">
          <Intro />
          <Features />
          <Slogan />
          <Ending />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
