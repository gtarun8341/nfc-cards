"use client"; // Next.js Client Component

import React, { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as needed

const CRMPage = () => {
  const [formData, setFormData] = useState({
    date: '',
    direction: '', // Incoming or Outgoing
    startTime: '',
    endTime: '',
    name: '',
    companyName: '',
    phoneNumber: '',
    subject: '',
    notes: '',
    actionItems: '',
    followUpNeeded: false,
  });

  const [crmEntries, setCrmEntries] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  // Fetch existing CRM entries
  useEffect(() => {
    const fetchCRMEntries = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Assuming token is stored here
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        };
        const response = await api.get('/api/crm', config); // GET request to fetch CRM data
        setCrmEntries(response.data);
      } catch (error) {
        console.error('Error fetching CRM entries:', error);
      }
    };

    fetchCRMEntries();
  }, []);

  const filteredEntries = crmEntries.filter((entry) => {
    const query = searchQuery.toLowerCase();
    return (
      entry.name?.toLowerCase().includes(query) ||
      entry.companyName?.toLowerCase().includes(query) ||
      entry.phoneNumber?.toLowerCase().includes(query) ||
      entry.date?.toLowerCase().includes(query) ||
      entry.subject?.toLowerCase().includes(query)
    );
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('authToken'); // Assuming token is stored here
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      if (isEditing) {
        // Update existing entry
        const response = await api.put(`/api/crm/${editingId}`, formData, config);
        alert('CRM entry updated successfully!');
  
        // Update entry in state without re-fetching
        setCrmEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry._id === editingId ? response.data.crmEntry : entry
          )
        );
  
        setIsEditing(false);
        setEditingId(null);
      } else {
        // Add new entry
        const response = await api.post('/api/crm', formData, config);
        alert('CRM entry added successfully!');
        setCrmEntries((prevEntries) => [...prevEntries, response.data.crmEntry]);
      }
  
      // Clear form after submission
      setFormData({
        date: '',
        direction: '',
        startTime: '',
        endTime: '',
        name: '',
        companyName: '',
        phoneNumber: '',
        subject: '',
        notes: '',
        actionItems: '',
        followUpNeeded: false,
      });
      setIsAdding(false); // Hide the form
    } catch (error) {
      console.error('Error saving CRM data:', error);
    }
  };
  

  const handleEdit = (entry) => {
    const formattedDate = entry.date ? entry.date.split('T')[0] : '';

    setFormData({
      date: formattedDate, // Use formatted date
      direction: entry.direction,
      startTime: entry.startTime,
      endTime: entry.endTime,
      name: entry.name,
      companyName: entry.companyName,
      phoneNumber: entry.phoneNumber,
      subject: entry.subject,
      notes: entry.notes,
      actionItems: entry.actionItems,
      followUpNeeded: entry.followUpNeeded,
    });
    setEditingId(entry._id); // Store the ID of the entry being edited
    setIsEditing(true); // Open the form in edit mode
  };
  
  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      date: '',
      direction: '',
      startTime: '',
      endTime: '',
      name: '',
      companyName: '',
      phoneNumber: '',
      subject: '',
      notes: '',
      actionItems: '',
      followUpNeeded: false,
    });
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Format as dd-mm-yyyy
  };
  

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-semibold text-center mb-4">CRM Integration</h1>

      {/* Add Button */}
      {!isAdding && !isEditing && (
        <div className="text-right mb-4">
          <button
            onClick={() => setIsAdding(true)}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add CRM Entry
          </button>
        </div>
      )}

      {/* Form for adding new CRM entry */}
      {(isAdding || isEditing) && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                required
              />
            </div>
            {/* Direction */}
            <div>
              <label className="block mb-1">Direction</label>
              <select
                name="direction"
                value={formData.direction}
                onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                required
              >
                <option value="">Select</option>
                <option value="Incoming">Incoming</option>
                <option value="Outgoing">Outgoing</option>
              </select>
            </div>
            {/* Start Time */}
            <div>
              <label className="block mb-1">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                required
              />
            </div>
            {/* End Time */}
            <div>
              <label className="block mb-1">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                required
              />
            </div>
            {/* Name */}
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                required
              />
            </div>
            {/* Company Name */}
            <div>
              <label className="block mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            {/* Phone Number */}
            <div>
              <label className="block mb-1">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            {/* Subject */}
            <div>
              <label className="block mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
                required
              />
            </div>
            {/* Notes */}
            <div>
              <label className="block mb-1">Notes</label>
              <textarea
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            {/* Action Items */}
            <div>
              <label className="block mb-1">Action Items</label>
              <textarea
                name="actionItems"
                placeholder="Action Items"
                value={formData.actionItems}
                onChange={(e) => setFormData({ ...formData, actionItems: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            {/* Follow-up Needed */}
            <div>
              <label className="block mb-1">Follow-up Needed?</label>
              <select
                name="followUpNeeded"
                value={formData.followUpNeeded ? 'Yes' : 'No'}
                onChange={(e) => setFormData({ ...formData, followUpNeeded: e.target.value === 'Yes' })}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="p-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save Entry
            </button>
          </div>
        </form>
      )}

      {/* List of CRM Entries */}
      <div className="mt-6">
        <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Company Name, Name, Phone Number, Date, or Subject"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        />
      </div>
      {filteredEntries.length === 0 ? (
          <p>No CRM entries available.</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 text-left border-b">Date</th>
              <th className="p-2 text-left border-b">Direction</th>
              <th className="p-2 text-left border-b">Start Time</th>
              <th className="p-2 text-left border-b">End Time</th>
              <th className="p-2 text-left border-b">Name</th>
              <th className="p-2 text-left border-b">Company Name</th>
              <th className="p-2 text-left border-b">Phone Number</th>
              <th className="p-2 text-left border-b">Subject</th>
              <th className="p-2 text-left border-b">Notes</th>
              <th className="p-2 text-left border-b">Action Items</th>
              <th className="p-2 text-left border-b">Follow-up Needed</th>
              <th className="p-2 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
          {filteredEntries.map((entry) => (
              <tr key={entry._id}>
<td className="p-2 border-b">{formatDate(entry.date)}</td>
<td className="p-2 border-b">{entry.direction}</td>
                <td className="p-2 border-b">{entry.startTime}</td>
                <td className="p-2 border-b">{entry.endTime}</td>
                <td className="p-2 border-b">{entry.name}</td>
                <td className="p-2 border-b">{entry.companyName}</td>
                <td className="p-2 border-b">{entry.phoneNumber}</td>
                <td className="p-2 border-b">{entry.subject}</td>
                <td className="p-2 border-b">{entry.notes}</td>
                <td className="p-2 border-b">{entry.actionItems}</td>
                <td className="p-2 border-b">{entry.followUpNeeded ? 'Yes' : 'No'}</td>
                <td className="p-2 border-b">
        <button
          onClick={() => handleEdit(entry)}
          className="p-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Edit
        </button>
      </td>
              </tr>
            ))}
          </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CRMPage;
