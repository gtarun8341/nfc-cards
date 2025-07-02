"use client";

const Hero = () => {
  return (
    <div
      className="w-full h-screen relative overflow-hidden"
      style={{ backgroundColor: "#EECCCC80" }}
    >
      {/* Floating Top-Right Badge */}
      <div className="absolute top-6 right-6  rounded-lg px-4 py-3 flex flex-col items-start z-20">
        {/* Top Row: Overlapping Images + Text Side by Side */}
        <div className="flex items-center">
          {/* Overlapping Images */}
          <div className="flex -space-x-4">
            <img
              src="/images/circleimage.jpg"
              alt="User 1"
              className="w-10 h-10 rounded-full border-2 border-white z-10"
            />
            <img
              src="/images/circleimage.jpg"
              alt="User 2"
              className="w-10 h-10 rounded-full border-2 border-white z-0"
            />
          </div>

          {/* Text beside images */}
          <p className="ml-4 text-sm text-gray-700 font-semibold leading-snug">
            So many people like <br />
            this service
          </p>
        </div>

        {/* Star icons below */}
        <div className="w-full flex justify-center mt-3 space-x-1">
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              src="/images/star.png" // replace with your star image path
              alt="Star"
              className="w-5 h-5"
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-start h-full px-6 md:px-12">
        {/* Left Text Content */}
        <div className="relative z-10 w-full md:w-1/2 pt-12 md:pt-24">
          <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 leading-tight">
            POWERFUL <br /> INNOVATION
          </h1>

          <p className="mt-2 text-xl text-gray-800 font-medium">
            Sleek. Smart. Seamless.
          </p>

          <p className="mt-6 text-gray-700">
            <span className="text-gray-900 font-semibold">
              Our team of experienced
            </span>{" "}
            professionals is dedicated to providing you with personalized
            attention and guidance every step of the way.
          </p>

          <a
            href="/book"
            className="mt-8 inline-block bg-black hover:bg-green-700 text-white px-6 py-3 rounded-md transition"
          >
            Book Now&nbsp;&nbsp;&nbsp;&gt;
          </a>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex flex-col justify-end h-full">
          <div className="flex justify-center">
            <img
              src="/images/nfc-hero.png"
              alt="Hero Visual"
              className="w-[200%] h-[80vh] max-w-none max-h-none object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
