"use client"; // Next.js Client Component

import { useEffect, useState } from "react";

const BankDetailsForm = ({ onDataChange,initialData }) => {
  const [data, setData] = useState({
    bankName: "",
    accountNumber: "",
    branchName: "",
    ifscCode: "",
    accountHolderName: "",
    gPayNumber: "",
    paytmNumber: "",
    phonePeNumber: "",
    upiId: "",
    accountType: "",
    qrImages: [],
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

    if (name === "qrImages") {
      // Limit to a maximum of 4 files
      if (files.length > 4) {
        alert("You can upload a maximum of 4 QR code images."); // Alert the user
        return; // Do not proceed if more than 4 files are selected
      }
      // Convert FileList to Array and get file names
      const newFiles = Array.from(files);
      setData((prevData) => ({ ...prevData, [name]: newFiles }));
      onDataChange({ [name]: newFiles });
    } else {
      const newValue = files ? Array.from(files) : value;
      setData((prevData) => ({ ...prevData, [name]: newValue }));
      onDataChange({ [name]: newValue });
    }
  };

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Bank Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[ 
            { label: "Bank Name", name: "bankName", type: "text", required: true },
            { label: "Account Number", name: "accountNumber", type: "text", required: true },
            { label: "Branch Name", name: "branchName", type: "text", required: true },
            { label: "IFSC Code", name: "ifscCode", type: "text", required: true },
            { label: "Account Holder Name", name: "accountHolderName", type: "text", required: true },
            { label: "Google Pay Number", name: "gPayNumber", type: "text", required: false },
            { label: "Paytm Number", name: "paytmNumber", type: "text", required: false },
            { label: "PhonePe Number", name: "phonePeNumber", type: "text", required: false },
            { label: "UPI ID", name: "upiId", type: "text", required: false },
          ].map(({ label, name, type, required }) => (
            <div key={name} className="w-full">
              <label className="block text-sm font-medium text-gray-700" htmlFor={name}>{label}</label>
              <input
                type={type}
                name={name}
                id={name}
                placeholder={`Enter ${label}`}
                value={data[name] || ''}
                onChange={handleChange}
                required={required}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
          ))}
          
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="accountType">Account Type</label>
            <select
              name="accountType"
              id="accountType"
              value={data.accountType || ''}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            >
              <option value="">Select Account Type</option>
              <option value="savings">Savings</option>
              <option value="current">Current</option>
            </select>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="qrImages">QR Code Images (Max 4)</label>
            <input
              type="file"
              name="qrImages"
              id="qrImages"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>
          
          {data.qrImages && data.qrImages.length > 0 && (
            <div className="col-span-1 md:col-span-2 mt-4">
              <h3 className="text-sm font-medium text-gray-700">Uploaded QR Code Images:</h3>
              <ul className="mt-2 list-disc pl-5">
                {data.qrImages.map((file, index) => (
                  <li key={index} className="text-gray-600">{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default BankDetailsForm;