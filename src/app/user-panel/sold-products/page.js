"use client"; // Next.js Client Component

import { useEffect, useState, useCallback } from "react";
import api from "../../apiConfig/axiosConfig";
import * as XLSX from "xlsx";

const SoldProducts = () => {
  const [sales, setSales] = useState([]);
  const [token, setToken] = useState(null); // State to store the token
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch sales data
  const fetchSalesData = useCallback(async () => {
    if (!token) return;

    try {
      const encodedSearch = encodeURIComponent(searchQuery);
      const response = await api.get(
        `/api/order/user-sales-data?page=${page}&limit=10&search=${encodedSearch}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSales(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  }, [token, page, searchQuery]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1); // Reset to first page
      fetchSalesData();
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    fetchSalesData();
  }, [page]);

  const handleDownload = () => {
    if (sales.length === 0) {
      alert("No sales data to download.");
      return;
    }

    const data = [];

    sales.forEach((sale) => {
      sale.products.forEach((product) => {
        const priceWithGst = sale.gstOnPurchase
          ? (
              sale.totalAmount -
              (sale.totalAmount * sale.gstOnPurchase) / 100
            ).toFixed(2)
          : sale.totalAmount.toFixed(2);

        data.push({
          "Invoice Number": sale.invoiceNumber,
          "Tracking Number": sale.trackingNumber,
          Status: sale.status,
          Date: sale.createdAt,
          "Buyer Name": sale?.userDetails?.name || "N/A",
          "Buyer Email": sale?.userDetails?.email || "N/A",
          Address: [
            sale?.userDetails?.address,
            sale?.userDetails?.state,
            sale?.userDetails?.country,
            sale?.userDetails?.pincode,
          ]
            .filter(Boolean)
            .join(", "),

          "Product Title": product.title,
          Quantity: product.quantity,
          "Price (Each)": product.price,
          "Total Price": sale?.totalAmount,
          "GST on Purchase (%)": sale?.gstOnPurchase || "N/A",
          "Price with GST": priceWithGst || "N/A",
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sold Products");

    XLSX.writeFile(workbook, "all_sold_products.xlsx");
  };
  // Update sale status
  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(
        `/api/order/update-status-user/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSalesData(); // Refresh data after status update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Fetch token on the client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      setToken(storedToken); // Set token to state
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  useEffect(() => {
    if (token) {
      fetchSalesData(); // Fetch sales data after token is set
    }
  }, [token, fetchSalesData]);

  return (
    <div className="max-w-6xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Payment Management
      </h2>
      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by Product Title, Invoice Number, or Tracking Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-1/3"
        />
      </div>
      <button
        onClick={handleDownload}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Download All Sales (.xlsx)
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {[
              "Product Title",
              "Quantity",
              "Price",
              "Total",
              "GST on Purchase (%)",
              "Price with GST",
              "Payment Settled",
              "Invoice Number",
              "Tracking Number",
              "Purchased User Details",
              "Status",
            ].map((header) => (
              <th
                key={header}
                className="border p-3 bg-gray-100 text-sm font-medium text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sales.length === 0 ? (
            <tr>
              <td colSpan="11" className="py-3 px-4 text-center text-gray-500">
                No sales found.
              </td>
            </tr>
          ) : (
            sales.map((sale) => {
              const priceWithGst = sale.gstOnPurchase
                ? (
                    sale.totalAmount -
                    (sale.totalAmount * sale.gstOnPurchase) / 100
                  ).toFixed(2)
                : sale.totalAmount.toFixed(2);

              return (
                <tr key={sale._id} className="text-center border-t">
                  <td className="border p-3 text-sm">
                    {Array.isArray(sale.products)
                      ? sale.products.map((product, idx) => (
                          <div key={idx}>{product.title}</div>
                        ))
                      : "No products"}
                  </td>

                  <td className="border p-3 text-sm">
                    {Array.isArray(sale.products)
                      ? sale.products.map((product, idx) => (
                          <div key={idx}>{product.quantity}</div>
                        ))
                      : "N/A"}
                  </td>

                  <td className="border p-3 text-sm">
                    {Array.isArray(sale.products)
                      ? sale.products.map((product, idx) => (
                          <div key={idx}>{product.price?.toFixed(2)}</div>
                        ))
                      : "N/A"}
                  </td>

                  <td className="border p-3 text-sm">
                    {sale.totalAmount.toFixed(2)}
                  </td>
                  <td className="border p-3 text-sm">
                    {sale.gstOnPurchase !== null
                      ? `${sale.gstOnPurchase}%`
                      : "N/A"}
                  </td>
                  <td className="border p-3 text-sm">{priceWithGst}</td>
                  <td className="border p-3 text-sm">
                    {sale.paymentSettledToTemplateOwner ? "Yes" : "No"}
                  </td>
                  <td className="border p-3 text-sm">{sale.invoiceNumber}</td>
                  <td className="border p-3 text-sm">{sale.trackingNumber}</td>
                  <td className="border p-3 text-sm">
                    <div>{sale.userDetails.name}</div>
                    <div>{sale.userDetails.email}</div>
                    <div>{sale.userDetails.phone}</div>
                    <div>{sale.userDetails.country}</div>
                    <div>{sale.userDetails.state}</div>
                    <div>{sale.userDetails.pincode}</div>
                    <div>{sale.userDetails.address}</div>
                  </td>
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
            })
          )}
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
  );
};

export default SoldProducts;
