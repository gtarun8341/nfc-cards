"use client";
import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig';

const PurchaseHistoryPage = () => {
  const [plans, setPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloading, setDownloading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    const fetchPlans = async () => {
      try {
        const response = await api.get('/api/user-plans/user-plans', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlans(response.data);
      } catch (error) {
        console.error('Failed to fetch user plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const handleDownloadInvoice = async (trackingId) => {
    setDownloading(trackingId);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${api.defaults.baseURL}/api/user-plans/download-invoice/${trackingId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/pdf" },
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

  const filteredPlans = plans.filter((plan) =>
    plan.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Plans</h2>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by Plan Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-1/3"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-left">
            <th className="py-3 px-4 border-b">Plan Title</th>
            <th className="py-3 px-4 border-b">Start Date</th>
            <th className="py-3 px-4 border-b">Expiry Date</th>
            <th className="py-3 px-4 border-b">Status</th>
            <th className="py-3 px-4 border-b">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlans.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
                No plans found.
              </td>
            </tr>
          ) : (
            filteredPlans.map((plan) => (
              <tr key={plan._id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b">{plan.title}</td>
                <td className="py-3 px-4 border-b">{new Date(plan.startDate).toLocaleDateString()}</td>
                <td className="py-3 px-4 border-b">{new Date(plan.expiryDate).toLocaleDateString()}</td>
                <td className="py-3 px-4 border-b">
                  {new Date() < new Date(plan.expiryDate) ? 'Active' : 'Expired'}
                </td>
                <td className="py-3 px-4 border-b">
                  <button
                    onClick={() => handleDownloadInvoice(plan._id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 transition-colors"
                    disabled={downloading === plan._id}
                  >
                    {downloading === plan._id ? 'Downloading...' : 'Download'}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default PurchaseHistoryPage;
