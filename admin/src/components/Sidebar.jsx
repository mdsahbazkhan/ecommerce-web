import { NavLink } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { BsListUl, BsBoxSeam } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";

const Sidebar = ({ setIsOpen }) => {
  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 1024 && setIsOpen) {
      setIsOpen(false);
    }
  };

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
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
