"use client"; // Next.js Client Component

import React, { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig"; // Adjust the path as needed
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination"; // Adjust path based on your folder structure
const CRMPage = () => {
  const [formData, setFormData] = useState({
    date: "",
    direction: "", // Incoming or Outgoing
    startTime: "",
    endTime: "",
    name: "",
    companyName: "",
    phoneNumber: "",
    subject: "",
    notes: "",
    actionItems: "",
    followUpNeeded: false,
  });

  const [crmEntries, setCrmEntries] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch existing CRM entries
  useEffect(() => {
    const fetchCRMEntries = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const res = await api.get(
          `/api/crm?search=${encodeURIComponent(
            debouncedSearch
          )}&page=${currentPage}&limit=10`,
          config
        );

        setCrmEntries(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        toast.error("Failed to fetch CRM entries");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCRMEntries();
  }, [debouncedSearch, currentPage]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on search
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken"); // Assuming token is stored here
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const toastId = toast.loading(
      isEditing ? "Updating CRM entry..." : "Adding CRM entry..."
    );

    try {
      if (isEditing) {
        // Update existing entry
        const response = await api.put(
          `/api/crm/${editingId}`,
          formData,
          config
        );
        toast.success("CRM entry updated successfully!", { id: toastId });

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
        const response = await api.post("/api/crm", formData, config);
        toast.success("CRM entry added successfully!", { id: toastId });
        setCrmEntries((prevEntries) => [
          ...prevEntries,
          response.data.crmEntry,
        ]);
      }

      // Clear form after submission
      setFormData({
        date: "",
        direction: "",
        startTime: "",
        endTime: "",
        name: "",
        companyName: "",
        phoneNumber: "",
        subject: "",
        notes: "",
        actionItems: "",
        followUpNeeded: false,
      });
      setIsAdding(false); // Hide the form
    } catch (error) {
      console.error("Error saving CRM data:", error);
      toast.error("Failed to save CRM entry", { id: toastId });
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirmDelete) return;

    const toastId = toast.loading("Deleting entry...");
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await api.delete(`/api/crm/${id}`, config);
      toast.success("Entry deleted successfully", { id: toastId });

      setCrmEntries((prevEntries) =>
        prevEntries.filter((entry) => entry._id !== id)
      );
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete entry", { id: toastId });
    }
  };

  const handleDownload = (entry) => {
    try {
      const entryData = [
        {
          Date: formatDate(entry.date),
          Direction: entry.direction,
          "Start Time": entry.startTime,
          "End Time": entry.endTime,
          Name: entry.name,
          "Company Name": entry.companyName,
          "Phone Number": entry.phoneNumber,
          Subject: entry.subject,
          Notes: entry.notes,
          "Action Items": entry.actionItems,
          "Follow-up Needed": entry.followUpNeeded ? "Yes" : "No",
        },
      ];

      // Create a new workbook and worksheet
      const worksheet = XLSX.utils.json_to_sheet(entryData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "CRM Entry");

      // Generate a binary string and trigger download
      const fileName = `${entry.name || "entry"}_CRM.xlsx`;
      XLSX.writeFile(workbook, fileName);
      toast.success(`Downloaded ${fileName}`);
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Failed to download entry");
    }
  };
  const handleEdit = (entry) => {
    const formattedDate = entry.date ? entry.date.split("T")[0] : "";

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
      date: "",
      direction: "",
      startTime: "",
      endTime: "",
      name: "",
      companyName: "",
      phoneNumber: "",
      subject: "",
      notes: "",
      actionItems: "",
      followUpNeeded: false,
    });
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Format as dd-mm-yyyy
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-semibold text-center mb-4">
        CRM Integration
      </h1>

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
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, direction: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, actionItems: e.target.value })
                }
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300 w-full"
              />
            </div>
            {/* Follow-up Needed */}
            <div>
              <label className="block mb-1">Follow-up Needed?</label>
              <select
                name="followUpNeeded"
                value={formData.followUpNeeded ? "Yes" : "No"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    followUpNeeded: e.target.value === "Yes",
                  })
                }
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
        {crmEntries.length === 0 ? (
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
              {crmEntries.map((entry) => (
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
                  <td className="p-2 border-b">
                    {entry.followUpNeeded ? "Yes" : "No"}
                  </td>
                  <td className="p-2 border-b space-x-2">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="p-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry._id)}
                      className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleDownload(entry)}
                      className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {crmEntries.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default CRMPage;
