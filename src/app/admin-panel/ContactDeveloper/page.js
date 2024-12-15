"use client"; // Next.js Client Component

import { useEffect, useState } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as needed

const ContactDeveloperPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch complaints from the server
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('adminAuthToken'); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };

      const response = await api.get('/api/contact-developer', config); // Fetch complaints
      setComplaints(response.data); // Set the fetched complaints
      setFilteredComplaints(response.data); // Initially, no filter
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  // Function to handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    // Filter complaints based on the search term
    const filtered = complaints.filter(complaint => {
      const nameMatch = complaint.userId.name.toLowerCase().includes(e.target.value.toLowerCase());
      const emailMatch = complaint.userId.email.toLowerCase().includes(e.target.value.toLowerCase());
      return nameMatch || emailMatch;
    });

    setFilteredComplaints(filtered); // Update the filtered complaints
  };

  // Fetch complaints when the component mounts
  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Contact Developer</h2>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Table Structure */}
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Complaint</th>
            <th className="px-4 py-2 text-left">User Name</th>
            <th className="px-4 py-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint) => (
              <tr key={complaint._id} className="border-b">
                <td className="px-4 py-2">{complaint.about}-{complaint.complaint}</td>
                <td className="px-4 py-2">{complaint.userId.name}</td>
                <td className="px-4 py-2">{complaint.userId.email}</td>
                <td className="px-4 py-2">
                  {/* You can add actions like Delete or View */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center">No complaints found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactDeveloperPage;
