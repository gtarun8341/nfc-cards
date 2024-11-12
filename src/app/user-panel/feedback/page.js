// FeedbackPage.js
import React, { useState } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as needed

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [about, setAbout] = useState(''); // New state for about

  const handleFeedbackSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };

      // Send feedback and about data to the server
      const response = await api.post('/api/feedback', { feedback, about }, config);
      console.log('Feedback submitted:', response.data);
      alert('Thank you for your feedback!');
      setFeedback(''); // Clear the textarea after submission
      setAbout(''); // Clear the about field after submission
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('There was an error submitting your feedback. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Feedback</h1>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mt-4"
          placeholder="About (e.g., app feature, issue, etc.)"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={1}
        />
                <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={6}
        />
        <button
          onClick={handleFeedbackSubmit}
          className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
