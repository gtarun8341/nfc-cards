"use client"; // Next.js Client Component

import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as needed

const CustomerManagementPage = () => {
  const [usersWithPlans, setUsersWithPlans] = useState([]);

  useEffect(() => {
    const fetchUsersWithPlans = async () => {
      try {
        const token = localStorage.getItem('adminAuthToken'); // Assuming token is stored here
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        };
        const response = await api.get('/api/user-plans/active-plans',config);
        setUsersWithPlans(response.data);
      } catch (error) {
        console.error("Error fetching users with plans:", error);
      }
    };

    fetchUsersWithPlans();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Customer Management</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b font-semibold text-left">Customer Name</th>
            <th className="py-2 px-4 border-b font-semibold text-left">Email</th>
            <th className="py-2 px-4 border-b font-semibold text-left">Active Plan</th>
            <th className="py-2 px-4 border-b font-semibold text-left">Plan Details</th>
          </tr>
        </thead>
        <tbody>
          {usersWithPlans.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                {user.plan ? 'Active' : 'No Active Plan'}
              </td>
              <td className="py-2 px-4 border-b">
                {user.plan ? (
                  <div>
                    <p><strong>Title:</strong> {user.plan.title}</p>
                    <p><strong>Price:</strong> {user.plan.price} {user.plan.currency}</p>
                    <p><strong>Start Date:</strong> {new Date(user.plan.startDate).toLocaleDateString()}</p>
                    <p><strong>Expiry Date:</strong> {new Date(user.plan.expiryDate).toLocaleDateString()}</p>
                  </div>
                ) : (
                  <p>N/A</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagementPage;
