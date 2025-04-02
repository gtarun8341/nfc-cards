"use client"; // Next.js Client Component

import { useEffect, useState } from "react";

const ProductDetailsForm = ({ onDataChange, initialData }) => {
  const [products, setProducts] = useState([
    {
      productName: "",
      productPrice: "",
      productImage: null,
      productType: "",
      hsnCode: "",
      gst: "",
      units: "",
    },
  ]);

  // Use effect to set initial products from initialData
  useEffect(() => {
    if (initialData && initialData.products) {
      setProducts(
        initialData.products.map((product) => ({
          productName: product.productName || "",
          productPrice: product.productPrice || "",
          productImage: product.productImage || null,
          productType: product.productType || "",
          hsnCode: product.hsnCode || "",
          gst: product.gst || "",
          units: product.units || "",

        }))
      );
    }
  }, [initialData]);

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;

    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: newValue };

    setProducts(updatedProducts);
    onDataChange({ products: updatedProducts }); // Send the updated array back to the parent
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        productName: "",
        productPrice: "",
        productImage: null,
        productType: "",
        hsnCode: "",
        gst: "",
        units: "",

      },
    ]);
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    onDataChange(updatedProducts);
  };

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Product Details</h2>
        <div className="grid grid-cols-1 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="border p-6 rounded-xl shadow-sm hover:shadow-lg transition-transform duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Product Set {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    value={product.productName}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Price</label>
                  <input
                    type="number"
                    name="productPrice"
                    placeholder="Product Price"
                    value={product.productPrice}
                    onChange={(e) => handleChange(index, e)}
                    onInput={(e) => {
                      const newValue = e.target.value;
                      if (!/^\d*\.?\d*$/.test(newValue)) {
                        e.preventDefault();
                      }
                    }}
                    required
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">HSN Code</label>
                  <input
                    type="text"
                    name="hsnCode"
                    placeholder="HSN Code"
                    value={product.hsnCode}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">GST (%)</label>
                  <input
                    type="number"
                    name="gst"
                    placeholder="GST Percentage"
                    value={product.gst}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Product Image</label>
                  <input
                    type="file"
                    name="productImage"
                    accept="image/*"
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Type</label>
                  <select
                    name="productType"
                    value={product.productType}
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                  >
                    <option value="">Select Product Type</option>
                    <option value="product">Product</option>
                    <option value="service">Service</option>
                  </select>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700">Units</label>
                <select
                  name="units"
                  value={product.units}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                >
                  <option value="">Select Units</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="g">Grams (g)</option>
                  <option value="litre">Litres (L)</option>
                  <option value="ml">Millilitres (ml)</option>
                  <option value="piece">Piece</option>
                </select>
              </div>
              </div>
              {products.length > 1 && (
                <button
                  type="button"
                  onClick={() => deleteProduct(index)}
                  className="mt-6 w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete Product Set
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addProduct}
            className="mt-6 w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Add New Product Set
          </button>
        </div>
      </div>
    );
  };
  
  export default ProductDetailsForm;
  