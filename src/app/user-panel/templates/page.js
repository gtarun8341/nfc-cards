import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for app directory
import api from '../../apiConfig/axiosConfig'; // Import the Axios instance

const TemplatesPage = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previewHtml, setPreviewHtml] = useState(''); // State to store the rendered HTML for the iframe
    const router = useRouter(); // Initialize useRouter

    // Fetch templates on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Retrieve the JWT token from localStorage
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
                    },
                };

                // Fetch templates
                const templatesResponse = await api.get('/api/templates/templates', config);
                setTemplates(templatesResponse.data);

                // Automatically preview each template
                for (const template of templatesResponse.data) {
                    await previewTemplate(template._id);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const previewTemplate = async (templateId) => {
        try {
            const token = localStorage.getItem('authToken'); // Retrieve the JWT token again
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Fetch the rendered template HTML for the iframe preview
            const response = await api.get(`/api/templates/render/${templateId}`, config);
            setPreviewHtml((prev) => ({ ...prev, [templateId]: response.data })); // Set the rendered HTML to state
        } catch (error) {
            console.error('Error fetching template preview:', error);
        }
    };

    const handleViewTemplate = async (templateId) => {
        try {
            const token = localStorage.getItem('authToken'); // Retrieve the JWT token again
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Fetch the rendered template HTML for the new window
            const response = await api.get(`/api/templates/render/${templateId}`, config);
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
            <h1 className="text-2xl font-bold mb-4">Available Templates</h1>
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
                            <p>Type: {template.type}</p>
                            
                            {/* Button to view the full template in a new window */}
                            <button
                                onClick={() => handleViewTemplate(template._id)} // Open full template in new window
                                className="text-blue-500 hover:underline mt-2 inline-block"
                            >
                                View Template
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No templates found.</p>
                )}
            </div>
        </div>
    );
};

export default TemplatesPage;
