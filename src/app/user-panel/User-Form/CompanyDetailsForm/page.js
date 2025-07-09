"use client"; // Next.js Client Component

import { useEffect, useState } from "react";

const CompanyDetailsForm = ({ onDataChange, initialData }) => {
  const [data, setData] = useState({
    companyName: "",
    name: "",
    designation: "",
    contact1: "",
    contact2: "",
    whatsapp1: "",
    whatsapp2: "",
    email: "",
    website: "",
    googleMap: "",
    address: "",
    logo: null,
  });

  // Effect to set initial data
  useEffect(() => {
    if (initialData) {
      setData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setData((prevData) => ({ ...prevData, [name]: newValue }));
    onDataChange({ [name]: newValue });

    // Log the updated data
    console.log("Updated Form Data:", { ...data, [name]: newValue });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Company Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            label: "Company Name",
            name: "companyName",
            type: "text",
            required: true,
          },
          { label: "Your Name", name: "name", type: "text", required: true },
          {
            label: "Designation",
            name: "designation",
            type: "text",
            required: true,
          },
          {
            label: "Contact Number 1",
            name: "contact1",
            type: "text",
            required: true,
          },
          {
            label: "Contact Number 2",
            name: "contact2",
            type: "text",
            required: false,
          },
          {
            label: "WhatsApp Number 1",
            name: "whatsapp1",
            type: "text",
            required: true,
          },
          {
            label: "WhatsApp Number 2",
            name: "whatsapp2",
            type: "text",
            required: false,
          },
          { label: "Email", name: "email", type: "email", required: true },
          { label: "Website", name: "website", type: "url", required: false },
          {
            label: "Google Map Link",
            name: "googleMap",
            type: "text",
            required: false,
          },
        ].map(({ label, name, type, required }) => (
          <div key={name} className="w-full">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor={name}
            >
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              placeholder={`Enter ${label}`}
              value={data[name]}
              onChange={handleChange}
              required={required}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>
        ))}
        <div className="col-span-1 md:col-span-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="address"
          >
            Address
          </label>
          <textarea
            name="address"
            id="address"
            placeholder="Enter Address"
            value={data.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="logo"
          >
            Upload Logo
          </label>
          <input
            type="file"
            name="logo"
            id="logo"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsForm;
