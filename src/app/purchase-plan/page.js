"use client";

import React, { useState, useEffect } from 'react';
import Pricing from '../components/Pricing';
import Script from 'next/script';
import api from '../apiConfig/axiosConfig';
import { useRouter } from 'next/navigation'; 

const PurchasePlan = () => {
    const router = useRouter();

    const pricingData = [
        { id: 1, title: "Basic", price: 5, currency: "INR", features: ["Feature 1", "Feature 2"], expiryMonths: 1 },
        { id: 2, title: "Pro", price: 15, currency: "INR", features: ["Feature 1", "Feature 2", "Feature 3"], expiryMonths: 3 },
        { id: 3, title: "Enterprise", price: 30, currency: "INR", features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"], expiryMonths: 12 },
      ];
      

  const handlePayment = async (plan) => {
    try {
      const response = await api.post("/api/payment/create-order", {
        amount: plan.price * 100,
        currency: plan.currency,
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
            const userId = localStorage.getItem('_id');

            const verifyResponse = await api.post("/api/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: userId, // Include userId here
              plan: {
                id: plan.id,
                title: plan.title,
                price: plan.price,
                currency: plan.currency,
                expiryMonths: plan.expiryMonths,  // Include expiryMonths
            }
            });
            const result = verifyResponse.data;
            alert(result.message);
            if (result.status === "success") {
                router.push('/auth');
            }
          },
          prefill: {
            name: localStorage.getItem('userName') || "Customer Name",
            email: localStorage.getItem('userEmail') || "customer@example.com",
            contact: localStorage.getItem('userPhone') || "9999999999",
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

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Choose Your Plan</h1>
      <Pricing pricingData={pricingData} handlePayment={handlePayment} />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
};

export default PurchasePlan;
