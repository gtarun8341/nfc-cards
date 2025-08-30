"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../apiConfig/axiosConfig";

const CompanyDetailsForm = ({ onSubmit }) => {
  const [logoSizeMB, setLogoSizeMB] = useState(null);
  const [loading, setLoading] = useState(true); // Initially true to wait for API response

  const [data, setData] = useState({
    _id: null, // explicitly null means new record
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
    logoUrl: "",
  });

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log("Token from localStorage:", token);

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const res = await api.get("/api/company-details", config);
        console.log("Response from API:", res);

        if (res.data) {
          setData({
            ...res.data,
            _id: res.data._id || null, // ensure _id is set if present
            logoUrl: res.data.logo
              ? `${api.defaults.baseURL}/uploads/companyDetails/${res.data.userId}/${res.data.logo}`
              : "",
            logo: null,
          });
        } else {
          setData((prev) => ({
            ...prev,
            _id: null, // no record exists => add mode
          }));
        }
      } catch (error) {
        if (error.response?.status === 404) {
          // No company details found — initialize empty form without error toast
          setData({
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
            logoUrl: "",
          });
        } else {
          toast.error("Failed to fetch company details");
        }
        setLoading(false);
      } finally {
        setLoading(false);
        console.log("Loading set to false");
      }
    };

    fetchCompanyDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo" && files.length > 0) {
      const file = files[0];
      setLogoSizeMB((file.size / (1024 * 1024)).toFixed(2));
      setData((prev) => ({
        ...prev,
        logo: file,
        logoUrl: URL.createObjectURL(file), // show preview of new logo
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add mode: all required fields must be filled
    if (!data._id) {
      const requiredFields = [
        "companyName",
        "name",
        "designation",
        "email",
        "contact1",
        "contact2",
        "whatsapp1",
        "whatsapp2",
        "website",
        "googleMap",
        "address",
      ];
      for (const field of requiredFields) {
        if (!data[field]) {
          toast.error(`Please fill in ${field}`);
          return;
        }
      }
      // Check logo: either new file or existing logo URL must be present
      if (!data.logo && !data.logoUrl) {
        toast.error("Please upload a logo");
        return;
      }
    }

    // Update mode: allow partial updates (no strict validation)

    const formData = new FormData();

    // Append only fields that have value to support partial updates
    [
      "companyName",
      "name",
      "designation",
      "contact1",
      "contact2",
      "whatsapp1",
      "whatsapp2",
      "email",
      "website",
      "googleMap",
      "address",
    ].forEach((key) => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
        formData.append(key, data[key]);
      }
    });

    if (data.logo) {
      formData.append("logo", data.logo);
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (data._id) {
        // Update existing
        await api.put("/api/company-details", formData, config);
        toast.success("Company details updated successfully!");
      } else {
        // Add new
        await api.post("/api/company-details", formData, config);
        toast.success("Company details added successfully!");
      }

      if (onSubmit) onSubmit(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save company details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center p-4">Loading...</p>; // Show loading state until data loaded
  }

  // When data is ready, render form
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto p-4">
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
          { label: "Contact Number 2", name: "contact2", type: "text" },
          {
            label: "WhatsApp Number 1",
            name: "whatsapp1",
            type: "text",
            required: true,
          },
          { label: "WhatsApp Number 2", name: "whatsapp2", type: "text" },
          { label: "Email", name: "email", type: "email", required: true },
          { label: "Website", name: "website", type: "url" },
          { label: "Google Map Link", name: "googleMap", type: "text" },
        ].map(({ label, name, type, required }) => (
          <div key={name} className="w-full">
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              placeholder={`Enter ${label}`}
              value={data[name] || ""}
              onChange={handleChange}
              required={required}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        ))}
        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <textarea
            name="address"
            id="address"
            placeholder="Enter Address"
            value={data.address || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="logo"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Logo (Max 5 MB)
          </label>
          {data.logoUrl && (
            <img
              src={data.logoUrl}
              alt="Company Logo"
              className="mb-2 max-h-24 rounded"
            />
          )}
          <input
            type="file"
            name="logo"
            id="logo"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const sizeMB = file.size / (1024 * 1024);
                if (sizeMB > 5) {
                  toast.error("File size should not exceed 5 MB.");
                  e.target.value = "";
                  setLogoSizeMB(null);
                  return;
                }
                setLogoSizeMB(sizeMB.toFixed(2));
                handleChange(e);
              }
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {logoSizeMB && (
            <p className="text-sm text-gray-600 mt-1">
              Selected file size: <strong>{logoSizeMB} MB</strong>
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-colors"
        >
          {loading ? "Saving..." : data._id ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CompanyDetailsForm;
