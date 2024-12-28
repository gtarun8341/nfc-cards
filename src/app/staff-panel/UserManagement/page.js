"use client"; // Next.js Client Component

import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as necessary

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Set to null initially
  const [isEditing, setIsEditing] = useState(false);

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminAuthToken'); // Get the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
  
      const response = await api.get('/api/users/users',config); // Ensure your backend route matches this
      setUsers(response.data);
      setSelectedUser(response.data[0]); // Default to the first user
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Function to save changes
  const handleSave = async () => {
    try {
        const token = localStorage.getItem('authToken'); // Retrieve the JWT token from localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
          },
        };
  
      await api.put(`/api/users/users/${selectedUser.id}`, selectedUser,config); // Update route as necessary
      setUsers((prev) => prev.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="p-6">
      {/* User List Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id}>
              <button
                className={`block w-full text-left p-2 rounded-md hover:bg-gray-200 ${selectedUser && selectedUser.id === user.id ? 'bg-gray-200' : ''}`}
                onClick={() => {
                  setSelectedUser(user);
                  setIsEditing(true);
                }}
              >
                {user.username} - {user.email}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Selected User Details Section */}
      {isEditing && selectedUser && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Edit User: {selectedUser.username}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={selectedUser.username}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={selectedUser.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {/* Notification Preferences Section */}
          <h2 className="text-lg font-semibold mt-6 mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                checked={selectedUser.emailNotifications}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="emailNotifications" className="ml-2 text-sm text-gray-700">Email Notifications</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotifications"
                name="smsNotifications"
                checked={selectedUser.smsNotifications}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="smsNotifications" className="ml-2 text-sm text-gray-700">SMS Notifications</label>
            </div>
          </div>
        </div>
      )}

      {/* Save Settings Button */}
      {isEditing && (
        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
