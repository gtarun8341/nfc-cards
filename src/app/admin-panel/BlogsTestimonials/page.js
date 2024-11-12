// pages/blogs-testimonials.js

import { useState } from 'react';

const BlogsTestimonialsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState('');

  const addBlog = () => {
    setBlogs([...blogs, { id: Date.now(), text: newBlog }]);
    setNewBlog('');
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Blogs & Testimonials</h2>

      <textarea
        value={newBlog}
        onChange={(e) => setNewBlog(e.target.value)}
        placeholder="Enter blog/testimonial"
        className="border rounded p-2 w-full mb-3"
      />
      <button
        onClick={addBlog}
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
      >
        Add Blog/Testimonial
      </button>

      <ul className="mt-5">
        {blogs.map((blog) => (
          <li key={blog.id} className="py-2 border-b flex justify-between">
            {blog.text}
            <button
              onClick={() => deleteBlog(blog.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogsTestimonialsPage;
