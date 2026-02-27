import { NavLink } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { BsListUl, BsBoxSeam } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { useState } from "react";
import { useEffect } from "react";
import { backendUrl } from "../App";
import axios from "axios";

const Sidebar = ({ setIsOpen, token }) => {
  const [pendingCount, setpendingCount] = useState(0);
  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 1024 && setIsOpen) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    // Don't fetch if no token
    if (!token) return;

    const fetchPending = async () => {
      try {
        const storedToken = token || localStorage.getItem("token");

        const res = await axios.get(backendUrl + "/api/contact/list", {
          headers: { token: storedToken },
        });
        const messages = res.data.messages || [];
        const pending = messages.filter(
          (message) => message.status === "pending",
        );
        setpendingCount(pending.length);
      } catch (error) {
        console.log("Error fetching pending message", error);
      }
    };
    fetchPending();
  }, [token]);

  return (
    <div className="w-full min-h-full bg-white border-r border-indigo-200">
      <div className="flex flex-col gap-3 pt-6 px-4 text-[15px]">
        <NavLink
          to="/dashboard"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center py-2 transition gap-3 border border-indigo-400 border-r-0 px-3 rounded-lg
    ${
      isActive
        ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
        : "text-indigo-600 hover:bg-indigo-50"
    }`
          }
        >
          <MdDashboard className="text-xl" />
          <p className="font-medium">Dashboard</p>
        </NavLink>
        <NavLink
          to="/add"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center py-2 transition gap-3 border border-indigo-400 border-r-0 px-3 rounded-lg
            ${
              isActive
                ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                : "text-indigo-600 hover:bg-indigo-50"
            }`
          }
        >
          <FiPlus className="text-xl" />
          <p className="font-medium">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center py-2 transition gap-3 border border-indigo-400 border-r-0 px-3 rounded-lg
            ${
              isActive
                ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                : "text-indigo-600 hover:bg-indigo-50"
            }`
          }
        >
          <BsListUl className="text-xl" />
          <p className="font-medium">Items List</p>
        </NavLink>

        <NavLink
          to="/orders"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center py-2 transition gap-3 border border-indigo-400 border-r-0 px-3 rounded-lg
            ${
              isActive
                ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                : "text-indigo-600 hover:bg-indigo-50"
            }`
          }
        >
          <BsBoxSeam className="text-xl" />
          <p className="font-medium">Orders</p>
        </NavLink>
        <NavLink
          to="/messages"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center py-2 transition gap-3 border border-indigo-400 border-r-0 px-3 rounded-lg
    ${
      isActive
        ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
        : "text-indigo-600 hover:bg-indigo-50"
    }`
          }
        >
          <HiOutlineMail className="text-xl" />
          <p className="font-medium">Messages</p>
          {pendingCount > 0 && (
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {pendingCount}
            </span>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
