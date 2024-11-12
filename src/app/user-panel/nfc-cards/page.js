import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../apiConfig/axiosConfig';

const NFCCardsPage = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previewHtml, setPreviewHtml] = useState({});
    const [selectedTemplateData, setSelectedTemplateData] = useState([]); // Store selected template data
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

                const response = await api.get('/api/templates/templates?type=nfc', config);
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

            const response = await api.get(`/api/templates/render/${templateId}?type=nfc`, config);
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

            const response = await api.get(`/api/templates/render/${templateId}?type=nfc`, config);
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

            const response = await api.post('/api/selectedtemplates/select?type=nfc', { templateId }, config);
            setSelectedTemplateData((prev) => [
                ...prev,
                { templateId, generatedLink: response.data.link },
            ]);
        } catch (error) {
            console.error('Error selecting template:', error);
        }
    };

    if (loading) {
        return <div className="text-center text-xl text-gray-500 py-4">Loading templates...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Available NFC Card Templates</h1>
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
        </div>
    );
};

export default NFCCardsPage;
