"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../apiConfig/axiosConfig";
import {
  FaEye,
  FaTrashAlt,
  FaExternalLinkAlt,
  FaCheckCircle,
} from "react-icons/fa";

const OnePageBusinessProfilePage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewHtml, setPreviewHtml] = useState({});
  const [selectedTemplateData, setSelectedTemplateData] = useState(null); // Store selected template data
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState([]);
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await api.get(
        `/api/selectedtemplates/template-stats?type=one-page-business-profile`,
        config
      );

      const data = res.data.stats ? res.data.stats[0] : res.data;
      setStats(data);
    } catch (err) {
      console.error("Error fetching template change stats", err);
    }
  };
  //   useEffect(() => {
  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.get(
        `/api/templates/templates?type=one-page-business-profile&page=${page}&limit=9`,
        config
      );
      setTemplates(response.data.templates);
      setTotalPages(response.data.totalPages);
      setPage(response.data.currentPage); // Fetch selected template data for the user
      const selectedTemplatesResponse = await api.get(
        "/api/selectedtemplates/link?type=one-page-business-profile",
        config
      );
      console.log(
        "API Response for Selected Template:",
        selectedTemplatesResponse.data
      );

      setSelectedTemplateData(
        Array.isArray(selectedTemplatesResponse.data.selectedTemplateData) &&
          selectedTemplatesResponse.data.selectedTemplateData.length > 0
          ? selectedTemplatesResponse.data.selectedTemplateData[0]
          : null
      );

      for (const template of response.data.templates) {
        await previewTemplate(template._id);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  //     fetchTemplates();
  //   }, []);
  useEffect(() => {
    fetchTemplates(page);
  }, [page]);
  useEffect(() => {
    fetchStats();
  }, []);
  const previewTemplate = async (templateId) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.get(
        `/api/templates/render/${templateId}?type=one-page-business-profile`,
        config
      );
      setPreviewHtml((prev) => ({ ...prev, [templateId]: response.data }));
    } catch (error) {
      console.error("Error fetching template preview:", error);
    }
  };

  const handleViewTemplate = async (templateId) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.get(
        `/api/templates/render/${templateId}?type=one-page-business-profile`,
        config
      );
      const newWindow = window.open();
      newWindow.document.write(response.data);
      newWindow.document.close();
    } catch (error) {
      console.error("Error fetching template:", error);
    }
  };

  const handleSelectTemplate = async (templateId) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post(
        "/api/selectedtemplates/select?type=one-page-business-profile",
        { templateId },
        config
      );
      setSelectedTemplateData({
        templateId,
        generatedLink: response.data.link,
      });
      await fetchStats();
    } catch (error) {
      console.error("Error selecting template:", error);
    }
  };

  const handleDeleteSelectedTemplate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await api.post(
        "/api/selectedtemplates/delete?type=one-page-business-profile",
        {},
        config
      );
      setSelectedTemplateData(null);
      await fetchStats();
    } catch (error) {
      console.error("Error deleting selected template:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-500 py-4">
        Loading templates...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Available One Page Business Profile Templates
      </h1>
      <div className="mb-6 flex justify-center">
        <div className="bg-white shadow-md rounded-lg px-6 py-4 w-full max-w-xl flex justify-between items-center">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Used</p>
            <p className="text-xl font-semibold text-blue-600">
              {stats.selectedCount}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Limit</p>
            <p className="text-xl font-semibold text-green-600">
              {stats.changeLimit === "unlimited"
                ? "Unlimited"
                : stats.changeLimit}
            </p>
          </div>
          {stats.changeLimit !== "unlimited" && (
            <div className="text-center">
              <p className="text-gray-500 text-sm">Remaining</p>
              <p className="text-xl font-semibold text-orange-500">
                {stats.remaining}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.length > 0 ? (
          templates.map((template) => (
            <div
              key={template._id}
              className="bg-white border p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <iframe
                srcDoc={previewHtml[template._id]}
                title={template.name}
                className="h-40 w-full object-cover mb-4 rounded-md border"
                style={{ border: "none" }}
              />
              <h2 className="font-semibold text-lg text-gray-800">
                {template.name}
              </h2>
              <div className="flex items-center justify-start mt-3 space-x-3">
                <button
                  onClick={() => handleViewTemplate(template._id)}
                  className="bg-white-600 text-blue py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  <FaEye className="text-xl" />
                </button>

                {/* Check if a template is selected */}
                {selectedTemplateData &&
                selectedTemplateData.templateId === template._id ? (
                  <div className="">
                    {/* Only for the selected template, show these buttons */}
                    <button
                      onClick={() =>
                        window.open(
                          selectedTemplateData.generatedLink,
                          "_blank"
                        )
                      }
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                      <FaExternalLinkAlt className="text-xl" />
                    </button>
                    <button
                      onClick={handleDeleteSelectedTemplate}
                      disabled={stats.remaining === 0}
                      className={`ml-2 py-2 px-4 rounded-lg transition duration-200 ${
                        stats.remaining === 0
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                      title={
                        stats.remaining === 0
                          ? "Limit reached. You cannot delete this template now."
                          : "Delete selected template"
                      }
                    >
                      <FaTrashAlt className="text-xl" />
                    </button>
                  </div>
                ) : (
                  // Only show Select Template button if no template is selected
                  !selectedTemplateData && (
                    <button
                      onClick={() => handleSelectTemplate(template._id)}
                      className=" inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                      <FaCheckCircle className="text-xl" />
                    </button>
                  )
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-600">
            No templates found.
          </p>
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

export default OnePageBusinessProfilePage;
