import { useEffect, useState } from "react";
import { ShopContext } from "./ShopContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const deliveryFee = 40;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select product size ❗");
      return;
    }
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
    toast.success("Added to cart 🛒", {
      duration: 2000,
    });
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };
  const getProdutsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProdutsData();
  }, []);
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
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
