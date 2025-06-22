"use client";

import React, { useState } from "react";
import Image from "next/image";

const SeeHowItWorks = ({ videos, title, description, cardsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };

  return (
    <div className="bg-[#EECCCC] py-10 px-4">
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        <button
          onClick={prevVideo}
          className="bg-white rounded-full p-2 shadow"
        >
          &lt;
        </button>

        <div className="w-full max-w-3xl aspect-video rounded overflow-hidden shadow-lg">
          <iframe
            src={videos[currentIndex]}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <button
          onClick={nextVideo}
          className="bg-white rounded-full p-2 shadow"
        >
          &gt;
        </button>
      </div>

      <div className="py-10 px-4 mt-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className=" p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={card.icon}
                alt={card.title}
                width={100}
                height={100}
                className="mb-4 mx-auto"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeHowItWorks;
