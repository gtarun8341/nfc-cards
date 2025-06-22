"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AdditionalServices = ({
  headingTitle,
  headingDescription,
  additionalservicesData,
}) => {
  const CARDS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(additionalservicesData.length / CARDS_PER_PAGE);
  const startIndex = currentPage * CARDS_PER_PAGE;
  const currentCards = additionalservicesData.slice(
    startIndex,
    startIndex + CARDS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          {headingTitle}
        </h2>
        <p className="text-gray-700 mt-2 max-w-3xl mx-auto">
          {headingDescription}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentCards.map((card) => (
          <Link
            key={card.id}
            href={card.link || "#"}
            className="border rounded-lg shadow bg-[#F9F9F9] overflow-hidden text-center p-3 hover:shadow-lg transition duration-300"
          >
            <Image
              src={card.icon}
              alt={card.title}
              width={400}
              height={250}
              className="w-full h-36 object-cover mb-3 rounded"
            />
            <h3 className="text-md font-semibold text-gray-800 mb-1">
              {card.title}
            </h3>
            <p className="text-sm text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>

      {/* Dot Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentPage === index ? "bg-gray-800 scale-110" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdditionalServices;
