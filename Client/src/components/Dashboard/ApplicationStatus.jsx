import {
  BarChart3,
  Clock,
  Calendar,
  CircleCheckBig,
  CircleX,
} from "lucide-react";
import Status from "./Status";
import React from "react";

const ApplicationStatus = ({ summary }) => {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 items-start bg-white rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-[650px] transition-all duration-300 ease-in-out shadow-2xs hover:shadow-2xl">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-gray-500" />
          <h1 className="text-2xl sm:text-3xl text-gray-700 font-medium">
            Application Status
          </h1>
        </div>
        <p className="text-gray-700 text-sm sm:text-base">
          Current status of all your applications
        </p>
      </div>

      {/* Status Cards */}
      <div className="flex flex-col justify-center items-center w-full gap-3 sm:gap-4">
        <Status
          Logo={Clock}
          status="Pending Review"
          number={summary.pending}
          color1="text-yellow-500"
          color2="bg-yellow-300"
        />
        <Status
          Logo={Calendar}
          status="Interview Stage"
          number={summary.interview}
          color1="text-blue-500"
          color2="bg-blue-300"
        />
        <Status
          Logo={CircleCheckBig}
          status="Offers Received"
          number={summary.offers}
          color1="text-green-500"
          color2="bg-green-300"
        />
        <Status
          Logo={CircleX}
          status="Rejected"
          number={summary.rejected}
          color1="text-red-500"
          color2="bg-red-300"
        />
      </div>
    </div>
  );
};

export default ApplicationStatus;
