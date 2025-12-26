import { ShopContext } from "./ShopContext";
import { products } from "../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const deliveryFee = 40;
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
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
    cartItems,
    addToCart,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
