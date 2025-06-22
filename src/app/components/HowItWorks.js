// src/app/components/HowItWorks.js
"use client"; // Next.js Client Component
import Image from "next/image";

import AllCards from "./AllCards"; // Import the AllCards component

const HowItWorks = ({ cardsData }) => {
  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardsData.map((card) => (
        <div key={card.id} className="border rounded-lg p-4 text-center">
          <Image
            src={card.icon}
            alt={card.title}
            className="mb-2 mx-auto"
            width={500} // Set a reasonable default width
            height={500}
            layout="intrinsic"
          />
          <h3 className="font-semibold text-lg">{card.title}</h3>
          <p className="text-gray-600">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;
