import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-3 mb-6 animate-fadeInUp">
      <p className="uppercase tracking-wide text-xl sm:text-2xl lg:text-3xl text-slate-700 font-semibold">
        {text1}
        <span className="ml-2 font-bold text-slate-900">{text2}</span>
      </p>
      <span
        className="w-12 sm:w-20 h-[2px] bg-gradient-to-r from-cyan-500 to-cyan-600 transform origin-left animate-scaleIn rounded-full"
        style={{ animationDelay: "200ms" }}
      ></span>
    </div>
  );
};

export default Title;
