"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for app directory
import api from '../../../apiConfig/axiosConfig'; // Import the Axios instance

const AdminNFCCardsPage = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previewHtml, setPreviewHtml] = useState({}); // Store rendered HTML for the iframe
    const router = useRouter(); // Initialize useRouter

    // Fetch NFC card templates on component mount
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const token = localStorage.getItem('adminAuthToken'); // Retrieve the JWT token from localStorage
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
                    },
                };
                // Fetch NFC card templates
                const response = await api.get('/api/templates/admin/templates?type=nfc', config);
                setTemplates(response.data);
                console.log(response.data);

                // Automatically preview each template
                for (const template of response.data) {
                    await previewTemplate(template._id);
                }
            } catch (error) {
                console.error('Error fetching templates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    const previewTemplate = async (templateId) => {
        try {
            const token = localStorage.getItem('adminAuthToken'); // Retrieve the JWT token again
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Fetch the rendered template HTML for the iframe preview
            const response = await api.get(`/api/templates/admin/render/${templateId}?type=nfc`, config);
            setPreviewHtml((prev) => ({ ...prev, [templateId]: response.data })); // Set the rendered HTML to state
        } catch (error) {
            console.error('Error fetching template preview:', error);
        }
    };

    // Handle template deletion
    // const handleDeleteTemplate = async (templateId) => {
    //     try {
    //         const token = localStorage.getItem('adminAuthToken'); // Retrieve the JWT token again
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         };

    //         // Send a delete request to the API
    //         await api.delete(`/api/templates/${templateId}?type=nfc`, config);

    //         // After successful deletion, remove the template from state
    //         setTemplates((prevTemplates) => prevTemplates.filter(template => template._id !== templateId));
    //     } catch (error) {
    //         console.error('Error deleting template:', error);
    //     }
    // };

    const handleViewTemplate = async (templateId) => {
        try {
            const token = localStorage.getItem('adminAuthToken'); // Retrieve the JWT token again
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Fetch the rendered template HTML for the new window
            const response = await api.get(`/api/templates/admin/render/${templateId}?type=nfc`, config);
            // Open a new window with the full template
            const newWindow = window.open();
            newWindow.document.write(response.data);
            newWindow.document.close();
        } catch (error) {
            console.error('Error fetching template:', error);
        }
    };

    if (loading) {
        return <div>Loading templates...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Admin - Manage NFC Card Templates</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {templates.length > 0 ? (
                    templates.map((template) => (
                        <div key={template._id} className="border p-4 rounded shadow-lg">
                            {/* Template Preview */}
                            <iframe
                                srcDoc={previewHtml[template._id]} // Use the specific preview for the template
                                title={template.name}
                                className="h-32 w-full object-cover mb-2"
                                style={{ border: 'none' }} // Style the iframe for a clean look
                            />

                            {/* Template Info */}
                            <h2 className="font-semibold text-lg">{template.name}</h2>

                            <div className="flex justify-between mt-2">
                                {/* Button to view the full template in a new window */}
                                <button
                                    onClick={() => handleViewTemplate(template._id)} // Open full template in new window
                                    className="text-blue-500 hover:underline inline-block"
                                >
                                    View Template
                                </button>

                                {/* Button to delete the template */}
                                {/* <button
                                    onClick={() => handleDeleteTemplate(template._id)} // Delete template
                                    className="text-red-500 hover:underline inline-block"
                                >
                                    Delete Template
                                </button> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No templates found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminNFCCardsPage;
