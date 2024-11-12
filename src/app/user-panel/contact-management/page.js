import React, { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig'; // Adjust the path as needed

const ContactManagementPage = () => {
  const [contact, setContact] = useState({
    name: '',
    reference: '',
    profession: '',
    industry: '',
    category: '',
    designation: '',
    companyName: '',
    mobileNumber: '',
    email: '',
    website: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
  });

  const [contacts, setContacts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
      const response = await api.get('/api/contacts', config); // GET request to fetch contacts
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleChange = (e) => {
    setContact((prevContact) => ({
      ...prevContact,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken'); // Assuming token is stored here
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
      await api.post('/api/contacts', contact, config); // POST request to save contact
      alert('Contact saved successfully');
      fetchContacts(); // Fetch updated contacts
      setIsAdding(false); // Close the form after submission
      setContact({ // Clear form after submission
        name: '',
        reference: '',
        profession: '',
        industry: '',
        category: '',
        designation: '',
        companyName: '',
        mobileNumber: '',
        email: '',
        website: '',
        address: '',
        city: '',
        state: '',
        pinCode: '',
      });
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  // Reusable Input Field Component (same structure as CRMPage)
  const InputField = ({ label, name, value, onChange, placeholder, required = false }) => (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        id={name}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-semibold text-center mb-4">Contact Management</h1>

      <button
        onClick={() => setIsAdding(!isAdding)}
        className="mb-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {isAdding ? 'Cancel' : 'Add New Contact'}
      </button>

      {isAdding && (
        <form onSubmit={handleSubmit} className="space-y-6 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField
              label="Name"
              name="name"
              value={contact.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
            <InputField
              label="Reference"
              name="reference"
              value={contact.reference}
              onChange={handleChange}
              placeholder="Enter reference"
            />
            <InputField
              label="Profession"
              name="profession"
              value={contact.profession}
              onChange={handleChange}
              placeholder="Enter profession"
            />
            <InputField
              label="Industry"
              name="industry"
              value={contact.industry}
              onChange={handleChange}
              placeholder="Enter industry"
            />
            <InputField
              label="Category"
              name="category"
              value={contact.category}
              onChange={handleChange}
              placeholder="Enter category"
            />
            <InputField
              label="Designation"
              name="designation"
              value={contact.designation}
              onChange={handleChange}
              placeholder="Enter designation"
            />
            <InputField
              label="Company"
              name="companyName"
              value={contact.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
            />
            <InputField
              label="Mobile"
              name="mobileNumber"
              value={contact.mobileNumber}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
            />
            <InputField
              label="Email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            <InputField
              label="Website"
              name="website"
              value={contact.website}
              onChange={handleChange}
              placeholder="Enter website"
            />
            <InputField
              label="Address"
              name="address"
              value={contact.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
            <InputField
              label="City"
              name="city"
              value={contact.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
            <InputField
              label="State"
              name="state"
              value={contact.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
            <InputField
              label="Pin Code"
              name="pinCode"
              value={contact.pinCode}
              onChange={handleChange}
              placeholder="Enter pin code"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save Contact
          </button>
        </form>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4">Contacts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Reference</th>
              <th className="px-4 py-2 text-left">Profession</th>
              <th className="px-4 py-2 text-left">Industry</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Website</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">City</th>
              <th className="px-4 py-2 text-left">State</th>
              <th className="px-4 py-2 text-left">Pin Code</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{contact.name}</td>
                <td className="px-4 py-2">{contact.reference}</td>
                <td className="px-4 py-2">{contact.profession}</td>
                <td className="px-4 py-2">{contact.industry}</td>
                <td className="px-4 py-2">{contact.category}</td>
                <td className="px-4 py-2">{contact.designation}</td>
                <td className="px-4 py-2">{contact.companyName}</td>
                <td className="px-4 py-2">{contact.mobileNumber}</td>
                <td className="px-4 py-2">{contact.email}</td>
                <td className="px-4 py-2">{contact.website}</td>
                <td className="px-4 py-2">{contact.address}</td>
                <td className="px-4 py-2">{contact.city}</td>
                <td className="px-4 py-2">{contact.state}</td>
                <td className="px-4 py-2">{contact.pinCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactManagementPage;
