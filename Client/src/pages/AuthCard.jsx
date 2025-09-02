import React, { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import logo from "../assets/logoReal.png";

const AuthCard = () => {
  const [face, setFace] = useState(true);

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={face ? "login" : "register"}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            when: "beforeChildren",
            delayChildren: 0.5,
            staggerChildren: 0.3,
          }}
          className="absolute w-full h-full bg-gray-100"
        >
          <div className=" flex flex-col gap-3 justify-center items-center min-h-screen">
            <div className="flex gap-2 justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={face ? "login" : "register"}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -10, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <img src={logo} className=""></img>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col items-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={face ? "login" : "register"}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -10, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    <span className="text-4xl font-medium text-center text-gray-700">
                      Career Tracker
                    </span>
                  </motion.div>
                </AnimatePresence>

                <div className="flex gap-1 justify-center items-center p-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={face ? "login" : "register"}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <span className="text font-medium text-center text-gray-700">
                        Log it{" "}
                      </span>
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={face ? "login" : "register"}
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                      exit={{ x: -10 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <ChevronsRight />
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={face ? "login" : "register"}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <span className="text font-medium text-center text-gray-700">
                        Track it{" "}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={face ? "login" : "register"}
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                      exit={{ x: -10 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <ChevronsRight />
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={face ? "login" : "register"}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <span className="text font-medium text-center text-gray-700">
                        Land it{" "}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            {face ? (
              <LoginForm switchForm={() => setFace(false)} />
            ) : (
              <RegisterForm switchForm={() => setFace(true)} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthCard;
