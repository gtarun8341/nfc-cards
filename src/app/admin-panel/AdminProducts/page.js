import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    productPrice: '',
    productType: 'product',
    productImages: [],
    discount: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/addAdminProduct/all-products'); // Fetch products from the server
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this effect runs only once

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      setNewProduct({
        ...newProduct,
        productImages: Array.from(files), // Set the selected files
      });
    }
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('productName', newProduct.productName);
      formData.append('productPrice', newProduct.productPrice);
      formData.append('productType', newProduct.productType);
      formData.append('discount', newProduct.discount);

      newProduct.productImages.forEach((image, index) => {
        formData.append('productImages', image);
      });

      const response = await api.post('/api/addAdminProduct/add-product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setProducts([...products, response.data.product]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Admin Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        {showAddForm ? 'Cancel' : 'Add New Product'}
      </button>

      {showAddForm && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Add New Product</h3>
          <input
            type="text"
            name="productName"
            value={newProduct.productName}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="productPrice"
            value={newProduct.productPrice}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 mb-2 w-full"
          />
          <select
            name="productType"
            value={newProduct.productType}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          >
            <option value="product">Product</option>
            <option value="service">Service</option>
          </select>
          <input
            type="number"
            name="discount"
            value={newProduct.discount}
            onChange={handleInputChange}
            placeholder="Discount"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="file"
            name="productImages"
            multiple
            onChange={handleImageChange}
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-2">All Products</h3>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="product-details mb-4">
              <h3 className="font-bold">{product.productName}</h3>
              <p>{product.productPrice} USD</p>
              <p>{product.productType}</p>
              <p>{product.discount ? `${product.discount}% off` : 'No Discount'}</p>
              {product.productImages && product.productImages.map((img, idx) => (
                <img
                  key={idx}
                  src={`${api.defaults.baseURL}/uploads/adminproducts/${img}`} // Show the image with correct path
                  alt={`Product ${product.productName}`}
                  className="w-32 h-32 object-cover"
                />
              ))}
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminProductsPage;
