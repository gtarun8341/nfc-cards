"use client";
import { useState } from "react";
import Image from "next/image";

const OurMoreProducts = ({
  headingTitle,
  headingDescription,
  ourmoreproductsdata,
}) => {
  const CARDS_PER_PAGE = 4;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(ourmoreproductsdata.length / CARDS_PER_PAGE);
  const startIndex = page * CARDS_PER_PAGE;
  const currentCards = ourmoreproductsdata.slice(
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
    <div className="container mx-auto p-6">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          {headingTitle}
        </h2>
        <p className="text-gray-700 mt-2 max-w-3xl mx-auto">
          {headingDescription}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentCards.map((card) => (
          <div
            key={card.id}
            className="border rounded-lg shadow-md p-3 bg-white text-center"
          >
            <Image
              src={card.icon}
              alt={card.title}
              width={400}
              height={300}
              className="w-full h-36 object-cover mb-3 rounded"
            />
            <h3 className="text-md font-semibold text-gray-800 mb-1">
              {card.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{card.description}</p>
            <p className="text-md font-bold text-gray-900 mb-4">
              ₹{card.price}
            </p>
            <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Arrows */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={prevPage}
            disabled={page === 0}
            className="bg-black hover:bg-gray-600 text-white w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
          >
            &larr;
          </button>
          <button
            onClick={nextPage}
            disabled={page === totalPages - 1}
            className="bg-black hover:bg-gray-600 text-white w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default OurMoreProducts;
