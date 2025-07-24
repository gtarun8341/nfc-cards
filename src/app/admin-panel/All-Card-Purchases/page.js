"use client"; // Next.js Client Component

import React, { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination"; // Adjust path based on your folder structure

const AllCardPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllPurchases = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await api.get(
        `/api/cardPurchase/all-purchases?page=${page}&limit=10&search=${encodeURIComponent(
          searchTerm
        )}&status=${encodeURIComponent(statusFilter)}`,
        config
      );

      // Sort purchases by newest first
      const sortedPurchases = data.purchases
        ? data.purchases.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        : [];
      // const sortedPurchases = data.purchases || [];

      setPurchases(sortedPurchases);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching all card purchases:", error.message);
      toast.error("Failed to load purchases.");
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPurchases();
  }, [page]);

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.patch(
        `/api/cardPurchase/update-status/${id}`,
        { status: newStatus },
        config
      );

      const updatedPurchase = response.data.data;
      fetchAllPurchases();

      // Update the local state
      setPurchases((prevPurchases) => {
        const updatedPurchases = prevPurchases.map((purchase) =>
          purchase.id === updatedPurchase.id
            ? { ...purchase, status: updatedPurchase.status }
            : purchase
        );

        // Re-sort by createdAt (newest first)
        return updatedPurchases.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      });
      toast.success(`Status updated to "${newStatus}"`);
    } catch (error) {
      console.error("Error updating card purchase status:", error.message);
      toast.error("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        All Card Purchases
      </h1>

      <div className="mb-4 flex justify-between">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Tracking ID, Name, or Email"
          className="p-2 border rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Status Filter */}
        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : purchases.length === 0 ? (
        <div className="text-center text-gray-500">No purchases found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="p-2">Tracking ID</th>
                <th className="p-2">Card Type</th>
                <th className="p-2">Template Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Status</th>
                <th className="p-2">Created At</th>
                <th className="p-2">User Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Address</th>
                <th className="p-2">Country</th>
                <th className="p-2">State</th>
                <th className="p-2">Pincode</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id} className="border-t">
                  <td className="p-2 text-center">{purchase.trackingId}</td>
                  <td className="p-2 text-center">{purchase.cardType}</td>
                  <td className="p-2 text-center">{purchase.templateName}</td>
                  <td className="p-2 text-center">₹{purchase.price}</td>
                  <td className="p-2 text-center">
                    <select
                      className="border p-1 rounded"
                      value={purchase.status}
                      onChange={(e) =>
                        updateStatus(purchase.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="p-2 text-center">
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-center">{purchase.user.name}</td>
                  <td className="p-2 text-center">{purchase.user.email}</td>
                  <td className="p-2 text-center">{purchase.user.phone}</td>
                  <td className="p-2 text-center">{purchase.user.address}</td>
                  <td className="p-2 text-center">{purchase.user.country}</td>
                  <td className="p-2 text-center">{purchase.user.state}</td>
                  <td className="p-2 text-center">{purchase.user.pincode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {purchases.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      )}
    </div>
  );
};

export default AllCardPurchases;
