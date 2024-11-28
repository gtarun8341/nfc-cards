"use client"; // Marking this as a Client Component

import ProductCard from '../components/ProductCard'; // Import the ProductCard component
import AllFooter from '../components/AllFooter'; // Import the AllFooter component
import { useState, useEffect } from 'react'; // Import useState and useEffect for state management
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13
import api from '../apiConfig/axiosConfig';

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
                const response = await api.get('/api/addAdminProduct/all-products'); // Fetch products from the server
                setProducts(response.data.products);
                setAdminId(response.data.adminId); // Set adminId
            } catch (error) {
                console.error("Error fetching products:", error);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array ensures this effect runs only once

    const handleAddToCart = (productId, quantity) => {
        if (quantity > 0) {
            setCart(prevCart => ({
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
        product: products.find(product => product._id === id)
    }));
    useEffect(() => {
        console.log("Updated adminId:", adminId);
    }, [adminId]); // Log when adminId is updated

    const handleShopNow = () => {

        const purchaseData = {
            userId: adminId,
            products: cartItems.map(item => ({
                id: item.product._id,               // Product ID from the database
                title: item.product.productName,     // Product name
                price: item.product.productPrice,    // Product price
                discount: item.product.discount,     // Product discount (if any)
                quantity: item.quantity              // Quantity in the cart
            }))
        };
        const encodedData = encodeURIComponent(JSON.stringify(purchaseData));
        router.push(`/purchase?data=${encodedData}`);
    };

    return (
        <div>
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-4">Our Products</h1>
                <h2 className="text-3xl font-bold mb-4 text-center">More Products</h2>

                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard 
                                key={product._id} 
                                product={{
                                    id: product._id,
                                    icon: `${api.defaults.baseURL}/uploads/adminproducts/${product.productImages[0] }`,
                                    // icon: product.productImages[0] || 'https://via.placeholder.com/150',
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

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-2">Cart Summary</h2>
                    {cartItems.length > 0 ? (
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-4 py-2">Product</th>
                                    <th className="border px-4 py-2">Quantity</th>
                                    <th className="border px-4 py-2">Price</th>
                                    <th className="border px-4 py-2">Discount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id}>
                                        <td className="border px-4 py-2">{item.product.productName}</td>
                                        <td className="border px-4 py-2">{item.quantity}</td>
                                        <td className="border px-4 py-2">{item.product.productPrice}</td>
                                        <td className="border px-4 py-2">{item.product.discount || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                <button 
                    onClick={handleShopNow} 
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded w-full" 
                    disabled={cartItems.length === 0}
                >
                    Shop Now
                </button>
            </div>
            <AllFooter />
        </div>
    );
}
