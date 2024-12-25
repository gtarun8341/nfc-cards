"use client"; // Next.js Client Component

import React, { useEffect, useState } from 'react';
import api from '../../apiConfig/axiosConfig'; // Import the Axios instance

const OfferDiscountsEventsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentDiscount, setCurrentDiscount] = useState({ productId: null, amount: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve the JWT token from localStorage
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
            },
        };
        const response = await api.get('/api/products', config); // Adjust the URL based on your API setup
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentDiscount({ ...currentDiscount, [name]: value });
  };

  const addOrUpdateDiscount = async () => {
    // Validate that discount amount is a number
    if (isNaN(currentDiscount.amount) || currentDiscount.amount === '') {
      setErrorMessage('Discount amount must be a valid number.');
      return; // Exit the function if the validation fails
    }

    setErrorMessage(''); // Clear any previous error message

    try {
      const token = localStorage.getItem('authToken'); // Retrieve the JWT token from localStorage
      const config = {
          headers: {
              Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
          },
      };

      if (isEditing) {
        // Update existing discount
        await api.put(`/api/discount/${currentDiscount.productId}`, {
          discount: currentDiscount.amount,
        }, config);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === currentDiscount.productId
              ? { ...product, discount: currentDiscount.amount }
              : product
          )
        );
        setIsEditing(false);
      } else {
        // Add new discount
        await api.put(`/api/discount/${currentDiscount.productId}`, {
          discount: currentDiscount.amount,
        }, config);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === currentDiscount.productId
              ? { ...product, discount: currentDiscount.amount }
              : product
          )
        );
      }
      resetForm();
    } catch (error) {
      console.error('Error updating discount:', error);
    }
  };

  const editDiscount = (product) => {
    setCurrentDiscount({ productId: product._id, amount: product.discount || '' });
    setIsEditing(true);
    setErrorMessage(''); // Clear error when editing
  };

  const removeDiscount = async (productId) => {
    try {
      const token = localStorage.getItem('authToken'); // Retrieve the JWT token from localStorage
      const config = {
          headers: {
              Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
          },
      };
      await api.put(`/api/discount/${productId}`, { discount: null }, config);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, discount: null } : product
        )
      );
    } catch (error) {
      console.error('Error removing discount:', error);
    }
  };

  const resetForm = () => {
    setCurrentDiscount({ productId: null, amount: '' });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Products & Discounts</h1>

      <form className="bg-white p-4 rounded-lg shadow-md mb-6">
        <select
          name="productId"
          value={currentDiscount.productId || ''}
          onChange={(e) => setCurrentDiscount({ ...currentDiscount, productId: e.target.value })}
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="" disabled>Select a product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>{product.productName}</option>
          ))}
        </select>
        
        <input
          type="text"
          name="amount"
          placeholder="Discount Amount"
          value={currentDiscount.amount}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ml-2"
          required
        />
        
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}

        <button
          type="button"
          onClick={addOrUpdateDiscount}
          className="mt-4 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {isEditing ? 'Update Discount' : 'Add Discount'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-3 px-4 border-b">Product Name</th>
              <th className="py-3 px-4 border-b">Discount</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b">{product.productName}</td>
                <td className="py-3 px-4 border-b">{product.discount ? `${product.discount}` : 'No Discount'}</td>
                <td className="py-3 px-4 border-b flex space-x-2">
                  {product.discount ? (
                    <>
                      <button
                        onClick={() => editDiscount(product)}
                        className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-200"
                      >
                        Edit Discount
                      </button>
                      <button
                        onClick={() => removeDiscount(product._id)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
                      >
                        Remove Discount
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => editDiscount(product)}
                      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                      Add Discount
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfferDiscountsEventsPage;
