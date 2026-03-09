import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      desc: "A seamless exchange experience designed for your convenience.",
      delay: "0ms",
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      desc: "Shop confidently with our easy 7-day return policy.",
      delay: "200ms",
    },
    {
      icon: assets.support_img,
      title: "Best customer support",
      desc: "We're here for you 24/7, whenever you need us.",
      delay: "400ms",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base">
      {policies.map((policy, index) => (
        <div
          key={index}
          className="flex flex-col items-center transition-all duration-500 hover:scale-110 cursor-pointer animate-fadeInUp group"
          style={{ animationDelay: policy.delay }}
        >
          <div className="bg-gradient-to-br from-cyan-50 to-sky-50 p-6 rounded-2xl mb-5 transform transition-all duration-500 group-hover:shadow-xl group-hover:from-cyan-100 group-hover:to-sky-100">
            <img
              src={policy.icon}
              alt=""
              className="w-12 h-12 transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
            />
          </div>
          <p className="font-bold text-slate-900 mb-2 text-base group-hover:text-cyan-600 transition-colors duration-300">{policy.title}</p>
          <p className="text-slate-600 max-w-xs">{policy.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default OurPolicy;
