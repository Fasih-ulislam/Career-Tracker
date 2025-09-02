import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import dayjs from "dayjs";
import {
  CalendarCheck,
  File,
  ChartColumnIcon,
  Info,
  Phone,
  MapPin,
  SquareChartGanttIcon,
  CircleDollarSign,
  Banknote,
  Clock,
  Link2,
  Link,
  FileText,
} from "lucide-react";
import { Building2, User2 } from "lucide-react";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { toast, Flip } from "react-toastify";
import { useForm } from "react-hook-form";
import TextInput from "../Form Input/TextInput";
import DropDownInput from "../Form Input/DropDownInput";
import TextAreaInput from "../Form Input/TextAreaInput";
import updateApplication from "../../utils/updateApplication";
import { useLocation } from "react-router-dom";

const AddApplicationForm = ({
  updateRow,
  edit,
  showAddApplication,
  appData,
  setAppData,
  setShowAddApplication,
  dashboardData,
}) => {
  const location = useLocation;
  const [resData, setResData] = useState([]);
  let getResumes = async () => {
    axios
      .get(`${baseUrl}/protected/resume`, {
        withCredentials: true,
      })
      .then((res) => {
        setResData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getResumes();
  }, [location]);
  //FORM SCHEMA
  const schema = yup
    .object({
      //required
      companyName: yup
        .string()
        .required("Company name is required")
        .max(200, "Max length is 200 letters"),
      positionTitle: yup
        .string()
        .required("Position title is required")
        .max(200, "Max length is 200 letters"),
      applicationDate: yup
        .date()
        .transform((value, originalValue) => {
          return originalValue === "" ? undefined : value;
        })
        .required("Application date is required"),
      applicationStatus: yup
        .string()
        .required("Application status is required"),

      //other
      location: yup.string().max(200, "Max length is 200 letters"),
      notes: yup.string().max(500, "Max length is 500 letters"),
      salaryMin: yup
        .number()
        .transform((value, originalValue) => {
          return originalValue === "" ? undefined : value;
        })
        .min(0, "Min 0 can be selected"),
      salaryMax: yup
        .number()
        .transform((value, originalValue) => {
          return originalValue === "" ? undefined : value;
        })
        .min(0, "Min 0 can be selected"),
    })
    .required();

  const originalData = edit
    ? appData.find((app) => app._id === showAddApplication)
    : null;

  //FORM VARIABLE
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      companyName: originalData?.companyName,
      positionTitle: originalData?.positionTitle,
      applicationDate: originalData
        ? dayjs(originalData?.applicationDate).format("YYYY-MM-DD")
        : null,
      applicationStatus: originalData?.applicationStatus,
      location: originalData?.location,
      jobType: originalData?.jobType,
      salaryMin: originalData?.salaryMin,
      salaryMax: originalData?.salaryMax,
      salaryCurrency: originalData?.salaryCurrency,
      salaryPeriod: originalData?.salaryPeriod,
      source: originalData?.source,
      jobURL: originalData?.jobURL,
      notes: originalData?.notes,
      resumeUsed: originalData?.resumeUsed,
    },
  });

  useEffect(() => {
    if (originalData && resData.length > 0) {
      reset({
        ...originalData,
        applicationDate: originalData.applicationDate
          ? dayjs(originalData.applicationDate).format("YYYY-MM-DD")
          : "",
        resumeUsed: originalData.resumeUsed || "",
      });
    }
  }, [resData, originalData, reset]);

  //SUBMIT FUNCTION
  async function submitForm(data) {
    // delay for testing --> (Don't uncomment , this line specifially)
    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(5000);

    if (edit) {
      const cleaned = Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, v === "" ? null : v])
      );

      updateApplication(cleaned, showAddApplication, updateRow);
      setShowAddApplication(false);
    } else {
      const cleaned = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== "")
      );

      axios
        .post(`${baseUrl}/protected/application`, cleaned, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success("Application Added", {
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

          setAppData((ad) => [...ad, res.data]);
          dashboardData();
          reset();
          setShowAddApplication(false);
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
  }
  //OTHER VARS
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const statuses = [
    "Applied",
    "Under Review",
    "Phone Interview",
    "Final Interview",
    "Technical Interview",
    "Offer Received",
    "Rejected",
    "Withdrawn",
  ];
  const resTitles = resData.map((res) => {
    return { text: res.title, value: res._id };
  });
  const jobTypes = ["Internship", "Full-Time", "Part-Time", "Freelance"];
  const salaryPeriods = ["year", "month", "week", "day", "hour"];
  const salaryCurrencies = ["USD", "EUR", "PKR", "Other"];

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-6 sm:gap-8 w-full"
    >
      {/* Basic Details */}
      <fieldset className="border rounded-lg p-3 sm:p-4">
        <legend className="flex gap-2 text-xl sm:text-2xl text-gray-700 justify-center items-center font-medium">
          Basic Details
          <Info />
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            Icon={Building2}
            label="Company*"
            name="companyName"
            {...register("companyName")}
            placeholder="e.g: Google"
            error={errors.companyName?.message || null}
          />
          <TextInput
            Icon={User2}
            label="Position*"
            name="positionTitle"
            {...register("positionTitle")}
            placeholder="e.g: Software developer"
            error={errors.positionTitle?.message || null}
          />
          <TextInput
            Icon={CalendarCheck}
            label="Application Date*"
            name="applicationDate"
            type="date"
            {...register("applicationDate")}
            error={errors.applicationDate?.message || null}
          />
          <DropDownInput
            Icon={ChartColumnIcon}
            label="Application Status*"
            name="applicationStatus"
            {...register("applicationStatus")}
            options={statuses}
            error={errors.applicationStatus?.message || null}
          />
        </div>
      </fieldset>

      {/* Job Details */}
      <fieldset className="border rounded-lg p-3 sm:p-4">
        <legend className="flex gap-2 text-xl sm:text-2xl text-gray-700 justify-center items-center font-medium">
          Job Details
          <File />
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            Icon={MapPin}
            label="Location"
            name="location"
            {...register("location")}
            placeholder="e.g: Islamabad"
            error={errors.location?.message || null}
          />
          <DropDownInput
            Icon={SquareChartGanttIcon}
            label="Job Type"
            name="jobType"
            {...register("jobType")}
            options={jobTypes}
            error={errors.jobType?.message || null}
          />
          <TextInput
            type="number"
            Icon={CircleDollarSign}
            label="Minimum Salary"
            name="salaryMin"
            {...register("salaryMin")}
            placeholder="Not required"
            error={errors.salaryMin?.message || null}
          />
          <TextInput
            type="number"
            Icon={CircleDollarSign}
            label="Maximum Salary"
            name="salaryMax"
            {...register("salaryMax")}
            placeholder="Not required"
            error={errors.salaryMax?.message || null}
          />
          <DropDownInput
            Icon={Banknote}
            label="Salary Currency"
            name="salaryCurrency"
            {...register("salaryCurrency")}
            options={salaryCurrencies}
            error={errors.salaryCurrency?.message || null}
          />
          <DropDownInput
            Icon={Clock}
            label="Salary Period"
            name="salaryPeriod"
            {...register("salaryPeriod")}
            options={salaryPeriods}
            error={errors.salaryPeriod?.message || null}
          />
          <TextInput
            Icon={Link}
            label="Source"
            name="source"
            {...register("source")}
            error={errors.source?.message || null}
          />
          <TextInput
            Icon={Link2}
            label="Job URL"
            name="jobURL"
            {...register("jobURL")}
            error={errors.jobURL?.message || null}
          />
          <div className="col-span-1 sm:col-span-2">
            <DropDownInput
              Icon={FileText}
              label="Resume Used"
              name="resumeUsed"
              {...register("resumeUsed")}
              options={resTitles}
              error={errors.resumeUsed?.message || null}
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <TextAreaInput
              label="Notes"
              name="notes"
              {...register("notes")}
              error={errors.notes?.message || null}
            />
          </div>
        </div>
      </fieldset>

      {/* Submit & Reset Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        <input
          disabled={isSubmitting || !isValid}
          type="submit"
          name="Add Application"
          value={
            isSubmitting
              ? edit
                ? "Updating"
                : "Adding"
              : edit
              ? "Update Application"
              : "Add Application"
          }
          className={`cursor-pointer transition-all duration-300 ease-in-out font-medium px-4 py-3 rounded-lg text-white shadow-2xl hover:shadow-gray-500 shadow-gray-400 w-full sm:w-auto ${
            !isValid
              ? "bg-blue-300 border-gray-600"
              : isSubmitting
              ? "bg-gray-600 border-gray-600 hover:bg-gray-500"
              : "bg-blue-500 border-blue-500 hover:bg-[#3F90F5]"
          }`}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            reset();
          }}
          className="bg-transparent border text-base border-gray-700 text-gray-700 font-medium rounded-sm px-4 py-2 cursor-pointer hover:bg-green-300 hover:shadow-2xs w-full sm:w-auto"
        >
          Reset
        </button>
      </div>
    </form>
  );
};
{
}

export default AddApplicationForm;
