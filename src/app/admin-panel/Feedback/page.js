"use client"; // Next.js Client Component

import React, { useEffect, useState } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as needed

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch feedback from the API
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem('adminAuthToken'); // Assuming token is stored here
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        };
        
        const response = await api.get('/api/feedback', config); // Fetch feedback
        setFeedbackList(response.data);
        setFilteredFeedback(response.data); // Initially, no filter
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    // Filter feedback based on the search term
    const filtered = feedbackList.filter((feedback) => {
      const nameMatch = feedback.userId.name.toLowerCase().includes(e.target.value.toLowerCase());
      const emailMatch = feedback.userId.email.toLowerCase().includes(e.target.value.toLowerCase());
      return nameMatch || emailMatch;
    });

    setFilteredFeedback(filtered); // Update the filtered feedback list
  };

  // Delete feedback function
  const deleteFeedback = async (id) => {
    try {
      const token = localStorage.getItem('adminAuthToken'); // Get the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };

      await api.delete(`/api/feedback/${id}`, config); // Delete feedback
      setFeedbackList(feedbackList.filter((feedback) => feedback._id !== id));
      setFilteredFeedback(filteredFeedback.filter((feedback) => feedback._id !== id)); // Update filtered list
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">User Feedback</h2>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Table Structure */}
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Feedback</th>
            <th className="px-4 py-2 text-left">User Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map((feedback) => (
              <tr key={feedback._id} className="border-b">
                <td className="px-4 py-2">{feedback.about}-{feedback.feedback}</td>
                <td className="px-4 py-2">{feedback.userId.name}</td>
                <td className="px-4 py-2">{feedback.userId.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteFeedback(feedback._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center">No feedback found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackPage;
