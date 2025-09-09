import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../Form Input/TextInput";
import { User, Mail, Lock } from "lucide-react";
import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Flip } from "react-toastify";

const RegisterForm = ({ switchForm }) => {
  /*************************** MAIN FORM VARS AND FUNCTIONS (START) ************************/

  //FORM SCHEMA
  const schema = yup
    .object({
      name: yup
        .string()
        .required("Name is required")
        .min(3, "Min length is 3 letters")
        .max(100, "Max length is 100 letters")
        .matches(/^[A-Za-z\s]+$/, "Please enter only letters"),
      email: yup
        .string()
        .required("Email is required")
        .min(5, "Min length is 5 letters")
        .max(400, "Max length is 400 letters")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid"),
      password: yup
        .string()
        .required("Password is required")
        .max(30, "Max 30 letters allowed")
        .matches(/(?=.*[A-Z])/, "use atleast one capital letter")
        .matches(/(?=.*[a-z])/, "use atleast one small letter")
        .matches(/(?=.*\d)/, "use atleast one digit")
        .matches(/^.{7,}$/, "Min length of 7 required"),
      confirmPassword: yup
        .string()
        .required("Confirm your password")
        .oneOf([yup.ref("password")], "Passwords must match"),
    })
    .required();

  //FORM VARIABLE
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  //SUBMIT FUNCTION
  async function submitForm(data) {
    // delay for testing --> (Don't uncomment , this line specifially)
    // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    // await delay(5000);

    axios
      .post(`${baseUrl}/api/auth/register`, data)
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
        reset();
        switchForm();
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
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-6 shadow">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-medium text-center text-gray-700">
            Create Account
          </h1>
          <p className="text-center text-gray-600">
            Fill in your information to get started
          </p>
          <TextInput
            label="Full Name"
            name="name"
            {...register("name")}
            Icon={User}
            error={errors.name ? errors.name.message : null}
          />
          <TextInput
            label="Email"
            name="email"
            {...register("email")}
            Icon={Mail}
            error={errors.email ? errors.email.message : null}
          />
          <TextInput
            label="Password"
            type="password"
            name="password"
            {...register("password")}
            Icon={Lock}
            error={errors.password ? errors.password.message : null}
          />
          <TextInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            {...register("confirmPassword")}
            Icon={Lock}
            error={
              errors.confirmPassword ? errors.confirmPassword.message : null
            }
            placeholder="Confirm Password"
          />
          <input
            disabled={isSubmitting}
            type="submit"
            name="Sign up"
            value={isSubmitting ? `Signing up` : `Sign up`}
            className={`cursor-pointer block transition-all duration-350 ease-in-out font-medium p-3 rounded-lg text-white shadow-2xl  hover:shadow-gray-500 shadow-gray-400 ${
              isSubmitting
                ? `bg-gray-600 border-gray-600 hover:bg-gray-500`
                : " bg-blue-500 border-blue-500 hover:bg-[#3F90F5]"
            }`}
          />
          <p className="text-center text-gray-600">
            Already have an account?
            <a
              onClick={switchForm}
              className="text-[#3C83F6] font-medium cursor-pointer hover:text-[#3F90F5]"
            >
              {" "}
              Sign in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
