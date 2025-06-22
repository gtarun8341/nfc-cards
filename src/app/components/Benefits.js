"use client";

import Image from "next/image";
import { useState } from "react";

const Benefits = ({ title, description, benefitsData }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const cardsPerPage = 4;
  const totalPages = Math.ceil(benefitsData.length / cardsPerPage);

  const paginatedCards = benefitsData.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedCards.map((benefit) => (
          <div
            key={benefit.id}
            className="bg-white border rounded-xl shadow-md p-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#EECCCC] p-2 rounded-lg">
                <Image
                  src={benefit.icon}
                  alt={benefit.title}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {benefit.title}
              </h3>
            </div>
            <p className="text-gray-600 mt-2">{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-3 h-3 rounded-full ${
              currentPage === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
