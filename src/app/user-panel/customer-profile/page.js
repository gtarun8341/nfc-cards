"use client";
import { useState } from 'react';

const CustomerProfilePage = () => {
  const [customerData, setCustomerData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
  });

  const handleUpdateProfile = () => {
    // Logic to update customer profile
    alert('Profile updated successfully');
  };

  return (
    <div>
      <h1>Customer Profile</h1>
      <div>
        <p>Name: {customerData.name}</p>
        <p>Email: {customerData.email}</p>
        <p>Phone: {customerData.phone}</p>
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
