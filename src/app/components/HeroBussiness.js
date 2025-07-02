"use client";

const Hero = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#EECCCC80]">
      {/* Floating Left Badge */}
      <div className="absolute top-[110px] left-[10rem] rounded-lg px-4 py-3 flex flex-col items-start z-20 ">
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

      {/* Book Button - Right Side */}
      <div className="absolute top-[180px] right-[10rem] z-20">
        <a
          href="/book"
          className="bg-black hover:bg-green-700 text-white px-6 py-3 rounded-md transition"
        >
          Book Now&nbsp;&nbsp;&nbsp;&gt;
        </a>
      </div>

      {/* Main Center Content */}
      <div className="flex flex-col items-center justify-start h-full text-center px-4 pt-12">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Smart Solutions. Real Results.
        </h1>

        {/* Paragraph */}
        <p className="text-lg text-gray-700 font-medium max-w-2xl mb-10">
          Digital services built to grow your business.
        </p>

        {/* Fan Image Layout */}
        <div className="relative w-full max-w-6xl h-[400px] flex items-end justify-center mt-8">
          {/* Leftmost -36° */}
          <img
            src="/images/left2.png"
            alt="Left 2"
            className="absolute bottom-0 left-[30%] w-36 md:w-60 transform -rotate-[50deg] origin-bottom z-10"
          />

          {/* Left -20° */}
          <img
            src="/images/left1.png"
            alt="Left 1"
            className="absolute bottom-0 left-[30%] w-40 md:w-64 transform -rotate-[20deg] origin-bottom z-20"
          />

          {/* Center 0° */}
          <img
            src="/images/center.png"
            alt="Center"
            className=" w-44 md:w-[19rem] h-auto object-contain relative z-30"
          />

          {/* Right +20° */}
          <img
            src="/images/right1.png"
            alt="Right 1"
            className="absolute bottom-0 right-[30%] w-40 md:w-64 transform rotate-[20deg] origin-bottom z-20"
          />

          {/* Rightmost +36° */}
          <img
            src="/images/right2.png"
            alt="Right 2"
            className="absolute bottom-0 right-[30%] w-36 md:w-60 transform rotate-[50deg] origin-bottom z-10"
          />
        </div>

        {/* Extra space below images */}
        {/* <div className="h-10 md:h-20"></div> */}
      </div>
    </div>
  );
};

export default Hero;
