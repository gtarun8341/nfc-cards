"use client";
import { Suspense, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import AllFooter from '../components/AllFooter';
import api from '../apiConfig/axiosConfig';
import Script from 'next/script';

export default function PurchasePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [purchaseData, setPurchaseData] = useState([]);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [trackingNumber, setTrackingNumber] = useState(null); // State for tracking number

    useEffect(() => {
        const data = searchParams.get('data');
        if (data) {
            try {
                const isAlreadyParsed = data.startsWith('{') && data.endsWith('}');
                const decodedData = isAlreadyParsed ? data : decodeURIComponent(data);
                const parsedData = JSON.parse(decodedData);
    console.log(parsedData)
                // Assuming parsedData is an object with "products" and "userId" keys
                if (parsedData.products && parsedData.userId) {
                    setPurchaseData(parsedData.products);
                    setUserData(prevState => ({ ...prevState, userId: parsedData.userId }));
                } else {
                    console.error("Invalid data format.");
                }
            } catch (error) {
                console.error('Error parsing purchase data:', error);
            }
        }
    }, [searchParams]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePayment = async () => {
        try {
            const amount = calculateTotalPrice();
            const response = await api.post("/api/orderPaymentRoutes/create-order", {
                amount: amount,
                currency: "INR",
            });

            const orderData = response.data;

            if (orderData && orderData.orderId) {
                const options = {
                    key: orderData.key,
                    amount: orderData.amount,
                    currency: orderData.currency,
                    name: "Purchase Order",
                    description: `Total Purchase Amount`,
                    order_id: orderData.orderId,
                    handler: async function (response) {
                        const verifyResponse = await api.post("/api/orderPaymentRoutes/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            products: purchaseData,
                            totalAmount: calculateTotalPrice(),
                            productItemUserId: userData.userId,  // Pass userId here
                            userDetails: userData, // Include user details here
                        });

                        const result = verifyResponse.data;
                        alert(result.message);

                        if (result.status === "success") {
                            setTrackingNumber(result.order.trackingNumber); // Set tracking number on success
                        }
                    },
                    prefill: {
                        name: userData.name || "Customer Name",
                        email: userData.email || "customer@example.com",
                        contact: userData.phone || "9999999999",
                    },
                    theme: { color: "#3399cc" },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } else {
                console.error("Failed to create Razorpay order.");
            }
        } catch (error) {
            console.error("Payment initiation failed:", error);
            alert("Payment initiation failed. Please try again.");
        }
    };

    const calculateRowTotal = (item) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        const discountValue = item.discount ? 
        (typeof item.discount === 'string' && item.discount.includes('%') ? 
            parseFloat(item.discount.replace('%', '')) : 
            parseFloat(item.discount)) 
        : 0;
            const discountAmount = (price * discountValue) / 100;
        return (price * quantity) - discountAmount;
    };

    const calculateTotalPrice = () => {
        return purchaseData.reduce((total, item) => total + calculateRowTotal(item), 0);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
            <div className="container mx-auto p-6 max-w-4xl">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Purchase Products</h1>
                
                {/* Conditionally render the tracking number or product summary */}
                {trackingNumber ? (
                    <div className="mt-6 p-4 border border-green-400 rounded-lg bg-green-50 text-center">
                        <p className="text-lg font-semibold text-green-600">Tracking Number: {trackingNumber}</p>
                        <button
                            onClick={() => navigator.clipboard.writeText(trackingNumber)}
                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Copy Tracking Number
                        </button>
                        <button
                            onClick={() => router.push('/tracking')}
                            className="mt-2 ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Go to Tracking Page
                        </button>
                    </div>
                ) : (
                    <>
                                        <Suspense fallback={<div>Loading...</div>}>

                        {purchaseData.length > 0 ? (
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Products Summary</h2>
                                <table className="min-w-full border border-gray-300 mb-6">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border px-4 py-2 text-left font-medium text-gray-700">Product</th>
                                            <th className="border px-4 py-2 text-left font-medium text-gray-700">Quantity</th>
                                            <th className="border px-4 py-2 text-left font-medium text-gray-700">Price</th>
                                            <th className="border px-4 py-2 text-left font-medium text-gray-700">Discount</th>
                                            <th className="border px-4 py-2 text-left font-medium text-gray-700">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {purchaseData.map((item, index) => (
                                            <tr key={index} className="border-t hover:bg-gray-50">
                                                <td className="border px-4 py-3">{item.title}</td>
                                                <td className="border px-4 py-3">{item.quantity}</td>
                                                <td className="border px-4 py-3">{item.price}</td>
                                                <td className="border px-4 py-3">{item.discount ? `${item.discount}` : 'N/A'}</td>
                                                <td className="border px-4 py-3 font-medium">{calculateRowTotal(item)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>                        
                                <div className="text-right font-semibold text-lg text-gray-700 mb-6">
                                    Total Price: {calculateTotalPrice()}
                                </div>

                                <h2 className="text-2xl font-semibold mb-6 text-gray-700">User Information</h2>
                                <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700">Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            value={userData.name} 
                                            onChange={handleChange} 
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Email</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            value={userData.email} 
                                            onChange={handleChange} 
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Phone</label>
                                        <input 
                                            type="tel" 
                                            name="phone" 
                                            value={userData.phone} 
                                            onChange={handleChange} 
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Address</label>
                                        <input 
                                            type="text" 
                                            name="address" 
                                            value={userData.address} 
                                            onChange={handleChange} 
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required 
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md font-medium hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
                                    >
                                        Proceed to Payment
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No products found for purchase.</p>
                        )}
                                            </Suspense>
                    </>
                )}
            </div>
            <AllFooter />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        </div>
    );
}
