"use client";

import { useEffect, useState } from "react";
import api from "../apiConfig/axiosConfig";
import { toast } from "react-hot-toast";
import ProductCard from "../components/ProductCard"; // Adjust import if path differs
import { useRouter } from "next/navigation";

const OurMoreProducts = ({ headingTitle, headingDescription }) => {
  const CARDS_PER_PAGE = 4;
  const [page, setPage] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({}); // productId -> quantity
  const router = useRouter();
  const [adminId, setAdminId] = useState([]); // State to manage fetched products

  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/addAdminProduct/all-products"); // Fetch products from the server
      console.log(response.data.products);
      setAllProducts(response.data.products);
      setAdminId(response.data.adminId); // Set adminId
    } catch (error) {
      toast.error("Failed to load products.");
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (productId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (quantity === 0) {
        delete updated[productId];
      } else {
        updated[productId] = quantity;
      }
      return updated;
    });
  };

  const handleShopNow = () => {
    const selectedProducts = allProducts
      .filter((p) => cartItems[p._id])
      .map((p) => ({
        id: p._id,
        title: p.productName,
        price: p.productPrice,
        discount: p.discount,
        quantity: cartItems[p._id],
        hsnCode: p.hsnCode,
        gst: p.gst,
        units: p.units,
        category: p.category,
      }));

    const purchaseData = {
      userId: adminId,
      products: selectedProducts,
    };

    const encodedData = encodeURIComponent(JSON.stringify(purchaseData));
    router.push(`/purchase?data=${encodedData}`);
  };

  const totalPages = Math.ceil(allProducts.length / CARDS_PER_PAGE);
  const currentProducts = allProducts.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          {headingTitle}
        </h2>
        <p className="text-gray-700 mt-2 max-w-3xl mx-auto">
          {headingDescription}
        </p>
      </div>

      {allProducts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No products added yet.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  icon: `${api.defaults.baseURL}/uploads/adminproducts/${
                    product.productImages?.[0] || "placeholder.png"
                  }`,
                  title: product.productName,
                  description: product.description,
                  price: product.productPrice,
                  discount: product.discount,
                }}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={() => page > 0 && setPage(page - 1)}
                disabled={page === 0}
                className="bg-black hover:bg-gray-600 text-white w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
              >
                &larr;
              </button>
              <button
                onClick={() => page < totalPages - 1 && setPage(page + 1)}
                disabled={page === totalPages - 1}
                className="bg-black hover:bg-gray-600 text-white w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50"
              >
                &rarr;
              </button>
            </div>
          )}

          {/* Shop Now Button */}
          {/* Cart Summary Fixed at Bottom */}
          {Object.keys(cartItems).length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t border-gray-300 max-h-72 overflow-y-auto z-50">
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
                  {Object.entries(cartItems).map(([productId, quantity]) => {
                    const product = allProducts.find(
                      (p) => p._id === productId
                    );
                    if (!product) return null;

                    const price = product.productPrice || 0;
                    const discount = parseFloat(product.discount || 0);
                    const discountedPrice = price - price * (discount / 100);
                    const total = quantity * discountedPrice;

                    return (
                      <tr key={productId}>
                        <td className="border-b py-2 px-4">
                          {product.productName}
                        </td>
                        <td className="border-b py-2 px-4">{quantity}</td>
                        <td className="border-b py-2 px-4">₹{price}</td>
                        <td className="border-b py-2 px-4">
                          {discount ? `${discount}%` : "0%"}
                        </td>
                        <td className="border-b py-2 px-4">
                          ₹{total.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OurMoreProducts;
