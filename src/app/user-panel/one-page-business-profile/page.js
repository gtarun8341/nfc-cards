"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../apiConfig/axiosConfig";
import { FaEye, FaTrashAlt, FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa";

const OnePageBusinessProfilePage = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previewHtml, setPreviewHtml] = useState({});
    const [selectedTemplateData, setSelectedTemplateData] = useState(null); // Store selected template data
    const router = useRouter();

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await api.get(
                    "/api/templates/templates?type=one-page-business-profile",
                    config
                );
                setTemplates(response.data);
                // Fetch selected template data for the user
                const selectedTemplatesResponse = await api.get(
                    "/api/selectedtemplates/link?type=one-page-business-profile",
                    config
                );
                console.log("API Response for Selected Template:", selectedTemplatesResponse.data);
        
                setSelectedTemplateData(
                    Array.isArray(selectedTemplatesResponse.data.selectedTemplateData) &&
                    selectedTemplatesResponse.data.selectedTemplateData.length > 0
                        ? selectedTemplatesResponse.data.selectedTemplateData[0]
                        : null
                );
                
                for (const template of response.data) {
                    await previewTemplate(template._id);
                }
            } catch (error) {
                console.error("Error fetching templates:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
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
            {selectedTemplateData && selectedTemplateData.templateId === template._id ? (
                <div className="">
                    {/* Only for the selected template, show these buttons */}
                    <button
                        onClick={() =>
                            window.open(selectedTemplateData.generatedLink, "_blank")
                        }
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                                        <FaExternalLinkAlt className="text-xl" />
                                        </button>
                    <button
                        onClick={handleDeleteSelectedTemplate}
                        className="ml-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
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
        </div>
    );
};

export default OnePageBusinessProfilePage;
