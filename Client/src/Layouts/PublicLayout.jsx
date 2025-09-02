import React from "react";
import PublicNavbar from "../components/NavBar/PublicNavbar";
import { Outlet } from "react-router-dom";
import ConfirmationModal from "../components/Modals/ConfirmationModal";

const PublicLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <PublicNavbar />
      <div className="py-20">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
