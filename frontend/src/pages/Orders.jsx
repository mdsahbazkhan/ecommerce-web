import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import OrdersSkeleton from "../components/OrdersSkeleton";
import axios from "axios";
import { toast } from "sonner";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [orderData, setorderData] = useState([]);
  const loadOrderData = async () => {
    try {
      if (!token) return null;
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } },
      );
      let allOrdersItem = [];
      response.data.orders.map((order) => {
        order.items.map((item) => {
          item["status"] = order.status;
          item["payment"] = order.payment;
          item["paymentMethod"] = order.paymentMethod;
          item["date"] = order.date;
          allOrdersItem.push(item);
        });
      });
      setorderData(allOrdersItem.reverse());
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (loading) return <OrdersSkeleton />;
  return (
    <div className="border-t pt-16 mt-10">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-indigo-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.images[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium text-indigo-800">
                  {item.name}
                </p>
                <div className="flex items-center gap-3 mt-2 text-base text-indigo-800">
                  <p className="text-lg">
                    {currency} {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-2 text-indigo-800">
                  Date:{" "}
                  <span className="text-indigo-500">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>{" "}
                <p className="mt-2 text-indigo-800">
                  Payment:{" "}
                  <span className="text-indigo-500">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                <span className="text-sm font-medium text-indigo-500">
                  {item.status}
                </span>
              </div>

              <button
                onClick={loadOrderData}
                className="
  border border-indigo-600
  text-indigo-600
  px-4 py-2
  text-sm font-medium
  rounded-md
  hover:bg-indigo-50
  transition
"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
