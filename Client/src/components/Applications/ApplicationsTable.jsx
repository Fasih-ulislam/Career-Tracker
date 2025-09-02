import axios from "axios";
import { Plus, PlusSquareIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Building2, EllipsisIcon, Mail } from "lucide-react";
import dayjs from "dayjs";
import ApplicationOptionsModal from "../Modals/ApplicationOptionsModal";
import { AnimatePresence } from "framer-motion";
import AddApplicationModal from "../Modals/AddApplicationModal";
import ViewApplicationModal from "../Modals/ViewApplicationModal";

const ApplicationsTable = ({ appData, setAppData, dashboardData }) => {
  const updateRow = (id, newAppData) => {
    setAppData((prev) =>
      prev.map((app) => (app._id === id ? newAppData : app))
    );
    dashboardData();
  };
  const deleteRow = (id) => {
    setAppData((prev) => prev.filter((app) => app._id !== id));
    dashboardData();
  };
  const [showEditApp, setShowEditApp] = useState(null);
  const [showViewApp, setShowViewApp] = useState(null);
  const [showAddApplication, setShowAddApplication] = useState(false);
  const [activeAppId, setActiveAppId] = useState(null);
  const headers = [
    "Company",
    "Position",
    "Location",
    "Salary",
    "Status",
    "Applied",
    "Last Update",
    "Actions",
  ];

  const colour = {
    Applied: "bg-blue-200 text-blue-500",
    "Under Review": "bg-yellow-200 text-yellow-500",
    "Phone Interview": "bg-orange-200 text-orange-500",
    "Final Interview": "bg-orange-200 text-orange-500",
    "Technical Interview": "bg-orange-200 text-orange-500",
    "Offer Received": "bg-green-200 text-green-500",
    Rejected: "bg-red-200 text-red-500",
    Withdrawn: "bg-gray-200 text-gray-500",
  };

  const tdStyle = `px-5 py-4 text-center`;
  return (
    <div className="flex flex-col items-start gap-6 sm:gap-8 md:gap-10 p-4 sm:p-6 md:p-8 bg-white rounded-2xl w-full overflow-x-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between w-full items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl text-gray-700 font-bold">
            Applications ({appData.length})
          </h1>
          <p className="text-sm sm:text-base text-gray-700">
            Click on column headers to sort. Use the actions menu for more
            options.
          </p>
        </div>
        <button
          onClick={() => setShowAddApplication(true)}
          className="bg-green-500 text-white font-medium rounded-sm px-3 py-2 cursor-pointer hover:bg-green-400 hover:shadow-2xs flex items-center gap-2"
        >
          Add Application
          <Plus className="size-5" />
        </button>
      </div>

      {/* Table Section */}
      {appData.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="min-w-[800px] w-full">
            <thead>
              <tr>
                {headers.map((head) => (
                  <th
                    key={head}
                    className="text-gray-700 font-medium px-4 py-2 text-sm sm:text-base"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appData.map((app) => (
                <tr key={app._id} className="border-y border-gray-300">
                  <td className="px-4 py-3 text-center font-medium flex gap-1 items-center">
                    <Building2 className="text-gray-700" />
                    {app.companyName}
                  </td>
                  <td className={tdStyle}>{app.positionTitle}</td>
                  <td className={tdStyle}>{app.location || "Not specified"}</td>
                  <td className={tdStyle}>
                    {(app.salaryMin || "N/A") +
                      " - " +
                      (app.salaryMax || "N/A") +
                      " " +
                      (app.salaryCurrency || "Currency not Specified")}
                  </td>
                  <td className={`${tdStyle} flex justify-center items-center`}>
                    <p
                      className={`${
                        colour[app?.applicationStatus]
                      } py-1 px-3 rounded-full font-medium text-sm sm:text-base`}
                    >
                      {app.applicationStatus}
                    </p>
                  </td>
                  <td className={tdStyle}>
                    {dayjs(app.applicationDate).format("MMM D, YYYY")}
                  </td>
                  <td className={tdStyle}>
                    {dayjs(app.updatedAt).format("MMM D, YYYY")}
                  </td>
                  <td
                    className={`${tdStyle} relative`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveAppId((prev) =>
                        prev === app._id ? null : app._id
                      );
                    }}
                  >
                    <EllipsisIcon className="text-gray-950 cursor-pointer hover:scale-[1.1] transition-all duration-200 ease-in-out" />
                    <AnimatePresence>
                      {activeAppId === app._id && (
                        <ApplicationOptionsModal
                          setShowViewApp={setShowViewApp}
                          setShowEditApp={setShowEditApp}
                          appId={app._id}
                          updateRow={updateRow}
                          deleteRow={deleteRow}
                          setActiveAppId={setActiveAppId}
                        />
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full">
          <p className="text-xl sm:text-2xl text-gray-700 font-medium text-center">
            Seems Empty?{" "}
            <span
              onClick={() => setShowAddApplication(true)}
              className="text-green-500 hover:underline cursor-pointer"
            >
              Add an Application.
            </span>
          </p>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showAddApplication && (
          <AddApplicationModal
            dashboardData={dashboardData}
            appData={appData}
            setAppData={setAppData}
            showAddApplication={showAddApplication}
            setShowAddApplication={setShowAddApplication}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showEditApp && (
          <AddApplicationModal
            updateRow={updateRow}
            edit={true}
            dashboardData={dashboardData}
            appData={appData}
            setAppData={setAppData}
            showAddApplication={showEditApp}
            setShowAddApplication={setShowEditApp}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showViewApp && (
          <ViewApplicationModal
            appData={appData}
            appId={showViewApp}
            setShowViewApp={setShowViewApp}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

{
}
export default ApplicationsTable;
