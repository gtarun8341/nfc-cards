"use client";

const Hero = () => {
  return (
    <div
      className="w-full h-screen relative overflow-hidden"
      style={{ backgroundColor: "#EECCCC80" }}
    >
      {/* Content Container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between h-full px-6 md:px-12">
        {/* Left Text Content */}
        <div className="relative z-10 w-full md:w-1/2 pt-12 md:pt-24 pr-10">
          <h1 className="text-6xl md:text-6xl font-extrabold text-gray-900 whitespace-nowrap">
            Make Your First Impression Last
          </h1>

          <p className="mt-2 text-xl text-gray-800 font-medium">
            Premium Custom Visiting Cards for You
          </p>

          <p className="mt-6 text-gray-700">
            Your visiting card is more than contact info — it’s a bold
            reflection of your brand. With premium design and print, it leaves a
            lasting impression and builds instant connections. Let your card
            speak before you do.
          </p>

          <a
            href="/book"
            className="mt-8 inline-block bg-black hover:bg-green-700 text-white px-6 py-3 rounded-md transition"
          >
            Book Now&nbsp;&nbsp;&nbsp;&gt;
          </a>
        </div>
      </div>
      <div className="absolute z-0" style={{ bottom: "-130px", left: 0 }}>
        <img
          src="/images/pvcdot.png"
          alt="Decorative Dots"
          className="w-[300px] h-[300px] object-contain rotate-[29deg]"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-end gap-4 pr-4">
        {/* Floating badge with top space */}
        <div className="rounded-lg mt-20 px-4 py-3 flex flex-col items-start  bg-opacity-70 ">
          <div className="flex items-center">
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
            <p className="ml-4 text-sm text-gray-700 font-semibold leading-snug">
              So many people like <br />
              this service
            </p>
          </div>
          <div className="w-full flex justify-center mt-3 space-x-1">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src="/images/star.png"
                alt="Star"
                className="w-5 h-5"
              />
            ))}
          </div>
        </div>

        {/* PVC Hero Image flush to bottom */}
        <img
          src="/images/pvc-hero.png"
          alt="Hero Visual"
          className="w-[30vw] max-w-[500px] h-full object-contain self-end"
        />
      </div>
    </div>
  );
};

export default Hero;
