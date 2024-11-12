// components/PurchaseHistoryPage.js
"use client";
import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig'; // Import the Axios instance


const PurchaseHistoryPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [plans, setPlans] = useState([]);

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

  return (
    <div className="container mx-auto p-4">

      <h2 className="text-2xl font-bold mb-4">User Plans</h2>
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
          {plans.map((plan) => (
            <tr key={plan._id} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b">{plan.title}</td>
              <td className="py-3 px-4 border-b">{new Date(plan.startDate).toLocaleDateString()}</td>
              <td className="py-3 px-4 border-b">{new Date(plan.expiryDate).toLocaleDateString()}</td>
              <td className="py-3 px-4 border-b">{new Date() < new Date(plan.expiryDate) ? 'Active' : 'Expired'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistoryPage;
