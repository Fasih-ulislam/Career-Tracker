import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../Form Input/TextInput";
import { Mail, Lock } from "lucide-react";
import * as yup from "yup";
import axios from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Flip } from "react-toastify";

const LoginForm = ({ switchForm }) => {
  /*************************** MAIN FORM VARS AND FUNCTIONS (START) ************************/

  //NAVIGATOR
  const navigator = useNavigate();
  //FORM SCHEMA
  const schema = yup
    .object({
      email: yup.string().required(),
      password: yup.string().required(),
    })
    .required();

  //FORM VARIABLE
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  async function submitForm(data) {
    // delay for testing --> (Don't uncomment , this line specifially)
    // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    // await delay(5000);

    toast
      .promise(
        axios.post(`${baseUrl}/auth/login`, data, { withCredentials: true }),
        {
          pending: "Logging you in",
          error: "Log in Failed",
        },
        {
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
      )
      .then((res) => {
        navigator("/protected/dashboard");
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
  }

  //OTHER VARS
  const baseUrl = import.meta.env.VITE_BASE_URL;

  /*************************** MAIN FORM VARS AND FUNCTIONS (END) ************************/

  /*************************** ACTUAL FORM ************************/
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-6 shadow ">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-medium text-center text-gray-700">
            Sign in
          </h1>
          <p className="text-center text-gray-600">
            Enter your credentials to access your account
          </p>
          <TextInput
            label="Email"
            name="email"
            {...register("email")}
            Icon={Mail}
          />
          <TextInput
            label="Password"
            type="password"
            name="password"
            {...register("password")}
            Icon={Lock}
          />
          <input
            disabled={isSubmitting}
            type="submit"
            name="Sign in"
            value={isSubmitting ? `Signing in` : `Sign in`}
            className={`cursor-pointer block transition-all duration-350 ease-in-out font-medium p-3 rounded-lg text-white shadow-2xl  hover:shadow-gray-500 shadow-gray-400 ${
              isSubmitting
                ? `bg-gray-600 border-gray-600 hover:bg-gray-500`
                : " bg-blue-500 border-blue-500 hover:bg-[#3F90F5]"
            }`}
          />
          <p className="text-center text-gray-600">
            Don't have an account?
            <span
              onClick={switchForm}
              className="text-[#3C83F6] font-medium cursor-pointer hover:text-[#3F90F5]"
            >
              {" "}
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
