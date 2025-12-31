import React from "react";
import { Helmet } from "react-helmet-async";
import Title from "../components/Title";

const ReturnsExchanges = () => {
  return (
    <div className="border-t pt-16 mt-10 max-w-5xl mx-auto px-4">
      <Helmet>
        <title>Returns & Exchanges | Bazario</title>
        <meta
          name="description"
          content="Easy returns and exchange policy at Bazario."
        />
      </Helmet>

      <Title text1="RETURNS &" text2="EXCHANGES" />

      <div className="mt-8 text-indigo-500 space-y-6 text-sm sm:text-base">
        <h2 className="text-indigo-800 font-semibold">Return Policy</h2>
        <p>Products can be returned within 7 days of delivery.</p>

        <h2 className="text-indigo-800 font-semibold">Exchange Policy</h2>
        <p>Easy exchange for size or product (subject to availability).</p>

        <h2 className="text-indigo-800 font-semibold">Refunds</h2>
        <p>Refunds are processed within 5–7 business days.</p>
      </div>
    </div>
  );
};

export default ReturnsExchanges;
