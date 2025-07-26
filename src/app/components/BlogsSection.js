"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "../apiConfig/axiosConfig"; // Adjust path if needed

const BlogsSection = ({ headingTitle, headingDescription }) => {
  const CARDS_PER_PAGE = 3;

  const [blogData, setBlogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/api/blogRoutes");
        setBlogData(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };
    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogData.length / CARDS_PER_PAGE);
  const startIndex = currentPage * CARDS_PER_PAGE;
  const currentCards = blogData.slice(startIndex, startIndex + CARDS_PER_PAGE);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentCards.map((card) => (
          <div
            key={card._id || card.id}
            className="relative border rounded-lg shadow-lg bg-[#F1F1F1] overflow-hidden"
          >
            <Image
              src={`${api.defaults.baseURL}/uploads/${card.previewImage}`}
              alt={card.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                {card.title}
              </h3>
              <p className="text-gray-600 text-center line-clamp-3">
                {card.description}
              </p>
            </div>
            <Link
              href={`/blogs/${card.slug}`}
              className="absolute inset-0 z-10"
            />
          </div>
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

export default BlogsSection;
