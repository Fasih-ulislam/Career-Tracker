import React, { useEffect, useState } from "react";
import validateLoader from "../utils/validateLoader";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Flip } from "react-toastify";
import Welcome from "../components/Dashboard/Welcome";
import StatCards from "../components/Dashboard/StatCards";
import { BriefcaseBusiness, Clock, Calendar, TrendingUp } from "lucide-react";
import ActivityCard from "../components/Dashboard/ApplicationStatus";
import RecentActivity from "../components/Dashboard/RecentActivity";
import axios from "axios";

const Dashboard = () => {
  const location = useLocation;
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const [activity, setActivity] = useState([]);
  const navigator = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
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
    const getActivity = async () => {
      await axios
        .get(`${baseUrl}/api/protected/application/recent-activity`, {
          withCredentials: true,
        })
        .then((res) => {
          setActivity(res.data);
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
        dashboardData();
        getActivity();
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigator, location]);

  if (loading) {
    return null;
  }

  return (
    <div className="px-4">
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-12 sm:gap-16 md:gap-[50px] justify-center items-center w-full">
          <Welcome />

          {/* Stat Cards Section */}
          <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-7 w-full">
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

          {/* Activity Section */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-5 w-full">
            <ActivityCard summary={summary} />
            <RecentActivity activity={activity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
