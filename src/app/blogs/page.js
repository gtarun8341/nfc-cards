"use client"; // Next.js Client Component

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../apiConfig/axiosConfig"; // Import the axios instance

const Blogs = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]); // To hold the fetched blogs
  const [recentBlogs, setRecentBlogs] = useState([]); // For recent blogs
  const [selectedBlog, setSelectedBlog] = useState(null); // Selected blog for display
  const [searchQuery, setSearchQuery] = useState(""); // To handle the search query
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Blogs filtered by search

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch all blogs
        const res = await api.get("/api/blogRoutes");
        const allBlogs = res.data;
        setBlogs(allBlogs.slice(0, 10)); // Set the top 10 newest blogs
        console.log(allBlogs);

        // Fetch recent blogs
        const recentRes = await api.get("/api/blogRoutes/recentblogs");
        setRecentBlogs(recentRes.data); // Set recent blogs
        console.log(recentRes.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredBlogs([]); // Clear dropdown if the query is empty
      return;
    }

    try {
      const response = await api.get(`/api/blogRoutes/search?query=${query}`);
      setFilteredBlogs(response.data); // Update the filtered blogs based on the response
    } catch (error) {
      console.error("Error searching blogs:", error);
    }
  };

  const handleBlogSelection = (blog) => {
    setSelectedBlog(blog); // Update selectedBlog when clicked
    setSearchQuery(""); // Clear search query after selection
    setFilteredBlogs([]); // Clear dropdown after selection
  };

  const renderContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case "image":
          return (
            <div key={index} className="relative w-full h-64 mb-6">
              <Image
                src={item.data} // Assuming data holds the image URL
                alt={`Image`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          );
        case "text":
          return (
            <p key={index} className="text-gray-700 mb-6">
              {item.data}
            </p>
          );
        case "heading":
          return (
            <h3 key={index} className="text-3xl font-bold text-black mb-4">
              {item.data}
            </h3>
          );
        case "subheading":
          return (
            <h4 key={index} className="text-2xl font-semibold text-gray-800 mb-4">
              {item.data}
            </h4>
          );
        case "sideheading":
          return (
            <h5 key={index} className="text-xl font-medium text-gray-600 mb-3">
              {item.data}
            </h5>
          );
        case "points":
          return (
            <ul key={index} className="list-disc pl-6 text-gray-700 mb-6">
              {item.data.map((point, i) => (
                <li key={i} className="text-lg">
                  {point}
                </li>
              ))}
            </ul>
          );
        case "important":
          return (
            <div key={index} className="bg-yellow-200 p-4 rounded-md mb-6">
              <strong className="text-lg font-semibold">{item.data}</strong>
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-6 py-10">
      {/* Sidebar */}
      <div className="w-full lg:w-1/3">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search blogs..."
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          />
          {filteredBlogs.length > 0 && (
            <ul className="mt-2 bg-white shadow-lg rounded-md max-h-60 overflow-auto">
              {filteredBlogs.map((blog) => (
                <li
                  key={blog.slug}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleBlogSelection(blog)}
                >
                  {blog.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Blogs */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Blogs</h3>
          <ul className="space-y-4">
            {recentBlogs.map((blog) => (
              <li key={blog.slug}>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleBlogSelection(blog)}
                >
                  {blog.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Blog Content */}
      <div className="flex-1">
        {selectedBlog ? (
          // Show selected blog only
          <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{selectedBlog.title}</h2>
            <h3 className="text-xl text-gray-600 mb-4">{selectedBlog.subtitle}</h3>
            {selectedBlog.content && renderContent(selectedBlog.content)}
          </div>
        ) : (
          // Show top 10 blogs vertically
          blogs.map((blog) => (
            <div key={blog.slug} className="mb-8 p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <h3 className="text-xl text-gray-600 mb-4">{blog.subtitle}</h3>
              {blog.content && renderContent(blog.content)}
              {/* <button
                className="mt-4 text-blue-600 hover:underline"
                onClick={() => handleBlogSelection(blog)}
              >
                Read More
              </button> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;
