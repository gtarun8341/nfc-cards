"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../apiConfig/axiosConfig";

// You must know the user's _id or get it from your auth/user context for constructing image URLs.
const GALLERY_BASE = `${api.defaults.baseURL}/uploads/gallery`;

const MAX_IMAGES = 10;
const MAX_IMAGE_SIZE_MB = 5;

const GalleryImagesForm = ({ onSubmit }) => {
  const [galleryImages, setGalleryImages] = useState([]); // Array: {name, url, fileObj, fromServer}
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(""); // To build URL for previously uploaded images

  // Fetch existing gallery images on mount
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await api.get("/api/gallery-images", config);
        console.log("Fetched gallery images:", res.data);
        if (res.data && res.data.images && res.data.userId) {
          setUserId(res.data.userId);
          // Existing images from the backend
          setGalleryImages(
            res.data.images.map((img) => ({
              name: img,
              url: `${GALLERY_BASE}/${res.data.userId}/${img}`,
              fromServer: true,
            }))
          );
        } else {
          setGalleryImages([]);
        }
      } catch (error) {
        if (!(error.response && error.response.status === 404)) {
          toast.error("Failed to load gallery images.");
        }
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryImages();
  }, []);

  // Add new files handler
  const handleChange = (e) => {
    const newFiles = Array.from(e.target.files);

    if (galleryImages.length + newFiles.length > MAX_IMAGES) {
      toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    const validFiles = [];
    newFiles.forEach((file) => {
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > MAX_IMAGE_SIZE_MB) {
        toast.error(`"${file.name}" exceeds 5MB limit.`);
      } else {
        validFiles.push({
          name: file.name,
          url: URL.createObjectURL(file),
          fileObj: file,
          fromServer: false,
        });
      }
    });

    setGalleryImages([...galleryImages, ...validFiles]);
  };

  // Remove any image (from preview only; actual deletion from server would require separate API)
  const removeImage = (index) => {
    setGalleryImages((imgs) => imgs.filter((_, i) => i !== index));
  };

  // Submit: require at least one image, send new images, preserve old server images
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!galleryImages.length) {
      toast.error("Please upload at least one image.");
      return;
    }

    // Separate new files from existing
    const newImages = galleryImages.filter((img) => !img.fromServer);
    const existingImages = galleryImages.filter((img) => img.fromServer);

    const formData = new FormData();
    newImages.forEach((img) => formData.append("galleryImages", img.fileObj));

    setLoading(true);
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      let res;
      if (!existingImages.length) {
        // First-time submission (add)
        if (!newImages.length) {
          toast.error("Please upload at least one image.");
          setLoading(false);
          return;
        }
        res = await api.post("/api/gallery-images", formData, config);
        toast.success("Gallery images added successfully!");
      } else {
        // Update (may include old + new images)
        // Send both new files and "keep" info for backend to reconcile
        formData.append(
          "existingImages",
          JSON.stringify(existingImages.map((img) => img.name))
        );
        res = await api.put("/api/gallery-images", formData, config);
        toast.success("Gallery images updated successfully!");
      }
      if (onSubmit) onSubmit(res.data);
    } catch (error) {
      toast.error("Failed to save gallery images.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading gallery...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto p-4">
      <div className="border rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Gallery Images (Max 10, Each ≤ 5MB)
        </label>
        <input
          type="file"
          name="galleryImages"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="mb-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />

        {/* Preview images */}
        {galleryImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="relative border rounded p-2">
                <img
                  src={img.url}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                {img.fileObj && (
                  <p className="text-xs mt-1 text-gray-600 text-center">
                    {(img.fileObj.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                )}
                {/* Show remove button only if image is NOT from server */}
                {!img.fromServer && (
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full hover:bg-red-600"
                    title="Remove"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default GalleryImagesForm;
