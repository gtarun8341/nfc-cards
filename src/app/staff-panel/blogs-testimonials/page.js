"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig";
import AddEditBlog from "./AddEditBlog";
import ViewBlog from "./ViewBlog";
import Image from "next/image";

const AdminPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isAddingOrEditing, setIsAddingOrEditing] = useState(false);

  // Fetch all blogs from the API
  const fetchBlogs = async () => {
    try {
      const response = await api.get("/api/blogRoutes/");
      console.log(response.data);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const closeBlogView = () => {
    setSelectedBlog(null); // Close the view by resetting the selectedBlog state
  };

  const refreshBlogs = () => {
    fetchBlogs();
    setIsAddingOrEditing(false); // Close the add/edit blog modal
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
      <button
        onClick={() => setIsAddingOrEditing(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-6"
      >
        Add New Blog
      </button>

      {isAddingOrEditing ? (
        <AddEditBlog
          setIsAddingOrEditing={setIsAddingOrEditing}
          blog={selectedBlog}
          onBlogSave={refreshBlogs} // Pass the callback to AddEditBlog
        />
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4">All Blogs</h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="border px-4 py-2">{blog.title}</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedBlog(blog);
                        setIsAddingOrEditing(true);
                      }}
                      className="bg-blue-500 text-white py-1 px-2 rounded"
                    >
                      Edit
                    </button>

                    {selectedBlog && selectedBlog._id === blog._id ? (
                      <button
                        onClick={closeBlogView}
                        className="bg-gray-500 text-white py-1 px-2 rounded"
                      >
                        Close View
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedBlog(blog)}
                        className="bg-green-500 text-white py-1 px-2 rounded"
                      >
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Show the selected blog */}
          {selectedBlog && selectedBlog._id === selectedBlog._id && (
            <div>
              <ViewBlog blog={selectedBlog} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
