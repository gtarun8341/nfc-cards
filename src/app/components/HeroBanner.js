// src/components/HeroBanner.js
"use client";
import React from "react";
import { playfair } from "../../lib/fonts"; // assuming font is exported from /lib/fonts

const HeroBanner = ({
  text,
  backgroundImage = "/images/trackyoourorder.jpg",
}) => {
  return (
    <div
      className="w-full  h-[150px] bg-cover bg-center bg-no-repeat rounded-md overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="h-full flex flex-col justify-center items-center px-4 bg-black/30">
        <h1
          className={`${playfair.className} text-2xl md:text-3xl font-bold text-white drop-shadow-lg text-center`}
        >
          {text}
        </h1>
      </div>
    </div>
  );
};

export default HeroBanner;
