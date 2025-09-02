import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmationModal = ({ message, onConfirm, OnReject }) => {
  return createPortal(
    <div className="fixed inset-0 bg-transparent backdrop-blur-2xl z-50 flex justify-center items-center p-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl gap-5 p-5">
          <h1 className="text-2xl sm:text-3xl text-gray-700">{message}</h1>
          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              className="bg-blue-500 text-white font-medium rounded-sm p-2 cursor-pointer hover:bg-[#3F90F5] hover:shadow-2xs"
            >
              Confirm
            </button>
            <button
              onClick={OnReject}
              className="bg-blue-500 text-white font-medium rounded-sm p-2 cursor-pointer hover:bg-[#3F90F5] hover:shadow-2xs"
            >
              Reject
            </button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ConfirmationModal;
