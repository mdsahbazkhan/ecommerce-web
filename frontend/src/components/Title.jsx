import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      <p className="uppercase tracking-wide text-xl sm:text-2xl lg:text-3xl text-indigo-500">
        {text1}
        <span className="ml-2 text-indigo-800 font-semibold">{text2}</span>
      </p>
      <span className="w-12 sm:w-20 h-[2px] bg-indigo-800"></span>
    </div>
  );
};

export default Title;
