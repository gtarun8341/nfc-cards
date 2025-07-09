"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../apiConfig/axiosConfig";
import Script from "next/script";
import {
  FaEye,
  FaTrashAlt,
  FaExternalLinkAlt,
  FaCheckCircle,
} from "react-icons/fa";

const PhysicalVisitingCardPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewHtml, setPreviewHtml] = useState({});
  const [selectedTemplateData, setSelectedTemplateData] = useState([]); // Store selected template data
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [cardType, setCardType] = useState(""); // Selected card type
  const [selectedTemplate, setSelectedTemplate] = useState(""); // Selected template
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: " ",
    country: " ",
    pincode: " ",
  });
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState([]);
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await api.get(
        `/api/selectedtemplates/template-stats?type=physical-visiting-card`,
        config
      );
      console.log(res.data);
      const data = res.data.stats ? res.data.stats[0] : res.data;
      setStats(data);
    } catch (err) {
      console.error("Error fetching template change stats", err);
    }
  };
  //   useEffect(() => {
  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.get(
        `/api/templates/templates?type=physical-visiting-card&page=${page}&limit=9`,
        config
      );
      setTemplates(response.data.templates);
      setTotalPages(response.data.totalPages);
      setPage(response.data.currentPage); // Fetch selected template data for the user
      const selectedTemplatesResponse = await api.get(
        "/api/selectedtemplates/link?type=physical-visiting-card",
        config
      );
      console.log(
        "API Response for Selected Template:",
        selectedTemplatesResponse.data
      );

      setSelectedTemplateData(
        Array.isArray(selectedTemplatesResponse.data.selectedTemplateData) &&
          selectedTemplatesResponse.data.selectedTemplateData.length > 0
          ? selectedTemplatesResponse.data.selectedTemplateData[0]
          : null
      );

      for (const template of response.data.templates) {
        await previewTemplate(template._id);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  //     fetchTemplates();
  //   }, []);
  useEffect(() => {
    fetchTemplates(page);
  }, [page]);
  useEffect(() => {
    fetchStats();
  }, []);
  const previewTemplate = async (templateId) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.get(
        `/api/templates/render/${templateId}?type=physical-visiting-card`,
        config
      );
      setPreviewHtml((prev) => ({ ...prev, [templateId]: response.data }));
    } catch (error) {
      console.error("Error fetching template preview:", error);
    }
  };

  const handleViewTemplate = async (templateId) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.get(
        `/api/templates/render/${templateId}?type=physical-visiting-card`,
        config
      );
      const newWindow = window.open();
      newWindow.document.write(response.data);
      newWindow.document.close();
    } catch (error) {
      console.error("Error fetching template:", error);
    }
  };

  const handleSelectTemplate = async (templateId) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post(
        "/api/selectedtemplates/select?type=physical-visiting-card",
        { templateId },
        config
      );
      setSelectedTemplateData({
        templateId,
        generatedLink: response.data.link,
      });
      await fetchStats();
    } catch (error) {
      console.error("Error selecting template:", error);
    }
  };

  const handleDeleteSelectedTemplate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await api.post(
        "/api/selectedtemplates/delete?type=physical-visiting-card",
        {},
        config
      );
      setSelectedTemplateData(null);
      await fetchStats();
    } catch (error) {
      console.error("Error deleting selected template:", error);
    }
  };

  const handlePurchaseClick = () => {
    setIsModalOpen(true); // Open the modal when the user clicks the "Purchase" button
  };
  const handleCancelClick = () => {
    setIsModalOpen(false); // Close the modal when the user clicks the "Cancel" button
  };
  const prices = {
    metal: 1000, // Example price for metal card
    plastic: 500, // Example price for plastic card
    wooden: 300, // Example price for wooden card
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the auth token from local storage
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Define template type and purchase data
      const templateType = "physical-visiting-card"; // Example selected template
      const selectedCardPrice = prices[cardType]; // Get the price based on the selected card type

      if (!selectedCardPrice) {
        alert("Please select a valid card type.");
        return;
      }

      const purchaseData = {
        cardType,
        templateId: selectedTemplate,
        templateType,
        userDetails,
        amount: selectedCardPrice, // Send the price of the selected card
        currency: "INR", // Assuming INR for now, adjust as necessary
      };

      // Send purchase data to the server to create a Razorpay order
      const purchaseResponse = await api.post(
        "/api/cardPurchase/card-purchase",
        purchaseData,
        config
      );
      const orderData = purchaseResponse.data;

      if (orderData && orderData.orderId) {
        // Razorpay options configuration
        const options = {
          key: orderData.key, // Razorpay key from the server response
          amount: orderData.amount, // Amount in paisa (e.g., ₹500 -> 50000)
          currency: orderData.currency,
          name: "Card Purchase",
          description: "Payment for card template purchase",
          order_id: orderData.orderId, // Razorpay order ID
          handler: async function (response) {
            // Handle successful payment verification
            const verifyResponse = await api.post(
              "/api/cardPurchase/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                purchaseData, // Pass the original purchase data
              },
              config
            );

            const result = verifyResponse.data;
            alert(result.message);

            if (result.status === "success") {
              setIsModalOpen(false); // Close the modal on success
            }
          },
          prefill: {
            name: userDetails.name || "Customer Name",
            email: userDetails.email || "customer@example.com",
            contact: userDetails.phone || "9999999999",
          },
          theme: { color: "#3399cc" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        console.error("Failed to create Razorpay order.");
        alert("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting purchase or initiating payment:", error);
      alert("Error occurred during the purchase process. Please try again.");
    }
  };
  if (loading) {
    return (
      <div className="text-center text-xl text-gray-500 py-4">
        Loading templates...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
          Available physical visiting card Templates{" "}
        </h1>
        <button
          onClick={handlePurchaseClick}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          Purchase a Card
        </button>
      </div>{" "}
      <div className="mb-6 flex justify-center">
        <div className="bg-white shadow-md rounded-lg px-6 py-4 w-full max-w-xl flex justify-between items-center">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Used</p>
            <p className="text-xl font-semibold text-blue-600">
              {stats.selectedCount}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Limit</p>
            <p className="text-xl font-semibold text-green-600">
              {stats.changeLimit === "unlimited"
                ? "Unlimited"
                : stats.changeLimit}
            </p>
          </div>
          {stats.changeLimit !== "unlimited" && (
            <div className="text-center">
              <p className="text-gray-500 text-sm">Remaining</p>
              <p className="text-xl font-semibold text-orange-500">
                {stats.remaining}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.length > 0 ? (
          templates.map((template) => (
            <div
              key={template._id}
              className="bg-white border p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <iframe
                srcDoc={previewHtml[template._id]}
                title={template.name}
                className="h-40 w-full object-cover mb-4 rounded-md border"
                style={{ border: "none" }}
              />
              <h2 className="font-semibold text-lg text-gray-800">
                {template.name}
              </h2>
              <div className="flex items-center justify-start mt-3 space-x-3">
                <button
                  onClick={() => handleViewTemplate(template._id)}
                  className="bg-white-600 text-blue py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  <FaEye className="text-xl" />
                </button>

                {/* Check if a template is selected */}
                {selectedTemplateData &&
                selectedTemplateData.templateId === template._id ? (
                  <div className="">
                    {/* Only for the selected template, show these buttons */}
                    <button
                      onClick={() =>
                        window.open(
                          selectedTemplateData.generatedLink,
                          "_blank"
                        )
                      }
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                      <FaExternalLinkAlt className="text-xl" />
                    </button>
                    <button
                      onClick={handleDeleteSelectedTemplate}
                      disabled={stats.remaining === 0}
                      className={`ml-2 py-2 px-4 rounded-lg transition duration-200 ${
                        stats.remaining === 0
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                      title={
                        stats.remaining === 0
                          ? "Limit reached. You cannot delete this template now."
                          : "Delete selected template"
                      }
                    >
                      <FaTrashAlt className="text-xl" />
                    </button>
                  </div>
                ) : (
                  // Only show Select Template button if no template is selected
                  !selectedTemplateData && (
                    <button
                      onClick={() => handleSelectTemplate(template._id)}
                      className=" inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                      <FaCheckCircle className="text-xl" />
                    </button>
                  )
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-600">
            No templates found.
          </p>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg font-semibold">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
      {/* Modal for Purchase */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <h2 className="text-xl font-bold text-center mb-4">
              Purchase Your Card
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card Type */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Card Type</label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                    required
                  >
                    <option value="">Select Card Type</option>
                    <option value="metal">Metal - 1000rs</option>
                    <option value="plastic">Plastic - 500rs</option>
                    <option value="wooden">Wooden - 300rs</option>
                  </select>
                </div>

                {/* Template Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Template Name
                  </label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    required
                  >
                    <option value="">Select Template</option>
                    {templates.map((template) => (
                      <option key={template._id} value={template._id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={userDetails.name}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, name: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-lg"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={userDetails.phone}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, phone: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Address */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={userDetails.address}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        address: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* State */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={userDetails.state}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, state: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Country */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={userDetails.country}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        country: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Pincode */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={userDetails.pincode}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        pincode: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
};

export default PhysicalVisitingCardPage;
