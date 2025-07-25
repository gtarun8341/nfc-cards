"use client";

import React, { useState, useEffect } from "react";
import Pricing from "../components/Pricing";
import Script from "next/script";
import api from "../apiConfig/axiosConfig";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PurchasePlan = () => {
  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        const response = await api.get("/api/subscription/all"); // Adjust endpoint if needed
        setPricingData(response.data);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
        toast.error("Failed to load subscription plans. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionPlans();
  }, []);

  const handlePayment = async (plan) => {
    const toastId = toast.loading("Processing payment..."); // show loading toast
    const userId = localStorage.getItem("_id");

    try {
      const response = await api.post("/api/payment/create-order", {
        amount: plan.price,
        currency: plan.currency,
        userId: userId, // Include userId here
      });

      const orderData = response.data;

      if (orderData && orderData.orderId) {
        const options = {
          key: orderData.key,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Shiven Card",
          description: `Purchase ${plan.title} Plan`,
          order_id: orderData.orderId,
          handler: async function (response) {
            try {
              const verifyResponse = await api.post(
                "/api/payment/verify-payment",
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  userId: userId, // Include userId here
                  plan: {
                    id: plan._id,
                    title: plan.title,
                    price: plan.price,
                    currency: plan.currency,
                    expiryMonths: plan.expiryMonths, // Include expiryMonths
                  },
                }
              );
              const result = verifyResponse.data;
              toast.dismiss(toastId); // dismiss loading
              toast.success(
                result.message + "You can login to enter to website"
              );
              if (result.status === 200) {
                localStorage.removeItem("userName");
                localStorage.removeItem("userEmail");
                localStorage.removeItem("userPhone");
                localStorage.removeItem("_id");
                router.push("/auth");
              }
            } catch (err) {
              toast.dismiss(toastId);
              toast.error("Payment verification failed.");
              console.error("Verification error:", err);
            }
          },
          prefill: {
            name: localStorage.getItem("userName") || "Customer Name",
            email: localStorage.getItem("userEmail") || "customer@example.com",
            contact: localStorage.getItem("userPhone") || "9999999999",
          },
          theme: { color: "#3399cc" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        toast.dismiss(toastId);
        toast.error("Failed to create Razorpay order.");

        console.error("Failed to create Razorpay order.");
      }
    } catch (error) {
      toast.dismiss(toastId);

      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data?.message?.includes("active plan")
      ) {
        toast.error(error.response.data.message); // Show custom message from backend
      } else {
        toast.error("Payment initiation failed. Please try again.");
      }

      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 mt-10">
          Choose Your Plan
        </h1>
        <p className="text-center text-red-600 font-semibold mb-5">
          ⚠️ This is a test mode. No real money will be deducted.
        </p>

        <Pricing handlePayment={handlePayment} isAuthenticated={true} />
      </div>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
};

export default PurchasePlan;
