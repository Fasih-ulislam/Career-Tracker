import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoReal.png";

const ContactInfo = () => {
  const navigator = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex gap-7 justify-between items-center w-screen bg-blue-100 p-12 md:p-[100px]">
      <div
        onClick={scrollToTop}
        className="flex justify-center items-center cursor-pointer"
      >
        <img src={logo} className="w-[35px] "></img>
        <p className="md:text-2xl text-gray-700 font-bold">Career Tracker</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text font-bold text-gray-700">Contact Info</h1>
        <div className="flex gap-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=muhammadfasih969@gmail.com&su=Help+Request&body=Hi,+I+need+assistance+with..."
            className="text font-medium text-gray-700 hover:underline"
          >
            Email
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/muhammad-fasih-927059365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            className="text font-medium text-gray-700 hover:underline"
          >
            LinkedIn
          </a>
          {/* <a
          href="mailto:muhammadfasih969@gmail.com"
          className="text font-medium text-gray-700 hover:underline"
        >
          <p>Git-Hub</p>
        </a> */}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
