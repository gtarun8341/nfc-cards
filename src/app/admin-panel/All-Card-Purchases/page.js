"use client"; // Next.js Client Component

import React, { useEffect, useState } from 'react';
import api from '../../apiConfig/axiosConfig';

const AllCardPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPurchases = async () => {
      try {
        const { data } = await api.get('/api/cardPurchase/all-purchases'); // Updated endpoint
        setPurchases(data.purchases || []); // Handle data safely
        console.log(data)
      } catch (error) {
        console.error('Error fetching all card purchases:', error.message);
        setPurchases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPurchases();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const { data } = await api.patch(`/api/cardPurchase/update-status/${id}`, { status: newStatus });
      setPurchases((prev) =>
        prev.map((purchase) => (purchase.id === id ? { ...purchase, status: data.status } : purchase))
      );
      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error.message);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">All Card Purchases</h1>
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
                      onChange={(e) => updateStatus(purchase.id, e.target.value)}
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
                  <td className="p-2 text-center">{purchase.user.state}</td>
                  <td className="p-2 text-center">{purchase.user.country}</td>
                  <td className="p-2 text-center">{purchase.user.pincode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllCardPurchases;
