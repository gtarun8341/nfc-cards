"use client";
import { useState } from "react";
import api from "../../apiConfig/axiosConfig"; // Adjust path as needed
import toast from "react-hot-toast";

const TemplateManagement = () => {
  const [files, setFiles] = useState([]);
  const [templateNames, setTemplateNames] = useState([]);
  const [templateType, setTemplateType] = useState("nfc");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Auto-fill names initially from file names
    setTemplateNames(selectedFiles.map((file) => file.name.split(".")[0]));
  };

  const handleNameChange = (index, value) => {
    const newNames = [...templateNames];
    newNames[index] = value;
    setTemplateNames(newNames);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    formData.append("type", templateType);

    files.forEach((file, index) => {
      formData.append("files", file);
      formData.append("names", templateNames[index] || file.name.split(".")[0]);
    });

    const toastId = toast.loading("Uploading templates...");
    setUploading(true);

    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post(
        "/api/templates/upload",
        formData,
        config
      );

      toast.success(response.data.message || "Templates uploaded!", {
        id: toastId,
      });

      // Reset form
      setFiles([]);
      setTemplateNames([]);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading templates.", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Upload Templates</h2>
      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Template Type
          </label>
          <select
            value={templateType}
            onChange={(e) => setTemplateType(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="nfc">NFC Card</option>
            <option value="pdf">PDF Card</option>
            <option value="mini-website">Mini Website</option>
            <option value="one-page-business-profile">
              One Page Business Profile
            </option>
            <option value="physical-visiting-card">
              Physical Visiting Card
            </option>
            <option value="business-essentials">Business Essentials</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Files
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.png,.html"
            multiple
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-md font-medium text-gray-800">
              Template Names
            </h4>
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-sm w-1/3 truncate">{file.name}</span>
                <input
                  type="text"
                  placeholder="Template Name"
                  value={templateNames[index] || ""}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  className="w-2/3 p-2 border rounded-md"
                  required
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className={`px-4 py-2 rounded-md text-white transition ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default TemplateManagement;
