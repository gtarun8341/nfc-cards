"use client";

const Hero = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#EECCCC80]">
      {/* Left Badge with Name */}
      {/* Badge + Review block wrapper */}
      <div className="absolute top-[250px] left-[20rem] z-20 flex flex-col space-y-6">
        {/* Manisha Jadhav Badge */}
        <div className="rounded-lg px-4 py-2 flex mb-10  items-center space-x-3 bg-white shadow-md">
          <img
            src="/images/circleimage.jpg"
            alt="Manisha"
            className="w-12 h-12 rounded-full border-2 border-black"
          />
          <p className="text-md font-semibold text-gray-800">Manisha Jadhav</p>
        </div>

        {/* Review Stars Section */}
        <div className="rounded-lg px-4 py-3 flex flex-col items-start text-left ml-[-10rem]">
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
          <div className="w-full flex justify-start mt-3 space-x-1">
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
      </div>

      <div className="absolute top-[330px] right-[10rem] z-20 flex flex-col items-start space-y-4 max-w-sm text-left">
        <p className="text-sm text-gray-700 leading-snug mb-20">
          Our team of experienced professionals is
          <br />
          dedicated to providing you with personalized
          <br />
          attention and guidance every step of the way.
        </p>
        <div className="mb-15"></div>
        <a
          href="/book"
          className="mr-10 -mt-12 bg-black hover:bg-green-700 text-white px-6 py-3 rounded-md transition z-40 relative"
        >
          Book Now&nbsp;&nbsp;&nbsp;&gt;
        </a>
      </div>

      {/* Main Center Content */}
      <div className="flex flex-col items-center justify-start h-full text-center px-4 pt-12">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Go paperless, go smart
        </h1>

        {/* Paragraph */}
        <p className="text-lg text-gray-700 font-medium max-w-2xl mb-10">
          Create, Share & Impress with Shiven’s PDF Digital Visiting Cards
        </p>

        {/* Center Hero Image */}
        <div className="relative w-full max-w-6xl h-[500px] flex items-center justify-center mt-8">
          <img
            src="/images/heropdf.png"
            alt="Hero PDF"
            className="w-[75%] max-w-4xl object-contain relative z-30"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
