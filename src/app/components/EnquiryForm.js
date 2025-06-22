"use client";

import React from "react";

const EnquiryForm = ({
  imageSrc = "/images/enquiry.png", // Update path if needed
}) => {
  return (
    <div className="mt-16 bg-[#EECCCC33] py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left: Form */}
        <div className="w-full md:w-1/2">
          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Service Required */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Service Required
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="nfc">NFC Card</option>
                <option value="website">Website Development</option>
                <option value="branding">Branding</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#EECCCC] text-black py-3 px-6 rounded-md hover:bg-green-600 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex items-end justify-center h-full">
          <img
            src={imageSrc}
            alt="Enquiry Visual"
            className="h-[80%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
