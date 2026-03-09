import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { setShowSearchBar, getCartCount, token, setToken, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const myProfile = () => {
    navigate("/profile");
    setVisible(false);
  };

  const handleLinkClick = () => {
    setVisible(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-200 animate-fadeInDown">
      <div className="flex items-center justify-between px-6 py-4 font-medium max-w-7xl mx-auto">
        <Link to="/" className="transform transition-transform hover:scale-105">
          <img src={assets.logo} alt="" className="w-36" />
        </Link>

        <ul className="hidden sm:flex gap-8 text-sm font-semibold text-slate-700">
          {[
            { to: "/", label: "HOME" },
            { to: "/collection", label: "COLLECTION" },
            { to: "/about", label: "ABOUT" },
            { to: "/orders", label: "ORDERS" },
          ].map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1 group relative transition-all duration-300 hover:text-cyan-600"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.label}
              <hr className="w-2/4 border-none h-[2px] bg-gradient-to-r from-cyan-500 to-cyan-600 hidden transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowSearchBar(true)}
            className="text-slate-700 text-2xl cursor-pointer transform transition-all duration-300 hover:scale-110 hover:text-cyan-600"
            aria-label="Search"
          >
            <FiSearch />
          </button>

          <div className="group relative hidden sm:block">
            <button
              onClick={() => (token ? null : navigate("login"))}
              className="text-slate-700 text-2xl cursor-pointer transform transition-all duration-300 hover:scale-110 hover:text-cyan-600"
              aria-label="User Profile"
            >
              <FiUser />
            </button>

            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 animate-scaleIn">
                <div className="flex flex-col gap-2 w-40 py-4 px-5 bg-white text-slate-600 rounded-2xl shadow-xl border border-slate-100">
                  <p
                    onClick={myProfile}
                    className="cursor-pointer hover:text-cyan-600 transform transition-all duration-200 hover:translate-x-1 font-semibold"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-cyan-600 transform transition-all duration-200 hover:translate-x-1 font-semibold"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative group">
            <FiShoppingBag
              size={25}
              className="text-slate-700 cursor-pointer w-10 min-w-5 transform transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-600"
            />
            <p className="absolute right-[-1px] bottom-[-5px] w-4 text-center leading-4 text-white aspect-square rounded-full text-[8px] transform transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-md font-bold">
              {getCartCount()}
            </p>
          </Link>

          <button
            onClick={() => setVisible(true)}
            size={28}
            className="text-slate-700 cursor-pointer sm:hidden transform transition-all duration-300 hover:scale-110 hover:text-cyan-600"
            aria-label="Menu"
          >
            <FiMenu size={28} />
          </button>
        </div>

        {/* Side Bar Menu For Small Screen */}
        <div
          className={`fixed top-0 right-0 h-screen w-full bg-white z-50 sm:hidden
          transition-all duration-500 ease-in-out ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            animation: visible ? "slideInRight 0.3s ease-out forwards" : "none",
          }}
        >
          <div className="flex flex-col text-slate-700">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-4 border-b border-slate-200 cursor-pointer transform transition-all duration-300 hover:bg-cyan-50"
            >
              <FiX size={28} className="text-slate-700" />
            </div>

            {[
              { to: "/", label: "HOME" },
              { to: "/collection", label: "COLLECTION" },
              { to: "/about", label: "ABOUT" },
              { to: "/contact", label: "CONTACT" },
            ].map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `py-4 pl-6 transition-all duration-300 transform font-semibold ${
                    isActive
                      ? "text-cyan-600 border-l-4 border-cyan-500 bg-cyan-50"
                      : "text-slate-700 hover:bg-cyan-50 hover:pl-8 hover:text-cyan-600"
                  }`
                }
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="transform transition-all duration-300 inline-block">
                  {item.label}
                </span>
              </NavLink>
            ))}

            {token && (
              <>
                <hr className="border-slate-200 my-2" />
                <div className="flex flex-col gap-2 px-6 py-2">
                  <p
                    onClick={myProfile}
                    className="py-3 cursor-pointer hover:text-cyan-600 transform transition-all duration-200 hover:translate-x-1 font-semibold"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={logout}
                    className="py-3 cursor-pointer hover:text-cyan-600 transform transition-all duration-200 hover:translate-x-1 font-semibold"
                  >
                    Logout
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
