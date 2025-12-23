import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      {/* Exchange */}
      <div className="flex flex-col items-center transition hover:scale-105">
        <img src={assets.exchange_icon} alt="" className=" m-auto mb-5 w-12" />
        <p className="font-semibold text-indigo-800">Easy Exchange Policy</p>
        <p className="text-indigo-500">
          {" "}
          A seamless exchange experience designed for your convenience.
        </p>
      </div>
      {/* Return  */}
      <div className="flex flex-col items-center transition hover:scale-105">
        <img src={assets.quality_icon} alt="" className=" m-auto mb-5 w-12" />
        <p className="font-semibold text-indigo-800">7 Days Return Policy</p>
        <p className="text-indigo-500">
          {" "}
          Shop confidently with our easy 7-day return policy.
        </p>
      </div>
      {/* Support */}
      <div className="flex flex-col items-center transition hover:scale-105">
        <img src={assets.support_img} alt="" className=" m-auto mb-5 w-12" />
        <p className="font-semibold text-indigo-800">Best customer support</p>
        <p className="text-indigo-500">
          We’re here for you 24/7, whenever you need us.
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
