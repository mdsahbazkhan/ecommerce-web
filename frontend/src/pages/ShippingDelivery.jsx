import React from "react";
import { Helmet } from "react-helmet-async";
import Title from "../components/Title";

const ShippingDelivery = () => {
  return (
    <div className="border-t pt-16 mt-10 max-w-5xl mx-auto px-4">
      <Helmet>
        <title>Shipping & Delivery | BazarioX </title>
        <meta
          name="description"
          content="Shipping and delivery information for BazarioX orders."
        />
      </Helmet>

      <Title text1="SHIPPING &" text2="DELIVERY" />

      <div className="mt-8 text-cyan-500 space-y-6 text-sm sm:text-base">
        <h2 className="text-cyan-800 font-semibold">Delivery Time</h2>
        <p>Orders are delivered within 3–7 business days.</p>

        <h2 className="text-cyan-800 font-semibold">Shipping Charges</h2>
        <p>Free shipping on eligible orders. Standard charges may apply.</p>

        <h2 className="text-cyan-800 font-semibold">Order Tracking</h2>
        <p>You can track your order from the My Orders section.</p>
      </div>
    </div>
  );
};

export default ShippingDelivery;
