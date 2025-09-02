import React from "react";
import { CircleAlert, Dot } from "lucide-react";

const RecentActivity = ({ activity }) => {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 items-start bg-white rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-[500px] transition-all duration-300 ease-in-out shadow-2xs hover:shadow-2xl">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CircleAlert className="text-gray-500" />
          <h1 className="text-2xl sm:text-3xl text-gray-700 font-medium">
            Recent Activity
          </h1>
        </div>
        <p className="text-gray-700 text-sm sm:text-base">
          Your recent application updates
        </p>
      </div>

      {/* Activity List */}
      <div className="flex flex-col items-start w-full gap-3 sm:gap-4">
        {activity.map((element) => {
          const conjunction = [
            "Offer Received",
            "Rejected",
            "Withdrawn",
          ].includes(element.applicationStatus)
            ? "from"
            : "at";

          const color =
            element.applicationStatus === "Offer Received"
              ? "text-green-400"
              : element.applicationStatus === "Rejected"
              ? "text-red-400"
              : "text-blue-400";

          return (
            <div key={element._id} className="flex items-center gap-2">
              <Dot className={`${color} size-6 sm:size-8 md:size-10`} />
              <p className="text-gray-700 text-sm sm:text-base">
                {element.applicationStatus} {conjunction} {element.companyName}{" "}
                for {element.positionTitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
