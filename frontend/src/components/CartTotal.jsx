import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);
  return (
    <div className="w-full animate-fadeIn">
      <div className="text-2xl mb-4">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-3 text-sm bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl shadow-lg border border-slate-200">
        <div className="flex justify-between py-3 px-4 transform transition-all duration-300 hover:bg-white rounded-xl">
          <p className="text-slate-700 font-bold">Subtotal</p>
          <p className="text-slate-900 font-bold">
            {currency}
            {getCartAmount()}.00
          </p>
        </div>
        <hr className="border-slate-300" />
        <div className="flex justify-between py-3 px-4 transform transition-all duration-300 hover:bg-white rounded-xl">
          <p className="text-slate-700 font-bold">Shipping Fee</p>
          <p className="text-slate-900 font-bold">
            {currency} {deliveryFee}.00
          </p>
        </div>
        <hr className="border-slate-300" />
        <div className="flex justify-between py-4 px-4 transform transition-all duration-300 bg-gradient-to-r from-cyan-50 to-sky-50 rounded-xl">
          <b className="text-slate-900 text-lg">Total</b>
          <b className="text-cyan-600 text-lg font-bold">
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
