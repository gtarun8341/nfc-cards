import { useEffect, useState } from "react";

const ProductDetailsForm = ({ onDataChange,initialData }) => {
  const [products, setProducts] = useState([{ productName: "", productPrice: "", productImage: null, productType: "" }]);

    // Use effect to set initial products from initialData
    useEffect(() => {
      if (initialData && initialData.products) {
        setProducts(initialData.products.map(product => ({
          productName: product.productName || "",
          productPrice: product.productPrice || "",
          productImage: product.productImage || null,
          productType: product.productType || ""
        })));
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
    setProducts([...products, { productName: "", productPrice: "", productImage: null, productType: "" }]);
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    onDataChange(updatedProducts);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-semibold text-center mb-4">Product Details</h2>
      <div className="grid grid-cols-1 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4 transition-transform duration-200 hover:shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Product Set {index + 1}</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  placeholder="Product Name"
                  value={product.productName}
                  onChange={(e) => handleChange(index, e)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Price</label>
                <input
                  type="text"
                  name="productPrice"
                  placeholder="Product Price"
                  value={product.productPrice}
                  onChange={(e) => handleChange(index, e)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <input
                  type="file"
                  name="productImage"
                  accept="image/*"
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Type</label>
                <select
                  name="productType"
                  value={product.productType}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                >
                  <option value="">Select Product Type</option>
                  <option value="product">product</option>
                  <option value="service">service</option>
                </select>
              </div>
            </div>
            {products.length > 1 && ( // Show the delete button only if there's more than one product set
              <button
                type="button"
                onClick={() => deleteProduct(index)}
                className="mt-4 w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete Product Set
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addProduct}
          className="mt-4 w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Product Set
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsForm;
