import React from "react";

const StatCards = ({ title, Logo, stat, blue }) => {
  return (
    <div className="flex flex-col gap-2 items-start bg-white rounded-lg p-4 sm:p-5 md:p-6 w-full max-w-[250px] transition-all duration-300 ease-in-out shadow-2xs hover:shadow-2xl">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-gray-700 font-medium text-sm sm:text-base">
          {title}
        </h1>
        <Logo className="text-gray-500 size-5 sm:size-6" />
      </div>
      <h1
        className={`text-2xl sm:text-3xl font-bold ${
          blue ? "text-blue-500" : "text-green-500"
        }`}
      >
        {stat || "0"}
      </h1>
    </div>
  );
};

export default StatCards;
