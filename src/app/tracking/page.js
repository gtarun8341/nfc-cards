"use client"; // Marking this as a Client Component

import { useState } from "react";
import api from "../apiConfig/axiosConfig";

export default function TrackOrderPage() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrackingInput = (e) => {
        setTrackingNumber(e.target.value);
    };

    const handleTrackOrder = async () => {
        try {
            const response = await api.get(`/api/orderPaymentRoutes/track-order/${trackingNumber}`);
            setOrderDetails(response.data);
            setError(null);
        } catch (err) {
            setError("Order not found. Please check the tracking number.");
            setOrderDetails(null);
        }
    };

    const handleDownloadInvoice = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${api.defaults.baseURL}/api/orderPaymentRoutes/download-invoice/${trackingNumber}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/pdf",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to download invoice");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `invoice_${trackingNumber}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading invoice:", error);
            setError("Failed to download invoice. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Track Your Order</h1>
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                <input
                    type="text"
                    placeholder="Enter Tracking Number"
                    value={trackingNumber}
                    onChange={handleTrackingInput}
                    className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={handleTrackOrder}
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 transition-colors"
                >
                    Track Order
                </button>

                {orderDetails && (
                    <div className="mt-6 text-gray-700">
                        <p className="text-xl font-semibold">Order Status: {orderDetails.status}</p>
                        <p className="text-lg font-semibold mt-2">Total Amount: {orderDetails.totalAmount.toFixed(2)}</p>

                        <h2 className="text-lg font-semibold mt-4">Products:</h2>
                        <div className="overflow-x-auto mt-2">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">Product</th>
                                        <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">Quantity</th>
                                        <th className="py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-semibold">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetails.products.map((product, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                                            <td className="py-2 px-4">{product.title}</td>
                                            <td className="py-2 px-4">{product.quantity}</td>
                                            <td className="py-2 px-4">{product.price.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button
                            onClick={handleDownloadInvoice}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 transition-colors"
                            disabled={loading}
                        >
                            {loading ? "Downloading..." : "Download Invoice"}
                        </button>
                    </div>
                )}

                {error && (
                    <p className="mt-4 text-xl text-red-500 font-semibold">{error}</p>
                )}
            </div>
        </div>
    );
}
