"use client";

import { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig"; // Adjust path if needed
import toast from "react-hot-toast";

const AdminContactUsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchContacts = async (search = "", page = 1) => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: encodeURIComponent(search), // ✅ Ensure URL-encoding
          page,
          limit,
        },
      };

      const response = await api.get(
        `/api/contactUs-form/admin/contactUs`,
        config
      );
      const { data, total: totalCount } = response.data;
      setContacts(data);
      setTotal(totalCount);
    } catch (error) {
      console.error("Error fetching contact entries:", error);
      toast.error("Failed to fetch contact entries");
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchContacts(searchTerm, page); // ✅ Pass search and page
    }, 400); // debounce 400ms

    return () => clearTimeout(delay); // cleanup
  }, [searchTerm, page]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // optional: reset page to 1 on new search
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await api.delete(`/api/contactUs-form/contactUs/${id}`, config);
      toast.success("Entry deleted successfully");

      fetchContacts(page);
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete entry");
    }
  };

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchContacts(page);
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto p-5 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Admin Contact Us
      </h2>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, email, service..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Mobile</th>
            <th className="px-4 py-2 text-left">Service</th>
            <th className="px-4 py-2 text-left">Message</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact._id} className="border-b">
                <td className="px-4 py-2">{contact.name}</td>
                <td className="px-4 py-2">{contact.email}</td>
                <td className="px-4 py-2">{contact.mobile}</td>
                <td className="px-4 py-2">{contact.service}</td>
                <td className="px-4 py-2">{contact.message}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No contact entries found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? "bg-gray-200" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminContactUsPage;
