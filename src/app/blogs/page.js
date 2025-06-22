"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import api from "../apiConfig/axiosConfig";
import Link from "next/link";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/api/blogRoutes");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };
    fetchBlogs();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredBlogs([]);
      return;
    }

    try {
      const response = await api.get(`/api/blogRoutes/search?query=${query}`);
      setFilteredBlogs(response.data);
    } catch (error) {
      console.error("Error searching blogs:", error);
    }
  };

  const renderContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case "image":
          return (
            <div key={index} className="relative w-full h-64 mb-6">
              <Image
                src={`${api.defaults.baseURL}/uploads/${item.data}`}
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
            <h3 key={index} className="text-3xl font-bold mb-4">
              {item.data}
            </h3>
          );
        case "subheading":
          return (
            <h4 key={index} className="text-2xl font-semibold mb-4">
              {item.data}
            </h4>
          );
        case "sideheading":
          return (
            <h5 key={index} className="text-xl font-medium mb-3">
              {item.data}
            </h5>
          );
        case "points":
          return (
            <ul key={index} className="list-disc pl-6 mb-6">
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
              <strong>{item.data}</strong>
            </div>
          );
        default:
          return null;
      }
    });
  };

  const renderBlogCard = (blog, large = false, forceHeight = null) => {
    const heightClass = large ? "h-96" : forceHeight ? forceHeight : "h-60";

    return (
      <div
        key={blog.slug}
        className={`relative overflow-hidden rounded-lg shadow-md ${heightClass}`}
        onClick={() => setSelectedBlog(blog)}
      >
        <Image
          src={`${api.defaults.baseURL}/uploads/${blog.previewImage}`}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />

        <div className="absolute top-2 left-2 border-white border-2 text-white text-xs px-2 py-1 rounded-xl z-20">
          {new Date(blog.updatedAt || blog.createdAt).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          )}
        </div>

        <div className="absolute bottom-0 w-full text-white px-4 py-3 z-10">
          <h3 className="text-lg font-semibold">{blog.title}</h3>
        </div>

        <Link href={`/blogs/${blog.slug}`} className="absolute inset-0 z-30" />
      </div>
    );
  };

  const renderRows = () => {
    const displayBlogs = filteredBlogs.length > 0 ? filteredBlogs : blogs;

    const rows = [];
    let i = 0;
    let layoutCounter = 0;

    while (i < displayBlogs.length) {
      if (layoutCounter % 3 === 0 && displayBlogs.length - i >= 3) {
        const reverse = Math.floor(layoutCounter / 3) % 2 === 1;

        const large = renderBlogCard(displayBlogs[i], true, "h-[500px]");
        const small1 = (
          <div className="h-1/2">
            {renderBlogCard(displayBlogs[i + 1], false, "h-full")}
          </div>
        );
        const small2 = (
          <div className="h-1/2">
            {renderBlogCard(displayBlogs[i + 2], false, "h-full")}
          </div>
        );

        const smallStack = (
          <div className="lg:w-2/5 h-[500px] flex flex-col">
            {small1}
            {small2}
          </div>
        );

        const bigCard = <div className="lg:w-3/5">{large}</div>;

        rows.push(
          <div key={i} className="flex flex-col lg:flex-row gap-4 mb-6">
            {reverse ? (
              <>
                {smallStack}
                {bigCard}
              </>
            ) : (
              <>
                {bigCard}
                {smallStack}
              </>
            )}
          </div>
        );
        i += 3;
      } else {
        const blog1 = displayBlogs[i];
        const blog2 = displayBlogs[i + 1];
        rows.push(
          <div key={i} className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="lg:w-1/2">{renderBlogCard(blog1)}</div>
            {blog2 && <div className="lg:w-1/2">{renderBlogCard(blog2)}</div>}
          </div>
        );
        i += 2;
      }

      layoutCounter++;
    }

    return rows;
  };

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">OUR LATEST BLOGS</h1>

      {/* 🔍 Search */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search her for blogs..."
          className="w-1/2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* 📄 Blog Content View */}
      {selectedBlog ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">{selectedBlog.title}</h2>
          {renderContent(selectedBlog.content)}
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setSelectedBlog(null)}
          >
            Back to Blogs
          </button>
        </div>
      ) : (
        renderRows()
      )}
    </div>
  );
};

export default BlogsPage;
