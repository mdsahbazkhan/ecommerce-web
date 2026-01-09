import assets from "../assets/assets.js";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm  ">
      <div className="flex items-center gap-3">
        <img className="w-32" src={assets.logo} alt="logo" />
      </div>

      <button
        onClick={() => setToken("")}
        className="bg-indigo-600 hover:bg-indigo-800 transition text-white px-5 py-2 sm:py-2  rounded-full text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
