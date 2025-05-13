"use client"; // Next.js Client Component

import { useEffect, useState } from "react";

const AboutCompanyForm = ({ onDataChange, initialData }) => {
  const [data, setData] = useState({
    establishedYear: "",
    natureOfBusiness: "",
    gstNumber: "",
    description: "",
    termsAndConditions: "",
    messages: "",
    documents: [],
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
    if (name === "documents") {
      if (files.length > 10) {
        alert("You can upload a maximum of 10 documents.");
        return;
      }
      const newFiles = Array.from(files);
      setData((prevData) => ({ ...prevData, [name]: newFiles }));
      onDataChange({ [name]: newFiles });
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
      onDataChange({ [name]: value });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">About Company</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Established Year</label>
          <input
            type="text"
            name="establishedYear"
            placeholder="Established Year"
            value={data.establishedYear}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nature of Business</label>
          <input
            type="text"
            name="natureOfBusiness"
            placeholder="Nature of Business"
            value={data.natureOfBusiness}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">GST Number</label>
          <input
            type="text"
            name="gstNumber"
            placeholder="GST Number"
            value={data.gstNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">About Company</label>
          <textarea
            name="description"
            placeholder="Description"
            value={data.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Terms and Conditions</label>
          <textarea
            name="termsAndConditions"
            placeholder="Enter Terms and Conditions"
            value={data.termsAndConditions}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Messages</label>
          <textarea
            name="messages"
            placeholder="Enter Messages"
            value={data.messages}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Documents (Max 10)</label>
          <input
            type="file"
            name="documents"
            accept=".pdf,.doc,.docx,.jpg,.png"
            multiple
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          {data.documents.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700">Uploaded Documents:</h3>
              <ul className="mt-2 list-disc pl-5">
                {data.documents.map((file, index) => (
                  <li key={index} className="text-gray-600">{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutCompanyForm;