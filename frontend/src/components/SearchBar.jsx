import React, { useContext, useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const SearchBar = () => {
  const {
    search,
    setSearch,
    setSearchQuery,
    showSearchBar,
    setShowSearchBar,
    products,
  } = useContext(ShopContext);

  const [showSuggestions, setShowSuggestions] = useState(true);

  const location = useLocation();
  const visible = location.pathname.includes("collection");

  // Suggestions (while typing)
  const suggestions = useMemo(() => {
    if (!search.trim() || !showSuggestions) return [];
    return products
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 6);
  }, [search, products, showSuggestions]);

  if (!showSearchBar || !visible) return null;

  return (
    <div className="mt-20 flex justify-center items-center px-4 animate-fadeInDown">
      <div className="relative w-full sm:w-1/2">
        {/* Search Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchQuery(search);
            setShowSuggestions(false);
          }}
          className="flex items-center border-2 border-slate-200 px-6 py-3 rounded-2xl w-full transition-all duration-300 focus-within:border-cyan-500 focus-within:shadow-xl bg-white"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            className="flex-1 outline-none text-sm bg-transparent appearance-none text-slate-900 placeholder-slate-400 font-medium"
            placeholder="Search products..."
          />
          <img
            className="w-5 opacity-60 transform transition-transform duration-300 hover:scale-110 hover:opacity-100"
            src={assets.search_icon}
            alt=""
          />
        </form>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute top-full mt-3 w-full bg-white border-2 border-slate-100 rounded-2xl shadow-2xl z-50 animate-fadeInUp overflow-hidden">
            {suggestions.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  setSearch(item.name);
                  setSearchQuery(item.name);
                  setShowSuggestions(false);
                }}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-sky-50 cursor-pointer transform transition-all duration-200 hover:translate-x-2 border-b border-slate-100 last:border-b-0"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover transform transition-transform duration-300 hover:scale-110 shadow-md"
                />
                <span className="text-sm font-bold text-slate-900">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Close search bar */}
      <img
        onClick={() => {
          setShowSearchBar(false);
          setShowSuggestions(false);
        }}
        className="w-4 ml-4 cursor-pointer opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-125 hover:rotate-90"
        src={assets.cross_icon}
        alt="close"
      />
    </div>
  );
};

export default SearchBar;
