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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-semibold text-center mb-4">Gallery Images</h2>
      <div className="overflow-y-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
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
    </div>
  );
};

export default GalleryImagesForm;
