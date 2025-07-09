"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig";
const defaultLimitations = {
  miniWebsite: "",
  pdfVisitingCard: "",
  businessProfile: "",
  businessEssentials: "",
  physicalVisitingCard: "",
  templateChanges: "",
  productUploads: "",
  storageSpace: "",
};
const AdminPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [search, setSearch] = useState("");

  const [newPlan, setNewPlan] = useState({
    title: "",
    price: "",
    currency: "INR",
    features: "",
    expiryMonths: "",
    limitations: { ...defaultLimitations },
  });
  const [editPlan, setEditPlan] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get("/api/subscription/allplans");
        setPlans(response.data);
        setFilteredPlans(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load subscription plans");
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleAddPlan = async () => {
    const formattedPlan = {
      ...newPlan,
      features: newPlan.features.split(",").map((f) => f.trim()),
    };
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.post(
        "/api/subscription/add",
        formattedPlan,
        config
      );
      setPlans([...plans, response.data.plan]);
      setFilteredPlans([...plans, response.data.plan]);
      closeModal();
    } catch (error) {
      setError("Failed to add subscription plan");
    }
  };

  const handleEditPlan = async () => {
    const formattedPlan = {
      ...editPlan,
      features: Array.isArray(editPlan.features)
        ? editPlan.features
        : editPlan.features.split(",").map((f) => f.trim()),
    };
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.put(
        `/api/subscription/update?id=${editPlan._id}`,
        formattedPlan,
        config
      );
      const updatedPlans = plans.map((plan) =>
        plan._id === editPlan._id ? response.data.plan : plan
      );
      setPlans(updatedPlans);
      setFilteredPlans(updatedPlans);
      closeModal();
    } catch (error) {
      setError("Failed to update subscription plan");
    }
  };

  const toggleDeletePlan = async (id, shouldDelete) => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await api.patch(
        `/api/subscription/delete?id=${id}`,
        { isDeleted: shouldDelete },
        config
      );

      const updatedPlans = plans.map((plan) =>
        plan._id === id ? { ...plan, isDeleted: shouldDelete } : plan
      );
      setPlans(updatedPlans);
      setFilteredPlans(updatedPlans);
    } catch (error) {
      setError("Failed to update delete status");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = plans.filter((plan) =>
      plan.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPlans(filtered);
  };

  const openAddModal = () => {
    setNewPlan({
      title: "",
      price: "",
      currency: "INR",
      features: "",
      expiryMonths: "",
      limitations: { ...defaultLimitations },
    });
    setEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (plan) => {
    setEditPlan({
      ...plan,
      features: Array.isArray(plan.features) ? plan.features.join(", ") : "",
      limitations: plan.limitations || { ...defaultLimitations },
    });
    setEditing(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(false);
    setEditPlan(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-6">
        Manage Subscription Plans
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search plans by title..."
          className="p-3 border border-gray-300 rounded-md w-full sm:w-1/2"
        />
        <button
          onClick={openAddModal}
          className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
        >
          Add New Plan
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading plans...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-sm sm:text-base">
            <thead>
              <tr>
                <th className="px-4 sm:px-6 py-3 border-b">Title</th>
                <th className="px-4 sm:px-6 py-3 border-b">Price</th>
                <th className="px-4 sm:px-6 py-3 border-b">Currency</th>
                <th className="px-4 sm:px-6 py-3 border-b">Features</th>
                <th className="px-4 sm:px-6 py-3 border-b">Duration</th>
                {Object.keys(defaultLimitations).map((key) => (
                  <th
                    key={key}
                    className="px-4 sm:px-6 py-3 border-b capitalize"
                  >
                    {key.replace(/([A-Z])/g, " $1")}
                  </th>
                ))}
                <th className="px-4 sm:px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan._id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 border-b">{plan.title}</td>
                  <td className="px-4 sm:px-6 py-4 border-b">{plan.price}</td>
                  <td className="px-4 sm:px-6 py-4 border-b">
                    {plan.currency}
                  </td>
                  <td className="px-4 sm:px-6 py-4 border-b">
                    {Array.isArray(plan.features)
                      ? plan.features.join(", ")
                      : plan.features}
                  </td>
                  <td className="px-4 sm:px-6 py-4 border-b">
                    {plan.expiryMonths} months
                  </td>
                  {Object.keys(defaultLimitations).map((key) => (
                    <td
                      key={key}
                      className="px-4 sm:px-6 py-4 border-b text-center"
                    >
                      {plan.limitations?.[key] || "-"}
                    </td>
                  ))}
                  <td className="px-4 sm:px-6 py-4 border-b flex flex-wrap gap-2">
                    {plan.isDeleted ? (
                      <button
                        onClick={() => toggleDeletePlan(plan._id, false)}
                        className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Restore
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => openEditModal(plan)}
                          className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleDeletePlan(plan._id, true)}
                          className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white w-full max-w-screen-sm sm:max-w-xl p-6 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
              {editing ? "Edit Plan" : "Add a New Plan"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={editing ? editPlan.title : newPlan.title}
                onChange={(e) =>
                  editing
                    ? setEditPlan({ ...editPlan, title: e.target.value })
                    : setNewPlan({ ...newPlan, title: e.target.value })
                }
                placeholder="Plan Title"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                value={editing ? editPlan.price : newPlan.price}
                onChange={(e) =>
                  editing
                    ? setEditPlan({ ...editPlan, price: e.target.value })
                    : setNewPlan({ ...newPlan, price: e.target.value })
                }
                placeholder="Price"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <select
                value={editing ? editPlan.currency : newPlan.currency}
                onChange={(e) =>
                  editing
                    ? setEditPlan({ ...editPlan, currency: e.target.value })
                    : setNewPlan({ ...newPlan, currency: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="INR">INR</option>
              </select>
              <input
                type="text"
                value={editing ? editPlan.expiryMonths : newPlan.expiryMonths}
                onChange={(e) =>
                  editing
                    ? setEditPlan({ ...editPlan, expiryMonths: e.target.value })
                    : setNewPlan({ ...newPlan, expiryMonths: e.target.value })
                }
                placeholder="Duration (in months)"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <textarea
                value={editing ? editPlan.features : newPlan.features}
                onChange={(e) =>
                  editing
                    ? setEditPlan({ ...editPlan, features: e.target.value })
                    : setNewPlan({ ...newPlan, features: e.target.value })
                }
                placeholder="Features (comma-separated)"
                className="w-full p-3 border border-gray-300 rounded-md"
              ></textarea>
              {Object.entries(
                (editing ? editPlan?.limitations : newPlan?.limitations) || {}
              ).map(([key, value]) => (
                <input
                  key={key}
                  type="text"
                  value={value}
                  placeholder={key}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  onChange={(e) =>
                    editing
                      ? setEditPlan({
                          ...editPlan,
                          limitations: {
                            ...editPlan.limitations,
                            [key]: e.target.value,
                          },
                        })
                      : setNewPlan({
                          ...newPlan,
                          limitations: {
                            ...newPlan.limitations,
                            [key]: e.target.value,
                          },
                        })
                  }
                />
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={closeModal}
                className="p-3 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={editing ? handleEditPlan : handleAddPlan}
                className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editing ? "Update Plan" : "Add Plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlansPage;
