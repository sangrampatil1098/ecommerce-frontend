import React from "react";

const Status = ({ text, icon: Icon, bg, color }) => {
  return (
    <div
      className={`${bg} ${color} font-medium rounded px-2 py-2 flex items-center justify-center gap-2`}
    >
      <span>{text}</span>
      <span>
        <Icon size={15}/>
      </span>
    </div>
  );
};

export default Status;
