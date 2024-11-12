import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig';

const AdminPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    planName: '',
    price: '',
    duration: '',
    description: '',
  });
  const [editPlan, setEditPlan] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // Fetch subscription plans on page load
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('/api/subscription/all');
        setPlans(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load subscription plans');
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Add a new subscription plan
  const handleAddPlan = async () => {
    try {
      await api.post('/api/subscription/add', newPlan);
      setPlans([...plans, newPlan]);
      setNewPlan({ planName: '', price: '', duration: '', description: '' });
    } catch (error) {
      setError('Failed to add subscription plan');
    }
  };

  // Edit an existing subscription plan
  const handleEditPlan = async () => {
    try {
      await api.put(`/api/subscription/update/${editPlan._id}`, editPlan);
      setPlans(plans.map((plan) => (plan._id === editPlan._id ? editPlan : plan)));
      setEditing(false);
      setEditPlan(null);
    } catch (error) {
      setError('Failed to update subscription plan');
    }
  };

  // Delete a subscription plan
  const handleDeletePlan = async (id) => {
    try {
      await api.delete(`/api/subscription/delete/${id}`);
      setPlans(plans.filter((plan) => plan._id !== id));
    } catch (error) {
      setError('Failed to delete subscription plan');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Manage Subscription Plans</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="my-6">
        <h2 className="text-2xl font-semibold mb-4">Add a New Plan</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={newPlan.planName}
            onChange={(e) => setNewPlan({ ...newPlan, planName: e.target.value })}
            placeholder="Plan Name"
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
            value={newPlan.duration}
            onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
            placeholder="Duration (e.g., Monthly)"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <textarea
            value={newPlan.description}
            onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
            placeholder="Description"
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

      <h2 className="text-2xl font-semibold mb-4">Existing Plans</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading plans...</div>
      ) : (
        <div className="space-y-6">
          {plans.map((plan) => (
            <div key={plan._id} className="border p-4 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold">{plan.planName}</h3>
              <p className="text-gray-600">{plan.price} USD</p>
              <p className="text-gray-600">{plan.duration}</p>
              <p className="text-gray-500">{plan.description}</p>
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

      {editing && editPlan && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Edit Plan</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={editPlan.planName}
              onChange={(e) => setEditPlan({ ...editPlan, planName: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              value={editPlan.price}
              onChange={(e) => setEditPlan({ ...editPlan, price: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={editPlan.duration}
              onChange={(e) => setEditPlan({ ...editPlan, duration: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <textarea
              value={editPlan.description}
              onChange={(e) => setEditPlan({ ...editPlan, description: e.target.value })}
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
