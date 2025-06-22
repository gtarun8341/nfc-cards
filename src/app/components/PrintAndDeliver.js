"use client";

import Image from "next/image";

const PrintAndDeliver = ({
  heading,
  description,
  deliveryText,
  mainImage,
  deliverySteps, // Array of { id, image, text }
}) => {
  return (
    <div className="w-full px-4 py-10 bg-white">
      {/* Heading and Description */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">{heading}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      {/* Split Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <p className="text-gray-600 leading-relaxed">{deliveryText}</p>
        </div>
        <div className="w-full h-auto">
          <Image
            src={mainImage}
            alt="Delivery Process"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded"
          />
        </div>
      </div>

      {/* 4 Delivery Images with Descriptions */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {deliverySteps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <Image
              src={step.image}
              alt={step.text}
              width={100}
              height={100}
              className="rounded-md mb-2"
            />
            <p className="text-gray-700 text-sm">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrintAndDeliver;
