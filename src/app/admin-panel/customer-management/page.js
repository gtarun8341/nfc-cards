"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig"; // Adjust the path as needed

const CustomerManagementPage = () => {
  const [usersWithPlans, setUsersWithPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [filterByTitle, setFilterByTitle] = useState("");
  const [filterByExpiry, setFilterByExpiry] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // useEffect(() => {
  const fetchUsersWithPlans = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken"); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
      const response = await api.get(
        `/api/user-plans/active-plans?page=${page}&limit=10`,
        config
      );
      setUsersWithPlans(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users with plans:", error);
    }
  };

  //   fetchUsersWithPlans();
  // }, []);
  useEffect(() => {
    fetchUsersWithPlans();
  }, [page]);
  // Filter users based on search and filters
  const filteredUsers = usersWithPlans.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTitle =
      filterByTitle === "" ||
      (user.plan &&
        user.plan.title.toLowerCase().includes(filterByTitle.toLowerCase()));

    const matchesExpiry =
      filterByExpiry === "" ||
      (user.plan &&
        new Date(user.plan.expiryDate)
          .toLocaleDateString()
          .includes(filterByExpiry));

    return matchesSearch && matchesTitle && matchesExpiry;
  });

  return (
    <div className="max-w-3xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">
        Customer Management
      </h2>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-5 gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="Filter by plan title..."
          value={filterByTitle}
          onChange={(e) => setFilterByTitle(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="Filter by expiry date..."
          value={filterByExpiry}
          onChange={(e) => setFilterByExpiry(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b font-semibold text-left">
              Customer Name
            </th>
            <th className="py-2 px-4 border-b font-semibold text-left">
              Email
            </th>
            <th className="py-2 px-4 border-b font-semibold text-left">
              Active Plan
            </th>
            <th className="py-2 px-4 border-b font-semibold text-left">
              Plan Details
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                {user.plan ? "Active" : "No Active Plan"}
              </td>
              <td className="py-2 px-4 border-b">
                {user.plan ? (
                  <div>
                    <p>
                      <strong>Title:</strong> {user.plan.title}
                    </p>
                    <p>
                      <strong>Price:</strong> {user.plan.price}{" "}
                      {user.plan.currency}
                    </p>
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {new Date(user.plan.startDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Expiry Date:</strong>{" "}
                      {new Date(user.plan.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p>N/A</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerManagementPage;
