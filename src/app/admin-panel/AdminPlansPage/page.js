"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig";

const AdminPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    title: "",
    price: "",
    currency: "INR",
    features: "",
    expiryMonths: "",
  });
  const [editPlan, setEditPlan] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // Fetch subscription plans on page load
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get("/api/subscription/all");
        setPlans(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load subscription plans");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Add a new subscription plan
  const handleAddPlan = async () => {
    const formattedPlan = {
      ...newPlan,
      features: newPlan.features.split(","),
    };
    try {
      const response = await api.post("/api/subscription/add", formattedPlan);
      setPlans([...plans, response.data.plan]);
      setNewPlan({
        title: "",
        price: "",
        currency: "INR",
        features: "",
        expiryMonths: "",
      });
    } catch (error) {
      setError("Failed to add subscription plan");
    }
  };

  // Edit an existing subscription plan
  const handleEditPlan = async () => {
    const formattedPlan = {
      ...editPlan,
      features: Array.isArray(editPlan.features) 
        ? editPlan.features 
        : editPlan.features.split(","),
    };
  
    try {
      const response = await api.put(`/api/subscription/update?id=${editPlan._id}`, formattedPlan);
      setPlans(plans.map((plan) => (plan._id === editPlan._id ? response.data.plan : plan)));
      setEditing(false);
      setEditPlan(null);
    } catch (error) {
      setError("Failed to update subscription plan");
    }
  };
  
  // Delete a subscription plan
  const handleDeletePlan = async (id) => {
    try {
      await api.delete(`/api/subscription/delete?id=${id}`);
      setPlans(plans.filter((plan) => plan._id !== id));
    } catch (error) {
      setError("Failed to delete subscription plan");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Manage Subscription Plans</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {/* Add New Plan */}
      <div className="my-6">
        <h2 className="text-2xl font-semibold mb-4">Add a New Plan</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={newPlan.title}
            onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
            placeholder="Plan Title"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            value={newPlan.price}
            onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
            placeholder="Price"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={newPlan.expiryMonths}
            onChange={(e) => setNewPlan({ ...newPlan, expiryMonths: e.target.value })}
            placeholder="Duration (in months)"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={newPlan.features}
            onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
            placeholder="Features (comma-separated)"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleAddPlan}
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Plan
          </button>
        </div>
      </div>

      {/* Existing Plans */}
      <h2 className="text-2xl font-semibold mb-4">Existing Plans</h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading plans...</div>
      ) : (
        <div className="space-y-6">
          {plans.map((plan) => (
            <div key={plan._id} className="border p-4 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold">{plan.title}</h3>
              <p className="text-gray-600">
                {plan.price} {plan.currency}
              </p>
              <p className="text-gray-600">Duration: {plan.expiryMonths} months</p>
              <p className="text-gray-500">Features: {plan.features.join(", ")}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => {
                    setEditing(true);
                    setEditPlan(plan);
                  }}
                  className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePlan(plan._id)}
                  className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Plan */}
      {editing && editPlan && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Edit Plan</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={editPlan.title}
              onChange={(e) => setEditPlan({ ...editPlan, title: e.target.value })}
              placeholder="Plan Title"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              value={editPlan.price}
              onChange={(e) => setEditPlan({ ...editPlan, price: e.target.value })}
              placeholder="Price"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={editPlan.expiryMonths}
              onChange={(e) => setEditPlan({ ...editPlan, expiryMonths: e.target.value })}
              placeholder="Duration (in months)"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={editPlan.features}
              onChange={(e) => setEditPlan({ ...editPlan, features: e.target.value })}
              placeholder="Features (comma-separated)"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleEditPlan}
              className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlansPage;
