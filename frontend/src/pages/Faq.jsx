import React, { useState } from "react";
import Title from "../components/Title";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse products, add items to your cart, select your size, and proceed to checkout to place an order.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "We support Cash on Delivery and online payment methods. More options will be added soon.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders are usually delivered within 3–7 business days depending on your location.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "We offer a 7-day easy return and exchange policy on eligible products.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you can track it from the Orders page in your account.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us through the Contact page or email us at support@bazario.com.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="border-t pt-10 mt-10">
      {/* Page Title */}
      <div className="text-center text-2xl mb-10">
        <Title text1={"HELP &"} text2={"FAQ"} />
        <p className="text-indigo-500 text-sm mt-2">
          Find answers to common questions below
        </p>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 mb-20">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-indigo-200 rounded-lg mb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left text-indigo-800 font-medium"
            >
              {faq.question}
              <FiChevronDown
                className={`transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeIndex === index && (
              <div className="px-5 pb-4 text-sm text-indigo-500">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
