import React, { useEffect, useState } from "react";
import {
  Calendar,
  Dot,
  File,
  FileTextIcon,
  Info,
  MapPin,
  NotebookPen,
} from "lucide-react";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ApplicationDetails = ({ appData }) => {
  const location = useLocation;
  const [resData, setResData] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  let getResume = async () => {
    if (appData.resumeUsed) {
      axios
        .get(`${baseUrl}/protected/resume/${appData.resumeUsed}`, {
          withCredentials: true,
        })
        .then((res) => {
          setResData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    getResume();
  }, [location]);

  const colours = {
    Applied: "bg-blue-200 text-blue-500",
    "Under Review": "bg-yellow-200 text-yellow-500",
    "Phone Interview": "bg-orange-200 text-orange-500",
    "Final Interview": "bg-orange-200 text-orange-500",
    "Technical Interview": "bg-orange-200 text-orange-500",
    "Offer Received": "bg-green-200 text-green-500",
    Rejected: "bg-red-200 text-red-500",
    Withdrawn: "bg-gray-200 text-gray-500",
  };

  const coloursSpan = {
    Applied: "text-blue-500",
    "Under Review": "text-yellow-500",
    "Phone Interview": "text-orange-500",
    "Final Interview": "text-orange-500",
    "Technical Interview": "text-orange-500",
    "Offer Received": "text-green-500",
    Rejected: "text-red-500",
    Withdrawn: "text-gray-500",
  };

  const coloursSpanHover = {
    Applied: "hover:text-blue-500",
    "Under Review": "hover:text-yellow-500",
    "Phone Interview": "hover:text-orange-500",
    "Final Interview": "hover:text-orange-500",
    "Technical Interview": "hover:text-orange-500",
    "Offer Received": "hover:text-green-500",
    Rejected: "hover:text-red-500",
    Withdrawn: "hover:text-gray-500",
  };

  const statusColor = colours[appData.applicationStatus];
  const spanColor = coloursSpan[appData.applicationStatus];
  const spanColorHover = coloursSpanHover[appData.applicationStatus];
  const h1Style = "flex flex-col text-gray-500 font-medium";
  const spanStyle = `${spanColor} font-normal`;

  return (
    <div className="flex flex-col gap-4 w-full max-w-[900px] mx-auto p-4 sm:p-6 justify-center items-center">
      {/* Basic Details */}
      <fieldset className="flex flex-col gap-3 justify-center items-center border w-full p-3 sm:p-4 border-gray-500 rounded-lg">
        <legend className="flex items-center gap-2 text-lg sm:text-2xl text-gray-700 font-medium">
          Basic Details <Info />
        </legend>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-2 sm:gap-4">
          <h1 className="text-lg sm:text-2xl text-gray-700 font-medium break-words">
            <span className={`${spanColor} font-bold`}>
              {appData.positionTitle}
            </span>
            {" at "}
            <span className={`${spanColor} font-bold`}>
              {appData.companyName}
            </span>
          </h1>
          <h1
            className={`text-lg sm:text-2xl p-2 sm:p-3 font-medium rounded-full ${statusColor}`}
          >
            {appData.applicationStatus}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-2 sm:gap-4">
          <h1 className="flex gap-1 items-center text-base sm:text-2xl text-gray-500 font-medium break-words">
            <MapPin />
            {appData.location || "Not Specified"}
          </h1>
          <h1 className="text-base sm:text-2xl text-gray-500 font-medium">
            Applied at:{" "}
            <span className={spanColor}>
              {dayjs(appData.applicationDate).format("DD-MM-YYYY")}
            </span>
          </h1>
        </div>
      </fieldset>

      {/* Job Details */}
      <fieldset className="flex flex-col gap-3 justify-center items-center border w-full p-3 sm:p-4 border-gray-500 rounded-lg">
        <legend className="flex items-center gap-2 text-lg sm:text-2xl text-gray-700 font-medium">
          Job Details <File />
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
          <h1 className={h1Style}>
            Job Type
            <span className={spanStyle}>
              {appData.jobType || "Not Specified"}
            </span>
          </h1>
          <h1 className={h1Style}>
            Source
            <span className={spanStyle}>
              {appData.source || "Not Specified"}
            </span>
          </h1>
          <h1 className={h1Style}>
            Salary Range
            <span className={spanStyle}>
              {appData.salaryMin || "N/A"}-{appData.salaryMax || "N/A"}{" "}
              {appData.salaryCurrency || "N/A"} /{" "}
              {appData.salaryPeriod || "N/A"}
            </span>
          </h1>
          <h1 className={`${h1Style} break-all`}>
            Job URL
            <span className={spanStyle}>
              {appData.jobURL || "Not Specified"}
            </span>
          </h1>
        </div>
      </fieldset>

      {/* Timeline */}
      <fieldset className="flex flex-col gap-3 justify-center items-center border w-full p-3 sm:p-4 border-gray-500 rounded-lg">
        <legend className="flex items-center gap-2 text-lg sm:text-2xl text-gray-700 font-medium">
          Timeline Details <Calendar />
        </legend>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-2 sm:gap-4">
          <h1 className="text-gray-500 text-base sm:text-lg font-medium">
            Created At:{" "}
            <span className={spanStyle}>
              {dayjs(appData.createdAt).format("DD-MM-YYYY")}
            </span>
          </h1>
          <h1 className="text-gray-500 text-base sm:text-lg font-medium">
            Last Updated:{" "}
            <span className={spanStyle}>
              {dayjs(appData.updatedAt).format("DD-MM-YYYY")}
            </span>
          </h1>
        </div>
      </fieldset>

      {/* Resume */}
      <fieldset className="flex flex-col gap-3 justify-center items-center border w-full p-3 sm:p-4 border-gray-500 rounded-lg">
        <legend className="flex items-center gap-2 text-lg sm:text-2xl text-gray-700 font-medium">
          Resume Used <FileTextIcon />
        </legend>

        {resData ? (
          <>
            <h1 className="flex gap-2 justify-center items-center text-base sm:text-2xl text-gray-700 font-medium">
              <FileTextIcon
                className={`${spanColor} size-[30px] sm:size-[40px]`}
              />
              {resData.title}
            </h1>
            <div className="w-full flex justify-center items-center">
              <a
                href={resData.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p
                  className={`text-[16px] sm:text-[20px] font-medium text-gray-700 ${spanColorHover} hover:underline transition-all duration-300 ease-in-out`}
                >
                  View Details
                </p>
              </a>
            </div>
          </>
        ) : (
          <h1 className="flex gap-2 justify-center items-center text-base sm:text-2xl text-gray-700 font-medium">
            <FileTextIcon
              className={`${spanColor} size-[30px] sm:size-[40px]`}
            />
            No Resume Specified
          </h1>
        )}
      </fieldset>

      {/* Notes */}
      <fieldset className="flex flex-col gap-3 justify-center items-center border w-full p-3 sm:p-4 border-gray-500 rounded-lg">
        <legend className="flex items-center gap-2 text-lg sm:text-2xl text-gray-700 font-medium">
          Notes <NotebookPen />
        </legend>
        <p className="text-gray-700 flex text-sm sm:text-base break-words">
          <span>
            <Dot className={spanColor} />
          </span>
          {appData.notes || "No notes were made."}
        </p>
      </fieldset>
    </div>
  );
};

export default ApplicationDetails;
