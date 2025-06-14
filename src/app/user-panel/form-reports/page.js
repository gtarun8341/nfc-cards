"use client";
import { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig";
import ReportSummaryCard from "../../components/ReportSummaryCard";
import ReportBarChart from "../../components/ReportBarChart";
import ReportPieChart from "../../components/ReportPieChart";

export default function FormReviews() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) return;

    const fetchFeedbacks = async () => {
      try {
        const { data } = await api.get("/api/dashboard/user-dashboard", {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        const { enquiries, feedbacks, complaints, reviews } = data.data;
        const totalForms =
          enquiries.length +
          feedbacks.length +
          complaints.length +
          reviews.length;

        const formTypes = [
          { name: "Enquiry", count: enquiries.length },
          { name: "Feedback", count: feedbacks.length },
          { name: "Contact Us", count: complaints.length },
          { name: "Contact Developer", count: reviews.length },
        ];

        setData({ totalForms, formTypes });
      } catch (error) {
        console.error("Error fetching feedback summary:", error.message);
      }
    };

    fetchFeedbacks();
  }, []);

  if (!data) return <p className="p-6">Loading form reports...</p>;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">
        Form Submissions Report
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportSummaryCard title="Total Submissions" value={data.totalForms} />
        <ReportSummaryCard
          title="Highest Form Type"
          label={getMaxForm(data.formTypes).name}
          value={`${getMaxForm(data.formTypes).count} submitted`}
        />
        <ReportSummaryCard
          title="Lowest Form Type"
          label={getMinForm(data.formTypes).name}
          value={`${getMinForm(data.formTypes).count} submitted`}
          color="text-red-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ReportBarChart
          data={data.formTypes}
          title="Form Submission Comparison"
        />
        <ReportPieChart data={data.formTypes} title="Submission Distribution" />
      </div>
    </div>
  );
}

function getMaxForm(formTypes) {
  return formTypes.reduce((prev, curr) =>
    curr.count > prev.count ? curr : prev
  );
}

function getMinForm(formTypes) {
  return formTypes.reduce((prev, curr) =>
    curr.count < prev.count ? curr : prev
  );
}
