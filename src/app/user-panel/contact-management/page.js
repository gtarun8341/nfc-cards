"use client"; // Next.js Client Component

import React, { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig"; // Adjust the path as needed
import * as XLSX from "xlsx";

const ContactManagementPage = () => {
  const [contact, setContact] = useState({
    name: "",
    reference: "",
    profession: "",
    industry: "",
    category: "",
    designation: "",
    companyName: "",
    mobileNumber: "",
    email: "",
    website: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [contacts, setContacts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editContactId, setEditContactId] = useState(null); // Track contact being edited
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchQuery]); // Re-run filter when contacts or searchQuery change

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
      const response = await api.get("/api/contacts", config); // GET request to fetch contacts
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const filterContacts = () => {
    const query = searchQuery.toLowerCase();
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.profession.toLowerCase().includes(query) ||
        contact.companyName.toLowerCase().includes(query) ||
        contact.mobileNumber.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.website.toLowerCase().includes(query)
    );
    setFilteredContacts(filtered);
  };

  const handleChange = (e) => {
    setContact((prevContact) => ({
      ...prevContact,
      [e.target.name]: e.target.value,
    }));
  };
  const handleDownload = (contact) => {
    const contactData = [
      {
        Name: contact.name,
        Reference: contact.reference,
        Profession: contact.profession,
        Industry: contact.industry,
        Category: contact.category,
        Designation: contact.designation,
        "Company Name": contact.companyName,
        "Mobile Number": contact.mobileNumber,
        Email: contact.email,
        Website: contact.website,
        Address: contact.address,
        City: contact.city,
        State: contact.state,
        "Pin Code": contact.pinCode,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(contactData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Info");

    const fileName = `${contact.name || "contact"}_Details.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };
  const handleDelete = async (contactId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.delete(`/api/contacts/contacts/${contactId}`, config);
      alert("Contact deleted successfully.");
      fetchContacts(); // Refresh list
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editContactId) {
        // Update contact if editing
        await api.put(
          "/api/contacts/contacts",
          { ...contact, contactId: editContactId },
          config
        );
        alert("Contact updated successfully");
      } else {
        // Add new contact if not editing
        await api.post("/api/contacts", contact, config);
        alert("Contact added successfully");
      }

      fetchContacts(); // Fetch updated contacts
      setIsAdding(false);
      setContact({
        name: "",
        reference: "",
        profession: "",
        industry: "",
        category: "",
        designation: "",
        companyName: "",
        mobileNumber: "",
        email: "",
        website: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
      });
      setEditContactId(null); // Reset edit mode
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  const handleEdit = (contactId) => {
    const contactToEdit = contacts.find((contact) => contact._id === contactId);
    setContact(contactToEdit); // Pre-fill the form with contact data
    setEditContactId(contactId); // Set the edit contact ID
    setIsAdding(true); // Show the form
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Contact Management
      </h1>

      <button
        onClick={() => setIsAdding(!isAdding)}
        className="mb-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {isAdding ? "Cancel" : "Add New Contact"}
      </button>

      {isAdding && (
        <form onSubmit={handleSubmit} className="space-y-6 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={contact.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Reference</label>
              <input
                type="text"
                name="reference"
                placeholder="Enter reference"
                value={contact.reference}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Profession</label>
              <input
                type="text"
                name="profession"
                placeholder="Enter profession"
                value={contact.profession}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Industry</label>
              <input
                type="text"
                name="industry"
                placeholder="Enter industry"
                value={contact.industry}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Category</label>
              <input
                type="text"
                name="category"
                placeholder="Enter category"
                value={contact.category}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                placeholder="Enter designation"
                value={contact.designation}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Company</label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter company name"
                value={contact.companyName}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Mobile</label>
              <input
                type="text"
                name="mobileNumber"
                placeholder="Enter mobile number"
                value={contact.mobileNumber}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={contact.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Website</label>
              <input
                type="text"
                name="website"
                placeholder="Enter website"
                value={contact.website}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                value={contact.address}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                value={contact.city}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">State</label>
              <input
                type="text"
                name="state"
                placeholder="Enter state"
                value={contact.state}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Pin Code</label>
              <input
                type="text"
                name="pinCode"
                placeholder="Enter pin code"
                value={contact.pinCode}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {editContactId ? "Update Contact" : "Save Contact"}
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, profession, company, mobile, email, or website"
          className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
        />
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
            {filteredContacts.map((contact, index) => (
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
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(contact._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDownload(contact)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactManagementPage;
