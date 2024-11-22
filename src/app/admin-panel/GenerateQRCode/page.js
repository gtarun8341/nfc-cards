"use client"; // Next.js Client Component

import { useState, useEffect } from 'react';
import ReactQRCode from 'react-qr-code'; // Using react-qr-code for QR code generation
import { toPng } from 'html-to-image'; // For exporting QR code as an image
import api from '../../apiConfig/axiosConfig';

const QRCodePage = () => {
  const [link, setLink] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [userTemplates, setUserTemplates] = useState([]); // To store fetched templates

  // Fetching user's selected templates with links and user details
  useEffect(() => {
    const fetchUserTemplates = async () => {
      try {
        const response = await api.get('/api/selectedtemplates/qr');
        setUserTemplates(response.data.selectedTemplateData);
      } catch (error) {
        console.error('Error fetching selected templates:', error);
      }
    };

    fetchUserTemplates();
  }, []);

  const handleGenerate = (templateLink, index) => {
    setLink(templateLink); // Set the link for QR code generation
    setShowQRCode(index); // Show QR code after button click for the clicked row
  };

  const handleDownload = async (index) => {
    const qrCodeElement = document.getElementById(`qr-code-${index}`);
    if (!qrCodeElement) return;

    try {
      const dataUrl = await toPng(qrCodeElement);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `qr-code-${index}.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Generate QR Code</h2>

      {/* Display the user's templates in a table format */}
      {userTemplates.length > 0 ? (
        <table className="min-w-full table-auto border-collapse mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Template ID</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userTemplates.map((template, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{template.userDetails.name}</td>
                <td className="px-4 py-2 border">{template.userDetails.email}</td>
                <td className="px-4 py-2 border">{template.userDetails.phone}</td>
                <td className="px-4 py-2 border">{template.templateId}</td>
                <td className="px-4 py-2 border text-center">
                  {showQRCode === index ? (
                    <div>
                      <div id={`qr-code-${index}`}>
                        <ReactQRCode value={template.generatedLink} size={256} />
                      </div>
                      <button
                        onClick={() => handleDownload(index)}
                        className="mt-2 bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition"
                      >
                        Download QR Code
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleGenerate(template.generatedLink, index)}
                      className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
                    >
                      Generate QR Code
                    </button>
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

export default QRCodePage;
