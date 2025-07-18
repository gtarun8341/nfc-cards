"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig";
import toast from "react-hot-toast";
const defaultLimitations = {
  miniWebsite: "",
  nfccard: "",
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
        const response = await api.get(
          `/api/subscription/allplans?search=${encodeURIComponent(search)}`
        );
        setPlans(response.data);
        setFilteredPlans(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load subscription plans", error);
        toast.error("Failed to load subscription plans");
        setLoading(false);
      }
    };

    fetchPlans();
  }, [search]); // <-- Also add 'search' as a dependency to re-fetch when search changes

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
      toast.success("Subscription plan added successfully");
    } catch (error) {
      console.error(error);
      setError("Failed to add subscription plan");
      toast.error("Failed to add subscription plan");
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
      toast.success("Subscription plan updated successfully");
    } catch (error) {
      console.error(error);
      setError("Failed to update subscription plan");
      toast.error("Failed to update subscription plan");
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
      toast.success(
        shouldDelete ? "Plan moved to trash" : "Plan restored successfully"
      );
    } catch (error) {
      console.error(error);
      setError("Failed to update delete status");
      toast.error("Failed to update plan status");
    }
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    // fetchPlans(value); // fetch from backend directly
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Subscription Plan Management
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search plans by title..."
          className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 outline-none"
        />
        <button
          onClick={openAddModal}
          className="px-5 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition"
        >
          + Add New Plan
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading plans...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full text-sm text-left bg-white border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 border-b">Title</th>
                <th className="px-4 py-3 border-b">Price</th>
                <th className="px-4 py-3 border-b">Currency</th>
                <th className="px-4 py-3 border-b">Features</th>
                <th className="px-4 py-3 border-b">Duration</th>
                {Object.keys(defaultLimitations).map((key) => (
                  <th key={key} className="px-4 py-3 border-b capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </th>
                ))}
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan, index) => (
                <tr
                  key={plan._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-4 border-b">{plan.title}</td>
                  <td className="px-4 py-4 border-b">₹{plan.price}</td>
                  <td className="px-4 py-4 border-b">{plan.currency}</td>
                  <td className="px-4 py-4 border-b">
                    {Array.isArray(plan.features)
                      ? plan.features.join(", ")
                      : plan.features}
                  </td>
                  <td className="px-4 py-4 border-b">
                    {plan.expiryMonths} months
                  </td>
                  {Object.keys(defaultLimitations).map((key) => (
                    <td key={key} className="px-4 py-4 border-b text-center">
                      {plan.limitations?.[key] ?? "-"}
                    </td>
                  ))}
                  <td className="px-4 py-4 border-b text-center space-x-2">
                    {plan.isDeleted ? (
                      <button
                        onClick={() => toggleDeletePlan(plan._id, false)}
                        className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Restore
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => openEditModal(plan)}
                          className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleDeletePlan(plan._id, true)}
                          className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
          <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {editing ? "Edit Subscription Plan" : "Create New Plan"}
            </h2>

            <div className="text-sm text-yellow-800 bg-yellow-100 p-4 rounded-md border border-yellow-300 mb-4">
              <p className="font-semibold">Guidelines for Templates:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  All templates must have the same value for templateChanges.
                </li>
                <li>
                  Use <code>0</code> to hide/restrict a template.
                </li>
                <li>Don’t leave any limitation field empty.</li>
              </ul>
            </div>

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
                className="w-full px-4 py-3 border rounded-md shadow-sm"
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
                className="w-full px-4 py-3 border rounded-md shadow-sm"
              />
              <select
                value={editing ? editPlan.currency : newPlan.currency}
                onChange={(e) =>
                  editing
                    ? setEditPlan({ ...editPlan, currency: e.target.value })
                    : setNewPlan({ ...newPlan, currency: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-md shadow-sm"
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
                className="w-full px-4 py-3 border rounded-md shadow-sm"
              />
              <textarea
                value={editing ? editPlan.features : newPlan.features}
                onChange={(e) =>
                  editing
                    ? setEditPlan({ ...editPlan, features: e.target.value })
                    : setNewPlan({ ...newPlan, features: e.target.value })
                }
                placeholder="Features (comma-separated)"
                className="w-full px-4 py-3 border rounded-md shadow-sm"
              ></textarea>
              {Object.entries(
                (editing ? editPlan?.limitations : newPlan?.limitations) || {}
              ).map(([key, value]) => (
                <input
                  key={key}
                  type="text"
                  value={value}
                  placeholder={key}
                  className="w-full px-4 py-3 border rounded-md shadow-sm"
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

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className="px-5 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={editing ? handleEditPlan : handleAddPlan}
                className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
