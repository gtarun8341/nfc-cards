"use client"; // Next.js Client Component

import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig';

const GenerateLinkPage = () => {
  const [link, setLink] = useState('');
  const [userTemplates, setUserTemplates] = useState([]); // To store fetched templates
  const [isLinkVisible, setIsLinkVisible] = useState(false); // To toggle link visibility
  const [searchTerm, setSearchTerm] = useState(''); // For search functionality

  // Fetching user's selected templates with links and user details
  useEffect(() => {
    const fetchUserTemplates = async () => {
      try {
        const token = localStorage.getItem('adminAuthToken'); // Get the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        };
        const response = await api.get('/api/selectedtemplates/qr', config);
        setUserTemplates(response.data.selectedTemplateData);
      } catch (error) {
        console.error('Error fetching selected templates:', error);
      }
    };

    fetchUserTemplates();
  }, []);

  const handleLinkDisplay = (templateLink, index) => {
    // Toggle visibility of the link when button is clicked
    if (link === templateLink) {
      setIsLinkVisible(!isLinkVisible); // Toggle visibility
    } else {
      setLink(templateLink);
      setIsLinkVisible(true); // Show link if it's a new link
    }
  };

  // Filtering templates based on search term
  const filteredTemplates = userTemplates.filter((template) => {
    const { name, email, phone } = template.userDetails;
    const search = searchTerm.toLowerCase();

    return (
      name.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search) ||
      phone.toLowerCase().includes(search) ||
      template.templateId?.toLowerCase().includes(search) ||
      template.templateName?.toLowerCase().includes(search) // Filter by template name
    );
  });

  return (
    <div className="max-w-5xl mx-auto p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Generate Link for Customer</h2>

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
      {filteredTemplates.length > 0 ? (
        <table className="min-w-full table-auto border-collapse mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Template ID</th>
              <th className="px-4 py-2 border">Template Name</th> {/* New Column */}
              <th className="px-4 py-2 border">Generated Link</th>
            </tr>
          </thead>
          <tbody>
            {filteredTemplates.map((template, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{template.userDetails.name}</td>
                <td className="px-4 py-2 border">{template.userDetails.email}</td>
                <td className="px-4 py-2 border">{template.userDetails.phone}</td>
                <td className="px-4 py-2 border">{template.templateId}</td>
                <td className="px-4 py-2 border">{template.templateName || 'Unknown'}</td> {/* Template Name */}
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleLinkDisplay(template.generatedLink, index)}
                    className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
                  >
                    {link === template.generatedLink && isLinkVisible ? 'Hide Link' : 'Show Link'}
                  </button>

                  {link === template.generatedLink && isLinkVisible && (
                    <div className="mt-2 text-blue-600">{template.generatedLink}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No templates available</p>
      )}
    </div>
  );
};

export default GenerateLinkPage;
