"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig"; // Adjust the path as needed
import { FiCopy, FiEdit, FiTrash2, FiKey } from "react-icons/fi"; // Import the required icons
import toast from "react-hot-toast";

const StaffManagementPage = () => {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({
    name: "",
    mobileNumber: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editStaff, setEditStaff] = useState(null); // For editing staff

  // Fetch staff on component mount
  useEffect(() => {
    fetchStaff();
  }, []);
  // Fetch all staff on component mount
  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken"); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
      const { data } = await api.get("/api/staffRoutes/staff", config); // Fetch staff data
      setStaff(data);
    } catch (error) {
      console.error("Error fetching staff:", error);
      toast.error("Failed to fetch staff");
    }
  };
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };

  // Add new staff
  const addStaff = async () => {
    if (Object.values(newStaff).some((field) => !field.trim())) return;

    try {
      const token = localStorage.getItem("adminAuthToken"); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await api.post(
        "/api/staffRoutes/staff",
        newStaff,
        config
      ); // Send POST request to add staff
      setStaff([...staff, data.staff]);
      setNewStaff({
        name: "",
        mobileNumber: "",
        address: "",
        city: "",
        pincode: "",
        state: "",
      });
      closeModal();
      toast.success("Staff added successfully");
    } catch (error) {
      console.error("Error adding staff:", error);
      toast.error("Failed to add staff");
    }
  };

  // Edit staff
  const handleEdit = (staffMember) => {
    setEditStaff(staffMember);
    setNewStaff({
      name: staffMember.name,
      mobileNumber: staffMember.mobileNumber,
      address: staffMember.address,
      city: staffMember.city,
      pincode: staffMember.pincode,
      state: staffMember.state,
    });
    openModal();
  };

  // Update staff
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.put(
        `/api/staffRoutes/staff/${editStaff.staffId}`,
        newStaff,
        config
      ); // Update staff data
      setStaff(
        staff.map((s) =>
          s.staffId === editStaff.staffId ? { ...s, ...newStaff } : s
        )
      );
      closeModal();
      toast.success("Staff updated successfully");
    } catch (error) {
      console.error("Error updating staff:", error);
      toast.error("Failed to update staff");
    }
  };

  // Delete staff
  const handleDelete = async (staffId) => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.delete(`/api/staffRoutes/staff/${staffId}`, config); // Delete staff
      setStaff(staff.filter((s) => s.staffId !== staffId));
      toast.success("Staff deleted successfully");
    } catch (error) {
      console.error("Error deleting staff:", error);
      toast.error("Failed to delete staff");
    }
  };
  const handleChangePassword = async (staffId) => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.post(
        `/api/staffRoutes/changePassword/${staffId}`,
        {},
        config
      );
      toast.success("Password changed successfully");
      fetchStaff();
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    }
  };
  // Copy to clipboard function
  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
        toast.error("Failed to copy");
      });
  };
  // Modal toggle functions
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditStaff(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-5">
        Staff Management
      </h2>

      {/* Add Staff Button */}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white rounded px-4 py-2 mb-4 hover:bg-blue-600 transition"
      >
        Add Staff
      </button>

      {/* Staff Table */}
      <div className="overflow-x-auto">
        <div className="min-w-full table-auto bg-white border border-gray-200 mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b text-left">Name</th>
                  <th className="px-6 py-3 border-b text-left">
                    Mobile Number
                  </th>
                  <th className="px-6 py-3 border-b text-left">City</th>
                  <th className="px-6 py-3 border-b text-left">Pincode</th>
                  <th className="px-6 py-3 border-b text-left">State</th>
                  <th className="px-6 py-3 border-b text-left">Staff ID</th>
                  <th className="px-6 py-3 border-b text-left">Password</th>
                  <th className="px-6 py-3 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.staffId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{s.name}</td>
                    <td className="px-6 py-4 border-b">{s.mobileNumber}</td>
                    <td className="px-6 py-4 border-b">{s.city}</td>
                    <td className="px-6 py-4 border-b">{s.pincode}</td>
                    <td className="px-6 py-4 border-b">{s.state}</td>
                    <td className="px-6 py-4 border-b flex items-center justify-center">
                      {s.staffId}
                      <button
                        onClick={() => handleCopy(s.staffId)}
                        className="ml-2 text-blue-500"
                      >
                        <FiCopy />
                      </button>
                    </td>
                    <td className="px-6 py-4 border-b flex items-center justify-center">
                      {s.password}
                      <button
                        onClick={() => handleCopy(s.password)}
                        className="ml-2 text-blue-500"
                      >
                        <FiCopy />
                      </button>
                    </td>
                    <td className="px-6 py-4 border-b flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(s)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(s.staffId)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FiTrash2 />
                      </button>
                      <button
                        onClick={() => handleChangePassword(s.staffId)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <FiKey />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Adding/Editing Staff */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">
              {editStaff ? "Edit Staff" : "Add New Staff"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={newStaff.name}
                onChange={handleChange}
                placeholder="Enter staff name"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="mobileNumber"
                value={newStaff.mobileNumber}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="address"
                value={newStaff.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="city"
                value={newStaff.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="pincode"
                value={newStaff.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="state"
                value={newStaff.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={editStaff ? handleUpdate : addStaff}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {editStaff ? "Update Staff" : "Add Staff"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagementPage;
