"use client";

import Image from "next/image";
import { useMemo } from "react";

const SuccessStory = ({ heading, description, stories }) => {
  // Sort stories by date descending (newest first)
  const sortedStories = useMemo(() => {
    return [...stories].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [stories]);

  return (
    <section className="w-full bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {heading}
        </h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Newest story on the left */}
        {sortedStories.length > 0 && (
          <div className="lg:w-3/5 w-full relative rounded-lg overflow-hidden shadow-md">
            <Image
              src={sortedStories[0].image}
              alt={sortedStories[0].title}
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-sm font-semibold rounded-full shadow-md">
              {new Date(sortedStories[0].date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold text-gray-800">
                {sortedStories[0].title}
              </h3>
              <p className="text-gray-600 mt-1">
                {sortedStories[0].description}
              </p>
            </div>
          </div>
        )}

        {/* Remaining stories on the right */}
        <div className="lg:w-2/5 w-full flex flex-col gap-6">
          {sortedStories.slice(1).map((story, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-md"
            >
              <Image
                src={story.image}
                alt={story.title}
                width={800}
                height={300}
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-sm font-semibold rounded-full shadow-md">
                {new Date(story.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold text-gray-800">
                  {story.title}
                </h3>
                <p className="text-gray-600 mt-1">{story.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStory;
