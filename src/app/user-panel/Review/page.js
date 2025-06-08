"use client"; // Next.js Client Component

import React, { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig"; // Adjust the path as needed
import * as XLSX from "xlsx";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await api.get("/api/review/user-reviews", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        });
        setReviews(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
  const handleDownload = () => {
    if (reviews.length === 0) return alert("No Reviews to download");

    // Step 1: Prepare data
    const data = reviews.map((enq) => ({
      Name: enq.name,
      Email: enq.email,
      Title: enq.title,
      Rating: enq.rating,
    }));

    // Step 2: Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reviews");

    // Step 3: Export to Excel
    XLSX.writeFile(workbook, "Reviews.xlsx");
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Reviews?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("authToken");
      await api.delete(`/api/review/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Reviews deleted successfully");
      setReviews((prev) => prev.filter((reviews) => reviews._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete Reviews");
    }
  };
  // Filter reviews based on search term
  const filteredReviews = reviews.filter((review) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return (
      review.name.toLowerCase().includes(lowercasedSearchTerm) ||
      review.email.toLowerCase().includes(lowercasedSearchTerm) ||
      review.title.toLowerCase().includes(lowercasedSearchTerm)
    );
  });

  if (loading) {
    return <p className="text-center text-lg">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Reviews</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Name, Email, or Title"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleDownload}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Download All Reviews
      </button>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                Name
              </th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                Email
              </th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                Title
              </th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                Rating
              </th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                Message
              </th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <tr
                  key={review._id}
                  className="hover:bg-gray-100 transition duration-150"
                >
                  <td className="border-t py-2 px-4">{review.name}</td>
                  <td className="border-t py-2 px-4">{review.email}</td>
                  <td className="border-t py-2 px-4">{review.title}</td>
                  <td className="border-t py-2 px-4">{review.rating}</td>
                  <td className="border-t py-2 px-4">{review.message}</td>
                  <td className="border-t py-2 px-4">
                    <button
                      onClick={() => handleDelete(enquiry._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border-t py-4 px-4 text-center text-gray-500"
                >
                  No reviews available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewPage;
