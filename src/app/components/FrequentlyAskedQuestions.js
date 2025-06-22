"use client";

import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi"; // For icons

const FAQ = ({ title, description, faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border p-4 rounded-2xl shadow-sm cursor-pointer transition-colors duration-300 ${
                isOpen ? "bg-[#F3E9E9]" : "bg-gray-100"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-left">{faq.question}</h3>
                <span className="text-xl">{isOpen ? <FiX /> : <FiPlus />}</span>
              </div>
              {isOpen && (
                <p className="mt-3 text-gray-700 transition-opacity duration-300">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
