"use client";
import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig'; // Import the Axios instance

const PurchaseHistoryPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [plans, setPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    const fetchPlans = async () => {
      try {
        const response = await api.get('/api/user-plans/user-plans', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlans(response.data);
      } catch (error) {
        console.error('Failed to fetch user plans:', error);
      }
    };

    fetchPlans();
  }, []);

  // Filtered plans based on search query
  const filteredPlans = plans.filter((plan) =>
    plan.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Plans</h2>

      {/* Search Bar */}
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
          </tr>
        </thead>
        <tbody>
          {filteredPlans.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-3 px-4 text-center text-gray-500">
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistoryPage;
