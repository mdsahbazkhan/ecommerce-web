import React, { useContext, useMemo, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from "../components/CartTotal";
import CartSkeleton from "../components/CartSkeleton";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  if (loading) return <CartSkeleton />;

  const cartData = useMemo(() => {
    const temp = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        if (qty > 0) {
          temp.push({ _id: productId, size, quantity: qty });
        }
      }
    }

    return temp;
  }, [cartItems]);

  return (
    <div className="border-t pt-14 mt-10 px-4 sm:px-0">
      {/* Title */}
      <div className="text-2xl mb-6">
        <Title text1="SHOPPING" text2="CART" />
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-4">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="border border-indigo-200 rounded-lg p-4 
              grid grid-cols-1 sm:grid-cols-[4fr_1fr_1fr]
              gap-4 items-center"
            >
              {/* Product Info */}
              <div className="flex gap-4 items-start">
                <img
                  src={productData.images[0]}
                  alt={productData.name}
                  className="w-20 h-24 object-cover rounded"
                />

                <div className="flex flex-col gap-2">
                  <p className="text-sm sm:text-lg font-medium text-indigo-800 leading-snug">
                    {productData.name}
                  </p>

                  <p className="text-indigo-800 font-semibold">
                    {currency}
                    {productData.price}
                  </p>

                  <span
                    className="inline-block w-fit px-3 py-1 text-xs font-medium rounded-md 
                  border border-indigo-600 bg-indigo-100 text-indigo-800"
                  >
                    Size: {item.size}
                  </span>
                </div>
              </div>

              {/* Quantity + Delete */}
              <div className="flex items-center justify-between sm:justify-center md:justify-around lg:justify-between">
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                  className="w-16 border border-gray-300 rounded-md px-2 py-1 
    text-center text-sm focus:outline-none focus:border-indigo-500"
                />

                <RiDeleteBin6Line
                  size={22}
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="text-indigo-500 hover:text-red-500 transition cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total */}
      <div className="flex justify-end my-16">
        <div className="w-full sm:w-[420px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className=" mt-2
      flex-1
      px-8 py-3
      text-sm font-semibold
      rounded-md
      transition-all
     bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95
      
    "
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
