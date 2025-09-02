import React, { useEffect, useState, useRef } from "react";
import { Trash2, Eye, SquarePen, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import updateApplication from "../../utils/updateApplication";
import deleteApplication from "../../utils/deleteApplication";
import ConfirmationModal from "./ConfirmationModal";

const ApplicationOptionsModal = ({
  setShowViewApp,
  setShowEditApp,
  appId,
  updateRow,
  deleteRow,
  setActiveAppId,
}) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setActiveAppId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const modalRef = useRef(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const hoverEffect = `hover:bg-blue-200 p-1 rounded-lg`;
  const statuses = [
    "Applied",
    "Under Review",
    "Phone Interview",
    "Final Interview",
    "Technical Interview",
    "Offer Received",
    "Rejected",
    "Withdrawn",
  ];
  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-300 flex flex-col gap-2 absolute right-0 top-0 z-30 bg-white 
                 px-3 py-2 rounded-2xl shadow-2xl 
                 max-h-[250px] overflow-y-auto overflow-x-hidden
                 w-64 sm:w-72 md:w-80"
    >
      {/* Actions */}
      <div className="flex flex-col items-start pb-2 border-b border-gray-300">
        <p className="text-gray-700 font-bold py-1.5 text-sm sm:text-base">
          Actions
        </p>
        <div className="flex flex-col gap-2">
          <p
            onClick={() => setShowViewApp(appId)}
            className={`${hoverEffect} text-gray-700 flex gap-1.5 items-center cursor-pointer text-sm sm:text-base`}
          >
            <Eye className="text-gray-500 size-4 sm:size-[18px]" />
            View Details
          </p>
          <p
            onClick={() => setShowEditApp(appId)}
            className={`${hoverEffect} text-gray-700 flex gap-1.5 items-center cursor-pointer text-sm sm:text-base`}
          >
            <SquarePen className="text-gray-500 size-4 sm:size-[18px]" />
            Edit Application
          </p>
        </div>
      </div>

      {/* Update Status */}
      <div className="flex flex-col items-start pb-2 border-b border-gray-300">
        <p className="text-gray-700 font-bold py-1.5 text-sm sm:text-base">
          Update Status
        </p>
        <div className="grid sm:grid-cols-1 gap-2 w-full">
          {statuses.map((status) => (
            <p
              key={status}
              onClick={() =>
                updateApplication(
                  { applicationStatus: status },
                  appId,
                  updateRow
                )
              }
              className={`${hoverEffect} text-gray-700 flex items-center cursor-pointer pl-2 text-sm sm:text-base`}
            >
              {status}
            </p>
          ))}
        </div>
      </div>

      {/* Delete */}
      <div className="flex flex-col w-full">
        <div
          onClick={() => setShowDeleteModal(!showDeleteModal)}
          className="flex gap-1 items-center cursor-pointer hover:bg-red-200 p-1 rounded-lg transition-colors duration-200"
        >
          <Trash2 className="size-4 sm:size-[18px] text-red-600" />
          <p className="text-red-600 text-sm sm:text-base">Delete</p>
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmationModal
          message={"Are you sure you want to delete this application?"}
          onConfirm={() => deleteApplication(appId, deleteRow)}
          OnReject={() => setShowDeleteModal(false)}
        />
      )}
    </motion.div>
  );
};

export default ApplicationOptionsModal;
