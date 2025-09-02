import axios from "axios";
import React from "react";
import { toast, Flip } from "react-toastify";

const deleteResume = async (resId, reload) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  axios
    .delete(`${baseUrl}/protected/resume/${resId}`, {
      withCredentials: true,
    })
    .then((res) => {
      reload();
    })
    .catch((err) => {
      console.error(err);

      toast.error("Error in Deleting", {
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

export default deleteResume;
