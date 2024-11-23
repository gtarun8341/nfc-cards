"use client"; // Next.js Client Component

import { useEffect, useState } from 'react';
import api from '../../apiConfig/axiosConfig';

const PaymentManagementPage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem('adminAuthToken'); // Get the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        };
        const response = await api.get('/api/order/sales-data',config);
        setSales(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchSalesData();
  }, []);

  const updateSaleField = async (id, field, value) => {
    try {
      const token = localStorage.getItem('adminAuthToken'); // Get the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
      // Update API endpoint
      await api.put(`/api/order/update-field/${id}`, { field, value },config);

      setSales(sales.map(sale => 
        sale._id === id
          ? { 
              ...sale,
              [field]: value,
              priceWithGST: field === 'gstOnPurchase'
                ? sale.totalAmount - (sale.totalAmount * (value / 100)) // Deduct GST from total
                : sale.priceWithGST // Keep existing priceWithGST if GST not changed
            }
          : sale
      ));
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 border rounded shadow-lg bg-white overflow-x-auto">
      <h2 className="text-2xl font-semibold text-center mb-5">Payment Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Product Title</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Seller</th>
              <th className="border p-2">GST on Purchase (%)</th>
              <th className="border p-2">Price with GST</th>
              <th className="border p-2">Payment Settled</th>
              <th className="border p-2">Invoice Number</th>
              <th className="border p-2">Tracking Number</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td className="border p-2">
                  {sale.products.map(product => <div key={product.title}>{product.title}</div>)}
                </td>
                <td className="border p-2">
                  {sale.products.map(product => <div key={product.title}>{product.quantity}</div>)}
                </td>
                <td className="border p-2">
                  {sale.products.map(product => <div key={product.title}>{product.price.toFixed(2)}</div>)}
                </td>
                <td className="border p-2">{sale.totalAmount.toFixed(2)}</td>
                <td className="border p-2">
                  <div>{sale.productTemplateId?.name}</div>
                  <div>{sale.productTemplateId?.email}</div>
                  <div>{sale.productTemplateId?.phone}</div>
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="border p-1 rounded"
                    value={sale.gstOnPurchase || ""}
                    onChange={(e) => updateSaleField(sale._id, "gstOnPurchase", parseFloat(e.target.value))}
                  />
                </td>
                <td className="border p-2">
                  {(sale.totalAmount - (sale.totalAmount * (sale.gstOnPurchase || 0) / 100)).toFixed(2)}
                </td>
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={sale.paymentSettledToTemplateOwner}
                    onChange={(e) => updateSaleField(sale._id, "paymentSettledToTemplateOwner", e.target.checked)}
                  />
                </td>
                <td className="border p-2">{sale.invoiceNumber}</td>
                <td className="border p-2">{sale.trackingNumber}</td>
                <td className="border p-2">
                  <select
                    value={sale.status}
                    onChange={(e) => updateSaleField(sale._id, "status", e.target.value)}
                    className="border p-1 rounded"
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagementPage;
