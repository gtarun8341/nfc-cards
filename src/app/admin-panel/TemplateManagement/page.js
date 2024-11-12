"use client"; // Next.js Client Component
import { useState } from 'react';
import api from '../../apiConfig/axiosConfig'; // Import the Axios instance

const TemplateManagement = () => {
    const [file, setFile] = useState(null);
    const [templateName, setTemplateName] = useState('');
    const [templateType, setTemplateType] = useState('nfc');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', templateName);
        formData.append('type', templateType);
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }        try {
            const response = await api.post('/api/templates/upload', formData); // Use api instance
            alert(response.data.message);
            setFile(null);
            setTemplateName('');
        } catch (error) {
            console.error(error);
            alert('Error uploading template');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Upload Template</h2>
            <form onSubmit={handleUpload} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Template Name</label>
                    <input
                        type="text"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Template Type</label>
                    <select
                        value={templateType}
                        onChange={(e) => setTemplateType(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="nfc">NFC Card</option>
                        <option value="pdf">PDF Card</option>
                        <option value="mini-website">Mini Website</option>
                        <option value="one-page-business-profile">One Page Business Profile</option>
                        <option value="physical-visiting-card">Physical Visiting Card</option>
                        <option value="business-essentials">Business Essentials</option>

                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload File</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.png,.html"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Upload
                </button>
            </form>
        </div>
    );
};

export default TemplateManagement;
