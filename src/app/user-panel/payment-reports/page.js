"use client";

import { useEffect, useState } from "react";
import ReportSummaryCard from "../../components/ReportSummaryCard";
import ReportBarChart from "../../components/ReportBarChart";
import ReportPieChart from "../../components/ReportPieChart";

const dummyData = {
  totalPayments: 235,
  totalRevenue: 93400,
  highestPayment: {
    name: "John Doe",
    amount: 5999,
  },
  failedPayments: 12,
  paymentsByProduct: [
    { name: "NFC Card", amount: 34000 },
    { name: "Business Profile", amount: 22000 },
    { name: "Subscription", amount: 37400 },
  ],
  transactions: [
    {
      id: "TXN1001",
      customer: "John Doe",
      amount: 5999,
      status: "Success",
      method: "UPI",
      date: "2025-06-12",
    },
    {
      id: "TXN1002",
      customer: "Jane Smith",
      amount: 2999,
      status: "Failed",
      method: "Card",
      date: "2025-06-11",
    },
    {
      id: "TXN1003",
      customer: "Raj Verma",
      amount: 4999,
      status: "Success",
      method: "Net Banking",
      date: "2025-06-10",
    },
  ],
};

export default function PaymentReport() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    setReportData(dummyData);
  }, []);

  if (!reportData) return <p className="p-6">Loading payment report...</p>;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Payment Reports</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ReportSummaryCard
          title="Total Payments"
          value={reportData.totalPayments}
        />
        <ReportSummaryCard
          title="Total Revenue"
          value={`₹${reportData.totalRevenue}`}
        />
        <ReportSummaryCard
          title="Highest Payment"
          label={reportData.highestPayment.name}
          value={`₹${reportData.highestPayment.amount}`}
        />
        <ReportSummaryCard
          title="Failed Payments"
          value={reportData.failedPayments}
          color="text-red-600"
        />
      </div>

      {/* Revenue Bar Chart */}
      <ReportBarChart
        title="Revenue by Product"
        data={reportData.paymentsByProduct}
        dataKey="amount"
        nameKey="name"
      />

      {/* Transactions Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Transactions
        </h3>
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {reportData.transactions.map((txn) => (
                <tr key={txn.id} className="border-t">
                  <td className="px-4 py-2">{txn.id}</td>
                  <td className="px-4 py-2">{txn.customer}</td>
                  <td className="px-4 py-2">₹{txn.amount}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      txn.status === "Success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {txn.status}
                  </td>
                  <td className="px-4 py-2">{txn.method}</td>
                  <td className="px-4 py-2">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
