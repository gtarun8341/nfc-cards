"use client";

import { useEffect, useState } from "react";

const MAX_IMAGES = 10;
const MAX_IMAGE_SIZE_MB = 5;

const GalleryImagesForm = ({ onDataChange, initialData }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (initialData?.galleryImages?.length) {
      setGalleryImages(initialData.galleryImages);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const validFiles = [];
    const newErrors = [];

    // Limit number of images
    if (newFiles.length + galleryImages.length > MAX_IMAGES) {
      alert(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    newFiles.forEach((file) => {
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > MAX_IMAGE_SIZE_MB) {
        newErrors.push(`"${file.name}" exceeds 5MB limit.`);
      } else {
        validFiles.push(file);
      }
    });

    const updatedImages = [...galleryImages, ...validFiles];
    setGalleryImages(updatedImages);
    setErrors(newErrors);
    onDataChange({ galleryImages: updatedImages });
  };

  const removeImage = (index) => {
    const updated = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updated);
    onDataChange({ galleryImages: updated });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Gallery Images
      </h2>

      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
          <ul className="list-disc list-inside text-sm">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="border p-6 rounded-xl shadow-sm hover:shadow-lg transition-transform duration-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Gallery Images (Max 10, Each ≤ 5MB)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="mb-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />

        {galleryImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((file, index) => {
              const objectURL =
                typeof file === "string" ? file : URL.createObjectURL(file);
              const sizeMB = (file.size / (1024 * 1024)).toFixed(2);

              return (
                <div key={index} className="relative border rounded p-2">
                  <img
                    src={objectURL}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <p className="text-xs mt-1 text-gray-600 text-center">
                    {sizeMB} MB
                  </p>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full hover:bg-red-600"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryImagesForm;
