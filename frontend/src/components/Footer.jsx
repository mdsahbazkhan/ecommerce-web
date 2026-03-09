import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 px-6 mt-20 pt-16 pb-8">
      {/* Top Footer */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-4 text-sm max-w-7xl mx-auto">
        {/* Brand */}
        <div className="animate-fadeInLeft">
          <Link to="/">
            <img
              src={assets.logo}
              alt=""
              className="w-36 transform transition-transform hover:scale-105"
            />
          </Link>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-xl mt-4 leading-relaxed">
            BazarioX brings you carefully curated fashion that blends modern
            trends with timeless style. Designed for comfort, quality, and
            confidence.
          </p>
        </div>

        {/* Company */}
        <div className="animate-fadeIn" style={{ animationDelay: "200ms" }}>
          <p className="text-lg font-bold mb-5 text-slate-900">COMPANY</p>
          <ul className="flex flex-col gap-3 text-slate-600">
            <li>
              <Link
                className="hover:text-cyan-600 transform transition-all duration-300 hover:translate-x-2 inline-block font-medium"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-cyan-600 transform transition-all duration-300 hover:translate-x-2 inline-block font-medium"
                to="/about"
              >
                About Us
              </Link>
            </li>
            <Link
              to="/privacy"
              className="hover:text-cyan-600 cursor-pointer transform transition-all duration-300 hover:translate-x-2 font-medium"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-cyan-600 cursor-pointer transform transition-all duration-300 hover:translate-x-2 font-medium"
            >
              Terms & Conditions
            </Link>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="animate-fadeIn" style={{ animationDelay: "400ms" }}>
          <p className="text-lg font-bold mb-5 text-slate-900">CUSTOMER CARE</p>
          <ul className="flex flex-col gap-3 text-slate-600">
            <Link
              to="/shipping"
              className="hover:text-cyan-600 cursor-pointer transform transition-all duration-300 hover:translate-x-2 font-medium"
            >
              Shipping & Delivery
            </Link>
            <Link
              to="/returns"
              className="hover:text-cyan-600 cursor-pointer transform transition-all duration-300 hover:translate-x-2 font-medium"
            >
              Returns & Exchanges
            </Link>
            <Link
              className="hover:text-cyan-600 cursor-pointer transform transition-all duration-300 hover:translate-x-2 font-medium"
              to="/faq"
            >
              FAQs
            </Link>
            <Link
              className="hover:text-cyan-600 cursor-pointer transform transition-all duration-300 hover:translate-x-2 font-medium"
              to="/orders"
            >
              Track Order
            </Link>
            <Link
              className="hover:text-cyan-600 cursor-pointer transform transition-all duration-300 hover:translate-x-2 font-medium"
              to="/support"
            >
              Customer Support
            </Link>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <hr className="border-t border-slate-300 my-6 w-full max-w-7xl mx-auto" />
      <p
        className="text-center text-slate-500 text-sm py-6 animate-fadeIn max-w-7xl mx-auto"
        style={{ animationDelay: "600ms" }}
      >
        © {new Date().getFullYear()} BazarioX. All rights reserved. | Made with
        ❤️ by Md Sahbaz Alam
      </p>
    </div>
  );
};

export default Footer;
