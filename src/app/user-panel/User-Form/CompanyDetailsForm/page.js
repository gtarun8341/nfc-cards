import { useEffect, useState } from "react";

const CompanyDetailsForm = ({ onDataChange,initialData }) => {
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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-semibold text-center mb-4">Company Details</h2>
      <div className="overflow-y-auto "> {/* Set a fixed height here */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="companyName">Company Name</label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              placeholder="Enter Company Name"
              value={data.companyName}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              value={data.name}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="designation">Designation</label>
            <input
              type="text"
              name="designation"
              id="designation"
              placeholder="Enter Designation"
              value={data.designation}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="contact1">Contact Number 1</label>
            <input
              type="text"
              name="contact1"
              id="contact1"
              placeholder="Enter Contact Number"
              value={data.contact1}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="contact2">Contact Number 2</label>
            <input
              type="text"
              name="contact2"
              id="contact2"
              placeholder="Enter Contact Number (optional)"
              value={data.contact2}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="whatsapp1">WhatsApp Number 1</label>
            <input
              type="text"
              name="whatsapp1"
              id="whatsapp1"
              placeholder="Enter WhatsApp Number"
              value={data.whatsapp1}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="whatsapp2">WhatsApp Number 2</label>
            <input
              type="text"
              name="whatsapp2"
              id="whatsapp2"
              placeholder="Enter WhatsApp Number (optional)"
              value={data.whatsapp2}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={data.email}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="website">Website</label>
            <input
              type="url"
              name="website"
              id="website"
              placeholder="Enter Website (optional)"
              value={data.website}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="googleMap">Google Map Link</label>
            <input
              type="text"
              name="googleMap"
              id="googleMap"
              placeholder="Enter Google Map Link (optional)"
              value={data.googleMap}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="address">Address</label>
            <textarea
              name="address"
              id="address"
              placeholder="Enter Address"
              value={data.address}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="logo">Upload Logo</label>
            <input
              type="file"
              name="logo"
              id="logo"
              accept="image/*"
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsForm;
