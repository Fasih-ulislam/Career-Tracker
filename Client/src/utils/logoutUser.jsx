import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, Flip } from "react-toastify";

const logoutUser = async (navigator) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  axios
    .get(`${baseUrl}/api/auth/logout`, { withCredentials: true })
    .then((res) => {
      toast.success(res.data, {
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
      navigator("/");
    })
    .catch((err) => {
      const type = err.status;
      if (type === 400) {
        const messages = err.response.data.errors;

        messages.forEach((msg) => {
          toast.warn(msg, {
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
      } else {
        const messages = err.response.data.errors;

        messages.forEach((msg) => {
          toast.error(msg, {
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
      }
    });
};

export default logoutUser;
