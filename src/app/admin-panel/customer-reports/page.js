"use client";

import { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig";
import ReportSummaryCard from "../../components/ReportSummaryCard";
import ReportBarChart from "../../components/ReportBarChart";
import ReportPieChart from "../../components/ReportPieChart";

export default function CustomerReports() {
  const [customerStats, setCustomerStats] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      const token = localStorage.getItem("adminAuthToken"); // Assuming token is stored here

      if (!token) return;
      try {
        const { data } = await api.get("/api/admin-dashboard/user-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(data.data);
        setCustomerStats(data.data);
      } catch (err) {
        console.error("Failed to fetch user stats:", err.message);
      }
    };

    fetchUserStats();
  }, [token]);

  if (!customerStats) return <p className="p-6">Loading customer report...</p>;

  const { joined, renewed, left } = customerStats;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">
        Customer Join / Leave Report
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportSummaryCard title="Joined Customers" value={joined} />
        <ReportSummaryCard
          title="Renewed Customers"
          value={renewed}
          color="text-blue-600"
        />
        <ReportSummaryCard
          title="Left Customers"
          value={left}
          color="text-red-600"
        />
      </div>

      {/* Pie Chart Summary */}
      <ReportPieChart
        data={[
          { name: "Joined", count: joined },
          { name: "Renewed", count: renewed },
          { name: "Left", count: left },
        ]}
        title="Customer Status Distribution"
      />
    </div>
  );
}
