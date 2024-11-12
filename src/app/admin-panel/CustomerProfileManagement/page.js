import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as needed

const CustomerProfileManagementPage = () => {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  // Fetch customers when the component loads
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get('/api/users/users'); // Assuming '/api/users' is your route to fetch customers
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  // Handle edit functionality
  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setUpdatedName(customer.name);
  };

  // Update customer
  const handleUpdate = async (id) => {
    try {
      await api.put(`/api/users/users/${id}`, { name: updatedName }); // Assuming update route is '/api/users/:id'
      const updatedCustomers = customers.map((customer) =>
        customer._id === id ? { ...customer, name: updatedName } : customer
      );
      setCustomers(updatedCustomers);
      setEditCustomer(null);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/users/users/${id}`); // Assuming delete route is '/api/users/:id'
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Customer Profile Management</h2>

      {/* Customer Table */}
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100 text-left border-b">Name</th>
            <th className="py-2 px-4 bg-gray-100 text-left border-b">Email</th>
            <th className="py-2 px-4 bg-gray-100 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className="border-b">
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
              <td className="py-2 px-4">{customer.email}</td>
              <td className="py-2 px-4">
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
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerProfileManagementPage;
