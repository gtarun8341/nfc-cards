"use client"; // Next.js Client Component

import { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig";

const PaymentManagementPage = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // useEffect(() => {
  const fetchSalesData = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken"); // Get the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
      const response = await api.get(
        `/api/order/sales-data?page=${page}&limit=10`,
        config
      );
      setSales(response.data.data);
      console.log(response.data.data);
      setFilteredSales(response.data.data); // Initialize filtered sales
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };
  //   fetchSalesData();
  // }, []);
  useEffect(() => {
    fetchSalesData();
  }, [page]);
  useEffect(() => {
    const filterSales = () => {
      let filtered = sales.filter((sale) => {
        const searchMatch = sale.products.some(
          (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.price.toString().includes(searchTerm) ||
            sale.productTemplateId?.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            sale.productTemplateId?.email
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            sale.productTemplateId?.phone.includes(searchTerm) ||
            sale.invoiceNumber.includes(searchTerm) ||
            sale.trackingNumber.includes(searchTerm) ||
            sale.userDetails?.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            sale.userDetails?.email
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            sale.userDetails?.phone.includes(searchTerm) ||
            sale.userDetails?.address
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
        const statusMatch = statusFilter ? sale.status === statusFilter : true;
        return searchMatch && statusMatch;
      });
      setFilteredSales(filtered);
    };

    filterSales();
  }, [searchTerm, statusFilter, sales]);

  const updateSaleField = async (id, field, value) => {
    try {
      const token = localStorage.getItem("adminAuthToken"); // Get the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      };
      // Update API endpoint
      await api.put(`/api/order/update-field/${id}`, { field, value }, config);

      setSales(
        sales.map((sale) =>
          sale._id === id
            ? {
                ...sale,
                [field]: value,
                priceWithGST:
                  field === "gstOnPurchase"
                    ? sale.totalAmount - sale.totalAmount * (value / 100) // Deduct GST from total
                    : sale.priceWithGST, // Keep existing priceWithGST if GST not changed
              }
            : sale
        )
      );
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 border rounded shadow-lg bg-white overflow-x-auto">
      <h2 className="text-2xl font-semibold text-center mb-5">
        Payment Management
      </h2>

      {/* Search and Filter Section */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Product Title, Seller, Invoice, Tracking Number, or User Details"
          className="p-2 border rounded w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Returned">Returned</option>
        </select>
      </div>

      {/* Sales Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Product Title</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Seller</th>
              <th className="border p-2">User Details</th>
              <th className="border p-2">GST on Purchase (%)</th>
              <th className="border p-2">Price with GST</th>
              <th className="border p-2">Payment Settled</th>
              <th className="border p-2">Invoice Number</th>
              <th className="border p-2">Tracking Number</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale._id}>
                <td className="border p-2">
                  {sale.products.map((product) => (
                    <div key={product.title}>{product.title}</div>
                  ))}
                </td>
                <td className="border p-2">
                  {sale.products.map((product) => (
                    <div key={product.title}>{product.quantity}</div>
                  ))}
                </td>
                <td className="border p-2">
                  {sale.products.map((product) => (
                    <div key={product.title}>{product.price.toFixed(2)}</div>
                  ))}
                </td>
                <td className="border p-2">{sale.totalAmount.toFixed(2)}</td>
                <td className="border p-2">
                  <div>{sale.productTemplateId?.name}</div>
                  <div>{sale.productTemplateId?.email}</div>
                  <div>{sale.productTemplateId?.phone}</div>
                </td>
                <td className="border p-2">
                  <div>{sale.userDetails?.name}</div>
                  <div>{sale.userDetails?.email}</div>
                  <div>{sale.userDetails?.phone}</div>
                  <div>{sale.userDetails?.address}</div>
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    className="border p-1 rounded"
                    value={sale.gstOnPurchase || ""}
                    onChange={(e) =>
                      updateSaleField(
                        sale._id,
                        "gstOnPurchase",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </td>
                <td className="border p-2">
                  {(
                    sale.totalAmount -
                    (sale.totalAmount * (sale.gstOnPurchase || 0)) / 100
                  ).toFixed(2)}
                </td>
                <td className="border p-2">
                  <input
                    type="checkbox"
                    checked={sale.paymentSettledToTemplateOwner}
                    onChange={(e) =>
                      updateSaleField(
                        sale._id,
                        "paymentSettledToTemplateOwner",
                        e.target.checked
                      )
                    }
                  />
                </td>
                <td className="border p-2">{sale.invoiceNumber}</td>
                <td className="border p-2">{sale.trackingNumber}</td>
                <td className="border p-2">
                  <select
                    value={sale.status}
                    onChange={(e) =>
                      updateSaleField(sale._id, "status", e.target.value)
                    }
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
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg font-semibold">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentManagementPage;
