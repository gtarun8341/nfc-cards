"use client";

import React, { useState } from "react";
import Image from "next/image";
import api from "../apiConfig/axiosConfig";

const EnquiryForm = ({
  imageSrc = "/images/enquiry.png", // Update path if needed
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/contactUs-form/contactUs", formData);
      alert("Enquiry submitted!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting enquiry:", err);
    }
  };
  return (
    <div className="mt-16 bg-[#EECCCC33] py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left: Form */}
        <div className="w-full md:w-1/2">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
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
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Write your message"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
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
          <Image
            src={imageSrc}
            alt="Enquiry Visual"
            width={500} // or an appropriate width
            height={300} // or an appropriate height
            className="h-[80%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;
