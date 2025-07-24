"use client";

import { useState, useEffect } from "react";
import ReactQRCode from "react-qr-code";
import { toPng } from "html-to-image";
import api from "../../apiConfig/axiosConfig";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination"; // Adjust path based on your folder structure

const QRCodePage = () => {
  const [link, setLink] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [userTemplates, setUserTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUserTemplates = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const encodedSearch = encodeURIComponent(searchTerm);
      const response = await api.get(
        `/api/selectedtemplates/qr?page=${page}&limit=10&search=${encodedSearch}`,
        config
      );
      setUserTemplates(response.data.selectedTemplateData);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching selected templates:", error);
      toast.error("Failed to fetch templates");
    }
  };

  // ✅ Debounced fetch for search and pagination
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUserTemplates();
    }, 500); // Debounce time

    return () => clearTimeout(delay);
  }, [page, searchTerm]);

  const handleGenerate = (templateLink, index) => {
    setLink(templateLink);
    setShowQRCode(index);
  };

  const handleDownload = async (index) => {
    const qrCodeElement = document.getElementById(`qr-code-${index}`);
    if (!qrCodeElement) return;

    try {
      const dataUrl = await toPng(qrCodeElement);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `qr-code-${index}.png`;
      link.click();
      toast.success("Successfully downloaded QR code");
    } catch (error) {
      console.error("Error downloading QR code:", error);
      toast.error("Failed to download QR code");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">
        Generate QR Code
      </h2>

      {/* Search bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name, email, phone, template ID, or template name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full"
        />
      </div>

      {userTemplates.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse mb-6">
            {" "}
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Template ID</th>
                <th className="px-4 py-2 border">Template Name</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userTemplates.map((template, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    {template.userDetails.name}
                  </td>
                  <td className="px-4 py-2 border">
                    {template.userDetails.email}
                  </td>
                  <td className="px-4 py-2 border">
                    {template.userDetails.phone}
                  </td>
                  <td className="px-4 py-2 border">{template.templateId}</td>
                  <td className="px-4 py-2 border">
                    {template.templateName || "Unknown"}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {showQRCode === index ? (
                      <div className="flex flex-col items-center max-w-[270px] mx-auto">
                        <div id={`qr-code-${index}`} className="overflow-auto">
                          <ReactQRCode
                            value={template.generatedLink}
                            size={200}
                          />
                        </div>
                        <button
                          onClick={() => handleDownload(index)}
                          className="mt-2 bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition w-full"
                        >
                          Download QR Code
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          handleGenerate(template.generatedLink, index)
                        }
                        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition w-full"
                      >
                        Generate QR Code
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No templates available</p>
      )}

      {/* Pagination */}
      {userTemplates.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      )}
    </div>
  );
};

export default QRCodePage;
