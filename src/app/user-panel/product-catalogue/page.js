"use client"; // Next.js Client Component
import Image from "next/image";
import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig"; // Ensure you have the right API config
import { toast } from "react-hot-toast"; // ✅ Add toast
import Pagination from "../../components/Pagination"; // Adjust path based on your folder structure

const ProductCataloguePage = () => {
  const [catalogue, setCatalogue] = useState([]);
  const [userDetailsAvailable, setUserDetailsAvailable] = useState(true);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    type: "",
    price: "",
    image: null,
    hsnCode: "",
    gst: "",
    units: "",
    category: "", // <-- Add this
    discount: "",
  });
  const [uploadedCount, setUploadedCount] = useState(0);
  const [uploadLimit, setUploadLimit] = useState(0);
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [userId, setUserId] = useState(null); // Add a state to store the ID
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [error, setError] = useState(""); // State to store validation error
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
    fetchCategoryAndUnits();
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
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurrentPage(1); // Let currentPage hook handle fetching
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  // Handle form input changes
  const MAX_IMAGE_SIZE_MB = 1;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.[0]) {
      const file = files[0];
      const sizeMB = file.size / (1024 * 1024);

      // Validate image size
      if (sizeMB > MAX_IMAGE_SIZE_MB) {
        toast.error("Image must be less than or equal to 1MB.");
        setError("Image must be less than or equal to 1MB.");
        return;
      }

      setCurrentProduct((prev) => ({ ...prev, image: file }));
    } else {
      setCurrentProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add or update product function with validation
  const addOrUpdateProduct = async () => {
    const token = localStorage.getItem("authToken");

    // Validate form fields
    if (
      !currentProduct.name ||
      !currentProduct.type ||
      !currentProduct.price ||
      !currentProduct.hsnCode ||
      !currentProduct.gst ||
      !currentProduct.units ||
      !currentProduct.category
    ) {
      setError("All fields are required.");
      toast.error("All fields are required."); // ✅ toast error

      return;
    }

    if (isNaN(currentProduct.price)) {
      setError("Price must be a valid number.");
      toast.error("Price must be a valid number."); // ✅ toast error

      return;
    }

    // If adding a product, ensure image is provided
    if (!isEditing && !currentProduct.image) {
      setError("Image is required when adding a product.");
      toast.error("Image is required when adding a product.");
      return;
    }

    setError(""); // Reset error if validation passes

    const formData = new FormData();
    formData.append("name", currentProduct.name);
    formData.append("type", currentProduct.type);
    formData.append("price", currentProduct.price);
    formData.append("hsnCode", currentProduct.hsnCode);
    formData.append("gst", currentProduct.gst);
    formData.append("units", currentProduct.units);
    formData.append("category", currentProduct.category);
    formData.append("discount", currentProduct.discount);

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
      let response; // Declare response here

      if (isEditing && editProductId) {
        console.log(isEditing, editProductId, formData, "edit");

        // Update product if editing
        response = await api.put(
          `/api/products/${editProductId}`,
          formData,
          config
        );
        toast.success("Product updated successfully!"); // ✅ toast

        console.log(response);
      } else {
        // Add new product if not editing
        console.log(formData);
        response = await api.post("/api/products/", formData, config);
        toast.success("Product added successfully!"); // ✅ toast
      }

      resetForm();
      fetchProducts(); // Refresh product list after adding/updating
    } catch (error) {
      console.error("Error adding/updating product:", error);
      const errMsg =
        error.response?.data?.message ||
        "An unexpected error occurred while saving the product.";
      setError(errMsg);
      toast.error(errMsg); // ✅ toast
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.get(`/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search: encodeURIComponent(searchQuery),
          page: currentPage,
          limit: 10,
        },
      });
      setCatalogue(response.data.products);
      setUploadedCount(response.data.uploadedCount);
      setUploadLimit(response.data.uploadLimit);
      setTotalPages(response.data.totalPages);
      setUserId(response.data.id);
      setUserDetailsAvailable(true); // ✅ user details exist
    } catch (error) {
      console.error("Error fetching products:", error);
      if (
        error.response?.status === 404 &&
        error.response?.data?.message === "User details not found"
      ) {
        toast.error("Add user details to add products and discounts.");
        setUserDetailsAvailable(false); // ❌ user details missing

        // setErrorMessage("Add user details to add products and discounts.");
      } else {
        toast.error("Failed to load products.");
      }
    }
  };

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
      category: product.category,
      discount: product.discount,
      currentImage: product.productImages?.[0] || null,
    });

    setIsEditing(true);
    setEditProductId(product._id); // Store product ID for updating
  };

  // Delete product
  const deleteProduct = async (productId) => {
    console.log(productId, "id");
    const token = localStorage.getItem("authToken");
    try {
      await api.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted successfully!"); // ✅ toast

      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      const errMsg =
        error.response?.data?.message ||
        "An unexpected error occurred while deleting the product.";
      setError(errMsg);
      toast.error(errMsg);
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
      units: "",
      category: "",
      discount: "",
    });
    setIsEditing(false);
    setEditProductId(null);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Product Catalogue
      </h1>
      {/* Upload Stats */}
      <div className="mb-6 flex justify-center">
        <div className="bg-white shadow-md rounded-lg px-6 py-4 w-full max-w-xl flex justify-between items-center">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Uploaded</p>
            <p className="text-xl font-semibold text-blue-600">
              {uploadedCount}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Limit</p>
            <p className="text-xl font-semibold text-green-600">
              {uploadLimit === "unlimited" ? "Unlimited" : uploadLimit}
            </p>
          </div>
          {uploadLimit !== "unlimited" && (
            <div className="text-center">
              <p className="text-gray-500 text-sm">Remaining</p>
              <p className="text-xl font-semibold text-orange-500">
                {uploadLimit - uploadedCount}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, HSN, or GST"
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
        />
      </div>

      {/* Form Validation Error */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

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
            name="gst"
            placeholder="GST"
            value={currentProduct.gst}
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
            name="price"
            placeholder="Product Price"
            value={currentProduct.price}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md"
            required
          />
          <select
            name="units"
            value={currentProduct.units}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
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
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
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
          disabled={!userDetailsAvailable}
          className={`mt-4 w-full p-3 rounded-md transition ${
            userDetailsAvailable
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
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
              <th className="py-3 px-4 border-b">HSN Code</th>
              <th className="py-3 px-4 border-b">GST</th>
              <th className="py-3 px-4 border-b">Discount</th>
              <th className="py-3 px-4 border-b">UNITS</th>
              <th className="py-3 px-4 border-b">CATEGORY</th>
              <th className="py-3 px-4 border-b">Image</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {catalogue.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  No products added yet. Add userDeatils form to add products
                </td>
              </tr>
            ) : (
              catalogue.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b">{product.productName}</td>
                  <td className="py-3 px-4 border-b">{product.productType}</td>
                  <td className="py-3 px-4 border-b">{product.productPrice}</td>
                  <td className="py-3 px-4 border-b">{product.hsnCode}</td>
                  <td className="py-3 px-4 border-b">{product.gst}</td>
                  <td className="py-3 px-4 border-b">{product.discount}</td>
                  <td className="py-3 px-4 border-b">{product.units}</td>
                  <td className="py-3 px-4 border-b">{product.category}</td>
                  <td className="py-3 px-4 border-b">
                    {product.productImages &&
                      product.productImages[0] &&
                      (() => {
                        const imageUrl = `${api.defaults.baseURL}/uploads/userDetails/${userId}/${product.productImages[0]}`;
                        console.log("Image URL:", imageUrl); // Log the URL
                        return (
                          <Image
                            src={imageUrl} // Use base URL for images
                            alt={product.productName}
                            width={500} // Set a reasonable default width
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
