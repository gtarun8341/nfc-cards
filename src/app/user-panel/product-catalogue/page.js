"use client"; // Next.js Client Component
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import api from "../../apiConfig/axiosConfig"; // Ensure you have the right API config

const ProductCataloguePage = () => {
  const [catalogue, setCatalogue] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    type: '',
    price: '',
    image: null,
    hsnCode: '',
    gst: '',
    units: "",
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [userId, setUserId] = useState(null); // Add a state to store the ID
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query
  const [error, setError] = useState(''); // State to store validation error

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setCurrentProduct({ ...currentProduct, image: files[0] });
    } else {
      setCurrentProduct({ ...currentProduct, [name]: value });
    }
  };

  // Add or update product function with validation
  const addOrUpdateProduct = async () => {
    const token = localStorage.getItem('authToken');
    
    // Validate form fields
    if (!currentProduct.name || !currentProduct.type || !currentProduct.price || !currentProduct.hsnCode || !currentProduct.gst || !currentProduct.units) {
      setError('All fields are required.');
      return;
    }

    if (isNaN(currentProduct.price)) {
      setError('Price must be a valid number.');
      return;
    }

    // If adding a product, ensure image is provided
    if (!isEditing && !currentProduct.image) {
      setError('Image is required when adding a product.');
      return;
    }

    setError(''); // Reset error if validation passes

    const formData = new FormData();
    formData.append('name', currentProduct.name);
    formData.append('type', currentProduct.type);
    formData.append('price', currentProduct.price);
    formData.append('hsnCode', currentProduct.hsnCode);
    formData.append('gst', currentProduct.gst);
    formData.append('units', currentProduct.units);
    
    if (currentProduct.image) {
      formData.append('productImages[]', currentProduct.image); // Append image file if available
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let response; // Declare response here

      if (isEditing && editProductId) {
        console.log(isEditing, editProductId, formData, "edit");

        // Update product if editing
        response = await api.put(`/api/products/${editProductId}`, formData, config);
        console.log(response);
      } else {
        // Add new product if not editing
        console.log(formData);
        response = await api.post('/api/products/', formData, config);
      }

      resetForm();
      fetchProducts(); // Refresh product list after adding/updating
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    console.log(api.defaults.baseURL);
    const token = localStorage.getItem('authToken');
    try {
      const { data } = await api.get('/api/products/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      setCatalogue(data.products);
      setUserId(data.id); // Store the ID in state
    } catch (error) {
      console.error('Error fetching products:', error);
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
      currentImage: product.productImages?.[0] || null,
    });
    
    setIsEditing(true);
    setEditProductId(product._id); // Store product ID for updating
  };

  // Delete product
  const deleteProduct = async (productId) => {
    console.log(productId, "id");
    const token = localStorage.getItem('authToken');
    try {
      await api.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Reset form after submission
  const resetForm = () => {
    setCurrentProduct({ name: '', type: '', price: '', image: null, hsnCode: '', gst: '', units: '' });
    setIsEditing(false);
    setEditProductId(null);
  };

  // Filter catalogue based on search query
  const filteredCatalogue = catalogue.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.hsnCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.gst.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Product Catalogue</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Name, HSN Code or GST"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
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
            <option value="" disabled>Select Type</option>
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
                  <option value="kg">Kilograms (kg)</option>
                  <option value="g">Grams (g)</option>
                  <option value="litre">Litres (L)</option>
                  <option value="ml">Millilitres (ml)</option>
                  <option value="piece">Piece</option>
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
          className="mt-4 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
        >
          {isEditing ? 'Update Product' : 'Add Product'}
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
              <th className="py-3 px-4 border-b">UNITS</th>
              <th className="py-3 px-4 border-b">Image</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCatalogue.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b">{product.productName}</td>
                <td className="py-3 px-4 border-b">{product.productType}</td>
                <td className="py-3 px-4 border-b">{product.productPrice}</td>
                <td className="py-3 px-4 border-b">{product.hsnCode}</td>
                <td className="py-3 px-4 border-b">{product.gst}</td>
                <td className="py-3 px-4 border-b">{product.units}</td>
                <td className="py-3 px-4 border-b">
                  {product.productImages && product.productImages[0] && (() => {
                    const imageUrl = `${api.defaults.baseURL}/uploads/userDetails/${userId}/${product.productImages[0]}`;
                    console.log('Image URL:', imageUrl); // Log the URL
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCataloguePage;
