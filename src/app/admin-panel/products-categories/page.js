"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination"; // Adjust path based on your folder structure

const ProductsCategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDiscount, setSelectedDiscount] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.get(
        `/api/user-details/admin/users-products?page=${page}&limit=10&search=${encodeURIComponent(
          searchQuery
        )}&productType=${selectedType}&discount=${selectedDiscount}`,
        config
      );
      console.log(response.data.data);
      setProducts(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Error fetching products");
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, searchQuery, selectedType, selectedDiscount]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTypeFilterChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleDiscountFilterChange = (e) => {
    setSelectedDiscount(e.target.value);
  };

  const handleDownloadUserProducts = (user) => {
    try {
      const userInfo = [
        ["Name", user.userName],
        ["Email", user.userEmail],
        ["Phone", user.userPhone],
        [],
      ];

      const productData = user.products.map((product) => ({
        "Product Name": product.productName,
        "Price (₹)": product.productPrice,
        "HSN Code": product.hsnCode,
        GST: product.gst,
        Type: product.productType,
        Units: product.units,
        Category: product.category,
        "Sold Count": product.soldCount,
        Discount: product.discount > 0 ? `${product.discount}%` : "No Discount",
        isDeleted: product.isDeleted,
      }));

      const worksheet = XLSX.utils.aoa_to_sheet(userInfo);
      XLSX.utils.sheet_add_json(worksheet, productData, { origin: -1 });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

      const fileName = `${user.userName.replace(/\s+/g, "_")}_Products.xlsx`;
      XLSX.writeFile(workbook, fileName);
      toast.success("Excel downloaded successfully");
    } catch (error) {
      console.error("Excel download failed", error);
      toast.error("Failed to download Excel");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Products</h2>

      {loading && <p>Loading products...</p>}
      {/* {error && <p className="text-red-500">{error}</p>} */}

      {/* Search and filter options */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by user name"
          className="border p-2 w-full"
        />
        <select
          value={selectedType}
          onChange={handleTypeFilterChange}
          className="border p-2 w-full"
        >
          <option value="all">All Types</option>
          <option value="product">Product</option>
          <option value="service">Service</option>
        </select>
        <select
          value={selectedDiscount}
          onChange={handleDiscountFilterChange}
          className="border p-2 w-full"
        >
          <option value="all">All Discounts</option>
          <option value="withDiscount">With Discount</option>
          <option value="noDiscount">No Discount</option>
        </select>
      </div>

      {products.length > 0 &&
        products.map((user, index) => (
          <div
            key={index}
            className="mb-8 border rounded shadow p-4 bg-gray-50"
          >
            {/* User Header */}
            <div className="bg-gray-200 p-3 rounded font-semibold text-lg mb-3">
              NAME : {user.userName} — PHONE : {user.userPhone} — EMAIL :{" "}
              {user.userEmail}
            </div>
            <button
              onClick={() => handleDownloadUserProducts(user)}
              className="mb-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Download Excel
            </button>

            {/* Product Table */}
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border">Product Name</th>
                  <th className="px-4 py-2 text-left border">Price</th>
                  <th className="px-4 py-2 text-left border">HSN Code</th>
                  <th className="px-4 py-2 text-left border">GST</th>
                  <th className="px-4 py-2 text-left border">Type</th>
                  <th className="px-4 py-2 text-left border">UNITS</th>
                  <th className="px-4 py-2 text-left border">Category</th>
                  <th className="px-4 py-2 text-left border">Sold Count</th>
                  <th className="px-4 py-2 text-left border">Discount</th>
                  <th className="px-4 py-2 text-left border">Is deleted</th>
                </tr>
              </thead>
              <tbody>
                {user.products.map((product, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{product.productName}</td>
                    <td className="px-4 py-2 border">
                      ₹{product.productPrice}
                    </td>
                    <td className="px-4 py-2 border">{product.hsnCode}</td>
                    <td className="px-4 py-2 border">{product.gst}</td>
                    <td className="px-4 py-2 border">{product.productType}</td>
                    <td className="px-4 py-2 border">{product.units}</td>
                    <td className="px-4 py-2 border">{product.category}</td>
                    <td className="px-4 py-2 border">{product.soldCount}</td>
                    <td className="px-4 py-2 border">
                      {product.discount > 0
                        ? `${product.discount}%`
                        : "No Discount"}
                    </td>
                    <td className="px-4 py-2 border">
                      {product.isDeleted ? "Yes" : "No"}
                    </td>{" "}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      {/* Show this only if loading is false and no data exists */}
      {!loading && products.length === 0 && (
        <p>No products added or not found matching the criteria.</p>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      )}
    </div>
  );
};

export default ProductsCategoriesPage;
