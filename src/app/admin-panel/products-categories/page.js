"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig";
import * as XLSX from "xlsx";

const ProductsCategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDiscount, setSelectedDiscount] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Fetch products
  // useEffect(() => {
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken"); // Get the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
      const response = await api.get(
        `/api/user-details/admin/users-products?page=${page}&limit=10`,
        config
      );
      setProducts(response.data.data);
      setFilteredProducts(response.data.data); // Initialize filteredProducts
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  //   fetchProducts();
  // }, []);
  useEffect(() => {
    fetchProducts();
  }, [page]);
  // Handle search and filters
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTypeFilterChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleDiscountFilterChange = (e) => {
    setSelectedDiscount(e.target.value);
  };

  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by product type
    if (selectedType !== "all") {
      filtered = filtered.filter(
        (product) => product.productType === selectedType
      );
    }

    // Filter by discount
    if (selectedDiscount !== "all") {
      filtered = filtered.filter(
        (product) =>
          (selectedDiscount === "withDiscount" && product.discount > 0) ||
          (selectedDiscount === "noDiscount" && product.discount === 0)
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedType, selectedDiscount, products]);
  const handleDownloadUserProducts = (user) => {
    // First rows: User info
    const userInfo = [
      ["Name", user.userName],
      ["Email", user.userEmail],
      ["Phone", user.userPhone],
      [], // Empty row for spacing
    ];

    // Product rows
    const productData = user.products.map((product) => ({
      "Product Name": product.productName,
      "Price (₹)": product.productPrice,
      Type: product.productType,
      Units: product.units,
      Discount: product.discount > 0 ? `${product.discount}%` : "No Discount",
    }));

    // Convert product data to sheet format
    const productSheet = XLSX.utils.json_to_sheet(productData, { origin: -1 });

    // Create worksheet manually and insert user info
    const worksheet = XLSX.utils.aoa_to_sheet(userInfo);
    XLSX.utils.sheet_add_json(worksheet, productData, { origin: -1 });

    // Create and export workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    const fileName = `${user.userName.replace(/\s+/g, "_")}_Products.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="max-w-6xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

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

      {filteredProducts.length > 0 ? (
        filteredProducts.map((user, index) => (
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
                  <th className="px-4 py-2 text-left border">Type</th>
                  <th className="px-4 py-2 text-left border">UNITS</th>
                  <th className="px-4 py-2 text-left border">Category</th>
                  <th className="px-4 py-2 text-left border">Sold Count</th>
                  <th className="px-4 py-2 text-left border">Discount</th>
                </tr>
              </thead>
              <tbody>
                {user.products.map((product, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{product.productName}</td>
                    <td className="px-4 py-2 border">
                      ₹{product.productPrice}
                    </td>
                    <td className="px-4 py-2 border">{product.productType}</td>
                    <td className="px-4 py-2 border">{product.units}</td>
                    <td className="px-4 py-2 border">{product.category}</td>
                    <td className="px-4 py-2 border">{product.soldCount}</td>

                    <td className="px-4 py-2 border">
                      {product.discount > 0
                        ? `${product.discount}%`
                        : "No Discount"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No products found matching the criteria.</p>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsCategoriesPage;
