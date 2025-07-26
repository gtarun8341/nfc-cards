"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AdditionalServices = ({ headingTitle, headingDescription }) => {
  const additionalservicesData = [
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Social Media Marketing",
        text: "Promote your brand effectively through social media platforms with tailored marketing strategies.",
      },
      link: "https://www.shiveninfotech.com/digital-marketing-services/social-media-marketing-in-navi-mumbai/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "GMB Local SEO Optimization",
        text: "Optimize your Google My Business listing to improve local search rankings and attract more customers.",
      },
      link: "https://www.shiveninfotech.com/digital-marketing-services/gmb-local-seo-optimization/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Global SEO Service",
        text: "Expand your reach globally with expert SEO services that drive organic traffic to your website.",
      },
      link: "https://www.shiveninfotech.com/digital-marketing-services/seo-services-in-navi-mumbai/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Google Promotions",
        text: "Boost your business with targeted Google Ads campaigns for maximum online visibility.",
      },
      link: "https://www.shiveninfotech.com/digital-marketing-services/google-promotions-agency-in-navi-mumbai/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Web Design Services",
        text: "Create stunning, user-friendly websites that captivate your audience and elevate your brand.",
      },
      link: "https://www.shiveninfotech.com/web-designing-services-in-navi-mumbai/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Software Development",
        text: "Get custom software solutions tailored to meet your specific business needs and goals.",
      },
      link: "https://www.shiveninfotech.com/software-development/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Mobile App Development",
        text: "Develop innovative and user-friendly mobile applications for Android and iOS platforms.",
      },
      link: "https://www.shiveninfotech.com/mobile-app-development/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Animation and Graphics",
        text: "Enhance your digital presence with captivating animations and creative graphic designs.",
      },
      link: "https://www.shiveninfotech.com/other-digital-services-in-navi-mumbai/",
    },
  ];

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
        {currentCards.map((card, index) => (
          <Link
            key={index}
            href={card.link || "#"}
            target="_blank"
            className="border rounded-lg shadow bg-[#F9F9F9] overflow-hidden text-center p-3 hover:shadow-lg transition duration-300"
          >
            <Image
              src={card.image}
              alt={card.description.title}
              width={400}
              height={250}
              className="w-full h-36 object-cover mb-3 rounded"
            />
            <h3 className="text-md font-semibold text-gray-800 mb-1">
              {card.description.title}
            </h3>
            <p className="text-sm text-gray-600">{card.description.text}</p>
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
