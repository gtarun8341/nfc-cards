"use client";  // Marking this as a Client Component

import React, { useState } from 'react';

const DemoVideos = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  return (
    <div className="container mx-auto p-6 flex items-center justify-center">
      <button onClick={prevVideo} className="bg-gray-200 rounded-full p-2 mr-4">
        &lt; {/* Left Arrow */}
      </button>
      
      <iframe
        width="600"
        height="400"
        src={videos[currentIndex]}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <button onClick={nextVideo} className="bg-gray-200 rounded-full p-2 ml-4">
        &gt; {/* Right Arrow */}
      </button>
    </div>
  );
};

export default DemoVideos;
