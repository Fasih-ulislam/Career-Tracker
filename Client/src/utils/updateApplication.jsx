import axios from "axios";
import React from "react";
import { toast, Flip } from "react-toastify";

const updateApplication = async (application, appId, updateRow) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  axios
    .put(`${baseUrl}/protected/application/${appId}`, application, {
      withCredentials: true,
    })
    .then((res) => {
      updateRow(res.data._id, res.data);
      toast.success("Update Successfull", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    })
    .catch((err) => {
      console.error(err);

      toast.error("Error in Updating", {
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

export default updateApplication;
