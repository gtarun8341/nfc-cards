import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Importing chart.js
import api from "../../apiConfig/axiosConfig"; // Ensure you have the right API config
const ProductSalesManagementPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fetch sales data when the component mounts or when startDate/endDate change
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Get the token from localStorage
        const response = await api.get('/api/order/user-sales-graph-data', {
          params: { startDate, endDate },
          headers: { Authorization: `Bearer ${token}` }, // Add token in the request header
        });
        setSalesData(response.data);
        prepareChartData(response.data); // Prepare chart data after fetching
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
  
    fetchSalesData();
  }, [startDate, endDate]); // Re-fetch on date range changes
  

  const prepareChartData = (salesData) => {
    if (!salesData || salesData.length === 0) return;
  
    const categories = salesData
      .map(item => item.products.map(p => p.title))
      .flat(); // Flatten array of arrays to get all product titles
  
    const quantities = salesData
      .map(item => item.products.map(p => p.quantity))
      .flat();
  
    const totalSales = salesData
      .map(item => item.products.map(p => p.price * p.quantity))
      .flat();
  
    setChartData({
      labels: categories,
      datasets: [
        {
          label: 'Quantity Sold',
          data: quantities,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Total Sales ($)',
          data: totalSales,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    });
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Sales Management</h1>

      <div className="mb-4">
        <label htmlFor="startDate" className="mr-2">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded"
        />
        <label htmlFor="endDate" className="mr-2 ml-4">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="chart-container mb-6" style={{ height: '400px' }}>
        {chartData.labels && chartData.datasets ? (
          <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
        ) : (
          <p>Loading chart data...</p> // Placeholder text or loading spinner
        )}
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
  <thead>
    <tr className="bg-gray-200 text-gray-700 text-left">
      <th className="py-3 px-4 border-b">Category</th>
      <th className="py-3 px-4 border-b">Product</th>
      <th className="py-3 px-4 border-b">Quantity Sold</th>
      <th className="py-3 px-4 border-b">Total Sales</th>
    </tr>
  </thead>
  <tbody>
    {Array.isArray(salesData) && salesData.length > 0 ? (
      salesData.map((item, index) => (
        item.products.map((product, subIndex) => (
          <tr key={`${index}-${subIndex}`} className="hover:bg-gray-100">
            <td className="py-3 px-4 border-b">{item.category || "N/A"}</td> {/* If no category field, show N/A */}
            <td className="py-3 px-4 border-b">{product.title}</td>
            <td className="py-3 px-4 border-b">{product.quantity}</td>
            <td className="py-3 px-4 border-b">${product.price * product.quantity}</td>
          </tr>
        ))
      ))
    ) : (
      <tr>
        <td colSpan="4" className="py-3 px-4 text-center">No data available</td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  );
};

export default ProductSalesManagementPage;
