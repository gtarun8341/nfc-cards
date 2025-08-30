import { useEffect, useState } from "react";
import api from "../apiConfig/axiosConfig";
import toast from "react-hot-toast";
import {
  addProducts,
  updateProductById,
  deleteProductById,
} from "./productapi";

const ProductDetailsForm = ({ onSubmit }) => {
  const [products, setProducts] = useState([
    {
      _id: null, // Include this line to save ID
      productName: "",
      productPrice: "",
      productImage: null,
      productType: "",
      hsnCode: "",
      gst: "",
      units: "",
      category: "",
      discount: null, // use null or 0 here
    },
  ]);
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [uploadStats, setUploadStats] = useState({
    uploadedCount: 0,
    uploadLimit: 0,
    remainingUploads: 0,
  });
  const [error, setError] = useState("");

  // Fetch product data, stats, categories, and units on mount
  const fetchProducts = async () => {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const [productsRes, statsRes, catUnitRes] = await Promise.all([
        api.get("/api/products-details", config), // Adjust path if different
        api.get("/api/products-details/product-upload-stats", config),
        api.get("/api/category-units", config),
      ]);

      if (productsRes.data && productsRes.data.length > 0) {
        // Map backend product data to your form's shape
        setProducts(
          productsRes.data.map((product) => ({
            _id: product._id, // Include this line to save ID
            productName: product.productName || "",
            productPrice: product.productPrice || "",
            productImage: product.productImage || null,
            productType: product.productType || "",
            hsnCode: product.hsnCode || "",
            gst: product.gst || "",
            units: product.units || "",
            category: product.category || "",
            discount: product.discount != null ? product.discount : null,
          }))
        );
      } else {
        // No products, keep default blank
        setProducts([
          {
            _id: null, // Include this line to save ID
            productName: "",
            productPrice: "",
            productImage: null,
            productType: "",
            hsnCode: "",
            gst: "",
            units: "",
            category: "",
            discount: null,
          },
        ]);
      }

      setUploadStats(statsRes.data);
      setCategories(catUnitRes.data.categories || []);
      setUnits(catUnitRes.data.units || []);
    } catch (err) {
      console.error("Failed to fetch product data or metadata", err);
      toast.error("Failed to fetch product information");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const MAX_IMAGE_SIZE_MB = 1; // 1MB
  const validateProducts = (products, isUpdate = false) => {
    for (const [i, product] of products.entries()) {
      if (!product.productName || !product.productName.trim()) {
        toast.error(`Product #${i + 1}: Product Name is required.`);
        return false;
      }

      if (!isUpdate) {
        // All fields required if adding new
        if (!product.productPrice) {
          toast.error(`Product #${i + 1}: Product Price is required.`);
          return false;
        }
        if (!product.productType) {
          toast.error(`Product #${i + 1}: Product Type is required.`);
          return false;
        }
        if (!product.hsnCode) {
          toast.error(`Product #${i + 1}: HSN Code is required.`);
          return false;
        }
        if (!product.gst) {
          toast.error(`Product #${i + 1}: GST is required.`);
          return false;
        }
        if (!product.units) {
          toast.error(`Product #${i + 1}: Units is required.`);
          return false;
        }
        if (!product.category) {
          toast.error(`Product #${i + 1}: Category is required.`);
          return false;
        }
        // if (!product.discount) {
        //   toast.error(`Product #${i + 1}: Discount is required.`);
        //   return false;
        // }
        // // Image required and must be File instance
        // if (!(product.productImage instanceof File)) {
        //   toast.error(`Product #${i + 1}: Product Image is required.`);
        //   return false;
        // }
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateProducts(products)) return;

    const newProducts = products.filter((p) => !p._id);
    const existingProducts = products.filter((p) => p._id);
    console.log("New Products:", newProducts);
    console.log("Existing Products:", existingProducts);
    try {
      if (newProducts.length > 0) {
        await addProducts(newProducts);
        toast.success("New products added successfully!");
      }

      if (existingProducts.length > 0) {
        // Sequentially or concurrently update each product
        await Promise.all(
          existingProducts.map((product) =>
            updateProductById(product._id, product)
          )
        );
        toast.success("Products updated successfully!");
      }
      await fetchProducts(); // Refresh products after add/update

      if (onSubmit) onSubmit();
    } catch (error) {
      console.error("Error submitting products", error);
      toast.error("Failed to submit products");
    }
  };

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    let newValue = files ? files[0] : value;
    if (name === "discount") {
      newValue = value === "" ? null : Number(value);
    }
    if (name === "productImage" && newValue) {
      const sizeMB = newValue.size / (1024 * 1024);
      if (sizeMB > MAX_IMAGE_SIZE_MB) {
        toast.error("Image must be ≤ 1MB.");
        setError("Image must be ≤ 1MB.");
        return;
      }
    }

    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: newValue };

    setProducts(updatedProducts);
    setError("");
  };

  const addProduct = () => {
    const uploadedCount = uploadStats.uploadedCount;
    const uploadLimit = uploadStats.uploadLimit;

    const newProductsCount = products.filter((p) => !p.id).length;
    const totalAfterAdd = uploadedCount + newProductsCount + 1;

    if (uploadLimit !== "unlimited" && totalAfterAdd > uploadLimit) {
      const msg =
        "You have reached your product upload limit. Upgrade your plan to add more products.";
      toast.error(msg);
      setError(msg);
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
        discount: "",
      },
    ]);
    setError("");
  };

  const categoryOptions = [
    ["", "Select Category"],
    ...categories.map((c) => [c.name, c.name]),
  ];
  const unitOptions = [
    ["", "Select Unit"],
    ...units.map((u) => [u.abbreviation || u.name, u.name]),
  ];

  const deleteProduct = async (index) => {
    const productToDelete = products[index];
    console.log(productToDelete);
    if (productToDelete._id) {
      // Product exists in DB, delete via API then update UI
      try {
        await deleteProductById(productToDelete._id);
        toast.success("Product deleted .");
        await fetchProducts(); // Refresh products after add/update
      } catch (error) {
        console.error("Failed to delete product ", error);
        toast.error("Failed to delete product.");
        return; // stop further UI update if deletion failed
      }
    }

    // Remove product from frontend state regardless (new or deleted)
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto p-4">
      <p className="text-sm text-gray-600 mb-6">
        {uploadStats.uploadedCount} uploaded /
        {uploadStats.uploadLimit === "unlimited"
          ? " Unlimited"
          : ` ${uploadStats.uploadLimit}`}{" "}
        allowed
      </p>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="grid grid-cols-1 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="border p-6 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Product Set {index + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <InputField
                label="Discount (%)"
                name="discount"
                type="number"
                value={product.discount == null ? "" : product.discount}
                onChange={(e) => handleChange(index, e)}
              />

              {/* Product Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <input
                  type="file"
                  name="productImage"
                  accept="image/*"
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                categoryOptions,
                handleChange
              )}

              {renderDropdown(
                "Units",
                "units",
                product.units,
                index,
                unitOptions,
                handleChange
              )}
            </div>

            {/* Delete button for individual product set */}
            {products.length > 1 && (
              <button
                type="button"
                onClick={() => deleteProduct(index)}
                className="mt-4 text-red-500 text-sm"
              >
                Delete Product
              </button>
            )}
          </div>
        ))}

        {/* Add Product Button */}
        <button
          type="button"
          onClick={addProduct}
          className="mt-6 w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          + Add New Product Set
        </button>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

// 🔹 Utility: Input field
const InputField = ({ label, name, type, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      placeholder={label}
      onChange={onChange}
      className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

// 🔹 Utility: Dropdown
const renderDropdown = (label, name, value, index, options, handleChange) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={(e) => handleChange(index, e)}
      className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
