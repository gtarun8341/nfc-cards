"use client";

import React, { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig";

const CustomerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState({
    nfcCards: 0,
    adminProducts: 0,
    subscriptionPlans: 0,
  });
  const [productsSold, setProductsSold] = useState([]);
  const [feedbackCounts, setFeedbackCounts] = useState({
    enquiries: 0,
    complaints: 0,
    reviews: 0,
    feedbacks: 0,
  });
  const [salesInfo, setSalesInfo] = useState({
    totalSales: "₹0",
    totalPayback: "₹0", // Optional, if you want to support it later
  });
  const [subscription, setSubscription] = useState({
    plan: "Unknown",
    renewDate: "N/A",
    status: "Inactive",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchDashboardStats = async () => {
      try {
        const { data } = await api.get("/api/dashboard/user-dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPurchases({
          nfcCards: data.data.cardPurchaseCount,
          adminProducts: data.data.adminProductCount,
          subscriptionPlans: data.data.subscriptionCount,
        });
        setSubscription({
          plan: data.data.currentPlan.plan,
          renewDate: data.data.currentPlan.renewDate,
          status: data.data.currentPlan.status,
        });
      } catch (error) {
        console.error("Error fetching user stats:", error.message);
      }
    };
    const fetchFeedbacks = async () => {
      try {
        const { data } = await api.get("/api/dashboard/user-dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { enquiries, feedbacks, complaints, reviews } = data.data;

        setFeedbackCounts({
          enquiries: enquiries.length,
          complaints: complaints.length,
          reviews: reviews.length,
          feedbacks: feedbacks.length,
        });
      } catch (error) {
        console.error("Error fetching feedback summary:", error.message);
      }
    };

    const fetchProductSales = async () => {
      try {
        const { data } = await api.get("/api/dashboard/product-sales-summary", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sales = data.data || [];

        setProductsSold(
          sales.map((item) => ({
            name: item._id,
            quantity: item.totalSold,
          }))
        );
        console.log(data);
        setSalesInfo({
          totalSales: data.overallRevenue,
        });
      } catch (error) {
        console.error("Error fetching product sales summary:", error.message);
      }
    };

    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([
        fetchDashboardStats(),
        fetchFeedbacks(),
        fetchProductSales(),
      ]);
      setLoading(false);
    };

    fetchAll();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Customer Dashboard</h1>

      {/* Purchase Summary */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Purchase Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(purchases).map(([label, count]) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow p-4 text-center"
            >
              <p className="text-lg font-medium capitalize">{label}</p>
              <p className="text-3xl font-bold text-green-600">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products Sold */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Products Sold</h2>
        <div className="bg-white rounded-2xl shadow p-4">
          <ul className="space-y-2">
            {productsSold.map((product, i) => (
              <li key={i} className="flex justify-between">
                <span>{product.name}</span>
                <span className="font-semibold">{product.quantity} sold</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Feedback and Contact Info */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Enquiry, Contact & Feedback Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Enquiry", count: feedbackCounts.enquiries },
            { label: "Contact Developer", count: feedbackCounts.complaints },
            { label: "Reviews", count: feedbackCounts.reviews },
            { label: "Feedback", count: feedbackCounts.feedbacks },
          ].map(({ label, count }) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow p-4 text-center"
            >
              <p className="text-lg font-medium">{label}</p>
              <p className="text-3xl font-bold text-indigo-600">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sales & Payback Info */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Sales & Payback Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <p className="text-lg font-medium">Total Sales</p>
            <p className="text-2xl font-bold text-blue-600">
              {salesInfo.totalSales}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <p className="text-lg font-medium">Total Payback</p>
            <p className="text-2xl font-bold text-purple-600">
              {salesInfo.totalPayback}
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Info */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Subscription Details</h2>
        <div className="bg-white rounded-2xl shadow p-4 space-y-1">
          <p>
            <strong>Plan:</strong> {subscription.plan}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="text-green-600 font-semibold">
              {subscription.status}
            </span>
          </p>
          <p>
            <strong>Renewal Date:</strong> {subscription.renewDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
