import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      {/* 🔹 SEO */}
      <Helmet>
        <title>BazarioX | Online Fashion Store</title>
        <meta
          name="description"
          content="Shop trendy fashion online at BazarioX – latest arrivals, best sellers, easy returns and fast delivery across India."
        />
      </Helmet>

      {/* 🔹 Page UI */}
      <div>
        <Hero />
        <LatestCollection />
        <BestSeller />
        <OurPolicy />
        <NewsLetterBox />
      </div>
    </>
  );
};

export default Home;
