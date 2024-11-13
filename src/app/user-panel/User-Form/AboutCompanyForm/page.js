"use client"; // Next.js Client Component

import { useEffect, useState } from "react";

const AboutCompanyForm = ({ onDataChange ,initialData}) => {
  const [data, setData] = useState({
    establishedYear: "",
    natureOfBusiness: "",
    gstNumber: "",
    aboutCompany: "",
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
      // Check the number of files selected
      if (files.length > 10) {
        alert("You can upload a maximum of 10 documents."); // Alert the user
        return; // Do not proceed if more than 10 files are selected
      }
      // Convert FileList to Array and get file names
      const newFiles = Array.from(files);
      setData((prevData) => ({ ...prevData, [name]: newFiles }));
      onDataChange({ [name]: newFiles });
    } else {
      const newValue = value;
      setData((prevData) => ({ ...prevData, [name]: newValue }));
      onDataChange({ [name]: newValue });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-semibold text-center mb-4">About Company</h2>
      <div className="overflow-y-auto max-h-96"> {/* Scrollable area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Two columns on medium screens and above */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Established Year</label>
            <input
              type="text"
              name="establishedYear"
              placeholder="Established Year"
              value={data.establishedYear}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
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
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
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
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">About Company</label>
            <textarea
              name="aboutCompany"
              placeholder="About Company"
              value={data.aboutCompany}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div className="col-span-2"> {/* Full width for documents input */}
            <label className="block text-sm font-medium text-gray-700">Documents (Max 10)</label>
            <input
              type="file"
              name="documents"
              accept=".pdf,.doc,.docx,.jpg,.png"
              multiple
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          {/* Displaying uploaded document names */}
          <div className="col-span-2 mt-4">
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
    </div>
  );
};

export default AboutCompanyForm;
