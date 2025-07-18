"use client"; // Next.js Client Component

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const SocialMediaForm = ({ onDataChange, initialData }) => {
  const [data, setData] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtubeChannel: "",
    googleBusiness: "",
    otherProfile: "",
    youtubeVideos: [""], // Start with one input field
  });

  useEffect(() => {
    if (initialData) {
      setData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    onDataChange({ [name]: value });
  };

  const addYoutubeVideo = () => {
    setData((prevData) => ({
      ...prevData,
      youtubeVideos: [...prevData.youtubeVideos, ""],
    }));
  };

  const handleYoutubeVideoChange = (index, value) => {
    const newVideos = [...data.youtubeVideos];
    newVideos[index] = value;
    setData((prevData) => ({ ...prevData, youtubeVideos: newVideos }));
    onDataChange({ youtubeVideos: newVideos });
  };

  const deleteYoutubeVideo = (index) => {
    if (index === 0) return;
    const newVideos = data.youtubeVideos.filter((_, i) => i !== index);
    setData((prevData) => ({ ...prevData, youtubeVideos: newVideos }));
    onDataChange({ youtubeVideos: newVideos });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Social Media Links
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Facebook Profile", name: "facebook" },
          { label: "Instagram Profile", name: "instagram" },
          { label: "LinkedIn Profile", name: "linkedin" },
          { label: "Twitter Profile", name: "twitter" },
          { label: "YouTube Channel", name: "youtubeChannel" },
          { label: "Google Business Profile", name: "googleBusiness" },
          { label: "Other Profile", name: "otherProfile" },
        ].map(({ label, name }) => (
          <div key={name} className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type="url"
              name={name}
              placeholder={`Enter ${label}`}
              value={data[name]}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
        ))}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            YouTube Video Links
          </label>
          {data.youtubeVideos.map((videoLink, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="url"
                placeholder="Enter YouTube Video Link"
                value={videoLink}
                onChange={(e) =>
                  handleYoutubeVideoChange(index, e.target.value)
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => deleteYoutubeVideo(index)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addYoutubeVideo}
            className="mt-2 text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md"
          >
            Add Another YouTube Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaForm;
