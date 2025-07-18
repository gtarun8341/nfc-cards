"use client";
import React, { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig";
import * as XLSX from "xlsx";
import { toast } from "react-hot-toast";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch reviews
  const fetchReviews = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      const response = await api.get("/api/review/user-reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: 10,
          search: encodeURIComponent(searchTerm),
        },
      });

      setReviews(response.data.reviews);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [currentPage]);

  // Debounce search
  useEffect(() => {
    const delay = setTimeout(() => {
      setCurrentPage(1);
      fetchReviews();
    }, 500);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleDownload = () => {
    if (reviews.length === 0) return toast.error("No reviews to download");
    try {
      const data = reviews.map((enq) => ({
        Name: enq.name,
        Email: enq.email,
        Title: enq.title,
        Rating: enq.rating,
      }));
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Reviews");
      XLSX.writeFile(workbook, "Reviews.xlsx");
      toast.success("Reviews downloaded successfully");
    } catch {
      toast.error("Failed to download reviews");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const token = localStorage.getItem("authToken");
      await api.delete(`/api/review/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Review deleted successfully");
      fetchReviews(); // Refresh list
    } catch {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Reviews</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by Name, Email, or Title"
        className="w-full mb-4 px-4 py-2 border rounded-lg"
      />

      <button
        onClick={handleDownload}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Download All Reviews
      </button>

      {loading ? (
        <p className="text-center">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews available.</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Rating</th>
                  <th className="py-2 px-4 text-left">Message</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review._id} className="hover:bg-gray-100">
                    <td className="border-t py-2 px-4">{review.name}</td>
                    <td className="border-t py-2 px-4">{review.email}</td>
                    <td className="border-t py-2 px-4">{review.title}</td>
                    <td className="border-t py-2 px-4">{review.rating}</td>
                    <td className="border-t py-2 px-4">{review.message}</td>
                    <td className="border-t py-2 px-4">
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewPage;
