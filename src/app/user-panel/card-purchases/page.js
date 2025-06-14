"use client"; // Next.js Client Component

import React, { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig";

const CardPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [downloading, setDownloading] = useState(null);
  const [error, setError] = useState(null);

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
        const token = localStorage.getItem("authToken");
        const { data } = await api.get("/api/cardPurchase/card-purchase", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(data);
        setPurchases(data.purchases || []);
      } catch (error) {
        console.error("Error fetching card purchases:", error.message);
        setPurchases([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  const handleDownloadInvoice = async (trackingId) => {
    setDownloading(trackingId);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${api.defaults.baseURL}/api/cardPurchase/download-invoice/${trackingId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/pdf",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to download invoice");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${trackingId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading invoice:", error);
      setError(`Failed to download invoice for ${trackingId}`);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">My Card Purchases</h1>
      <div className="mb-4 flex justify-center space-x-4">
        <input
          type="text"
          placeholder="Search by Tracking ID, Card Type, or Template Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-1/3"
        />
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
                <th className="p-2">Invoice</th>
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
                      purchase.status === "Pending"
                        ? "text-yellow-500"
                        : purchase.status === "Processing"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {purchase.status}
                  </td>
                  <td className="p-2 text-center">
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleDownloadInvoice(purchase.trackingId)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                      disabled={downloading === purchase.trackingId}
                    >
                      {downloading === purchase.trackingId
                        ? "Downloading..."
                        : "Download"}
                    </button>
                    {error && downloading === purchase.trackingId && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
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
