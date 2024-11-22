"use client"; // Next.js Client Component
import Image from 'next/image';

import { useState, useEffect } from 'react';
import axios from 'axios';
import api from "../../apiConfig/axiosConfig"; // Ensure you have the right API config

const ProductCataloguePage = () => {
  const [catalogue, setCatalogue] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    name: '', type: '', price: '', image: null, 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

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

  // Add or update product function
  const addOrUpdateProduct = async () => {
    const token = localStorage.getItem('authToken');
    const formData = new FormData();

    formData.append('name', currentProduct.name);
    formData.append('type', currentProduct.type);
    formData.append('price', currentProduct.price);

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
        console.log(isEditing,editProductId,formData,"edit")

        // Update product if editing
        response=await api.put(`/api/products/${editProductId}`, formData, config);
        console.log(response)
      } else {
        // Add new product if not editing
        console.log(formData)
        response= await api.post('/api/products/', formData, config);
      }

      resetForm();
      fetchProducts(); // Refresh product list after adding/updating
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    console.log(api.defaults.baseURL)
    const token = localStorage.getItem('authToken');
    try {
      const { data } = await api.get('/api/products/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data.id)
      setCatalogue(data.products);
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
      image: null, // Reset image since we cannot prefill file input
    });
    setIsEditing(true);
    setEditProductId(product._id); // Store product ID for updating
  };

  // Delete product
  const deleteProduct = async (productId) => {
    console.log(productId,"id")
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
    setCurrentProduct({ name: '', type: '', price: '', image: null });
    setIsEditing(false);
    setEditProductId(null);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Product Catalogue</h1>

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
              <th className="py-3 px-4 border-b">Image</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {catalogue.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b">{product.productName}</td>
                <td className="py-3 px-4 border-b">{product.productType}</td>
                <td className="py-3 px-4 border-b">{product.productPrice}</td>
                <td className="py-3 px-4 border-b">
  {product.productImages && product.productImages[0] && (
    <Image
      src={`${api.defaults.baseURL}/uploads/userDetails/${product.id}/${product.productImages[0]}`} // Use base URL for images
      alt={product.productName}
      width={500} // Set a reasonable default width
      height={500}
      layout="intrinsic"
      className="h-16 w-16 object-cover"
    />
  )}
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
