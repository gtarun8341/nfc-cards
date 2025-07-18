"use client"; // Next.js Client Component

import { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig"; // Adjust the path as needed
import toast from "react-hot-toast";

const ContactDeveloperPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch complaints from the server
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.get("/api/contact-developer", config);
      setComplaints(response.data);
      setFilteredComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      toast.error("Failed to load complaints.");
    }
  };

  // Function to handle search input change
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.get(
        `/api/contact-developer?search=${encodeURIComponent(value)}`,
        config
      );

      setFilteredComplaints(response.data);
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Search failed.");
    }
  };

  const updateComplaintStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await api.put(`/api/contact-developer/${id}/status`, { status }, config);
      toast.success(`Status updated to "${status}"`);

      fetchComplaints();
    } catch (error) {
      console.error("Error updating complaint status:", error);
      toast.error("Failed to update complaint status.");
    }
  };

  const deleteComplaint = async (id) => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await api.delete(`/api/contact-developer/${id}`, config);
      toast.success("Complaint deleted successfully");

      fetchComplaints();
    } catch (error) {
      console.error("Error deleting complaint:", error);
      toast.error("Failed to delete complaint.");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">
        Contact Developer
      </h2>

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
            <th className="px-4 py-2 text-left">Complaint</th>
            <th className="px-4 py-2 text-left">User Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint) => (
              <tr key={complaint._id} className="border-b">
                <td className="px-4 py-2">
                  {complaint.about}-{complaint.complaint}
                </td>
                <td className="px-4 py-2">{complaint.userId?.name || "N/A"}</td>
                <td className="px-4 py-2">
                  {complaint.userId?.email || "N/A"}
                </td>
                <td className="px-4 py-2">
                  <select
                    value={complaint.status || "Pending"}
                    onChange={(e) =>
                      updateComplaintStatus(complaint._id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteComplaint(complaint._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center">
                No complaints found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactDeveloperPage;
