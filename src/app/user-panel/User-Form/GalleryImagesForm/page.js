"use client"; // Next.js Client Component

import { useEffect, useState } from "react";

const GalleryImagesForm = ({ onDataChange,initialData }) => {
  const [galleryImages, setGalleryImages] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Selected files:", files); // Log selected files

    // Limit the number of images to a maximum of 10
    if (files.length + galleryImages.length > 10) {
      alert("You can only upload a maximum of 10 images.");
      return;
    }

    // Update state
    setGalleryImages((prevImages) => {
      const updatedImages = [...prevImages, ...files];
      console.log("Updated gallery images state:", updatedImages); // Log updated images state
      return updatedImages; // Only update local state here
    });

    // Call onDataChange after the state update
    onDataChange({ galleryImages: [...galleryImages, ...files] }); // Update parent state
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Gallery Images</h2>
      <div className="grid grid-cols-1 gap-6">
        <div className="border p-6 rounded-xl shadow-sm hover:shadow-lg transition-transform duration-200">
          <label className="block text-sm font-medium text-gray-700">
            Upload Gallery Images (Max 10)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryImagesForm;
