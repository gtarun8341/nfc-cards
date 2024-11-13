"use client"; // Mark this component as a Client Component
import Image from 'next/image';

import React, { useEffect, useState } from 'react';

const Samples = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;

  // Function to change the image index
  const changeImage = (direction) => {
    setCurrentIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % totalImages;
      } else {
        return (prevIndex - 1 + totalImages) % totalImages; // Wrap around for previous
      }
    });
  };

  // Function to automatically scroll images
  useEffect(() => {
    const interval = setInterval(() => {
      changeImage('next');
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [totalImages]);

  // Get styles for each image based on its position
  const getImageStyles = (index) => {
    const adjustedIndex = (index + currentIndex + totalImages) % totalImages;
    const isMiddle = adjustedIndex === currentIndex; // Determine if it's the middle image

    return {
      height: isMiddle ? '30vh' : '20vh', // Use vh for responsive height
      transition: 'height 0.5s ease, transform 0.5s ease, margin 0.5s ease',
      transform: isMiddle ? 'scale(1.1)' : 'scale(0.9)', // Scale effect for middle image
      opacity: isMiddle ? 1 : 0.7, // Fade effect for side images
      margin: '0 5px', // Maintain margin for spacing
    };
  };

  // Calculate the indices for the current, left, and right images
  const leftImageIndex = (currentIndex - 1 + totalImages) % totalImages;
  const middleImageIndex = currentIndex;
  const rightImageIndex = (currentIndex + 1) % totalImages;

  return (
    <div className="overflow-hidden container mx-auto p-6 flex justify-center items-center relative">
      <button
        onClick={() => changeImage('prev')}
        className="absolute left-0 z-10 bg-white p-2 rounded-md"
      >
        Prev
      </button>
      <div className="flex items-center transition-transform duration-500 ease-in-out">
        <Image
          src={images[leftImageIndex]}
          alt={`Sample ${leftImageIndex + 1}`}
          className="rounded-lg object-cover h-20 w-auto sm:h-30 md:h-40" // Responsive height
          style={getImageStyles(-1)}
        />
        <Image
          src={images[middleImageIndex]}
          alt={`Sample ${middleImageIndex + 1}`}
          className="rounded-lg object-cover h-20 w-auto sm:h-30 md:h-40" // Responsive height
          style={getImageStyles(0)}
        />
        <Image
          src={images[rightImageIndex]}
          alt={`Sample ${rightImageIndex + 1}`}
          className="rounded-lg object-cover h-20 w-auto sm:h-30 md:h-40" // Responsive height
          style={getImageStyles(1)}
        />
      </div>
      <button
        onClick={() => changeImage('next')}
        className="absolute right-0 z-10 bg-white p-2 rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default Samples;
