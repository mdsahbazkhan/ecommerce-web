// import React from "react";
// import { NavLink } from "react-router-dom";
// import { FiPlus } from "react-icons/fi";
// import { BsListUl } from "react-icons/bs";
// import { BsBoxSeam } from "react-icons/bs";
// const Sidebar = () => {
//   return (
//     <div className="w-[18%] min-h-screen border-r border-r-indigo-300">
//       <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
//         <NavLink
//           className="flex items-center gap-3 border border-indigo-400 border-r-0 px-3 rounded"
//           to="/add"
//         >
//           <FiPlus className="text-2xl text-indigo-600" />
//           <p className="hidden md:block text-indigo-500">Add Items</p>
//         </NavLink>{" "}
//         <NavLink
//           className="flex items-center gap-3 border border-indigo-400 border-r-0 px-3 rounded"
//           to="/list"
//         >
//           <BsListUl className="text-2xl text-indigo-600" />
//           <p className="hidden md:block text-indigo-500">Items List</p>
//         </NavLink>{" "}
//         <NavLink
//           className="flex items-center gap-3 border border-indigo-400 border-r-0 px-3 rounded"
//           to="/orders"
//         >
//           <BsBoxSeam className="text-2xl text-indigo-600" />
//           <p className="hidden md:block text-indigo-500">Orders</p>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { NavLink } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { BsListUl, BsBoxSeam } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-white border-r border-indigo-200">
      <div className="flex flex-col gap-3 pt-6 pl-[20%] text-[15px]">
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
      </div>
    </div>
  );
};

export default Sidebar;
