"use client"; // Next.js Client Component

import React, { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as needed

const AdminContactManagementPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContact, setEditContact] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminAuthToken'); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get('/api/contacts/contacts', config); // Fetch all user contacts
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
  };

  const handleEdit = (contact) => {
    setEditContact(contact);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditContact({
      ...editContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminAuthToken'); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.put(`/api/contacts/${editContact._id}`, editContact, config); // Update the contact
      alert('Contact updated successfully');
      fetchUsers(); // Refresh data
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-semibold text-center mb-4">Contact Management</h1>

      {!selectedUser ? (
        <div>
          {/* <h2 className="text-xl font-semibold mb-4">Users</h2> */}
          {contacts.length === 0 ? (
            <p className="text-center text-gray-500">No contacts found</p>
          ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{user.userId.name}</td>
                    <td className="px-4 py-2">{user.userId.email}</td>
                    <td className="px-4 py-2">{user.userId.phone}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleUserClick(user.userId._id)}
                        className="text-blue-500 hover:underline"
                      >
                        View Contacts
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedUser(null)}
            className="mb-4 w-full p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Back to Users
          </button>
          <h2 className="text-xl font-semibold mb-4">Contacts for Selected User</h2>
          <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Reference</th>
              <th className="px-4 py-2 text-left">Profession</th>
              <th className="px-4 py-2 text-left">Industry</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Website</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">City</th>
              <th className="px-4 py-2 text-left">State</th>
              <th className="px-4 py-2 text-left">Pin Code</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{contact.name}</td>
                <td className="px-4 py-2">{contact.reference}</td>
                <td className="px-4 py-2">{contact.profession}</td>
                <td className="px-4 py-2">{contact.industry}</td>
                <td className="px-4 py-2">{contact.category}</td>
                <td className="px-4 py-2">{contact.designation}</td>
                <td className="px-4 py-2">{contact.companyName}</td>
                <td className="px-4 py-2">{contact.mobileNumber}</td>
                <td className="px-4 py-2">{contact.email}</td>
                <td className="px-4 py-2">{contact.website}</td>
                <td className="px-4 py-2">{contact.address}</td>
                <td className="px-4 py-2">{contact.city}</td>
                <td className="px-4 py-2">{contact.state}</td>
                <td className="px-4 py-2">{contact.pinCode}</td>
                <td className="px-4 py-2">
                        <button
                          onClick={() => handleEdit(contact)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleEditSubmit} className="space-y-6 mb-4">
          <h3 className="text-xl font-semibold">Edit Contact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputField
              label="Name"
              name="name"
              value={contact.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
            <InputField
              label="Reference"
              name="reference"
              value={contact.reference}
              onChange={handleChange}
              placeholder="Enter reference"
            />
            <InputField
              label="Profession"
              name="profession"
              value={contact.profession}
              onChange={handleChange}
              placeholder="Enter profession"
            />
            <InputField
              label="Industry"
              name="industry"
              value={contact.industry}
              onChange={handleChange}
              placeholder="Enter industry"
            />
            <InputField
              label="Category"
              name="category"
              value={contact.category}
              onChange={handleChange}
              placeholder="Enter category"
            />
            <InputField
              label="Designation"
              name="designation"
              value={contact.designation}
              onChange={handleChange}
              placeholder="Enter designation"
            />
            <InputField
              label="Company"
              name="companyName"
              value={contact.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
            />
            <InputField
              label="Mobile"
              name="mobileNumber"
              value={contact.mobileNumber}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
            />
            <InputField
              label="Email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            <InputField
              label="Website"
              name="website"
              value={contact.website}
              onChange={handleChange}
              placeholder="Enter website"
            />
            <InputField
              label="Address"
              name="address"
              value={contact.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
            <InputField
              label="City"
              name="city"
              value={contact.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
            <InputField
              label="State"
              name="state"
              value={contact.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
            <InputField
              label="Pin Code"
              name="pinCode"
              value={contact.pinCode}
              onChange={handleChange}
              placeholder="Enter pin code"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, placeholder, required = false }) => (
  <div className="flex flex-col space-y-2">
    <label htmlFor={name} className="text-sm font-semibold text-gray-700">{label}</label>
    <input
      id={name}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

export default AdminContactManagementPage;
