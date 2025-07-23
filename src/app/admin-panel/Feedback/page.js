"use client";

import React, { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination"; // Adjust path based on your folder structure

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchFeedback();
  }, [searchTerm, page]);

  const fetchFeedback = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await api.get("/api/feedback", {
        params: { search: searchTerm, page, limit },
        ...config,
      });

      setFeedbackList(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      toast.error("Failed to fetch feedback");
    }
  };

  const deleteFeedback = async (id) => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.delete(`/api/feedback/${id}`, config);
      toast.success("Feedback deleted");
      fetchFeedback();
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error("Failed to delete feedback");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.put(`/api/feedback/${id}/status`, { status }, config);
      toast.success("Feedback status updated");
      fetchFeedback();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-5xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">User Feedback</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => {
          setPage(1);
          setSearchTerm(e.target.value);
        }}
        className="w-full mb-5 p-2 border border-gray-300 rounded"
      />

      <table className="min-w-full table-auto mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Feedback</th>
            <th className="px-4 py-2">User Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.length > 0 ? (
            feedbackList.map((feedback) => (
              <tr key={feedback._id} className="border-b">
                <td className="px-4 py-2">
                  {feedback.about} - {feedback.feedback}
                </td>
                <td className="px-4 py-2">{feedback.user.name}</td>
                <td className="px-4 py-2">{feedback.user.email}</td>
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
              <td colSpan="5" className="px-4 py-2 text-center">
                No feedback found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {feedbackList.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      )}
    </div>
  );
};

export default FeedbackPage;
