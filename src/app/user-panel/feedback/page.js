"use client"; // Next.js Client Component

import React, { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig";
import { toast } from "react-hot-toast"; // ✅ Import toast

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [about, setAbout] = useState(""); // New state for about

  const handleFeedbackSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };

      // Send feedback and about data to the server
      const response = await api.post(
        "/api/feedback",
        { feedback, about },
        config
      );
      console.log("Feedback submitted:", response.data);
      toast.success("Thank you for your feedback!");
      setFeedback(""); // Clear the textarea after submission
      setAbout(""); // Clear the about field after submission
      setShowModal(false);
      setFeedbacks([...feedbacks, response.data.feedback]);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    }
  };
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await api.get("/api/feedback/all", config);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        toast.error("Failed to load feedbacks.");
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Feedback</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Feedback
        </button>
      </div>

      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Subject</th>
            <th className="px-4 py-2 border">Feedback</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((comp) => (
              <tr key={comp._id} className="border-t">
                <td className="px-4 py-2 border">{comp.about}</td>
                <td className="px-4 py-2 border">{comp.feedback}</td>
                <td className="px-4 py-2 border">{comp.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center px-4 py-2">
                No Feedback found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add Feedback</h2>
            <input
              type="text"
              placeholder="Subject"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <textarea
              placeholder="Describe your issue"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
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
                onClick={handleFeedbackSubmit}
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

export default FeedbackPage;
