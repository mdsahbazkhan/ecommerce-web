import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div className="border-t pt-10 mt-10">
      {/* Heading */}
      <div className="text-center text-2xl mb-10 animate-fadeInUp">
        <Title text1={"ABOUT"} text2={"BazarioX"} />
      </div>

      {/* About Section */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-14 items-center">
        <div className="w-full md:max-w-[420px] animate-fadeInLeft">
          <img
            className="w-full rounded-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
            src={assets.about_img}
            alt="About BazarioX"
          />
        </div>

        <div
          className="flex flex-col gap-5 text-slate-600 md:w-1/2 animate-fadeInRight"
          style={{ animationDelay: "200ms" }}
        >
          <p className="font-medium">
            BazarioX is a modern e-commerce platform built with a strong focus
            on simplicity, usability, and performance. Our goal is to create a
            smooth shopping experience where users can explore products with
            confidence and ease.
          </p>

          <p className="font-medium">
            We curate products that balance style, comfort, and everyday needs.
            Each part of the platform is designed to ensure intuitive
            navigation, fast interactions, and a seamless checkout experience.
          </p>

          <b className="text-slate-900 text-lg">Our Mission</b>

          <p className="font-medium">
            Our mission is to build a user-first shopping experience by
            combining clean design, reliable functionality, and modern web
            technologies. BazarioX continues to evolve with the goal of
            delivering better experiences every day.
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-16 border-slate-300" />

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="text-xl mb-8 animate-fadeInUp"
          style={{ animationDelay: "300ms" }}
        >
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: "Quality Focused",
              desc: "Products are selected with attention to design, comfort, and usability to ensure a reliable shopping experience.",
              delay: "400ms",
            },
            {
              title: "User-Friendly Experience",
              desc: "A clean interface and responsive layout make browsing and ordering effortless across all devices.",
              delay: "500ms",
            },
            {
              title: "Reliable Support",
              desc: "We prioritize user trust by offering clear policies and dependable customer support when needed.",
              delay: "600ms",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="border-2 border-slate-200 rounded-2xl px-8 py-10 bg-gradient-to-br from-cyan-50 to-sky-50 flex flex-col gap-3 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-cyan-300 stagger-item"
              style={{ animationDelay: item.delay }}
            >
              <b className="text-slate-900 text-lg">{item.title}</b>
              <p className="text-slate-600 text-sm font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <NewsLetterBox />
    </div>
  );
};

export default About;
