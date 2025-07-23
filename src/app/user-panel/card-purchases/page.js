"use client";

import React, { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination"; // Adjust path based on your folder structure

const CardPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [downloading, setDownloading] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState(""); // actual query sent

  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to page 1 when new search is triggered
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);
  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const { data } = await api.get("/api/cardPurchase/card-purchase", {
        params: {
          page,
          limit,
          search: encodeURIComponent(debouncedSearch),
          status: statusFilter,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      setPurchases(data.purchases || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      toast.error("Failed to load card purchases");
      setPurchases([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [page, searchQuery, statusFilter]);

  const handleDownloadInvoice = async (trackingId) => {
    setDownloading(trackingId);
    const toastId = toast.loading(`Downloading invoice for ${trackingId}...`);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${api.defaults.baseURL}/api/cardPurchase/download-invoice/${trackingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/pdf",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to download invoice");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${trackingId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Invoice downloaded", { id: toastId });
    } catch (err) {
      toast.error("Download failed", { id: toastId });
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
          onChange={(e) => {
            setPage(1);
            setSearchQuery(e.target.value);
          }}
          className="p-2 border rounded w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
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
      ) : purchases.length === 0 ? (
        <div className="text-center text-gray-500">No purchases found.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="p-2">Tracking ID</th>
                  <th className="p-2">Card Type</th>
                  <th className="p-2">Template</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Created At</th>
                  <th className="p-2">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
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
                        onClick={() =>
                          handleDownloadInvoice(purchase.trackingId)
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                        disabled={downloading === purchase.trackingId}
                      >
                        {downloading === purchase.trackingId
                          ? "Downloading..."
                          : "Download"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {purchases.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(page) => setPage(page)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CardPurchases;
