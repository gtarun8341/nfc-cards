"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../apiConfig/axiosConfig";

const BankDetailsForm = ({ onSubmit }) => {
  const [qrFileInfos, setQrFileInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrNewFiles, setQrNewFiles] = useState([]);
  const [data, setData] = useState({
    _id: null, // track if editing
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
    usePaymentGateway: false,
    razorpayKeyId: "",
    razorpayKeySecret: "",
    qrImages: [],
  });

  // Load initial data on mount (GET)
  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await api.get("/api/bank-details", config);
        if (res.data?.qrImages?.length > 0) {
          const uploadedFiles = res.data.qrImages.map((name) => ({
            name,
            url: `${api.defaults.baseURL}/uploads/bankDetails/${res.data.userId}/${name}`,
            isUploaded: true,
          }));
          console.log("Uploaded QR Files:", uploadedFiles);
          setQrFileInfos(uploadedFiles);
        }
        if (res.data) {
          setData({
            ...res.data,
            _id: res.data._id || null,
            qrImages: [], // new files start empty
          });
          setQrFileInfos(
            res.data.qrImages?.map((fileName) => ({
              name: fileName,
              sizeMB: "N/A (uploaded)",
            })) || []
          );
        } else {
          setData((prev) => ({ ...prev, _id: null }));
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setData((prev) => ({ ...prev, _id: null }));
        } else {
          toast.error("Failed to fetch bank details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, []);

  // Handle changes including file validation and upload
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "qrImages") {
      const maxFiles = 4;
      const maxSize = 1 * 1024 * 1024; // 1 MB
      const selectedFiles = Array.from(files);

      if (selectedFiles.length > maxFiles) {
        toast.error("You can upload a maximum of 4 QR code images.");
        return;
      }

      const validFiles = [];
      const rejectedFiles = [];

      selectedFiles.forEach((file) => {
        if (file.size <= maxSize) {
          validFiles.push(file);
        } else {
          rejectedFiles.push(file.name);
        }
      });

      if (rejectedFiles.length > 0) {
        toast.error(
          `These files exceed 1 MB and were not uploaded: ${rejectedFiles.join(
            ", "
          )}`
        );
      }

      const newFileInfos = validFiles.map((file) => ({
        name: file.name,
        sizeMB: (file.size / (1024 * 1024)).toFixed(2),
      }));

      setQrFileInfos(newFileInfos);
      const newFilePreviews = selectedFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file), // local preview url
        isUploaded: false, // mark as new file
        fileObj: file, // keep file object to append in formData
      }));
      setQrNewFiles((prev) => [...prev, ...newFilePreviews]);

      // Save files to data for form submission
      setData((prev) => ({
        ...prev,
        qrImages: [...(prev.qrImages || []), ...selectedFiles],
      }));
    } else if (type === "checkbox") {
      setData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const removeNewQrFile = (urlToRemove) => {
    setQrNewFiles((prev) => prev.filter((f) => f.url !== urlToRemove));
    setData((prev) => ({
      ...prev,
      qrImages: prev.qrImages.filter(
        (f) => URL.createObjectURL(f) !== urlToRemove
      ),
    }));
  };
  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic field validation for add mode
    if (!data._id) {
      const requiredFields = [
        "bankName",
        "accountNumber",
        "branchName",
        "ifscCode",
        "accountHolderName",
        "gPayNumber",
        "paytmNumber",
        "phonePeNumber",
        "upiId",
        "accountType",
      ];

      for (const field of requiredFields) {
        if (!data[field]) {
          toast.error(`${field} is required`);
          return;
        }
      }

      // If payment gateway is toggled on, require Razorpay keys
      if (data.usePaymentGateway) {
        if (!data.razorpayKeyId || !data.razorpayKeySecret) {
          toast.error("Razorpay Key ID and Key Secret are required!");
          return;
        }
      }

      // Check for at least one QR image on add
      if (
        (qrFileInfos.length === 0 ||
          qrFileInfos.every((f) => f.sizeMB === "N/A (uploaded)")) &&
        data.qrImages.length === 0
      ) {
        toast.error("Please upload at least one QR code image.");
        return;
      }
    } else {
      // Update mode: only check Razorpay fields if gateway enabled
      if (data.usePaymentGateway) {
        if (!data.razorpayKeyId || !data.razorpayKeySecret) {
          toast.error("Razorpay Key ID and Key Secret are required!");
          return;
        }
      }
    }

    // Prepare FormData with present fields and file uploads
    const formData = new FormData();

    [
      "bankName",
      "accountNumber",
      "branchName",
      "ifscCode",
      "accountHolderName",
      "gPayNumber",
      "paytmNumber",
      "phonePeNumber",
      "upiId",
      "accountType",
      "usePaymentGateway",
      "razorpayKeyId",
      "razorpayKeySecret",
    ].forEach((key) => {
      if (
        (key === "razorpayKeyId" || key === "razorpayKeySecret") &&
        !data.usePaymentGateway
      ) {
        // Skip razorpay keys if gateway not enabled
        return;
      }
      if (typeof data[key] === "boolean") {
        formData.append(key, data[key] ? "true" : "false");
      } else if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    if (data.qrImages && data.qrImages.length > 0) {
      data.qrImages.forEach((file) => {
        formData.append("qrImages", file);
      });
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
        await api.put("/api/bank-details", formData, config);
        toast.success("Bank details updated successfully!");
      } else {
        await api.post("/api/bank-details", formData, config);
        toast.success("Bank details added successfully!");
      }

      if (onSubmit) onSubmit(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save bank details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center p-4">Loading Bank Details...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            label: "Bank Name",
            name: "bankName",
            type: "text",
            required: true,
          },
          {
            label: "Account Number",
            name: "accountNumber",
            type: "text",
            required: true,
          },
          {
            label: "Branch Name",
            name: "branchName",
            type: "text",
            required: true,
          },
          {
            label: "IFSC Code",
            name: "ifscCode",
            type: "text",
            required: true,
          },
          {
            label: "Account Holder Name",
            name: "accountHolderName",
            type: "text",
            required: true,
          },
          { label: "Google Pay Number", name: "gPayNumber", type: "text" },
          { label: "Paytm Number", name: "paytmNumber", type: "text" },
          { label: "PhonePe Number", name: "phonePeNumber", type: "text" },
          { label: "UPI ID", name: "upiId", type: "text" },
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
              id={name}
              name={name}
              placeholder={`Enter ${label}`}
              value={data[name] || ""}
              onChange={handleChange}
              required={required}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        ))}

        <div className="col-span-1 md:col-span-2">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              name="usePaymentGateway"
              checked={data.usePaymentGateway}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-sm text-gray-700">
              I want to use my payment gateway (Razorpay)
            </span>
          </label>
        </div>

        {data.usePaymentGateway && (
          <>
            <div className="w-full">
              <label
                htmlFor="razorpayKeyId"
                className="block text-sm font-medium text-gray-700"
              >
                Razorpay Key ID
              </label>
              <input
                type="text"
                id="razorpayKeyId"
                name="razorpayKeyId"
                placeholder="Enter Razorpay Key ID"
                value={data.razorpayKeyId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="razorpayKeySecret"
                className="block text-sm font-medium text-gray-700"
              >
                Razorpay Key Secret
              </label>
              <input
                type="text"
                id="razorpayKeySecret"
                name="razorpayKeySecret"
                placeholder="Enter Razorpay Key Secret"
                value={data.razorpayKeySecret}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </>
        )}

        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="accountType"
            className="block text-sm font-medium text-gray-700"
          >
            Account Type
          </label>
          <select
            id="accountType"
            name="accountType"
            value={data.accountType || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Account Type</option>
            <option value="savings">Savings</option>
            <option value="current">Current</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="qrImages"
            className="block text-sm font-medium text-gray-700"
          >
            QR Code Images (Max 4 files, 1MB each)
          </label>

          {/* Show uploaded images */}
          {qrFileInfos.length > 0 && (
            <div className="flex space-x-4 mt-2">
              {qrFileInfos.map(({ name, url }, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt={name}
                    className="h-24 w-auto rounded border"
                  />
                  <p className="text-xs mt-1 text-gray-600 text-center">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Show new (selected, not yet uploaded) images */}
          {qrNewFiles && qrNewFiles.length > 0 && (
            <div className="flex space-x-4 mt-2">
              {qrNewFiles.map(({ name, url }, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt={name}
                    className="h-24 w-auto rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewQrFile(url)}
                    className="absolute top-0 right-0 text-red-600 hover:text-red-800 bg-white bg-opacity-60 rounded-full"
                    title="Remove"
                  >
                    ×
                  </button>
                  <p className="text-xs mt-1 text-gray-600 text-center">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          )}

          <input
            type="file"
            id="qrImages"
            name="qrImages"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-colors"
        >
          {loading ? "Saving..." : data._id ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default BankDetailsForm;
