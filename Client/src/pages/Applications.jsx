import React from "react";
import axios from "axios";
import {
  BriefcaseBusiness,
  Calendar,
  Clock,
  Download,
  TrendingUp,
} from "lucide-react";
import { toast, Flip } from "react-toastify";
import ApplicationsTable from "../components/Applications/ApplicationsTable";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import validateLoader from "../utils/validateLoader";
import StatCards from "../components/Dashboard/StatCards";

const Applications = () => {
  const location = useLocation;
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const navigator = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [appData, setAppData] = useState([]);

  let getApplications = async () => {
    axios
      .get(`${baseUrl}/api/protected/application`, {
        withCredentials: true,
      })
      .then((res) => {
        setAppData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const dashboardData = async () => {
    await axios
      .get(`${baseUrl}/api/protected/application/dashboard-summary`, {
        withCredentials: true,
      })
      .then((res) => {
        setSummary(res.data);
      })
      .catch((err) => {
        toast.error("Error loading data", {
          toastId: "Validation-Error",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      });
  };

  useEffect(() => {
    const checkAuth = async () => {
      let isValid;

      // Show loading toast only once
      if (!toast.isActive("Validation-Loading")) {
        try {
          isValid = await toast.promise(
            validateLoader(),
            {
              pending: "Please wait for validation",
            },
            {
              toastId: "Validation-Loading",
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
            }
          );
        } catch (err) {
          console.error("Validation error:", err);
          isValid = false;
        }
      } else {
        // If toast is already active, still wait for validation
        isValid = await validateLoader();
      }

      if (!isValid) {
        if (!toast.isActive("Validation-Error")) {
          toast.error("Validation failed", {
            toastId: "Validation-Error",
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
        }
        navigator("/auth");
      } else {
        getApplications();
        dashboardData();
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigator, location]);

  if (loading) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 px-4 py-6 sm:p-10 w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl sm:text-4xl text-gray-700 font-black">
            Job Applications
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-700">
            Track and manage all your job applications in one place.
          </p>
        </div>
        {/* <button className="bg-blue-500 text-white font-medium rounded-sm px-3 py-2 cursor-pointer hover:bg-[#3F90F5] hover:shadow-2xs flex items-center gap-2">
          Export
          <Download className="size-5" />
        </button> */}
      </div>

      {/* Stat Cards Section */}
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 sm:gap-6 w-full">
        <StatCards
          title="Total Applications"
          Logo={BriefcaseBusiness}
          stat={summary.total}
          blue={true}
        />
        <StatCards
          title="Active Applications"
          Logo={Clock}
          stat={summary.active}
          blue={false}
        />
        <StatCards
          title="Interviews Scheduled"
          Logo={Calendar}
          stat={summary.interview}
          blue={true}
        />
        <StatCards
          title="Response Rate"
          Logo={TrendingUp}
          stat={summary.responseRate}
          blue={false}
        />
      </div>

      {/* Applications Table */}
      <ApplicationsTable
        appData={appData}
        setAppData={setAppData}
        dashboardData={dashboardData}
      />
    </div>
  );
};

export default Applications;
