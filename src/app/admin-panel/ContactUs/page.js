// components/ContactUs.js

import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulating form submission
    setSuccess(true);
    setErrors({});
    setFormData({ name: '', email: '', message: '' });
    // You can replace this with an actual API call to submit the form
  };

  return (
    <div className="max-w-md mx-auto p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
      {success && <p className="text-green-600 mb-4 text-center">Message sent successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`border rounded-lg p-3 w-full bg-gray-100 transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-400 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`border rounded-lg p-3 w-full bg-gray-100 transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-400 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your Email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`border rounded-lg p-3 w-full bg-gray-100 h-32 transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-400 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your Message"
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-400"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
