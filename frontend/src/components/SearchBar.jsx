import React, { useContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
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
    <div className="mt-20 flex justify-center items-center px-4">
      <div className="relative w-full sm:w-1/2">
        {/* Search Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchQuery(search);
            setShowSuggestions(false);
          }}
          className="flex items-center border border-gray-300 px-5 py-2 rounded-full w-full"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true); // show again while typing
            }}
            className="flex-1 outline-none text-sm bg-transparent appearance-none"
            placeholder="Search products"
          />
          <img className="w-4 opacity-70" src={assets.search_icon} alt="" />
        </form>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {suggestions.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  setSearch(item.name);
                  setSearchQuery(item.name);
                  setShowSuggestions(false); // hide on click
                }}
                className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-50 cursor-pointer"
              >
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-8 h-8 rounded object-cover"
                />
                <span className="text-sm text-gray-800">{item.name}</span>
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
        className="w-3 ml-3 cursor-pointer opacity-70 hover:opacity-100 transition"
        src={assets.cross_icon}
        alt="close"
      />
    </div>
  );
};

export default SearchBar;
