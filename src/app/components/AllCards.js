// src/app/components/AllCards.js
"use client"; // Marking this as a Client Component
import Image from "next/image";

const AllCards = ({ cardsData, full }) => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {" "}
        {/* Change to 3 columns on large screens */}
        {cardsData.map((card) => (
          <div key={card.id} className="border rounded-lg p-4 shadow-lg">
            <Image
              src={card.icon}
              alt={card.title}
              width={500} // Set a reasonable default width
              height={500}
              layout="intrinsic"
              className={`mx-auto mb-4 ${
                full ? "w-full h-32 object-cover" : "w-16 h-16"
              }`} // Conditional styling for image
            />
            <h3
              className={`text-xl font-semibold ${
                full ? "text-left" : "text-center"
              } mb-2`}
            >
              {card.title}
            </h3>{" "}
            {/* Left align title if full */}
            <p
              className={`text-gray-600 bg-[#EECCCC80] ${
                full ? "text-left" : "text-center"
              }`}
            >
              {card.description}
            </p>{" "}
            {/* Left align description if full */}
            {full && (
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Select
              </button> // Select button
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCards;
