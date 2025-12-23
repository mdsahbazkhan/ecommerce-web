import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-white px-6 mt-20">
      {/* Top Footer */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-4 text-sm">
        {/* Brand */}
        <div>
          <img src={assets.logo} alt="Bazario" className="w-36" />
          <p className="text-indigo-500 text-xs sm:text-sm  md:text-base max-w-xl mt-4">
            Bazario brings you carefully curated fashion that blends modern
            trends with timeless style. Designed for comfort, quality, and
            confidence.
          </p>
        </div>

        {/* Company */}
        <div>
          <p className="text-lg font-semibold mb-4 text-indigo-800">COMPANY</p>
          <ul className="flex flex-col gap-2 text-indigo-500">
            <li>
              <Link className="hover:text-indigo-800" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-indigo-800" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-indigo-800" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="hover:text-indigo-800 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-indigo-800 cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <p className="text-lg font-semibold mb-4 text-indigo-800">
            CUSTOMER CARE
          </p>
          <ul className="flex flex-col gap-2 text-indigo-500">
            <li className="hover:text-indigo-800 cursor-pointer ">
              Shipping & Delivery
            </li>
            <li className="hover:text-indigo-800 cursor-pointer">
              Returns & Exchanges
            </li>
            <li className="hover:text-indigo-800 cursor-pointer">FAQs</li>
            <li className="hover:text-indigo-800  cursor-pointer">
              Track Order
            </li>
          </ul>
        </div>

        {/* Contact */}
        {/* <div>
          <p className="text-lg font-semibold mb-4 text-indigo-800">CONTACT</p>
          <ul className="flex flex-col gap-2 text-indigo-500">
            <li className="hover:text-indigo-800 cursor-pointer">
              support@bazario.com
            </li>
            <li className="hover:text-indigo-800 cursor-pointer">
              +91 62077 85264
            </li>
            <li className="hover:text-indigo-800 cursor-pointer">
              Hyderabad, India
            </li>
          </ul>
        </div> */}
      </div>

      {/* Bottom Footer */}
      <hr className="border-t border-gray-200 my-3 w-full" />
      <p className="text-center text-gray-500 text-sm py-6">
        © 2025 Bazario. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
