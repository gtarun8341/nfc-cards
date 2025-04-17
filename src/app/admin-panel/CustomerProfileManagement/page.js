"use client"; // Next.js Client Component

import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as needed

const CustomerProfileManagementPage = () => {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // For search functionality
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  // Fetch customers when the component loads
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('adminAuthToken'); // Assuming token is stored here
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        };
        const { data } = await api.get('/api/users/users', config); // Assuming '/api/users' is your route to fetch customers
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  // Handle edit functionality
  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setUpdatedName(customer.name);
  };

  // Update customer
  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('adminAuthToken'); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
      await api.put(`/api/users/users/${id}`, { name: updatedName }, config); // Assuming update route is '/api/users/:id'
      const updatedCustomers = customers.map((customer) =>
        customer._id === id ? { ...customer, name: updatedName } : customer
      );
      setCustomers(updatedCustomers);
      setEditCustomer(null);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminAuthToken'); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
      await api.delete(`/api/users/users/${id}`, config); // Assuming delete route is '/api/users/:id'
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  const handleResetPassword = (id) => {
    setSelectedCustomerId(id);
    setNewPassword('');
    setShowPasswordModal(true);
  };

  const submitPasswordReset = async () => {
    try {
      const token = localStorage.getItem('adminAuthToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.put(`/api/users/users/${selectedCustomerId}/resetPassword`, { newPassword }, config);
      alert('Password updated successfully');
      setShowPasswordModal(false);
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password');
    }
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Customer Profile Management</h2>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
      </div>

      {/* Customer Table */}
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100 text-left border-b">Name</th>
            <th className="py-2 px-4 bg-gray-100 text-left border-b">Email</th>
            <th className="py-2 px-4 bg-gray-100 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer._id} className="border-b">
              <td className="py-2 px-4">
                {editCustomer?._id === customer._id ? (
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  customer.name
                )}
              </td>
              <td className="py-2 px-4">{customer.email}</td>
              <td className="py-2 px-4">
                {editCustomer?._id === customer._id ? (
                  <button
                    onClick={() => handleUpdate(customer._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(customer)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleResetPassword(customer._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Reset Password
                </button>
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Reset Password</h3>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border w-full px-3 py-2 mb-4 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={submitPasswordReset}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerProfileManagementPage;
