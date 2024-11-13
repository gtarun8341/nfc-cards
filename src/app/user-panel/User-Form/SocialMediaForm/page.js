"use client"; // Next.js Client Component

import { useEffect, useState } from "react";

const SocialMediaForm = ({ onDataChange,initialData }) => {
  const [data, setData] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtubeChannel: "",
    googleBusiness: "",
    otherProfile: "",
    youtubeVideos: [""] // Start with one input field
  });

    // Effect to set initial data
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
      youtubeVideos: [...prevData.youtubeVideos, ""] // Add a new empty string for the new link
    }));
  };

  const handleYoutubeVideoChange = (index, value) => {
    const newVideos = [...data.youtubeVideos];
    newVideos[index] = value; // Update the specific index
    setData((prevData) => ({ ...prevData, youtubeVideos: newVideos }));
    onDataChange({ youtubeVideos: newVideos });
  };

  const deleteYoutubeVideo = (index) => {
    if (index === 0) return; // Prevent deletion of the first input
    const newVideos = data.youtubeVideos.filter((_, i) => i !== index); // Remove the video at the specified index
    setData((prevData) => ({ ...prevData, youtubeVideos: newVideos }));
    onDataChange({ youtubeVideos: newVideos });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData((prevData) => ({ ...prevData, video: file }));
    onDataChange({ video: file });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-semibold text-center mb-4">Social Media Links</h2>
      <div className="overflow-y-auto"> {/* Scrollable area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Two columns on medium screens and above */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Facebook Profile Link</label>
            <input
              type="url"
              name="facebook"
              placeholder="https://facebook.com/yourprofile"
              value={data.facebook}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Instagram Profile Link</label>
            <input
              type="url"
              name="instagram"
              placeholder="https://instagram.com/yourprofile"
              value={data.instagram}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn Profile Link</label>
            <input
              type="url"
              name="linkedin"
              placeholder="https://linkedin.com/in/yourprofile"
              value={data.linkedin}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Twitter Profile Link</label>
            <input
              type="url"
              name="twitter"
              placeholder="https://twitter.com/yourprofile"
              value={data.twitter}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">YouTube Channel Link</label>
            <input
              type="url"
              name="youtubeChannel"
              placeholder="https://youtube.com/c/yourchannel"
              value={data.youtubeChannel}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Google Business Profile Link</label>
            <input
              type="url"
              name="googleBusiness"
              placeholder="https://google.com/business/yourprofile"
              value={data.googleBusiness}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Other Profile Link</label>
            <input
              type="url"
              name="otherProfile"
              placeholder="https://example.com/yourprofile"
              value={data.otherProfile}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">YouTube Video Links</label>
            {data.youtubeVideos.map((videoLink, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="url"
                  placeholder="https://youtube.com/watch?v=yourvideo"
                  value={videoLink}
                  onChange={(e) => handleYoutubeVideoChange(index, e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 flex-grow"
                />
                {/* Show delete button only for links other than the first one */}
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
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaForm;
