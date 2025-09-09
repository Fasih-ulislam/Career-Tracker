import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { toast, Flip } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import TextInput from "../Form Input/TextInput";
import { motion } from "framer-motion";
import { Ban, Building2, Info, Pen, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";

const AddResumeForm = ({ setView, reload }) => {
  //FORM SCHEMA
  const schema = yup
    .object({
      title: yup
        .string()
        .required("Title is required")
        .max(100, "Max length is 100 letters"),
      resume: yup.mixed().required("Resume is required"),
    })
    .required();

  //FORM VARIABLE
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  //SUBMIT FUNCTION
  async function submitForm(data) {
    // delay for testing --> (Don't uncomment , this line specifially)
    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(5000);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("resume", data.resume);

    axios
      .post(`${baseUrl}/api/protected/resume`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Resume Added", {
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

        reload();
        reset();
        setDropzoneErrors([]);
        setView(false);
      })
      .catch((err) => {
        console.error(err);

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
          const messages = err.response.data?.errors;

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

  const [dropzoneErrors, setDropzoneErrors] = useState([]);

  const errorMessages = {
    "file-too-large": "This file exceeds the 5MB limit.",
    "file-invalid-type": "Only PDF, DOC, DOCX, and TXT files are allowed.",
    "too-many-files": "You can only upload one file at a time.",
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-3 w-full max-w-2xl mx-auto p-4"
    >
      {/* Basic Details Section */}
      <fieldset className="border rounded-lg p-4">
        <legend className="flex gap-1 text-lg md:text-2xl text-gray-700 justify-center items-center font-medium">
          Basic Details
          <Info />
        </legend>

        <div className="flex flex-col gap-3 w-full">
          {/* Title Input */}
          <TextInput
            colour={"bg-blue-500"}
            Icon={Pen}
            label="Title"
            name="title"
            {...register("title")}
            error={errors.title ? errors.title.message : null}
          />

          {/* Resume Upload */}
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Resume
          </label>

          <Controller
            name="resume"
            control={control}
            render={({ field }) => {
              const onDrop = useCallback((acceptedFiles, fileRejections) => {
                if (acceptedFiles.length > 1 || fileRejections.length > 1) {
                  setDropzoneErrors();
                }
                const f = acceptedFiles[0];
                field.onChange(f);

                setDropzoneErrors(
                  fileRejections.flatMap((rejection) => {
                    return rejection.errors;
                  })
                );
              });

              const { getInputProps, getRootProps, isDragActive } = useDropzone(
                {
                  multiple: false,
                  onDrop,
                  accept: {
                    "application/pdf": [".pdf"],
                    "application/msword": [".doc"],
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                      [".docx"],
                    "text/plain": [".txt"],
                  },
                  maxSize: 5 * 1024 * 1024,
                }
              );

              return (
                <div
                  {...getRootProps()}
                  className={`transition-all duration-300 ease-in-out 
                w-full min-h-[150px] sm:min-h-[180px] md:min-h-[200px] 
                bg-gray-200 rounded-lg p-4 cursor-pointer flex flex-col items-center justify-center
                ${
                  isDragActive
                    ? "bg-green-400"
                    : dropzoneErrors.length > 0
                    ? "bg-red-300"
                    : ""
                }`}
                >
                  <input {...getInputProps()} />
                  <p className="text-gray-700 font-medium text-center text-sm sm:text-base">
                    {isDragActive ? (
                      <span className="flex gap-1 justify-center items-center">
                        <Upload />
                        Drop to Upload
                      </span>
                    ) : dropzoneErrors.length > 0 ? (
                      <span className="flex gap-1 justify-center items-center">
                        <Ban />
                        Failed, Try Again
                      </span>
                    ) : field.value ? (
                      field.value.name
                    ) : (
                      "Click or drag a file here"
                    )}
                  </p>
                </div>
              );
            }}
          />

          {/* Errors */}
          <AnimatePresence>
            {dropzoneErrors.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="text-red-600 text-xs sm:text-sm mt-2"
              >
                {dropzoneErrors.map((e) => (
                  <li key={e.code}>{errorMessages[e.code] || e.message}</li>
                ))}
                {errors.resume && <li>{errors.resume.message}</li>}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </fieldset>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-2 w-full">
        <input
          disabled={isSubmitting || !isValid}
          type="submit"
          name="Add Application"
          value={isSubmitting ? `Adding` : `Add Resume`}
          className={`cursor-pointer transition-all font-medium px-4 py-2 rounded-lg text-white shadow-lg text-sm sm:text-base
        ${
          !isValid
            ? `bg-blue-300 border-gray-600`
            : isSubmitting
            ? `bg-gray-600 border-gray-600 hover:bg-gray-500`
            : " bg-blue-500 border-blue-500 hover:bg-blue-400"
        }`}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            reset();
            setDropzoneErrors([]);
          }}
          className="border text-sm sm:text-base border-gray-700 text-gray-700 font-medium rounded-sm px-4 py-2 cursor-pointer hover:bg-green-300 transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
};
{
}

export default AddResumeForm;
