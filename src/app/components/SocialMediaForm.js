"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../apiConfig/axiosConfig";

const SocialMediaForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtubeChannel: "",
    googleBusiness: "",
    otherProfile: "",
    youtubeVideos: [""],
  });

  // Fetch existing social media data
  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await api.get("/api/social-media", config);
        if (res.data) {
          setData({
            ...res.data,
            _id: res.data._id || null, // track existence for update mode
            youtubeVideos: res.data.youtubeVideos?.length
              ? res.data.youtubeVideos
              : [""],
          });
        } else {
          setData((prev) => ({ ...prev, _id: null }));
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setData((prev) => ({ ...prev, _id: null }));
        } else {
          toast.error("Failed to fetch social media data");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSocialMedia();
  }, []);

  // Handle simple input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // YouTube videos handlers
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
  };

  const deleteYoutubeVideo = (index) => {
    if (index === 0) return; // prevent deleting the first
    const newVideos = data.youtubeVideos.filter((_, i) => i !== index);
    setData((prevData) => ({ ...prevData, youtubeVideos: newVideos }));
  };

  // Submit handler for add and update
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Require all social profile fields to be filled (no empty fields)
    const socialFields = [
      "facebook",
      "instagram",
      "linkedin",
      "twitter",
      "youtubeChannel",
      "googleBusiness",
      "otherProfile",
    ];

    // Check that every social profile field is non-empty
    const allSocialFilled = socialFields.every(
      (field) => data[field] && data[field].trim() !== ""
    );

    // Check that all YouTube video links are filled (non-empty)
    const allYoutubeVideosFilled =
      data.youtubeVideos.length > 0 &&
      data.youtubeVideos.every((v) => v.trim() !== "");

    if (!allSocialFilled || !allYoutubeVideosFilled) {
      toast.error(
        "Please fill in all social media profiles and YouTube video links."
      );
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // PUT for update if _id exists, otherwise POST to add
      if (data._id) {
        await api.put("/api/social-media", data, config);
        toast.success("Social media updated successfully!");
      } else {
        await api.post("/api/social-media", data, config);
        toast.success("Social media added successfully!");
      }

      if (onSubmit) onSubmit(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save social media data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center p-4">Loading social media data...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-4">
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
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        {/* YouTube Videos */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => deleteYoutubeVideo(index)}
                  className="ml-2 text-red-600 hover:text-red-800 text-sm"
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
            + Add Another YouTube Link
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : data._id ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default SocialMediaForm;
