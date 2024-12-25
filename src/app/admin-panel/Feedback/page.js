import React, { useEffect, useState } from 'react';
import api from '../../apiConfig/axiosConfig';

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, []);
  
  const fetchFeedback = async () => {
    try {
      const token = localStorage.getItem('adminAuthToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await api.get('/api/feedback', config);
      setFeedbackList(response.data);
      setFilteredFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = feedbackList.filter((feedback) => {
      const nameMatch = feedback.userId.name.toLowerCase().includes(e.target.value.toLowerCase());
      const emailMatch = feedback.userId.email.toLowerCase().includes(e.target.value.toLowerCase());
      return nameMatch || emailMatch;
    });
    setFilteredFeedback(filtered);
  };

  const deleteFeedback = async (id) => {
    try {
      const token = localStorage.getItem('adminAuthToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.delete(`/api/feedback/${id}`, config);
      fetchFeedback();
      setFeedbackList(feedbackList.filter((feedback) => feedback._id !== id));
      setFilteredFeedback(filteredFeedback.filter((feedback) => feedback._id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminAuthToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await api.put(`/api/feedback/${id}/status`, { status }, config);
      fetchFeedback();
      setFeedbackList(
        feedbackList.map((feedback) =>
          feedback._id === id ? { ...feedback, status: response.data.feedback.status } : feedback
        )
      );
    } catch (error) {
      console.error('Error updating feedback status:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">User Feedback</h2>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Feedback</th>
            <th className="px-4 py-2 text-left">User Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map((feedback) => (
              <tr key={feedback._id} className="border-b">
                <td className="px-4 py-2">{feedback.about} - {feedback.feedback}</td>
                <td className="px-4 py-2">{feedback.userId.name}</td>
                <td className="px-4 py-2">{feedback.userId.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={feedback.status}
                    onChange={(e) => updateStatus(feedback._id, e.target.value)}
                    className="border border-gray-300 rounded p-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
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
              <td colSpan="5" className="px-4 py-2 text-center">No feedback found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackPage;
