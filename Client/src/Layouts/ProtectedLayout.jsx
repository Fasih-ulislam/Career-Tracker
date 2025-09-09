import React, { useState, useEffect } from "react";
import { toast, Flip } from "react-toastify";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProtectedNavbar from "../components/NavBar/ProtectedNavbar";
import ConfirmationModal from "../components/Modals/ConfirmationModal";
import logoutUser from "../utils/logoutUser";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

const ProtectedLayout = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const [logoutModal, setLogoutModal] = useState(false);
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState("🏢");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getUserInfo = async () => {
      axios
        .get(`${baseUrl}/api/protected/user/my-info`, {
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data);
          const nameParts = res.data.name.trim().split(/\s+/);
          const initials = (
            nameParts[0][0] + nameParts[nameParts.length - 1][0]
          ).toUpperCase();
          setAvatar(initials);
        })
        .catch((err) => {
          if (!toast.isActive("Fetch Fail")) {
            toast.error("Failed to Fetch User Data", {
              toastId: "Fetch Fail",
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
        });
    };
    getUserInfo();
  }, [location]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <ProtectedNavbar
        user={user}
        avatar={avatar}
        setLogout={setLogoutModal}
        logout={logoutModal}
      />
      <div className="py-20">
        <Outlet context={{ user, avatar }} />
      </div>
      <AnimatePresence>
        {logoutModal && (
          <ConfirmationModal
            message={"Are you sure you want to logout?"}
            OnReject={() => setLogoutModal(false)}
            onConfirm={() => {
              setLogoutModal(false);
              logoutUser(navigator);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProtectedLayout;
