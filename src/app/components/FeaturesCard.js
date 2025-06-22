// src/app/components/FeaturesCard.js
"use client";
import Image from "next/image";

const FeaturesCard = ({ headingTitle, headingDescription, cardsData }) => {
  return (
    <div className="container mx-auto p-6">
      {/* Title and Description */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          {headingTitle}
        </h2>
        <p className="text-gray-700 mt-2 max-w-3xl mx-auto">
          {headingDescription}
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card) => (
          <div key={card.id} className="border rounded-lg shadow-lg">
            {/* Enlarged Image */}
            <Image
              src={card.icon}
              alt={card.title}
              width={500}
              height={500}
              layout="intrinsic"
              className="mx-auto mb-4 w-24 h-24" // Increased from w-16 h-16
            />

            {/* Description */}
            <p className="text-gray-700 text-center bg-[#EECCCC80] p-3 rounded">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesCard;
