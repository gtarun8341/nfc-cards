"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig"; // Adjust the path as needed
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination"; // Adjust path based on your folder structure

const CustomerProfileManagementPage = () => {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Fetch customers when the component loads
  // useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(
        `/api/users/users?page=${page}&limit=10&search=${encodeURIComponent(
          searchTerm
        )}`,
        config
      );
      console.log("Fetched customers:", response.data.users);
      setCustomers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to fetch customers");
    }
  };

  //   fetchCustomers();
  // }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchCustomers();
    }, 500); // debounce 500ms

    return () => clearTimeout(timeout);
  }, [page, searchTerm]);

  useEffect(() => {
    setPage(1); // Reset to page 1 on search term change
  }, [searchTerm]);

  // Update customer
  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("adminAuthToken"); // Assuming token is stored here
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
      toast.success("Customer name updated");
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error("Failed to update customer");
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminAuthToken"); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
      await api.delete(`/api/users/users/${id}`, config); // Assuming delete route is '/api/users/:id'
      setCustomers((prev) =>
        prev.map((customer) =>
          customer._id === id
            ? { ...customer, isDeleted: true, deletedAt: new Date() }
            : customer
        )
      );
      toast.success("Customer deleted");
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer");
    }
  };
  const handleReactivate = async (userId) => {
    try {
      const token = localStorage.getItem("adminAuthToken"); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
      const res = await api.put(`/api/users/reactivate/${userId}`, config);
      toast.success(res.data.message || "User reactivated");
      fetchCustomers(); // refresh your user list
    } catch (error) {
      console.error("Error reactivating user:", error);
      toast.error("Failed to reactivate user");
    }
  };

  const handleResetPassword = (id) => {
    setSelectedCustomerId(id);
    setNewPassword("");
    setShowPasswordModal(true);
  };
  const handleDownloadExcel = () => {
    try {
      const exportData = customers.map((customer) => ({
        Name: customer.name,
        Email: customer.email,
        Phone: customer.phone || "-",
        Company: customer.companyName || "-",
        Profession: customer.profession || "-",
        CreatedAt: new Date(customer.createdAt).toLocaleString(),
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Data");

      const fileName = `All_Customers_Details.xlsx`;
      XLSX.writeFile(workbook, fileName);
      toast.success("Excel downloaded successfully");
    } catch (error) {
      console.error("Excel download failed", error);
      toast.error("Failed to download Excel");
    }
  };

  const submitPasswordReset = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.put(
        `/api/users/users/${selectedCustomerId}/resetPassword`,
        { newPassword },
        config
      );
      toast.success("Password reset successfully");
      setShowPasswordModal(false);
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password");
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Customer Profile Management
      </h2>

      {/* Search & Export */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-1/2"
        />

        <button
          onClick={handleDownloadExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
        >
          Download Excel
        </button>
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr>
              {[
                "Name",
                "Email",
                "Phone",
                "Company",
                "Profession",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="py-2 px-4 bg-gray-100 text-left border-b whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id} className="border-b align-top">
                {/* Name */}
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

                {/* Email */}
                <td className="py-2 px-4">{customer.email}</td>

                {/* Phone */}
                <td className="py-2 px-4">{customer.phone || "-"}</td>

                {/* Company */}
                <td className="py-2 px-4">{customer.companyName || "-"}</td>

                {/* Profession */}
                <td className="py-2 px-4">{customer.profession || "-"}</td>

                {/* Status */}
                <td className="py-2 px-4">
                  {customer.isDeleted ? (
                    <span className="text-red-600 font-semibold">Deleted</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Active</span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-2 px-4 space-y-1">
                  <div className="flex flex-wrap gap-2">
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
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
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

                    {customer.isDeleted ? (
                      <button
                        onClick={() => handleReactivate(customer._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Reactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDelete(customer._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {customers.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      )}

      {/* Reset Password Modal */}
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
