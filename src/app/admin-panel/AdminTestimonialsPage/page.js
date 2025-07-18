"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig";
import Image from "next/image";
import toast from "react-hot-toast";

const AdminTestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    image: null,
    date: new Date().toISOString().split("T")[0], // Set initial date to today's date in "YYYY-MM-DD" format
    customerName: "",
    mobileNumber: "",
    subject: "",
    rating: "",
    menuName: "",
    description: "",
    actionTaken: "",
    presentStatus: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null); // For editing

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const url = `/api/testimonials/all?search=${encodeURIComponent(
        searchTerm
      )}`;

      const response = await api.get(url, config);
      setTestimonials(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setError("Failed to load testimonials");
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // ✅ this will trigger the useEffect
  };
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTestimonials();
    }, 500); // 500ms debounce

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleAddTestimonial = async () => {
    const formData = new FormData();
    for (const key in newTestimonial) {
      formData.append(key, newTestimonial[key]);
    }

    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await api.post(
        "/api/testimonials/add",
        formData,
        config
      );
      setTestimonials([response.data.testimonial, ...testimonials]);
      setFilteredTestimonials([response.data.testimonial, ...testimonials]);
      closeModal();
      toast.success("Testimonial added successfully!");
    } catch (error) {
      setError("Failed to add testimonial");
      toast.error("Failed to add testimonial.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTestimonial(null);
    setNewTestimonial({
      image: null,
      date: new Date().toISOString().split("T")[0], // Reset date to today's date for new testimonial
      customerName: "",
      mobileNumber: "",
      subject: "",
      rating: "",
      menuName: "",
      description: "",
      actionTaken: "",
      presentStatus: "",
    });
  };

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
    setNewTestimonial({
      image: null,
      date: new Date(testimonial.date).toISOString().split("T")[0], // Format the date to "YYYY-MM-DD"
      customerName: testimonial.customerName,
      mobileNumber: testimonial.mobileNumber,
      subject: testimonial.subject,
      rating: testimonial.rating,
      menuName: testimonial.menuName,
      description: testimonial.description,
      actionTaken: testimonial.actionTaken,
      presentStatus: testimonial.presentStatus,
    });
    setModalOpen(true);
  };

  const handleDeleteTestimonial = async (id) => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.delete(`/api/testimonials/delete/${id}`, config);
      setTestimonials(
        testimonials.filter((testimonial) => testimonial._id !== id)
      );
      setFilteredTestimonials(
        filteredTestimonials.filter((testimonial) => testimonial._id !== id)
      );
      toast.success("Testimonial deleted successfully!");
    } catch (error) {
      setError("Failed to delete testimonial");
      toast.error("Failed to delete testimonial.");
    }
  };

  const handleUpdateTestimonial = async () => {
    const formData = new FormData();
    for (const key in newTestimonial) {
      formData.append(key, newTestimonial[key]);
    }

    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await api.put(
        `/api/testimonials/edit/${editingTestimonial._id}`,
        formData,
        config
      );
      setTestimonials(
        testimonials.map((testimonial) =>
          testimonial._id === editingTestimonial._id
            ? response.data.testimonial
            : testimonial
        )
      );
      setFilteredTestimonials(
        filteredTestimonials.map((testimonial) =>
          testimonial._id === editingTestimonial._id
            ? response.data.testimonial
            : testimonial
        )
      );
      closeModal();
      toast.success("Testimonial updated successfully!");
    } catch (error) {
      toast.error("Failed to update testimonial.");
      setError("Failed to update testimonial");
    }
  };

  const handleDateChange = (e) => {
    setNewTestimonial({
      ...newTestimonial,
      date: e.target.value,
    });
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Manage Testimonials
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by customer name or subject..."
          className="p-3 border border-gray-300 rounded-md w-1/2"
        />
        <button
          onClick={() => setModalOpen(true)}
          className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Testimonial
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading testimonials...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Image</th>
              <th className="px-6 py-3 border-b">Date</th>
              <th className="px-6 py-3 border-b">Customer Name</th>
              <th className="px-6 py-3 border-b">Mobile Number</th>
              <th className="px-6 py-3 border-b">Subject</th>
              <th className="px-6 py-3 border-b">Rating</th>
              <th className="px-6 py-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">
                  {testimonial.image && (
                    <Image
                      src={`${api.defaults.baseURL}/uploads/testimonials/${testimonial.image}`}
                      alt="testimonial"
                      width={500} // Set a reasonable default width
                      height={500}
                      layout="intrinsic"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  )}
                </td>
                <td className="px-6 py-4 border-b">
                  {new Date(testimonial.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 border-b">
                  {testimonial.customerName}
                </td>
                <td className="px-6 py-4 border-b">
                  {testimonial.mobileNumber}
                </td>
                <td className="px-6 py-4 border-b">{testimonial.subject}</td>
                <td className="px-6 py-4 border-b">{testimonial.rating}</td>
                <td className="px-6 py-4 border-b flex gap-2">
                  <button
                    className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    onClick={() => handleEditTestimonial(testimonial)}
                  >
                    Edit
                  </button>
                  <button
                    className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() => handleDeleteTestimonial(testimonial._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {editingTestimonial
                ? "Edit Testimonial"
                : "Add a New Testimonial"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={newTestimonial.customerName}
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      customerName: e.target.value,
                    })
                  }
                  placeholder="Customer Name"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={newTestimonial.mobileNumber}
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      mobileNumber: e.target.value,
                    })
                  }
                  placeholder="Mobile Number"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={newTestimonial.date}
                    onChange={handleDateChange}
                    className="p-3 border border-gray-300 rounded-lg w-full bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  value={newTestimonial.subject}
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      subject: e.target.value,
                    })
                  }
                  placeholder="Subject"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <input
                  type="number"
                  value={newTestimonial.rating}
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      rating: e.target.value,
                    })
                  }
                  placeholder="Rating"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Menu Name
                </label>
                <input
                  type="text"
                  value={newTestimonial.menuName}
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      menuName: e.target.value,
                    })
                  }
                  placeholder="Menu Name"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newTestimonial.description}
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Action Taken
                </label>
                <input
                  type="text"
                  value={newTestimonial.actionTaken}
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      actionTaken: e.target.value,
                    })
                  }
                  placeholder="Action Taken"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Present Status
                </label>
                <input
                  type="text"
                  value={newTestimonial.presentStatus}
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      presentStatus: e.target.value,
                    })
                  }
                  placeholder="Present Status"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="file"
                onChange={(e) =>
                  setNewTestimonial({
                    ...newTestimonial,
                    image: e.target.files[0],
                  })
                }
                className="col-span-1 sm:col-span-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={closeModal}
                className="p-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={
                  editingTestimonial
                    ? handleUpdateTestimonial
                    : handleAddTestimonial
                }
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingTestimonial ? "Update" : "Add"} Testimonial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonialsPage;
