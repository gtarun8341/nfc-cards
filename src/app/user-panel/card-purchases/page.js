"use client"; // Next.js Client Component

import React, { useEffect, useState } from 'react';
import api from '../../apiConfig/axiosConfig';

const CardPurchases = () => {
  const [purchases, setPurchases] = useState([]); // Ensure purchases is an array
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Filtered purchases based on search and status filter
  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearchQuery =
      purchase.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.cardType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.templateName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatusFilter =
      !statusFilter || purchase.status === statusFilter;

    return matchesSearchQuery && matchesStatusFilter;
  });

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const { data } = await api.get('/api/cardPurchase/card-purchase', {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token is stored and accessible
          },
        });

        // Ensure the data is set to purchases
        setPurchases(data.purchases || []); // Safely handle unexpected response structure
      } catch (error) {
        console.error('Error fetching card purchases:', error.message);
        setPurchases([]); // Ensure purchases is reset in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">My Card Purchases</h1>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center space-x-4">
        <input
          type="text"
          placeholder="Search by Tracking ID, Card Type, or Template Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-1/3"
        />

        {/* Status Filter Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : filteredPurchases.length === 0 ? (
        <div className="text-center text-gray-500">No purchases found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="p-2">Tracking ID</th>
                <th className="p-2">Card Type</th>
                <th className="p-2">Template Type</th>
                <th className="p-2">Price</th>
                <th className="p-2">Status</th>
                <th className="p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((purchase) => (
                <tr key={purchase.id} className="border-t">
                  <td className="p-2 text-center">{purchase.trackingId}</td>
                  <td className="p-2 text-center">{purchase.cardType}</td>
                  <td className="p-2 text-center">{purchase.templateName}</td>
                  <td className="p-2 text-center">₹{purchase.price}</td>
                  <td
                    className={`p-2 text-center ${
                      purchase.status === 'Pending'
                        ? 'text-yellow-500'
                        : purchase.status === 'Processing'
                        ? 'text-blue-500'
                        : 'text-green-500'
                    }`}
                  >
                    {purchase.status}
                  </td>
                  <td className="p-2 text-center">
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CardPurchases;
