"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for app directory
import api from "../../../apiConfig/axiosConfig"; // Import the Axios instance
import toast from "react-hot-toast";

const AdminNFCCardsPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewHtml, setPreviewHtml] = useState({}); // Store rendered HTML for the iframe
  const router = useRouter(); // Initialize useRouter
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Fetch NFC card templates on component mount
  // useEffect(() => {
  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken"); // Retrieve the JWT token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
        },
      };
      // Fetch NFC card templates
      const response = await api.get(
        `/api/templates/admin/templates?type=nfc&page=${page}&limit=9`,
        config
      );

      setTemplates(response.data.templates);
      setTotalPages(response.data.totalPages);
      setPage(response.data.currentPage); // Optional: keep in sync

      // Load preview HTML for each
      await Promise.all(
        response.data.templates.map((template) => previewTemplate(template._id))
      );
      // // Automatically preview each template
      // for (const template of response.data.templates) {
      //   await previewTemplate(template._id);
      // }
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error("Failed to fetch templates");
    } finally {
      setLoading(false);
    }
  };

  //   fetchTemplates();
  // }, []);
  useEffect(() => {
    fetchTemplates();
  }, [page]);

  const previewTemplate = async (templateId) => {
    try {
      const token = localStorage.getItem("adminAuthToken"); // Retrieve the JWT token again
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Fetch the rendered template HTML for the iframe preview
      const response = await api.get(
        `/api/templates/admin/render/${templateId}?type=nfc`,
        config
      );
      setPreviewHtml((prev) => ({ ...prev, [templateId]: response.data })); // Set the rendered HTML to state
    } catch (error) {
      console.error("Error fetching template preview:", error);
      toast.error("Preview fetch failed for a template");
    }
  };

  // Handle template deletion
  const handleDeleteTemplate = async (templateId, usageCount) => {
    try {
      if (
        usageCount > 0 &&
        !window.confirm(
          `This template is currently used by ${usageCount} user${
            usageCount === 1 ? "" : "s"
          }. Deleting it may affect their mini websites. Are you sure you want to delete it?`
        )
      ) {
        return; // User cancelled deletion
      }
      const token = localStorage.getItem("adminAuthToken"); // Retrieve the JWT token again
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send a delete request to the API
      await api.delete(`/api/templates/${templateId}?type=nfc`, config);

      toast.success("Template deleted successfully");
      fetchTemplates(); // Fetch fresh list to get consistent pagination
    } catch (error) {
      console.error("Error deleting template:", error);
      toast.error("Failed to delete template");
    }
  };

  const handleViewTemplate = async (templateId) => {
    try {
      const token = localStorage.getItem("adminAuthToken"); // Retrieve the JWT token again
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Fetch the rendered template HTML for the new window
      const response = await api.get(
        `/api/templates/admin/render/${templateId}?type=nfc`,
        config
      );
      // Open a new window with the full template
      const newWindow = window.open();
      newWindow.document.write(response.data);
      newWindow.document.close();
    } catch (error) {
      console.error("Error fetching template:", error);
      toast.error("Failed to load template in new window");
    }
  };

  if (loading) {
    return <div>Loading templates...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Admin - Manage NFC Card Templates
      </h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sort by Usage: {sortOrder === "asc" ? "Low to High" : "High to Low"}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {templates.length > 0 ? (
          [...templates]
            .sort((a, b) =>
              sortOrder === "asc"
                ? (a.usageCount || 0) - (b.usageCount || 0)
                : (b.usageCount || 0) - (a.usageCount || 0)
            )
            .map((template) => (
              <div key={template._id} className="border p-4 rounded shadow-lg">
                {/* Template Preview */}
                <iframe
                  srcDoc={previewHtml[template._id]} // Use the specific preview for the template
                  title={template.name}
                  className="h-32 w-full object-cover mb-2"
                  style={{ border: "none" }} // Style the iframe for a clean look
                />
                {/* Template Info */}
                <h2 className="font-semibold text-lg">{template.name}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Used by {template.usageCount || 0} user
                  {template.usageCount === 1 ? "" : "s"}
                </p>{" "}
                <div className="flex justify-between mt-2">
                  {/* Button to view the full template in a new window */}
                  <button
                    onClick={() => handleViewTemplate(template._id)} // Open full template in new window
                    className="text-blue-500 hover:underline inline-block"
                  >
                    View Template
                  </button>

                  {/* Button to delete the template */}
                  <button
                    onClick={() =>
                      handleDeleteTemplate(
                        template._id,
                        template.usageCount || 0
                      )
                    } // Delete template
                    className="text-red-500 hover:underline inline-block"
                  >
                    Delete Template
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p>No templates found.</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminNFCCardsPage;
