import { ShopContext } from "./ShopContext";
import { products } from "../assets/assets";
import { useState } from "react";
const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const deliveryFee = 40;
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const value = {
    products,
    currency,
    deliveryFee,
    showSearchBar,
    setShowSearchBar,
    searchQuery,
    setSearchQuery,
    setSearch,
    search,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
