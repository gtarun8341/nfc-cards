"use client";

import { useState } from "react";
import Image from "next/image";

const Testimonials = ({ heading, description, testimonials }) => {
  const cardsPerPage = 3;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  const paginatedData = testimonials.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage
  );

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <section
      className="w-full px-4 py-10 relative" // Add "relative" here
      style={{
        background:
          "linear-gradient(139.28deg, #F3E9E9 43.85%, #BEC7C9 80.25%, #A0A8AA 111.08%, #8B9293 123.08%)",
      }}
    >
      {/* Heading + Description + Arrows */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between gap-4 relative">
        {/* Spacer to balance the right-side arrows */}
        <div className="hidden lg:block w-1/3" />

        {/* Centered Heading + Description */}
        <div className="w-full lg:w-1/3 text-center">
          <h2 className="text-3xl font-bold text-gray-800">{heading}</h2>
          <p className="text-gray-700 mt-1">{description}</p>
        </div>

        {/* Arrow Buttons (Right) */}
        {totalPages > 1 && (
          <div className="w-1/3 flex justify-end gap-2 absolute right-0 top-1/2 -translate-y-1/2 lg:static lg:translate-y-0">
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

      {/* Testimonial Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
          >
            {/* Description */}
            <p className="text-gray-700 mb-4">{testimonial.description}</p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-auto">
              <Image
                src={testimonial.icon}
                alt={testimonial.name}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600">
                  {testimonial.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Image
        src="/images/decor-top-left.png"
        alt="Top Left Decoration"
        width={120}
        height={120}
        className="absolute top-0 left-4 sm:left-8 md:left-12 -translate-y-1/2 opacity-50 pointer-events-none"
      />

      <Image
        src="/images/decor-bottom-right.png"
        alt="Bottom Right Decoration"
        width={120}
        height={120}
        className="absolute bottom-0 right-4 sm:right-8 md:right-12 translate-y-1/2 opacity-50 pointer-events-none"
      />
    </section>
  );
};

export default Testimonials;
