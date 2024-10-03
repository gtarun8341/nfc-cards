// src/app/components/Hero.js
"use client"; // Marking this as a Client Component

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full-Screen Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/path/to/your/video.mp4" // Update with your video path
        autoPlay
        loop
        muted
      />
      
      {/* Overlay (Optional) */}
      <div className="absolute inset-0 bg-black opacity-30" />

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold">Welcome to Shiven Card</h1>
        <p className="mt-4 text-lg">Experience the future of cards with our innovative solutions.</p>
        <a href="/about" className="mt-6 inline-block bg-green-500 px-6 py-3 rounded-md text-white">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default Hero;
