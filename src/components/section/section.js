import React from "react";

const Section = ({ children }) => {
  return (
    <div className="flex flex-col rounded-md border border-neutral-100 bg-[#fff] p-3">
      {children}
    </div>
  );
};

export default Section;
