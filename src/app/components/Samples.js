"use client";

import { useState } from "react";
import Image from "next/image";

const Samples = ({
  heading,
  description,
  sideHeading,
  sideHeadingDescription,
  images,
}) => {
  const [page, setPage] = useState(0);
  const imagesPerPage = 3;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const paginatedImages = images.slice(
    page * imagesPerPage,
    page * imagesPerPage + imagesPerPage
  );

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <section className="w-full px-4 py-10">
      {/* Heading + Description */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">{heading}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side Text */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {sideHeading}
          </h3>
          <p className="text-gray-600">{sideHeadingDescription}</p>
        </div>

        {/* Right Side Images */}
        <div className="relative flex items-center justify-center h-[400px]">
          {paginatedImages.length >= 1 && (
            <div className="absolute z-10 h-full w-auto">
              <Image
                src={paginatedImages[0]}
                alt="Main Image"
                width={300}
                height={400}
                className="h-full w-auto object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          {paginatedImages.length >= 2 && (
            <div className="absolute left-0 top-0 h-[80%]">
              <Image
                src={paginatedImages[1]}
                alt="Left Image"
                width={200}
                height={300}
                className="h-full w-auto object-cover rounded-lg shadow"
              />
            </div>
          )}

          {paginatedImages.length >= 3 && (
            <div className="absolute right-0 bottom-0 h-[80%]">
              <Image
                src={paginatedImages[2]}
                alt="Right Image"
                width={200}
                height={300}
                className="h-full w-auto object-cover rounded-lg shadow"
              />
            </div>
          )}
        </div>
      </div>

      {/* Arrow Pagination */}
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

export default Samples;
