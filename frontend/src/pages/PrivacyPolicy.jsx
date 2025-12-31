import React from "react";
import { Helmet } from "react-helmet-async";
import Title from "../components/Title";

const PrivacyPolicy = () => {
  return (
    <div className="border-t pt-16 mt-10 max-w-5xl mx-auto px-4">
      <Helmet>
        <title>Privacy Policy | Bazario</title>
        <meta
          name="description"
          content="Learn how Bazario collects, uses, and protects your personal information."
        />
      </Helmet>

      <Title text1="PRIVACY" text2="POLICY" />

      <div className="mt-8 text-indigo-500 space-y-6 text-sm sm:text-base">
        <p>
          At <b className="text-indigo-800">Bazario</b>, your privacy is
          important to us. This policy explains how we handle your personal
          information.
        </p>

        <h2 className="text-indigo-800 font-semibold">
          Information We Collect
        </h2>
        <ul className="list-disc ml-5">
          <li>Name, email, phone number</li>
          <li>Shipping and billing address</li>
          <li>Order and payment details</li>
        </ul>

        <h2 className="text-indigo-800 font-semibold">
          How We Use Your Information
        </h2>
        <ul className="list-disc ml-5">
          <li>To process orders</li>
          <li>To provide customer support</li>
          <li>To improve our services</li>
        </ul>

        <p>
          We never sell or misuse your data. All information is securely stored.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
