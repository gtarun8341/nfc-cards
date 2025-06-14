"use client";

import React, { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig"; // Adjust path as needed
const AdminDashboard = () => {
  const customerDemographics = {
    locations: [
      { place: "Delhi", count: 40 },
      { place: "Mumbai", count: 35 },
      { place: "Bangalore", count: 25 },
    ],
    professions: [
      { job: "Doctor", count: 20 },
      { job: "Engineer", count: 30 },
      { job: "Designer", count: 15 },
    ],
  };

  const feedbackSummary = [
    { label: "Enquiry", count: 20 },
    { label: "Contact Developer", count: 8 },
    { label: "Contact Us", count: 10 },
    { label: "Feedback", count: 30 },
  ];

  const salesInfo = {
    totalSales: "₹1,20,000",
    totalPayback: "₹40,000",
  };
  const [customerStats, setCustomerStats] = useState({
    joined: 0,
    renewed: 0,
    left: 0,
  });

  const [salesStats, setSalesStats] = useState({
    cardPurchaseCount: 0,
    adminProductCount: 0,
    subscriptionCount: 0,
  });

  const [topTemplates, setTopTemplates] = useState([]);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminAuthToken")
      : null;

  useEffect(() => {
    if (token) {
      fetchUserStats();
      fetchSalesStats();
      fetchTopTemplates();
    }
  }, [token]);

  const fetchUserStats = async () => {
    try {
      const { data } = await api.get("/api/admin-dashboard/user-stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomerStats(data.data);
    } catch (err) {
      console.error("Failed to fetch user stats:", err.message);
    }
  };

  const fetchSalesStats = async () => {
    try {
      const { data } = await api.get("/api/admin-dashboard/sales-stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSalesStats(data.data);
    } catch (err) {
      console.error("Failed to fetch sales stats:", err.message);
    }
  };

  const fetchTopTemplates = async () => {
    try {
      const { data } = await api.get("/api/admin-dashboard/top-templates", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTopTemplates(data.data);
    } catch (err) {
      console.error("Failed to fetch top templates:", err.message);
    }
  };
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Customer Activity Summary */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Customer Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(customerStats).map(([key, value]) => (
            <div
              key={key}
              className="bg-white rounded-2xl shadow p-4 text-center"
            >
              <p className="text-lg font-medium capitalize">{key}</p>
              <p className="text-3xl font-bold text-green-600">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Summary */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Sales Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(salesStats).map(([key, value]) => (
            <div
              key={key}
              className="bg-white rounded-2xl shadow p-4 text-center"
            >
              <p className="text-lg font-medium capitalize">{key}</p>
              <p className="text-3xl font-bold text-blue-600">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Template Usage */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Template Usage</h2>
        <div className="bg-white rounded-2xl shadow p-4">
          <ul className="space-y-2">
            {topTemplates.map((tpl, index) => (
              <li key={index}>
                {tpl.name} ({tpl.type}) - Selected {tpl.selectedCount} times
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Customer Demographics */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Customer Demographics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-medium mb-2">Locations</h3>
            <ul className="space-y-1">
              {customerDemographics.locations.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.place}</span>
                  <span className="font-semibold">{item.count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-medium mb-2">Professions</h3>
            <ul className="space-y-1">
              {customerDemographics.professions.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.job}</span>
                  <span className="font-semibold">{item.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Feedback Summary */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Enquiry & Feedback Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {feedbackSummary.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl shadow p-4 text-center"
            >
              <p className="text-lg font-medium">{item.label}</p>
              <p className="text-3xl font-bold text-indigo-600">{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sales & Payback */}
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
    </div>
  );
};

export default AdminDashboard;
