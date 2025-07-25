"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AllFooter from "../components/AllFooter";
import api from "../apiConfig/axiosConfig";
import Script from "next/script";
import toast from "react-hot-toast";

export default function PurchasePage() {
  const router = useRouter();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseContent router={router} />
    </Suspense>
  );
}

function PurchaseContent({ router }) {
  const searchParams = useSearchParams();
  const [purchaseData, setPurchaseData] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: " ",
    country: " ",
    pincode: " ",
  });
  const [useFrontendKeys, setUseFrontendKeys] = useState(false);
  const [razorpayKeys, setRazorpayKeys] = useState({
    keyId: "",
    keySecret: "",
  });
  const [trackingNumber, setTrackingNumber] = useState(null); // State for tracking number
  const [loading, setLoading] = useState(false); // For Download Invoice button
  const [error, setError] = useState(null);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const isAlreadyParsed = data.startsWith("{") && data.endsWith("}");
        const decodedData = isAlreadyParsed ? data : decodeURIComponent(data);
        const parsedData = JSON.parse(decodedData);
        console.log(parsedData, "from");
        if (parsedData.products && parsedData.userId) {
          setPurchaseData(parsedData.products);
          setUserData((prevState) => ({
            ...prevState,
            userId: parsedData.userId,
          }));
          if (parsedData.usePaymentGateway === "true") {
            setUseFrontendKeys(true);
            setRazorpayKeys({
              keyId: parsedData.razorpayKeyId,
              keySecret: parsedData.razorpayKeySecret,
            });
          }
        } else {
          toast.error("Invalid data format.Please try again");
          console.error("Invalid data format.");
        }
      } catch (error) {
        toast.error("Invalid data format.Please try again");
        console.error("Error parsing purchase data:", error);
      }
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePayment = async () => {
    const loadingToast = toast.loading("Initiating payment...");

    try {
      const amount = calculateTotalPrice();

      const response = await api.post("/api/orderPaymentRoutes/create-order", {
        amount: amount,
        currency: "INR",
        usePaymentGateway: useFrontendKeys ? "true" : "false",
        razorpayKeyId: razorpayKeys.keyId,
        razorpayKeySecret: razorpayKeys.keySecret,
      });

      const orderData = response.data;
      toast.dismiss(loadingToast);

      if (orderData && orderData.orderId) {
        const options = {
          key: useFrontendKeys ? frontendKeyId : orderData.key, // Use client key or backend key
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Purchase Order",
          description: `Total Purchase Amount`,
          order_id: orderData.orderId,
          handler: async function (response) {
            const verifyResponse = await api.post(
              "/api/orderPaymentRoutes/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                products: purchaseData,
                totalAmount: calculateTotalPrice(),
                productItemUserId: userData.userId, // Pass userId here
                userDetails: userData, // Include user details here
                usePaymentGateway: useFrontendKeys ? "true" : "false",
                razorpayKeySecret: razorpayKeys.keySecret, // Optional: pass only if client provided
              }
            );

            const result = verifyResponse.data;
            if (result.status === "success") {
              setTrackingNumber(result.order.trackingNumber);
              toast.success(result.message || "Payment successful!");
            } else {
              toast.error(result.message || "Payment verification failed.");
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
        toast.error("Failed to create order.");

        console.error("Failed to create Razorpay order.");
      }
    } catch (error) {
      toast.error("Payment initiation failed. Please try again.");

      console.error("Payment initiation failed:", error);
    }
  };

  const calculateRowTotal = (item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);

    // Calculate discount
    const discountValue = item.discount
      ? typeof item.discount === "string" && item.discount.includes("%")
        ? parseFloat(item.discount.replace("%", ""))
        : parseFloat(item.discount)
      : 0;

    const discountAmount = (price * quantity * discountValue) / 100;
    const totalAfterDiscount = price * quantity - discountAmount;

    // Calculate GST
    const gstValue = item.gst ? parseFloat(item.gst) : 0;
    const gstAmount = (totalAfterDiscount * gstValue) / 100;

    return totalAfterDiscount + gstAmount;
  };

  const calculateTotalPrice = () => {
    return purchaseData.reduce(
      (total, item) => total + calculateRowTotal(item),
      0
    );
  };

  const handleDownloadInvoice = async () => {
    if (!trackingNumber) {
      toast.error("Tracking number not available.");
      return;
    }

    setLoading(true);
    toast.loading("Downloading invoice...");

    try {
      const response = await fetch(
        `${api.defaults.baseURL}/api/orderPaymentRoutes/download-invoice/${trackingNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );

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
      toast.dismiss();
      toast.success("Invoice downloaded successfully.");
    } catch (error) {
      toast.dismiss();

      console.error("Error downloading invoice:", error);
      toast.error("Failed to download invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(trackingNumber);
    toast.success("Tracking number copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Purchase Products
        </h1>

        {/* Conditionally render the tracking number or product summary */}
        {trackingNumber ? (
          <div className="mt-6 p-4 border border-green-400 rounded-lg bg-green-50 text-center">
            <p className="text-lg font-semibold text-green-600">
              Tracking Number: {trackingNumber}
            </p>
            <button
              onClick={copyTrackingNumber}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Copy Tracking Number
            </button>
            <button
              onClick={() => router.push("/tracking")}
              className="mt-2 ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go to Tracking Page
            </button>
            <button
              onClick={handleDownloadInvoice}
              className="ml-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Downloading..." : "Download Invoice"}
            </button>
            {error && (
              <p className="mt-4 text-xl text-red-500 font-semibold">{error}</p>
            )}
          </div>
        ) : (
          <>
            {purchaseData.length > 0 ? (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                  Products Summary
                </h2>
                <table className="min-w-full border border-gray-300 mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2 text-left font-medium text-gray-700">
                        Product
                      </th>
                      <th className="border px-4 py-2 text-left font-medium text-gray-700">
                        Quantity
                      </th>
                      <th className="border px-4 py-2 text-left font-medium text-gray-700">
                        Category
                      </th>
                      <th className="border px-4 py-2 text-left font-medium text-gray-700">
                        Price
                      </th>
                      <th className="border px-4 py-2 text-left font-medium text-gray-700">
                        Discount
                      </th>
                      <th className="border px-4 py-2 text-left font-medium text-gray-700">
                        GST
                      </th>
                      <th className="border px-4 py-2 text-left font-medium text-gray-700">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseData.map((item, index) => (
                      <tr key={index} className="border-t hover:bg-gray-50">
                        <td className="border px-4 py-3">{item.title}</td>
                        <td className="border px-4 py-3">{item.quantity}</td>
                        <td className="border px-4 py-3">{item.category}</td>
                        <td className="border px-4 py-3">{item.price}</td>
                        <td className="border px-4 py-3">
                          {item.discount ? `${item.discount}` : "N/A"}
                        </td>
                        <td className="border px-4 py-3">
                          {item.gst ? `${item.gst}` : "N/A"}
                        </td>
                        <td className="border px-4 py-3 font-medium">
                          {calculateRowTotal(item)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-right font-semibold text-lg text-gray-700 mb-6">
                  Total Price: {calculateTotalPrice().toFixed(2)}
                </div>

                <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                  User Information
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePayment();
                  }}
                  className="space-y-4"
                >
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
                  <div>
                    <label className="block text-gray-700">State</label>
                    <input
                      type="text"
                      name="state"
                      value={userData.state}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={userData.country}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={userData.pincode}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Proceed to Payment
                  </button>
                </form>
              </div>
            ) : (
              <p>No purchase data available.</p>
            )}
          </>
        )}
      </div>
      <AllFooter />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
}
