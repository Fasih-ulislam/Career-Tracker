import React from "react";
import axios from "axios";
import {
  BriefcaseBusiness,
  Calendar,
  Clock,
  Download,
  List,
  MousePointerClick,
  Plus,
  TrendingUp,
} from "lucide-react";
import { toast, Flip } from "react-toastify";
import ApplicationsTable from "../components/Applications/ApplicationsTable";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import validateLoader from "../utils/validateLoader";
import StatCards from "../components/Dashboard/StatCards";
import { AnimatePresence } from "framer-motion";
import AddResumeModal from "../components/Modals/AddResumeModal";
import { set } from "react-hook-form";
import ResumesGrid from "../components/Resumes/ResumesGrid";

const Resumes = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const navigator = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [showAddModal, setShowAddModal] = useState();
  const [resData, setResData] = useState([]);

  let getResumes = async () => {
    axios
      .get(`${baseUrl}/api/protected/resume`, {
        withCredentials: true,
      })
      .then((res) => {
        setResData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const dashboardData = async () => {
    await axios
      .get(`${baseUrl}/api/protected/resume/dashboard-summary`, {
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
        getResumes();
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
    <div className="flex flex-col justify-center items-center gap-6 px-4 py-8 sm:px-6 lg:px-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-700 font-black">
            Resume Management
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-700">
            Manage your resumes and track their usage across applications.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white font-medium rounded-md px-4 py-2 cursor-pointer hover:bg-[#3F90F5] hover:shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="size-5" />
          Add Resume
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <StatCards
          title={"Total Resumes"}
          Logo={List}
          stat={summary.total}
          blue={true}
        />
        <StatCards
          title={"Total Uses"}
          Logo={MousePointerClick}
          stat={summary.uses}
          blue={false}
        />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddResumeModal setView={setShowAddModal} reload={getResumes} />
        )}
      </AnimatePresence>

      {/* Resume Grid */}
      <div className="w-full">
        <ResumesGrid
          resData={resData}
          setResData={setResData}
          setViewAdd={setShowAddModal}
          reload={getResumes}
        />
      </div>
    </div>
  );
};

export default Resumes;
