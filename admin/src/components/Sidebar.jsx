import React from "react";
import { NavLink } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { BsListUl } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r border-r-indigo-300">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 border border-indigo-400 border-r-0 px-3 rounded"
          to="/add"
        >
          <FiPlus className="text-2xl text-indigo-600" />
          <p className="hidden md:block text-indigo-500">Add Items</p>
        </NavLink>{" "}
        <NavLink
          className="flex items-center gap-3 border border-indigo-400 border-r-0 px-3 rounded"
          to="/add"
        >
          <BsListUl className="text-2xl text-indigo-600" />
          <p className="hidden md:block text-indigo-500">Items List</p>
        </NavLink>{" "}
        <NavLink
          className="flex items-center gap-3 border border-indigo-400 border-r-0 px-3 rounded"
          to="/add"
        >
          <BsBoxSeam className="text-2xl text-indigo-600" />
          <p className="hidden md:block text-indigo-500">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
