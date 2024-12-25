"use client"; // Next.js Client Component

import React, { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig';

const ContactDeveloperPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [complaint, setComplaint] = useState('');
  const [about, setAbout] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await api.get('/api/contact-developer/all', config);
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleComplaintSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post('/api/contact-developer', { complaint, about }, config);
      alert('Your complaint has been submitted.');
      setComplaint('');
      setAbout('');
      setShowModal(false);
      setComplaints([...complaints, response.data.complaint]);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('There was an error submitting your complaint. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Complaints</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Complaint
        </button>
      </div>

      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Subject</th>
            <th className="px-4 py-2 border">Complaint</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length > 0 ? (
            complaints.map((comp) => (
              <tr key={comp._id} className="border-t">
                <td className="px-4 py-2 border">{comp.about}</td>
                <td className="px-4 py-2 border">{comp.complaint}</td>
                <td className="px-4 py-2 border">{comp.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center px-4 py-2">
                No complaints found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add Complaint</h2>
            <input
              type="text"
              placeholder="Subject"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <textarea
              placeholder="Describe your issue"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              rows={4}
              className="w-full p-2 border rounded"
            ></textarea>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-2 px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleComplaintSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDeveloperPage;
