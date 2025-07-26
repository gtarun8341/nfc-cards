"use client";
// pages/blogs/[slug].js
import { useParams } from "next/navigation"; // ✅ RIGHT for App Router
import { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig";
import ViewBlog from "../../admin-panel/blogs-testimonials/ViewBlog"; // or move to shared component folder

const BlogDetailPage = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/api/blogRoutes/slug/${slug}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Failed to fetch blog by slug", error);
      }
    };
    fetchBlog();
  }, [slug]);

  if (!blog) {
    return <p className="text-center mt-10">Loading blog...</p>;
  }

  return (
    <div className="px-4 py-10 max-w-4xl mx-auto">
      <ViewBlog blog={blog} />
    </div>
  );
};

export default BlogDetailPage;
