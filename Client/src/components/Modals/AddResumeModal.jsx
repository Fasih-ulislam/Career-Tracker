import React, { useEffect } from "react";
import { BriefcaseIcon, X, Info, File, Phone, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import AddApplicationForm from "../Applications/AddApplicationForm";
import AddResumeForm from "../Resumes/AddResumeForm";

const AddResumeModal = ({ setView, reload }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] px-4 sm:px-6">
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative flex flex-col gap-4 items-center bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-lg overflow-y-auto p-6 sm:p-8"
      >
        <button
          onClick={() => setView(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-transform hover:scale-110"
        >
          <X className="size-6" />
        </button>

        <h1 className="flex gap-2 text-xl sm:text-2xl md:text-3xl text-gray-700 justify-center items-center font-semibold text-center">
          <FileText className="text-blue-500 size-8 sm:size-10" />
          {false ? "Edit Your" : "Add Your"}{" "}
          <span className="text-blue-500">Resume.</span>
        </h1>

        <div className="w-full">
          <AddResumeForm setView={setView} reload={reload} />
        </div>
      </motion.div>
    </div>
  );
};

export default AddResumeModal;
