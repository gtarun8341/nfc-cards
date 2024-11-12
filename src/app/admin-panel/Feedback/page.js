// pages/feedback.js
import React, { useEffect, useState } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as needed

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Get the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        };
        
        const response = await api.get('/api/feedback', config); // Fetch feedback
        setFeedbackList(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      const token = localStorage.getItem('authToken'); // Get the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };

      await api.delete(`/api/feedback/${id}`, config); // Delete feedback
      setFeedbackList(feedbackList.filter((feedback) => feedback._id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">User Feedback</h2>

      <ul className="mt-5">
        {feedbackList.map((feedback) => (
          <li key={feedback._id} className="py-2 border-b flex justify-between">
            <div>
              <p>{feedback.about}-{feedback.feedback}</p>
              <p className="text-gray-500">
                {feedback.userId.name} ({feedback.userId.email})
              </p>
            </div>
            <button
              onClick={() => deleteFeedback(feedback._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackPage;
