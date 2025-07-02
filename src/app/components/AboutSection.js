import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-start gap-12 ">
        {/* Left Side Image */}
        <div className="w-full md:w-[50%] max-h-[500px] overflow-hidden border-2">
          <Image
            src="/images/about.jpg"
            alt="Main Visual"
            width={600}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right Side Text + Circles */}
        <div className="w-full md:w-[50%] flex flex-col justify-between">
          {/* Main Description */}
          <p className="text-gray-800 text-lg leading-relaxed mb-8">
            <strong>Shiven Infotech</strong>, located in Navi Mumbai, is a
            leading digital solutions provider committed to empowering brands
            and driving real results. We specialize in web development, SEO,
            social media marketing, and mobile app development, offering
            innovative, data-driven strategies that connect businesses with
            their audiences. With a strong focus on transparency, integrity, and
            client satisfaction, our team of expert designers, marketers, and
            tech professionals delivers tailored solutions that elevate digital
            presence. At Shiven Infotech, we foster a culture of collaboration,
            adaptability, and continuous learning—ensuring every project
            reflects our dedication to quality, creativity, and long-term
            success.
          </p>

          {/* Circle Image Row */}
          <div className="flex items-center justify-between w-full">
            {/* Circle 1 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/circle1.jpg"
                alt="Expert Team"
                width={80}
                height={80}
                className="rounded-full border-2 border-black"
              />
              <p className="mt-2 text-sm font-medium text-gray-700">
                Expert Team
                <br />
                Professional staff
              </p>
            </div>

            {/* Circle 2 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/circle2.jpg"
                alt="24/7 Support"
                width={80}
                height={80}
                className="rounded-full border-2 border-black"
              />
              <p className="mt-2 text-sm font-medium text-gray-700">
                24/7 Support
                <br />
                Always available
              </p>
            </div>

            {/* Circle 3 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="/images/circle3.jpg"
                alt="Expert Team"
                width={80}
                height={80}
                className="rounded-full border-2 border-black"
              />
              <p className="mt-2 text-sm font-medium text-gray-700">
                Expert Team
                <br />
                Professional staff
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
