import assets from "../assets/assets.js";

const Navbar = ({ setToken, onMenuClick }) => {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-indigo-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <img className="w-28 sm:w-32" src={assets.logo} alt="logo" />
      </div>

      <button
        onClick={() => setToken("")}
        className="bg-indigo-600 hover:bg-indigo-800 transition text-white px-4 sm:px-5 py-2 rounded-full text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
