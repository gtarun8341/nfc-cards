"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../apiConfig/axiosConfig";

const AboutCompanyForm = ({ onSubmit }) => {
  const [fileInfos, setFileInfos] = useState([]);
  const [loading, setLoading] = useState(true); // To wait for API data

  const [data, setData] = useState({
    _id: null, // track if editing existing
    establishedYear: "",
    natureOfBusiness: "",
    gstNumber: "",
    description: "",
    termsAndConditions: "",
    messages: "",
    documents: [], // array of File objects for new uploads
  });

  // Load initial data from API
  useEffect(() => {
    const fetchAboutCompany = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await api.get("/api/about-company", config);

        if (res.data) {
          setData({
            ...res.data,
            _id: res.data._id || null,
            documents: [], // files start empty; existing docs managed on backend
          });
          setFileInfos(
            res.data.documents?.map((fileName) => ({
              name: fileName,
              sizeMB: "N/A (already uploaded)",
            })) || []
          );
        } else {
          setData((prev) => ({ ...prev, _id: null }));
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setData((prev) => ({ ...prev, _id: null }));
        } else {
          toast.error("Failed to fetch About Company details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAboutCompany();
  }, []);

  // Handle field changes & file selections, with validation
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "documents") {
      const maxFiles = 10;
      const maxSize = 1 * 1024 * 1024; // 1 MB
      const selectedFiles = Array.from(files);

      if (selectedFiles.length > maxFiles) {
        toast.error("You can upload a maximum of 10 documents.");
        return;
      }

      const validFiles = [];
      const rejectedFiles = [];

      selectedFiles.forEach((file) => {
        if (file.size <= maxSize) {
          validFiles.push(file);
        } else {
          rejectedFiles.push(file.name);
        }
      });

      if (rejectedFiles.length > 0) {
        toast.error(
          `These files exceed 1 MB and were not uploaded: ${rejectedFiles.join(
            ", "
          )}`
        );
      }

      const fileInfoList = validFiles.map((file) => ({
        name: file.name,
        sizeMB: (file.size / (1024 * 1024)).toFixed(2),
      }));

      setFileInfos(fileInfoList);
      setData((prev) => ({ ...prev, documents: validFiles }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler enforcing required fields on add, allowing partial on update
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add mode - validate required fields strictly
    if (!data._id) {
      const requiredFields = [
        "establishedYear",
        "natureOfBusiness",
        "description",
        "termsAndConditions",
        "messages",
      ];
      for (const field of requiredFields) {
        if (!data[field]) {
          toast.error(`Please fill in ${field}`);
          return;
        }
      }
      if (
        fileInfos.length === 0 &&
        (!data.documents || data.documents.length === 0)
      ) {
        toast.error("Please upload at least one document.");
        return;
      }
    }

    // Prepare FormData with present fields and file uploads
    const formData = new FormData();

    [
      "establishedYear",
      "natureOfBusiness",
      "gstNumber",
      "description",
      "termsAndConditions",
      "messages",
    ].forEach((key) => {
      if (data[key]) formData.append(key, data[key]);
    });

    if (data.documents && data.documents.length > 0) {
      data.documents.forEach((file) => {
        formData.append("documents", file);
      });
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (data._id) {
        // Update existing
        await api.put("/api/about-company", formData, config);
        toast.success("About Company details updated successfully!");
      } else {
        // Add new
        await api.post("/api/about-company", formData, config);
        toast.success("About Company details added successfully!");
      }

      if (onSubmit) onSubmit(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save About Company details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center p-4">Loading About Company details...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Text inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Established Year
          </label>
          <input
            type="text"
            name="establishedYear"
            placeholder="Established Year"
            value={data.establishedYear}
            onChange={handleChange}
            required={!data._id}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nature of Business
          </label>
          <input
            type="text"
            name="natureOfBusiness"
            placeholder="Nature of Business"
            value={data.natureOfBusiness}
            onChange={handleChange}
            required={!data._id}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            GST Number
          </label>
          <input
            type="text"
            name="gstNumber"
            placeholder="GST Number"
            value={data.gstNumber || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Textareas */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            About Company
          </label>
          <textarea
            name="description"
            placeholder="Description"
            value={data.description}
            onChange={handleChange}
            required={!data._id}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Terms and Conditions
          </label>
          <textarea
            name="termsAndConditions"
            placeholder="Enter Terms and Conditions"
            value={data.termsAndConditions}
            onChange={handleChange}
            required={!data._id}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Messages
          </label>
          <textarea
            name="messages"
            placeholder="Enter Messages"
            value={data.messages}
            onChange={handleChange}
            required={!data._id}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* File upload */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Documents (Max 10, Max size 1MB each)
          </label>
          <input
            type="file"
            name="documents"
            accept=".pdf,.doc,.docx,.jpg,.png"
            multiple
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {fileInfos.length > 0 && (
            <div className="mt-2">
              <h3 className="text-sm font-medium text-gray-700">
                Selected Documents:
              </h3>
              <ul className="mt-2 list-disc pl-5 text-gray-600">
                {fileInfos.map((file, index) => (
                  <li key={index}>
                    {file.name} – {file.sizeMB} MB
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Submit button */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-colors"
        >
          {loading ? "Saving..." : data._id ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AboutCompanyForm;
