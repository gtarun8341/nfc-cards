// Main Page Component
"use client"; // Marking this as a Client Component

import ProductCard from "../components/ProductCard"; // Import the ProductCard component
import AllFooter from "../components/AllFooter"; // Import the AllFooter component
import { useState, useEffect } from "react"; // Import useState and useEffect for state management
import { useRouter } from "next/navigation"; // Correct import for Next.js 13
import api from "../apiConfig/axiosConfig";
import HeroBanner from "../components/HeroBanner";

export default function OurProductsPage() {
  const [products, setProducts] = useState([]); // State to manage fetched products
  const [cart, setCart] = useState({}); // State to manage cart items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize router for navigation
  const [adminId, setAdminId] = useState([]); // State to manage fetched products

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/addAdminProduct/all-products"); // Fetch products from the server
        setProducts(response.data.products);
        setAdminId(response.data.adminId); // Set adminId
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this effect runs only once

  const handleAddToCart = (productId, quantity) => {
    if (quantity > 0) {
      setCart((prevCart) => ({
        ...prevCart,
        [productId]: quantity, // Update the cart with product ID and quantity
      }));
    } else {
      const newCart = { ...cart };
      delete newCart[productId]; // Remove the product from cart if quantity is 0
      setCart(newCart);
    }
  };

  const cartItems = Object.entries(cart).map(([id, quantity]) => ({
    id,
    quantity,
    product: products.find((product) => product._id === id),
  }));

  const handleShopNow = () => {
    const purchaseData = {
      userId: adminId,
      products: cartItems.map((item) => ({
        id: item.product._id, // Product ID from the database
        title: item.product.productName, // Product name
        price: item.product.productPrice, // Product price
        discount: item.product.discount, // Product discount (if any)
        quantity: item.quantity, // Quantity in the cart
        hsnCode: item.product.hsnCode,
        gst: item.product.gst,
      })),
    };
    const encodedData = encodeURIComponent(JSON.stringify(purchaseData));
    router.push(`/purchase?data=${encodedData}`);
  };

  return (
    <div className="relative">
      <div className="container mx-auto p-6">
        <div className="flex justify-center">
          <HeroBanner text="SHOP NOW OUR EXCLUSIVE PRODUCTS" />
        </div>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  icon: `${api.defaults.baseURL}/uploads/adminproducts/${product.productImages[0]}`,
                  title: product.productName,
                  description: product.productType,
                  price: product.productPrice,
                  discount: product.discount ? `${product.discount}%` : null,
                }}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Summary */}
      {/* Floating Cart Summary */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t border-gray-300 max-h-72 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-bold">Cart Summary</p>
            <button
              onClick={handleShopNow}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Shop Now
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 px-4">Product</th>
                <th className="border-b py-2 px-4">Quantity</th>
                <th className="border-b py-2 px-4">Price</th>
                <th className="border-b py-2 px-4">Discount</th>
                <th className="border-b py-2 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="border-b py-2 px-4">
                    {item.product.productName}
                  </td>
                  <td className="border-b py-2 px-4">{item.quantity}</td>
                  <td className="border-b py-2 px-4">
                    {item.product.productPrice}
                  </td>
                  <td className="border-b py-2 px-4">
                    {item.product.discount || "0%"}
                  </td>
                  <td className="border-b py-2 px-4">
                    {(
                      item.quantity *
                      (item.product.productPrice -
                        item.product.productPrice *
                          (parseFloat(item.product.discount || 0) / 100))
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AllFooter />
    </div>
  );
}
