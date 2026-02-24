import { NavLink } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { BsListUl, BsBoxSeam } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-white border-r border-indigo-200">
      <div className="flex flex-col gap-3 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to="/dashboard"
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
          <p className="hidden md:block font-medium">Dashboard</p>
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center  py-2  transition gap-3 border border-indigo-400 border-r-0 px-3 rounded-lg
            ${
              isActive
                ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                : "text-indigo-600 hover:bg-indigo-50"
            }`
          }
        >
          <FiPlus className="text-xl" />
          <p className="hidden md:block font-medium">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center  py-2  transition gap-3 border border-indigo-400 border-r-0 px-3 rounded-lg
            ${
              isActive
                ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                : "text-indigo-600 hover:bg-indigo-50"
            }`
          }
        >
          <BsListUl className="text-xl" />
          <p className="hidden md:block font-medium">Items List</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center  py-2  transition gap-3 border border-indigo-400 border-r-0 px-3 rounded-lg
            ${
              isActive
                ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                : "text-indigo-600 hover:bg-indigo-50"
            }`
          }
        >
          <BsBoxSeam className="text-xl" />
          <p className="hidden md:block font-medium">Orders</p>
        </NavLink>
        <NavLink
          to="/messages"
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
          <p className="hidden md:block font-medium">Messages</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
