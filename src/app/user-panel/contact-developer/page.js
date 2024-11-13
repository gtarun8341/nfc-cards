// ContactDeveloperPage.js
"use client"; // Next.js Client Component

import React, { useState } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as needed

const ContactDeveloperPage = () => {
  const [complaint, setComplaint] = useState('');
  const [about, setAbout] = useState('');

  const handleComplaintSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };

      // Send complaint data to the server
      const response = await api.post('/api/contact-developer', { complaint, about }, config);
      console.log('Complaint submitted:', response.data);
      alert('Your complaint has been submitted.');
      setComplaint(''); // Clear the textarea after submission
      setAbout(''); // Clear the about field after submission
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('There was an error submitting your complaint. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Contact Developer</h1>
        
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="About (optional)"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Describe your issue"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          rows={6}
        />
        
        <button
          onClick={handleComplaintSubmit}
          className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ContactDeveloperPage;
