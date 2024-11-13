"use client"; // Next.js Client Component

import { useEffect, useState } from 'react';
import api from '../../apiConfig/axiosConfig';

const SoldProducts = () => {
  const [sales, setSales] = useState([]);
  const token = localStorage.getItem('authToken');

  const fetchSalesData = async () => {
    try {
      const response = await api.get('/api/order/user-sales-data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSales(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(
        `/api/order/update-status/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSalesData(); // Refresh data after status update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Payment Management</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Product Title', 'Quantity', 'Price', 'Total', 'GST on Purchase (%)', 'Price with GST', 'Payment Settled', 'Invoice Number', 'Tracking Number', 'Status'].map((header) => (
              <th key={header} className="border p-3 bg-gray-100 text-sm font-medium text-gray-700">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => {
            const priceWithGst = sale.gstOnPurchase 
              ? (sale.totalAmount - (sale.totalAmount * sale.gstOnPurchase / 100)).toFixed(2)
              : sale.totalAmount.toFixed(2);

            return (
              <tr key={sale._id} className="text-center border-t">
                <td className="border p-3 text-sm">
                  {sale.products.map((product) => (
                    <div key={product.title}>{product.title}</div>
                  ))}
                </td>
                <td className="border p-3 text-sm">
                  {sale.products.map((product) => (
                    <div key={product.title}>{product.quantity}</div>
                  ))}
                </td>
                <td className="border p-3 text-sm">
                  {sale.products.map((product) => (
                    <div key={product.title}>{product.price.toFixed(2)}</div>
                  ))}
                </td>
                <td className="border p-3 text-sm">{sale.totalAmount.toFixed(2)}</td>
                <td className="border p-3 text-sm">{sale.gstOnPurchase !== null ? `${sale.gstOnPurchase}%` : 'N/A'}</td>
                <td className="border p-3 text-sm">{priceWithGst}</td>
                <td className="border p-3 text-sm">{sale.paymentSettledToTemplateOwner ? 'Yes' : 'No'}</td>
                <td className="border p-3 text-sm">{sale.invoiceNumber}</td>
                <td className="border p-3 text-sm">{sale.trackingNumber}</td>
                <td className="border p-3 text-sm">
                  <select
                    value={sale.status}
                    onChange={(e) => updateStatus(sale._id, e.target.value)}
                    className="border p-1 rounded focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Returned">Returned</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SoldProducts;
