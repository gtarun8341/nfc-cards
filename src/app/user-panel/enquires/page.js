"use client"; // Next.js Client Component

import React, { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig"; // Adjust the path as needed
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

const EnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      try {
        const response = await api.get(
          `/api/enquiry/user?page=${currentPage}&limit=10&search=${encodeURIComponent(
            debouncedSearch
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEnquiries(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load enquiries");
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurrentPage(1); // reset page
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("authToken");
      await api.delete(`/api/enquiry/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Enquiry deleted successfully");
      setEnquiries((prev) => prev.filter((enquiry) => enquiry._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete enquiry");
    }
  };
  const handleDownload = () => {
    if (enquiries.length === 0) return toast.error("No enquiries to download");
    try {
      // Step 1: Prepare data
      const data = enquiries.map((enq) => ({
        Name: enq.name,
        Email: enq.email,
        Phone: enq.phone,
        Message: enq.message,
      }));

      // Step 2: Create worksheet and workbook
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");

      // Step 3: Export to Excel
      XLSX.writeFile(workbook, "enquiries.xlsx");
      toast.success("Enquiries downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download enquiries");
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading enquiries...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Enquiries</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Name, Email, or Phone"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="button" // ✅ Important
        onClick={handleDownload}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Download All Enquiries
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
                Phone
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
            {enquiries.map((enquiry) => (
              <tr
                key={enquiry._id}
                className="hover:bg-gray-100 transition duration-150"
              >
                <td className="border-t py-2 px-4">{enquiry.name}</td>
                <td className="border-t py-2 px-4">{enquiry.email}</td>
                <td className="border-t py-2 px-4">{enquiry.phone}</td>
                <td className="border-t py-2 px-4">{enquiry.message}</td>
                <td className="border-t py-2 px-4">
                  <button
                    onClick={() => handleDelete(enquiry._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnquiriesPage;
