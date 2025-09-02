import React, { useEffect } from "react";
import { BriefcaseIcon, X, Info, File, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import AddApplicationForm from "../Applications/AddApplicationForm";

const AddApplicationModal = ({
  updateRow,
  edit = false,
  showAddApplication,
  setShowAddApplication,
  dashboardData,
  appData,
  setAppData,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] px-4 sm:px-6">
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.6, type: "easeInOut" }}
        className="relative flex flex-col gap-4 items-center bg-white w-full max-w-4xl h-[90vh] rounded-2xl shadow-lg overflow-y-auto p-4 sm:p-6"
      >
        {/* Close Button */}
        <button
          onClick={() => setShowAddApplication(false)}
          className="cursor-pointer absolute top-2 right-2 hover:scale-[1.2]"
        >
          <X />
        </button>

        {/* Modal Header */}
        <h1 className="flex gap-2 text-[20px] sm:text-3xl text-gray-700 justify-center items-center font-medium text-center">
          <BriefcaseIcon className="text-blue-500 size-8 sm:size-[40px]" />
          <p>
            {edit ? "Edit Your" : "Add New Job"}{" "}
            <span className="text-blue-500">Application.</span>
          </p>
        </h1>

        {/* Form Component */}
        <AddApplicationForm
          updateRow={updateRow}
          edit={edit}
          dashboardData={dashboardData}
          appData={appData}
          setAppData={setAppData}
          showAddApplication={showAddApplication}
          setShowAddApplication={setShowAddApplication}
        />
      </motion.div>
    </div>
  );
};

export default AddApplicationModal;
