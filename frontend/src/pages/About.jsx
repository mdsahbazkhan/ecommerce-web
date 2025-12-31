import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div className="border-t pt-10 mt-10">
      {/* Heading */}
      <div className="text-center text-2xl mb-10">
        <Title text1={"ABOUT"} text2={"BAZARIO"} />
      </div>

      {/* About Section */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-14 items-center">
        <img
          className="w-full md:max-w-[420px] rounded-lg"
          src={assets.about_img}
          alt="About Bazario"
        />

        <div className="flex flex-col gap-5 text-indigo-500 md:w-1/2">
          <p>
            Bazario is a modern e-commerce platform built with a strong focus on
            simplicity, usability, and performance. Our goal is to create a
            smooth shopping experience where users can explore products with
            confidence and ease.
          </p>

          <p>
            We curate products that balance style, comfort, and everyday needs.
            Each part of the platform is designed to ensure intuitive
            navigation, fast interactions, and a seamless checkout experience.
          </p>

          <b className="text-indigo-800 text-lg">Our Mission</b>

          <p>
            Our mission is to build a user-first shopping experience by
            combining clean design, reliable functionality, and modern web
            technologies. Bazario continues to evolve with the goal of
            delivering better experiences every day.
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-16 border-indigo-200" />

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-xl mb-8">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="border border-indigo-200 rounded-lg px-8 py-10 bg-indigo-50/30 flex flex-col gap-3">
            <b className="text-indigo-800">Quality Focused</b>
            <p className="text-indigo-500 text-sm">
              Products are selected with attention to design, comfort, and
              usability to ensure a reliable shopping experience.
            </p>
          </div>

          <div className="border border-indigo-200 rounded-lg px-8 py-10 bg-indigo-50/30 flex flex-col gap-3">
            <b className="text-indigo-800">User-Friendly Experience</b>
            <p className="text-indigo-500 text-sm">
              A clean interface and responsive layout make browsing and ordering
              effortless across all devices.
            </p>
          </div>

          <div className="border border-indigo-200 rounded-lg px-8 py-10 bg-indigo-50/30 flex flex-col gap-3">
            <b className="text-indigo-800">Reliable Support</b>
            <p className="text-indigo-500 text-sm">
              We prioritize user trust by offering clear policies and dependable
              customer support when needed.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsLetterBox />
    </div>
  );
};

export default About;
