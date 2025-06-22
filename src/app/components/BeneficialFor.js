"use client";
import { useState } from "react";
import Image from "next/image";

const BeneficialFor = ({ headingTitle, headingDescription, benficalData }) => {
  const CARDS_PER_PAGE = 8;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(benficalData.length / CARDS_PER_PAGE);
  const startIndex = page * CARDS_PER_PAGE;
  const currentCards = benficalData.slice(
    startIndex,
    startIndex + CARDS_PER_PAGE
  );

  const nextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentCards.map((card) => (
          <div key={card.id} className="border rounded-lg shadow-lg">
            <div className="relative">
              <Image
                src={card.icon}
                alt={card.title}
                width={500}
                height={500}
                layout="intrinsic"
                className="mx-auto mb-4 w-24 h-24"
              />
              <div className="absolute top-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded text-sm font-semibold text-gray-800">
                {card.title}
              </div>
            </div>
            <p className="text-gray-700 text-center bg-[#EECCCC80] p-3 rounded">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={prevPage}
            disabled={page === 0}
            className="bg-black hover:bg-gray-400 text-white w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
          >
            &larr;
          </button>
          <button
            onClick={nextPage}
            disabled={page === totalPages - 1}
            className="bg-black hover:bg-gray-400 text-white w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default BeneficialFor;
