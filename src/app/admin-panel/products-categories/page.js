"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig";

const ProductsCategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDiscount, setSelectedDiscount] = useState("all");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("adminAuthToken"); // Get the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        };
        const response = await api.get(
          "/api/user-details/admin/users-products",
          config
        );
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filteredProducts
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  return (
    <div className="max-w-2xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Search and filter options */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by user name"
          className="border p-2 mb-2 w-full"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Product Details</h3>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((user, index) => (
            <div key={index} className="user-details mb-5">
              <h3 className="font-bold">{user.userName}</h3>
              <p>{user.userEmail}</p>
              <p>{user.userPhone}</p>
              <table className="min-w-full table-auto mt-5 border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">Product Name</th>
                    <th className="px-4 py-2 border-b text-left">Price</th>
                    <th className="px-4 py-2 border-b text-left">Type</th>
                    <th className="px-4 py-2 border-b text-left">UNITS</th>
                    <th className="px-4 py-2 border-b text-left">Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {user.products.map((product, idx) => (
                    <tr key={idx} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b">{product.productName}</td>
                      <td className="px-4 py-2 border-b">
                        ₹{product.productPrice}
                      </td>
                      <td className="px-4 py-2 border-b">{product.productType}</td>
                      <td className="px-4 py-2 border-b">{product.units}</td>
                      <td className="px-4 py-2 border-b">
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
      </div>
    </div>
  );
};

export default ProductsCategoriesPage;
