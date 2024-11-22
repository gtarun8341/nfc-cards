// src/app/components/HomeCard.js
"use client"; // Next.js Client Component
import Image from 'next/image';

const HomeCard = ({ title, description, icon }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 h-64 flex flex-col items-center"> {/* Increased height and added flexbox */}
        <div className="mb-4"> {/* Space below the icon */}
          <Image src={icon} alt={`${title} icon`} className="w-12 h-12"                   width={500} // Set a reasonable default width
                  height={500}
                  layout="intrinsic" /> {/* Add icon here */}
        </div>
        <h2 className="text-xl font-bold mb-2 text-center">{title}</h2> {/* Center title */}
        <p className="text-gray-700 text-center">{description}</p> {/* Center description */}
      </div>
    );
  };
  
  export default HomeCard;
  