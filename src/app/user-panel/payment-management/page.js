// PaymentManagementPage.js
import React from 'react';

const PaymentManagementPage = () => {
  // Sample payment data
  const paymentData = [
    {
      id: 1,
      date: '2024-10-01',
      totalSales: 5000,
      amountReceived: 4500,
      amountPending: 500,
    },
    {
      id: 2,
      date: '2024-10-02',
      totalSales: 7000,
      amountReceived: 6000,
      amountPending: 1000,
    },
    {
      id: 3,
      date: '2024-10-03',
      totalSales: 3000,
      amountReceived: 2500,
      amountPending: 500,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Payment Management</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-left">
            <th className="py-3 px-4 border-b">Date</th>
            <th className="py-3 px-4 border-b">Total Sales</th>
            <th className="py-3 px-4 border-b">Amount Received</th>
            <th className="py-3 px-4 border-b">Amount Pending</th>
          </tr>
        </thead>
        <tbody>
          {paymentData.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b">{payment.date}</td>
              <td className="py-3 px-4 border-b">${payment.totalSales}</td>
              <td className="py-3 px-4 border-b">${payment.amountReceived}</td>
              <td className="py-3 px-4 border-b">${payment.amountPending}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentManagementPage;
