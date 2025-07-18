"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig";
import toast from "react-hot-toast";

const GenerateLinkPage = () => {
  const [link, setLink] = useState("");
  const [userTemplates, setUserTemplates] = useState([]); // To store fetched templates
  const [isLinkVisible, setIsLinkVisible] = useState(false); // To toggle link visibility
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Fetching user's selected templates with links and user details
  // useEffect(() => {
  const fetchUserTemplates = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken"); // Get the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
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

  //   fetchUserTemplates();
  // }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUserTemplates();
    }, 500); // Debounce time

    return () => clearTimeout(delay);
  }, [page, searchTerm]);

  const handleLinkDisplay = (templateLink, index) => {
    // Toggle visibility of the link when button is clicked
    if (link === templateLink) {
      setIsLinkVisible(!isLinkVisible); // Toggle visibility
    } else {
      setLink(templateLink);
      setIsLinkVisible(true); // Show link if it's a new link
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">
        Generate Link for Customer
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

      {/* Display the user's templates in a table format */}
      {userTemplates.length > 0 ? (
        <table className="min-w-full table-auto border-collapse mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Template ID</th>
              <th className="px-4 py-2 border">Template Name</th>{" "}
              {/* New Column */}
              <th className="px-4 py-2 border">Generated Link</th>
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
                </td>{" "}
                {/* Template Name */}
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() =>
                      handleLinkDisplay(template.generatedLink, index)
                    }
                    className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
                  >
                    {link === template.generatedLink && isLinkVisible
                      ? "Hide Link"
                      : "Show Link"}
                  </button>

                  {link === template.generatedLink && isLinkVisible && (
                    <div className="mt-2 text-blue-600">
                      {template.generatedLink}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No templates available</p>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateLinkPage;
