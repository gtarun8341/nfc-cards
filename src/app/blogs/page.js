"use client"; // Next.js Client Component

import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../apiConfig/axiosConfig"; // Import the axios instance

const Blogs = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]); // To hold the fetched blogs
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Filtered search results
  const [recentBlogs, setRecentBlogs] = useState([]); // New state for recent blogs

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch all blogs
        const res = await api.get("/api/blogRoutes");
        setBlogs(res.data); // Set blogs to state
        setFilteredBlogs(res.data); // Initially, show all blogs
        console.log(res.data);
  
        // Fetch recent blogs
        const recentRes = await api.get("/api/blogRoutes/recentblogs");
        setRecentBlogs(recentRes.data); // Set recent blogs to state
        console.log(recentRes.data);
  
        // Set the most recent blog as the initially selected blog
        if (recentRes.data.length > 0) {
          setSelectedBlog(recentRes.data[0]); // Set the newest blog as selected
        } else if (res.data.length > 0) {
          setSelectedBlog(res.data[0]); // Fallback to the first blog if no recent blogs are available
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);
  
  // Effect to update selected blog when searchParams change
  useEffect(() => {
    const slug = searchParams.get("slug"); // Get slug from the query params
    const blog = blogs.find((blog) => blog.slug === slug);
    setSelectedBlog(blog || blogs[0]); // Default to the first blog if no slug is found
  }, [searchParams, blogs]); // Re-run whenever blogs or searchParams change

  // Effect to search blogs as user types (debounced search)
  useEffect(() => {
    const searchBlogs = () => {
      const lowerSearchQuery = searchQuery.toLowerCase();
      const searchResults = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(lowerSearchQuery)
      );
      setFilteredBlogs(searchResults); // Update filteredBlogs
    };

    // Perform the search only if the user is typing
    if (searchQuery.trim() !== "") {
        searchBlogs();
      } else {
        setFilteredBlogs([]); // Show no blogs if search query is empty
      }      
  }, [searchQuery, blogs]); // Trigger the search effect when searchQuery or blogs change

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query as the user types
  };

  const handleBlogSelection = (blog) => {
    setSelectedBlog(blog); // Update selectedBlog directly when a blog is clicked
  };

  const renderContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case "image":
          return (
            <div key={index} className="relative w-full h-64 mb-6">
              <Image
                src={item.data} // Assuming data holds the image URL
                alt={`Image for ${selectedBlog.title}`}
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
      {/* Main Blog Content */}
      <div className="flex-1">
        {selectedBlog && (
          <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{selectedBlog.title}</h2>
            <h3 className="text-xl text-gray-600 mb-4">{selectedBlog.subtitle}</h3>
            {selectedBlog.content && renderContent(selectedBlog.content)}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-1/3">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearchChange} // Update search query as user types
          />
        </div>

        {/* Filtered Blogs */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Search Results</h3>
          <ul className="space-y-4">
            {filteredBlogs.map((blog) => (
              <li key={blog.slug}>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleBlogSelection(blog)} // Update selected blog on click
                >
                  {blog.title}
                </button>
              </li>
            ))}
            {filteredBlogs.length === 0 && <p>No blogs found</p>}
          </ul>
        </div>

        {/* Recent Blogs */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">Recent Blogs</h3>
          <ul className="space-y-4">
            {recentBlogs.map((blog) => (
              <li key={blog.slug}>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleBlogSelection(blog)} // Update selected blog on click
                >
                  {blog.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
