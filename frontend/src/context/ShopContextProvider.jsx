import { ShopContext } from "./ShopContext";
import { products } from "../assets/assets";
const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const deliveryFee=40
  const value = { products, currency,deliveryFee };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
