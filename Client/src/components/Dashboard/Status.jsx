import React from "react";

const Status = ({ status, number, Logo, color1, color2 }) => {
  return (
    <div className={`flex justify-between items-center w-full`}>
      <div className={`flex gap-2`}>
        <Logo className={`${color1}`} />
        <p>{status}</p>
      </div>
      <p
        className={`p-2 ${color2} rounded-full w-[40px] h-[40px] flex justify-center items-center`}
      >
        {number || "0"}
      </p>
    </div>
  );
};

export default Status;
