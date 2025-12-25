import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearchBar } = useContext(ShopContext);
  return (
    <div className="absolute top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className=" flex items-center justify-between px-6 py-3 font-medium ">
        <Link to="/">
          <img src={assets.logo} alt="" className="w-36" />
        </Link>
        <ul className="hidden sm:flex gap-5 text-sm text-indigo-800">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            HOME
            <hr className="w-2/4 border-none h-[1.5px] bg-indigo-800 hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
          >
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
          <FiSearch
            onClick={() => setShowSearchBar(true)}
            className="text-indigo-800 text-2xl  cursor-pointer"
          />
          <div className="group relative">
            <FiUser className="text-indigo-800 text-2xl  cursor-pointer" />
            <div className="group-hover:block hidden absolute dropdown-menu  right-0  pt-4 ">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-indigo-900">
                  My Profile
                </p>
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
            <p className="absolute right-[-1px] bottom-[-5px] w-4 text-center leading-4 bg-gray-900 text-white aspect-square rounded-full text-[8px]">
              10
            </p>
          </Link>

          <FiMenu
            onClick={() => setVisible(true)}
            size={28}
            className="text-indigo-800 cursor-pointer sm:hidden"
          />
        </div>
        {/* Side Bar Menu For Small Screen */}
        <div
          className={`fixed top-0 right-0 h-screen w-full bg-white z-50
  transition-transform duration-300 ease-in-out ${
    visible ? "translate-x-0" : "translate-x-full"
  }`}
        >
          <div className="flex flex-col text-gray-700">
            {/* Close */}
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-4 border-b-indigo-600"
            >
              <FiX size={28} className="text-indigo-800 cursor-pointer" />
            </div>

            {/* Links */}
            {[
              { to: "/", label: "HOME" },
              { to: "/collection", label: "COLLECTION" },
              { to: "/about", label: "ABOUT" },
              { to: "/contact", label: "CONTACT" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-3 pl-6 transition ${
                    isActive
                      ? "text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50"
                      : "text-gray-700 hover:bg-indigo-50"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
