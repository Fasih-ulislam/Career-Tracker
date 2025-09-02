import dayjs from "dayjs";
import { FileTextIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import deleteResume from "../../utils/deleteResume";
import ConfirmationModal from "../Modals/ConfirmationModal";

const ResumesGrid = ({ resData, setResData, setViewAdd, reload }) => {
  const [showConfirm, setShowConfirm] = useState(null);
  return resData.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 w-full">
      {resData.map((res) => (
        <div
          key={res._id}
          className="w-full max-w-[350px] px-3 py-5 flex flex-col bg-white rounded-lg items-start gap-5 shadow-2xs hover:shadow-2xl transition-all duration-300 ease-in-out mx-auto"
        >
          <h1 className="flex gap-2 justify-center items-center text-2xl text-gray-700 font-medium text-center">
            <FileTextIcon className="text-blue-500 size-[40px]" />
            {res.title}
          </h1>

          <div className="w-full flex justify-center">
            <a href={res.fileUrl} target="_blank" rel="noopener noreferrer">
              <p className="text-[20px] font-medium text-gray-700 hover:text-blue-500 hover:underline transition-all duration-300 ease-in-out">
                View Details
              </p>
            </a>
          </div>

          <div className="flex justify-between w-full">
            <h1 className="text-green-500 font-bold">
              Created At
              <p className="text-gray-700 font-medium">
                {dayjs(res.createdAt).format("DD-MM-YYYY")}
              </p>
            </h1>
            <h1 className="text-green-500 font-bold">
              Updated At
              <p className="text-gray-700 font-medium">
                {dayjs(res.updatedAt).format("DD-MM-YYYY")}
              </p>
            </h1>
          </div>

          <div className="flex justify-center w-full">
            <button
              onClick={() => setShowConfirm(res._id)}
              className="w-full text-white font-medium px-3 py-2 rounded-lg bg-red-500 hover:bg-red-400 transition-all duration-300 ease-in-out"
            >
              Delete
            </button>

            {showConfirm && (
              <ConfirmationModal
                message="Are you sure you want to delete this resume?"
                onConfirm={() => {
                  deleteResume(showConfirm, reload);
                  setShowConfirm(false);
                }}
                OnReject={() => setShowConfirm(false)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex w-full justify-center items-center">
      <h1 className="text-4xl text-gray-700 font-bold">
        {"Seems Empty? "}
        <span
          onClick={() => setViewAdd(true)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Add a Resume
        </span>
      </h1>
    </div>
  );
};

export default ResumesGrid;
