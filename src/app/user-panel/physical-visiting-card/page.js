"use client"; // Next.js Client Component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../apiConfig/axiosConfig';

const PhysicalVisitingCardPage = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previewHtml, setPreviewHtml] = useState({});
    const [selectedTemplateData, setSelectedTemplateData] = useState([]); // Store selected template data
    const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
    const [cardType, setCardType] = useState(''); // Selected card type
    const [selectedTemplate, setSelectedTemplate] = useState(''); // Selected template
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        state:' ',
        country:' ',
        pincode:' ',
    });
    const router = useRouter();

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await api.get('/api/templates/templates?type=physical-visiting-card', config);
                setTemplates(response.data);

                // Fetch selected templates and links for the user
                const selectedTemplatesResponse = await api.get('/api/selectedtemplates/link', config);
                setSelectedTemplateData(selectedTemplatesResponse.data.selectedTemplateData);

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
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await api.get(`/api/templates/render/${templateId}?type=physical-visiting-card`, config);
            setPreviewHtml((prev) => ({ ...prev, [templateId]: response.data }));
        } catch (error) {
            console.error('Error fetching template preview:', error);
        }
    };

    const handleViewTemplate = async (templateId) => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await api.get(`/api/templates/render/${templateId}?type=physical-visiting-card`, config);
            const newWindow = window.open();
            newWindow.document.write(response.data);
            newWindow.document.close();
        } catch (error) {
            console.error('Error fetching template:', error);
        }
    };

    const handleSelectTemplate = async (templateId) => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await api.post('/api/selectedtemplates/select?type=physical-visiting-card', { templateId }, config);
            setSelectedTemplateData((prev) => [
                ...prev,
                { templateId, generatedLink: response.data.link },
            ]);
        } catch (error) {
            console.error('Error selecting template:', error);
        }
    };

    const handlePurchaseClick = () => {
        setIsModalOpen(true); // Open the modal when the user clicks the "Purchase" button
    };
    const handleCancelClick = () => {
        setIsModalOpen(false); // Close the modal when the user clicks the "Cancel" button
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send purchase data to the server
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const templateType = 'physical-visiting-card'; // Example selected template

            const purchaseData = {
                cardType,
                templateId: selectedTemplate,
                templateType, 
                userDetails
            };

            const response = await api.post('/api/cardPurchase/card-purchase', purchaseData, config);
            console.log('Purchase successful:', response.data);
            setIsModalOpen(false); // Close the modal after purchase
        } catch (error) {
            console.error('Error submitting purchase:', error);
        }
    };
    if (loading) {
        return <div className="text-center text-xl text-gray-500 py-4">Loading templates...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Available physical visiting card Templates</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {templates.length > 0 ? (
                    templates.map((template) => {
                        const selectedTemplate = selectedTemplateData.find(
                            (item) => item.templateId === template._id
                        );

                        return (
                            <div key={template._id} className="bg-white border p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <iframe
                                    srcDoc={previewHtml[template._id]}
                                    title={template.name}
                                    className="h-40 w-full object-cover mb-4 rounded-md border"
                                    style={{ border: 'none' }}
                                />
                                <h2 className="font-semibold text-lg text-gray-800">{template.name}</h2>

                                <button
                                    onClick={() => handleViewTemplate(template._id)}
                                    className="text-blue-600 hover:underline mt-3 inline-block"
                                >
                                    View Template
                                </button>

                                {/* Conditionally render "Select Template" button or "Visit Selected Website" button */}
                                {!selectedTemplate ? (
                                    <button
                                        onClick={() => handleSelectTemplate(template._id)}
                                        className="mt-3 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                                    >
                                        Select Template
                                    </button>
                                ) : (
                                    <div className="mt-3">
                                        <button
                                            onClick={() => window.open(selectedTemplate.generatedLink, '_blank')}
                                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                                        >
                                            Visit Selected Website
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-xl text-gray-600">No templates found.</p>
                )}
            </div>
            <button
                onClick={handlePurchaseClick}
                className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition duration-200"
            >
                Purchase a Card
            </button>

            {/* Modal for Purchase */}
            {isModalOpen && (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <h2 className="text-xl font-bold text-center mb-4">Purchase Your Card</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Card Type */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Card Type</label>
                        <select
                            className="w-full p-2 border rounded-lg"
                            value={cardType}
                            onChange={(e) => setCardType(e.target.value)}
                            required
                        >
                            <option value="">Select Card Type</option>
                            <option value="metal">Metal</option>
                            <option value="plastic">Plastic</option>
                            <option value="wooden">Wooden</option>
                        </select>
                    </div>

                    {/* Template Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Template Name</label>
                        <select
                            className="w-full p-2 border rounded-lg"
                            value={selectedTemplate}
                            onChange={(e) => setSelectedTemplate(e.target.value)}
                            required
                        >
                            <option value="">Select Template</option>
                            {templates.map((template) => (
                                <option key={template._id} value={template._id}>
                                    {template.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            value={userDetails.name}
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, name: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-lg"
                            value={userDetails.email}
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, email: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Phone</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            value={userDetails.phone}
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, phone: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Address</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            value={userDetails.address}
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, address: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* State */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">State</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            value={userDetails.state}
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, state: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* Country */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Country</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            value={userDetails.country}
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, country: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* Pincode */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Pincode</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            value={userDetails.pincode}
                            onChange={(e) =>
                                setUserDetails({ ...userDetails, pincode: e.target.value })
                            }
                            required
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={handleCancelClick}
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
)}

        </div>
    );
};

export default PhysicalVisitingCardPage;
