"use client"; // Next.js Client Component
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import api from "../../apiConfig/axiosConfig"; // Ensure you have the right API config
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination"; // Adjust path based on your folder structure

const ProductCataloguePage = () => {
  const [catalogue, setCatalogue] = useState([]);
  const [filteredCatalogue, setFilteredCatalogue] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // products per page

  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    type: "",
    price: "",
    image: null,
    hsnCode: "",
    gst: "",
    units: "",
    discount: "",
    category: "", // <-- Add this
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategoryAndUnits();
    // Fetch products when the component mounts
  }, []);
  const fetchCategoryAndUnits = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const { data } = await api.get("/api/category-units", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(data.categories || []);
      setUnits(data.units || []);
    } catch (err) {
      console.error("Failed to fetch categories and units:", err);
      toast.error("Failed to load categories/units");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setCurrentProduct({ ...currentProduct, image: files[0] });
    } else {
      setCurrentProduct({ ...currentProduct, [name]: value });
    }
  };

  // Add or update product function
  const addOrUpdateProduct = async () => {
    const token = localStorage.getItem("adminAuthToken");
    const formData = new FormData();

    formData.append("name", currentProduct.name);
    formData.append("type", currentProduct.type);
    formData.append("price", currentProduct.price);
    formData.append("hsnCode", currentProduct.hsnCode);
    formData.append("gst", currentProduct.gst);
    formData.append("units", currentProduct.units);
    formData.append("discount", currentProduct.discount);
    formData.append("category", currentProduct.category);

    if (currentProduct.image) {
      formData.append("productImages[]", currentProduct.image); // Append image file if available
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let response;
      if (isEditing && editProductId) {
        console.log(editProductId);
        response = await api.put(
          `/api/addAdminProduct/update-product/${editProductId}`,
          formData,
          config
        );
      } else {
        response = await api.post(
          "/api/addAdminProduct/add-product",
          formData,
          config
        );
      }
      toast.success(
        isEditing
          ? "Product updated successfully!"
          : "Product added successfully!"
      );

      resetForm();
      fetchProducts(); // Refresh product list after adding/updating
    } catch (error) {
      toast.error("Failed to save product. Please try again.");
      console.error("Error adding/updating product:", error);
    }
  };

  const fetchProducts = async () => {
    const token = localStorage.getItem("adminAuthToken");
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      params.append("limit", limit);

      if (searchQuery) params.append("search", encodeURIComponent(searchQuery));
      if (filterType) params.append("type", filterType);
      if (filterCategory) params.append("category", filterCategory);

      const queryString = params.toString();

      const { data } = await api.get(
        `/api/addAdminProduct/all-products?${queryString}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCatalogue(data.products || []);
      setTotalPages(data.totalPages || 1); // Make sure your backend returns this
    } catch (error) {
      toast.error("Failed to load products.");
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filterType, filterCategory, currentPage]);

  // Edit product
  const editProduct = (product) => {
    setCurrentProduct({
      name: product.productName,
      type: product.productType,
      price: product.productPrice,
      image: null,
      hsnCode: product.hsnCode,
      gst: product.gst,
      units: product.units,
      discount: product.discount,
      category: product.category,
      currentImage: product.productImages?.[0] || null,
    });
    setIsEditing(true);
    setEditProductId(product._id); // Store product ID for updating
  };

  // Delete product
  const deleteProduct = async (productId) => {
    const token = localStorage.getItem("adminAuthToken");
    try {
      await api.delete(`/api/addAdminProduct/delete-product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted successfully!");
      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error("Error deleting product:", error);
    }
  };

  // Reset form after submission
  const resetForm = () => {
    setCurrentProduct({
      name: "",
      type: "",
      price: "",
      image: null,
      hsnCode: "",
      gst: "",
      discount: "",
      units: "",
      category: "",
    });
    setIsEditing(false);
    setEditProductId(null);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Product Catalogue
      </h1>

      {/* Search and Filter */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name, price, discount, or type"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-3 rounded-md w-full"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 p-3 rounded-md"
        >
          <option value="">All Types</option>
          <option value="product">Product</option>
          <option value="service">Service</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 p-3 rounded-md"
        >
          <option value="">All Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <form className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={currentProduct.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md"
            required
          />
          <select
            name="type"
            value={currentProduct.type}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md"
            required
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="product">Product</option>
            <option value="service">Service</option>
          </select>
          <select
            name="units"
            value={currentProduct.units}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md"
            required
          >
            <option value="">Select Units</option>
            {units.map((unit, index) => (
              <option key={index} value={unit.name}>
                {unit.abbreviation
                  ? `${unit.name} (${unit.abbreviation})`
                  : unit.name}
              </option>
            ))}
          </select>
          <select
            name="category"
            value={currentProduct.category}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="hsnCode"
            placeholder="HSN Code"
            value={currentProduct.hsnCode}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md"
            required
          />
          <input
            type="text"
            name="discount"
            placeholder="Discount"
            value={currentProduct.discount}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md"
            required
          />
          <input
            type="text"
            name="gst"
            placeholder="GST "
            value={currentProduct.gst}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md"
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Product Price"
            value={currentProduct.price}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={addOrUpdateProduct}
          className="mt-4 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Type</th>
              <th className="py-3 px-4 border-b">Price</th>
              <th className="py-3 px-4 border-b">Discount</th>
              <th className="py-3 px-4 border-b">HSN Code</th>
              <th className="py-3 px-4 border-b">GST</th>
              <th className="py-3 px-4 border-b">UNITS</th>
              <th className="py-3 px-4 border-b">Category</th>
              <th className="py-3 px-4 border-b">Image</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {catalogue.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="py-4 px-4 text-center text-gray-500"
                >
                  No products added.
                </td>
              </tr>
            ) : (
              catalogue.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b">{product.productName}</td>
                  <td className="py-3 px-4 border-b">{product.productType}</td>
                  <td className="py-3 px-4 border-b">{product.productPrice}</td>
                  <td className="py-3 px-4 border-b">{product.discount}</td>
                  <td className="py-3 px-4 border-b">{product.hsnCode}</td>
                  <td className="py-3 px-4 border-b">{product.gst}</td>
                  <td className="py-3 px-4 border-b">{product.units}</td>
                  <td className="py-3 px-4 border-b">{product.category}</td>
                  <td className="py-3 px-4 border-b">
                    {product.productImages &&
                      product.productImages[0] &&
                      (() => {
                        const imageUrl = `${api.defaults.baseURL}/uploads/adminproducts/${product.productImages[0]}`;
                        return (
                          <Image
                            src={imageUrl}
                            alt={product.productName}
                            width={500}
                            height={500}
                            layout="intrinsic"
                            className="h-16 w-16 object-cover"
                          />
                        );
                      })()}
                  </td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <button
                      onClick={() => editProduct(product)}
                      className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {catalogue.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCataloguePage;
