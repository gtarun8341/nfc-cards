// src/app/components/OtherServices.js
"use client"; // Marking this as a Client Component

import { useEffect, useState } from 'react';
import Image from 'next/image';

const OtherServices = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // State to control visibility for animation

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Hide the content before changing the index
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
        setIsVisible(true); // Show the content again after changing the index
      }, 300); // Duration of the animation
    }, 5000); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, [services.length]);

  const handleNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
      setIsVisible(true);
    }, 300); // Duration of the animation
  };

  const handlePrev = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex - 1 + services.length) % services.length
      );
      setIsVisible(true);
    }, 300); // Duration of the animation
  };

  return (
    <div className="container mx-auto p-6">
      {/* Big Card Section */}
      {services.length > 0 && (
        <div className="flex justify-center">
          <div className="relative bg-gray-100 border rounded-lg shadow-lg mb-6 overflow-hidden w-3/4 max-w-lg"> {/* Adjust width here */}          <Image
            src={services[currentIndex].image}
            alt={services[currentIndex].title}
            className="w-full h-80 object-cover rounded-lg transition-transform duration-500 transform hover:scale-105"
          />
          <div className={`absolute inset-0 flex flex-col items-center justify-center text-white  from-black via-transparent to-black rounded-lg transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <h3 className="font-bold text-3xl mb-2">{services[currentIndex].title}</h3>
            <p className="text-lg mb-4 text-center px-4">{services[currentIndex].description}</p>
            <a href={services[currentIndex].link} className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded transition duration-300">
              Learn More
            </a>
          </div>
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition duration-300"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition duration-300"
          >
            Next
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherServices;
