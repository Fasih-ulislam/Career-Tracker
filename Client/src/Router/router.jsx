import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../Layouts/PublicLayout";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import AuthCard from "../pages/AuthCard";
import NotFound from "../pages/NotFound";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import validateLoader from "../utils/validateLoader";
import LoadingPage from "../pages/LoadingPage";
import UnderConstruction from "../pages/UnderConstruction";
import Applications from "../pages/Applications";
import Resumes from "../pages/Resumes";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "/auth", element: <AuthCard /> },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/protected",
      element: <ProtectedLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "my-applications",
          element: <Applications />,
        },
        {
          path: "my-resumes",
          element: <Resumes />,
        },
      ],
    },
  ],
  {
    hydrateFallbackElement: <LoadingPage />,
  }
);

export default router;
