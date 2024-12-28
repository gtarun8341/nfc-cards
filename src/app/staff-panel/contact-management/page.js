"use client"; // Next.js Client Component

import React, { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig"; // Adjust the path as needed
import * as XLSX from "xlsx";

const AdminContactManagementPage = () => {
  const [contacts, setContacts] = useState([]); // Grouped contacts by user
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term for outer table
  const [innerSearchTerm, setInnerSearchTerm] = useState(""); // Search term for inner table

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken"); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get("/api/contacts/contacts", config); // Fetch grouped user contacts
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
  };

  const filterContacts = (contacts, searchTerm) => {
    return contacts.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filterInnerContacts = (contacts, searchTerm) => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.mobileNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const downloadContacts = (user) => {
    const userContacts = user.contacts.map((contact) => ({
      Name: contact.name,
      Reference: contact.reference,
      Profession: contact.profession,
      Industry: contact.industry,
      Category: contact.category,
      Designation: contact.designation,
      Company: contact.companyName,
      Mobile: contact.mobileNumber,
      Email: contact.email,
      Website: contact.website,
      Address: contact.address,
      City: contact.city,
      State: contact.state,
      "Pin Code": contact.pinCode,
    }));

    // Merge user details and contacts
    const dataToExport = [...userContacts];

    // Create a new worksheet
    const ws = XLSX.utils.json_to_sheet(dataToExport);

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");

    // Generate and download the Excel file
    XLSX.writeFile(wb, `${user.email}_${user.phone}_${user.name}_contacts.xlsx`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-semibold text-center mb-4">Contact Management</h1>

      {!selectedUser ? (
        <div>
          {/* Search Bar for Outer Table */}
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            className="mb-4 p-2 w-full border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                  {filterContacts(contacts, searchTerm).map((user, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.phone}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleUserClick(user.userId)}
                          className="text-blue-500 hover:underline"
                        >
                          View Contacts
                        </button>
                        <button
                          onClick={() => downloadContacts(user)}
                          className="text-green-500 hover:underline"
                        >
                          Download
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

          {/* Search Bar for Inner Table */}
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            className="mb-4 p-2 w-full border rounded-md"
            value={innerSearchTerm}
            onChange={(e) => setInnerSearchTerm(e.target.value)}
          />
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
                </tr>
              </thead>
              <tbody>
                {filterInnerContacts(
                  contacts.find((user) => user.userId === selectedUser).contacts,
                  innerSearchTerm
                ).map((contact, index) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactManagementPage;
