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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-semibold text-center mb-4">Bank Details</h2>
      <div className="overflow-y-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2"> {/* Two columns layout on medium screens */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              value={data.bankName}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              value={data.accountNumber}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Name</label>
            <input
              type="text"
              name="branchName"
              placeholder="Branch Name"
              value={data.branchName}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              placeholder="IFSC Code"
              value={data.ifscCode}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
            <input
              type="text"
              name="accountHolderName"
              placeholder="Account Holder Name"
              value={data.accountHolderName}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Google Pay Number</label>
            <input
              type="text"
              name="gPayNumber"
              placeholder="Google Pay Number"
              value={data.gPayNumber}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Paytm Number</label>
            <input
              type="text"
              name="paytmNumber"
              placeholder="Paytm Number"
              value={data.paytmNumber}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">PhonePe Number</label>
            <input
              type="text"
              name="phonePeNumber"
              placeholder="PhonePe Number"
              value={data.phonePeNumber}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">UPI ID</label>
            <input
              type="text"
              name="upiId"
              placeholder="UPI ID"
              value={data.upiId}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div className="md:col-span-2"> {/* Full width for the account type dropdown */}
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            <select
              name="accountType"
              value={data.accountType}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            >
              <option value="">Select Account Type</option>
              <option value="savings">Savings</option>
              <option value="current">Current</option>
            </select>
          </div>
          <div className="md:col-span-2"> {/* Full width for the QR code upload */}
            <label className="block text-sm font-medium text-gray-700">QR Code Images (Max 4)</label>
            <input
              type="file"
              name="qrImages"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          {/* Displaying uploaded QR code image names */}
          <div className="md:col-span-2 mt-4">
            {data.qrImages.length > 0 && (
              <div>
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
      </div>
    </div>
  );
};

export default BankDetailsForm;
