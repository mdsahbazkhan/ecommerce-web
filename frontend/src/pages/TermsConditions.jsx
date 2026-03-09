import React from "react";
import { Helmet } from "react-helmet-async";
import Title from "../components/Title";

const TermsConditions = () => {
  return (
    <div className="border-t pt-16 mt-10 max-w-5xl mx-auto px-4">
      <Helmet>
        <title>Terms & Conditions | BazarioX </title>
        <meta
          name="description"
          content="Read the terms and conditions for using BazarioX."
        />
      </Helmet>

      <Title text1="TERMS &" text2="CONDITIONS" />

      <div className="mt-8 text-cyan-500 space-y-6 text-sm sm:text-base">
        <p>
          By using <b className="text-cyan-800">BazarioX</b>, you agree to the
          following terms and conditions.
        </p>

        <h2 className="text-cyan-800 font-semibold">Orders & Payments</h2>
        <ul className="list-disc ml-5">
          <li>All prices are in INR (₹)</li>
          <li>Orders are confirmed after payment</li>
        </ul>

        <h2 className="text-cyan-800 font-semibold">Product Information</h2>
        <p>
          We try our best to show accurate product details, but minor variations
          may occur.
        </p>

        <p>BazarioX reserves the right to update these terms at any time.</p>
      </div>
    </div>
  );
};

export default TermsConditions;
