"use client";

import { useEffect, useState } from "react";
import ReportSummaryCard from "../../components/ReportSummaryCard";
import ReportBarChart from "../../components/ReportBarChart";
import ReportPieChart from "../../components/ReportPieChart";

export default function ProductReport() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const dummyData = {
      totalSales: 1289,
      highestSelling: {
        name: "Premium NFC Card",
        sold: 450,
      },
      lowestSelling: {
        name: "PDF Visiting Card",
        sold: 39,
      },
      productSales: [
        { name: "Premium NFC Card", sold: 450 },
        { name: "Standard NFC Card", sold: 312 },
        { name: "Physical Visiting Card", sold: 198 },
        { name: "One Page Business Profile", sold: 134 },
        { name: "PDF Visiting Card", sold: 39 },
      ],
    };

    setReportData(dummyData);
  }, []);

  if (!reportData) return <p className="p-6">Loading report...</p>;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Product Sales Report</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportSummaryCard
          title="Total Sales"
          value={reportData.totalSales}
          color="text-green-600"
        />
        <ReportSummaryCard
          title="Highest Selling"
          label={reportData.highestSelling.name}
          value={`${reportData.highestSelling.sold} sold`}
          color="text-green-600"
        />
        <ReportSummaryCard
          title="Lowest Selling"
          label={reportData.lowestSelling.name}
          value={`${reportData.lowestSelling.sold} sold`}
          color="text-red-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ReportBarChart
          title="Product Sales Comparison"
          data={reportData.productSales}
          dataKey="sold"
        />
        <ReportPieChart
          title="Sales Distribution"
          data={reportData.productSales}
          dataKey="sold"
        />
      </div>
    </div>
  );
}
