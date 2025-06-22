"use client";

import { useState } from "react";
import Image from "next/image";

const BestSellers = ({ heading, description, images = [] }) => {
  const imagesPerPage = 7;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const startIndex = page * imagesPerPage;
  const currentImages = images.slice(startIndex, startIndex + imagesPerPage);

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  return (
    <section className="w-full bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {heading}
        </h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      {/* Images Row */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-center">
        {currentImages.map((img, index) => (
          <div key={index} className="w-full flex justify-center">
            <Image
              src={img}
              alt={`Best Seller ${startIndex + index + 1}`}
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px]"
            />
          </div>
        ))}
      </div>

      {/* Pagination Arrows */}
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
    </section>
  );
};

export default BestSellers;
