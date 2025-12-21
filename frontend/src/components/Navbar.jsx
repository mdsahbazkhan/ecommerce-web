import React from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <img src={assets.logo} alt="" className="w-38" />
      <ul className="hidden sm:flex gap-5 text-sm text-indigo-800">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          Home
          <hr className="w-2/4 border-none h-[1.5px] bg-indigo-800 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          COLLECTION
          <hr className="w-2/4 border-none h-[1.5px] bg-indigo-800 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          ABOUT
          <hr className="w-2/4 border-none h-[1.5px] bg-indigo-800 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          CONTACT
          <hr className="w-2/4 border-none h-[1.5px] bg-indigo-800 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <FiSearch className="text-indigo-800 text-2xl  cursor-pointer" />
        <div className="group relative">
          <FiUser className="text-indigo-800 text-2xl  cursor-pointer" />
          <div className="group-hover:block hidden absolute dropdown-menu  right-0  pt-4 ">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-indigo-900">My Profile</p>
              <p className="cursor-pointer hover:text-indigo-900">Orders</p>
              <p className="cursor-pointer hover:text-indigo-900 ">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <FiShoppingBag
            size={25}
            className="text-indigo-800 cursor-pointer w-10 min-w-5"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-gray-800 text-white aspect-square rounded-full text-[8px]">
            10
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
