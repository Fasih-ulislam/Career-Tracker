import axios from "axios";
import React from "react";
import { toast, Flip } from "react-toastify";

const validateLoader = async () => {
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // await delay(5000);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  try {
    const res = await axios.get(`${baseUrl}/auth/validate`, {
      withCredentials: true,
    });

    return true; // ✅ success
  } catch (err) {
    console.log("Validation error:", err);
    return false; // ✅ failure9
  }
};

export default validateLoader;
