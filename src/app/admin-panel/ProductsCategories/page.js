"use client"; // Next.js Client Component

import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig';

const ProductsCategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);  // State to toggle form visibility
  const [newProduct, setNewProduct] = useState({
    productName: '',
    productPrice: '',
    productType: 'product', // Default type
    productImages: [],
    discount: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('adminAuthToken'); // Get the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        };
        const response = await api.get('/api/user-details/admin/users-products',config);
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddProduct = async () => {
    try {
      const response = await api.post('/api/products/add-product', newProduct);
      setProducts([...products, response.data.product]);
      setShowAddForm(false);  // Hide the form after submitting
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <h3 className="text-xl font-semibold mb-2">Product Details</h3>
        {products.length > 0 ? (
          products.map((user, index) => (
            <div key={index} className="user-details">
              <h3>{user.userName}</h3>
              <p>{user.userEmail}</p>
              <p>{user.userPhone}</p>
              <table className="min-w-full table-auto mt-5">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">Product Name</th>
                    <th className="px-4 py-2 border-b text-left">Price</th>
                    <th className="px-4 py-2 border-b text-left">Type</th>
                    <th className="px-4 py-2 border-b text-left">Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {user.products.map((product, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2 border-b">{product.productName}</td>
                      <td className="px-4 py-2 border-b">${product.productPrice}</td>
                      <td className="px-4 py-2 border-b">{product.productType}</td>
                      <td className="px-4 py-2 border-b">
                        {product.discount ? `${product.discount}%` : 'No Discount'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsCategoriesPage;
