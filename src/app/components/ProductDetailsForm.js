"use client";

import { useEffect, useState } from "react";
import api from "../apiConfig/axiosConfig";
const MAX_IMAGE_SIZE_MB = 1;

const ProductDetailsForm = ({ onDataChange, initialData }) => {
  const [products, setProducts] = useState([
    {
      productName: "",
      productPrice: "",
      productImage: null,
      productType: "",
      hsnCode: "",
      gst: "",
      units: "",
      category: "",
    },
  ]);

  const [uploadStats, setUploadStats] = useState({
    uploadedCount: 0,
    uploadLimit: 0,
    remainingUploads: 0,
  });

  const [error, setError] = useState("");

  // Fetch product upload stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("authToken");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await api.get("/api/products/product-upload-stats", config); // use actual API route
        setUploadStats(res.data);
      } catch (err) {
        console.error("Failed to fetch product stats", err);
      }
    };

    fetchStats();
  }, []);

  // Load initial products from initialData
  useEffect(() => {
    if (initialData?.products?.length) {
      setProducts(
        initialData.products.map((product) => ({
          productName: product.productName || "",
          productPrice: product.productPrice || "",
          productImage: product.productImage || null,
          productType: product.productType || "",
          hsnCode: product.hsnCode || "",
          gst: product.gst || "",
          units: product.units || "",
          category: product.category || "",
        }))
      );
    }
  }, [initialData]);

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    let newValue = files ? files[0] : value;

    // Validate image size
    if (name === "productImage" && newValue) {
      const sizeMB = newValue.size / (1024 * 1024);
      if (sizeMB > MAX_IMAGE_SIZE_MB) {
        setError("Image must be less than or equal to 1MB.");
        return;
      }
    }

    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: newValue };

    setProducts(updatedProducts);
    onDataChange({ products: updatedProducts });
    setError("");
  };

  const addProduct = () => {
    const remaining = uploadStats.remainingUploads;
    const maxReached =
      remaining !== "unlimited" && products.length >= remaining;

    if (maxReached) {
      setError(
        "You have reached your product upload limit.Upgrade your subscription plan to add more products"
      );
      return;
    }

    setProducts([
      ...products,
      {
        productName: "",
        productPrice: "",
        productImage: null,
        productType: "",
        hsnCode: "",
        gst: "",
        units: "",
        category: "",
      },
    ]);
    setError("");
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    onDataChange({ products: updatedProducts });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Product Details
      </h2>

      <p className="text-center text-sm text-gray-600 mb-6">
        {uploadStats.uploadedCount} uploaded /{" "}
        {uploadStats.uploadLimit === "unlimited"
          ? "Unlimited"
          : uploadStats.uploadLimit}{" "}
        allowed
      </p>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="border p-6 rounded-xl shadow-sm hover:shadow-lg transition-transform duration-200"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Product Set {index + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Inputs Same as Before */}
              <InputField
                label="Product Name"
                name="productName"
                type="text"
                value={product.productName}
                onChange={(e) => handleChange(index, e)}
              />
              <InputField
                label="Product Price"
                name="productPrice"
                type="number"
                value={product.productPrice}
                onChange={(e) => handleChange(index, e)}
              />
              <InputField
                label="HSN Code"
                name="hsnCode"
                type="text"
                value={product.hsnCode}
                onChange={(e) => handleChange(index, e)}
              />
              <InputField
                label="GST (%)"
                name="gst"
                type="number"
                value={product.gst}
                onChange={(e) => handleChange(index, e)}
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <input
                  type="file"
                  name="productImage"
                  accept="image/*"
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
              {/* Dropdowns */}
              {renderDropdown(
                "Product Type",
                "productType",
                product.productType,
                index,
                [
                  ["", "Select Product Type"],
                  ["product", "Product"],
                  ["service", "Service"],
                ],
                handleChange
              )}

              {renderDropdown(
                "Category",
                "category",
                product.category,
                index,
                [
                  ["", "Select Category"],
                  ["grocery", "Grocery"],
                  ["electronics", "Electronics"],
                  ["clothing", "Clothing"],
                  ["furniture", "Furniture"],
                  ["services", "Services"],
                  ["other", "Other"],
                ],
                handleChange
              )}

              {renderDropdown(
                "Units",
                "units",
                product.units,
                index,
                [
                  ["", "Select Units"],
                  ["kg", "Kilograms (kg)"],
                  ["g", "Grams (g)"],
                  ["litre", "Litres (L)"],
                  ["ml", "Millilitres (ml)"],
                  ["piece", "Piece"],
                ],
                handleChange
              )}
            </div>
            {/* Optional delete per product */}
            {/* <button onClick={() => deleteProduct(index)} className="mt-4 text-red-500">Delete</button> */}
          </div>
        ))}
        <button
          type="button"
          onClick={addProduct}
          className="mt-6 w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Add New Product Set
        </button>
      </div>
    </div>
  );
};

// Utility: input field
const InputField = ({ label, name, type, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      placeholder={label}
      onChange={onChange}
      className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
    />
  </div>
);

// Utility: dropdown select
const renderDropdown = (label, name, value, index, options, handleChange) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={(e) => handleChange(index, e)}
      className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
    >
      {options.map(([val, text]) => (
        <option key={val} value={val}>
          {text}
        </option>
      ))}
    </select>
  </div>
);

export default ProductDetailsForm;
