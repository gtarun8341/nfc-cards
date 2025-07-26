"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";
import api from "../../apiConfig/axiosConfig";
import Image from "next/image";
import toast from "react-hot-toast";

const AddEditBlog = ({ setIsAddingOrEditing, blog, onBlogSave }) => {
  const [form, setForm] = useState({ slug: "", title: "", content: [] });
  const [currentBlock, setCurrentBlock] = useState({ type: "text", data: "" });
  const [isEditingBlock, setIsEditingBlock] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ type: "", data: "" });
  const [previewImage, setPreviewImage] = useState(null);
  const [bodyImages, setBodyImages] = useState([]);

  useEffect(() => {
    if (blog) {
      setForm(blog);
    }
  }, [blog]);

  const addBlock = () => {
    let blockData = currentBlock.data;

    if (currentBlock.type === "image" && currentBlock.data instanceof File) {
      const index = bodyImages.length;
      setBodyImages((prev) => [...prev, currentBlock.data]);
      blockData = `bodyImage_${index}`; // Placeholder
    }

    setForm((prevForm) => ({
      ...prevForm,
      content: [
        ...prevForm.content,
        { type: currentBlock.type, data: blockData },
      ],
    }));

    setCurrentBlock({ type: "text", data: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedContent = form.content.map((block) => {
      if (block.type === "image" && block.data?.file) {
        return {
          ...block,
          data: {
            ...block.data,
            tempName: block.data.file.name, // 👈 critical fix
          },
        };
      }
      return block;
    });
    const formData = new FormData();
    formData.append("slug", form.slug);
    formData.append("title", form.title);
    formData.append("content", JSON.stringify(updatedContent)); // 👈 Use updated content with tempName
    if (previewImage) formData.append("previewImage", previewImage);
    bodyImages.forEach((img) => {
      formData.append("bodyImages", img, img.name); // 👈 ensure name is preserved
    });
    const token = localStorage.getItem("adminAuthToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = blog
        ? await api.put(`/api/blogRoutes/${blog._id}`, formData, config)
        : await api.post("/api/blogRoutes/", formData, config);

      if (response.status === 200) {
        toast.success(
          blog ? "Blog updated successfully!" : "Blog added successfully!"
        );
        setIsAddingOrEditing(false);
        onBlogSave();
      }
    } catch (error) {
      console.error(
        "Error submitting blog:",
        error.response?.data || error.message
      );
      toast.error("An error occurred while saving the blog.");
    }
  };

  const handleBlockEdit = (index) => {
    setIsEditingBlock(index);
    setModalData(form.content[index]);
    setShowModal(true);
  };

  const handleBlockSave = () => {
    const updatedContent = [...form.content];
    updatedContent[isEditingBlock] = modalData;
    setForm({ ...form, content: updatedContent });
    setShowModal(false);
  };

  const handleBlockDelete = (index) => {
    const updatedContent = form.content.filter((_, i) => i !== index);
    setForm({ ...form, content: updatedContent });
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updatedContent = [...form.content];
    [updatedContent[index - 1], updatedContent[index]] = [
      updatedContent[index],
      updatedContent[index - 1],
    ];
    setForm({ ...form, content: updatedContent });
  };

  const handleMoveDown = (index) => {
    if (index === form.content.length - 1) return;
    const updatedContent = [...form.content];
    [updatedContent[index], updatedContent[index + 1]] = [
      updatedContent[index + 1],
      updatedContent[index],
    ];
    setForm({ ...form, content: updatedContent });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Slug"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
        required
        className="border rounded-md p-2"
      />
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
        className="border rounded-md p-2"
      />
      <input
        type="file"
        name="previewImage"
        accept="image/*"
        onChange={(e) => setPreviewImage(e.target.files[0])}
        className="p-2"
      />

      <div className="flex flex-col space-y-4">
        <select
          value={currentBlock.type}
          onChange={(e) =>
            setCurrentBlock({ ...currentBlock, type: e.target.value })
          }
          className="border rounded-md p-2"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="heading">Heading</option>
          <option value="subheading">Subheading</option>
          <option value="sideheading">Side Heading</option>
          <option value="points">Points</option>
          <option value="important">Important Point</option>
        </select>

        {currentBlock.type === "image" ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCurrentBlock({ ...currentBlock, data: e.target.files[0] })
            }
            className="w-full"
          />
        ) : (
          <input
            type="text"
            value={
              Array.isArray(currentBlock.data)
                ? currentBlock.data.join(", ")
                : currentBlock.data
            }
            onChange={(e) => {
              const value = e.target.value;
              setCurrentBlock({
                ...currentBlock,
                data: currentBlock.type === "points" ? value.split(",") : value,
              });
            }}
            className="border rounded-md p-2 w-full"
          />
        )}

        <button
          type="button"
          onClick={addBlock}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Block
        </button>
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-md">
        <h3 className="text-xl font-semibold mb-4">Blog Preview</h3>
        <h2 className="text-2xl font-bold">{form.title}</h2>

        {previewImage && (
          <Image
            src={URL.createObjectURL(previewImage)}
            alt="Preview"
            width={300}
            height={200}
            className="object-cover rounded-md"
          />
        )}

        <div className="space-y-4 mt-4">
          {form.content.map((block, index) => (
            <div
              key={index}
              className="p-4 border rounded-md flex items-center space-x-2"
            >
              <div className="flex-grow">
                {block.type === "text" && <p>{block.data}</p>}
                {block.type === "image" && (
                  <p className="italic text-gray-500">{block.data}</p>
                )}
                {block.type === "heading" && (
                  <h3 className="text-2xl font-bold">{block.data}</h3>
                )}
                {block.type === "subheading" && (
                  <h4 className="text-xl font-semibold">{block.data}</h4>
                )}
                {block.type === "sideheading" && (
                  <h5 className="text-lg font-medium text-gray-600">
                    {block.data}
                  </h5>
                )}
                {block.type === "points" && Array.isArray(block.data) && (
                  <ul className="list-disc pl-6">
                    {block.data.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
                {block.type === "important" && (
                  <div className="bg-yellow-200 p-2 rounded-md">
                    <strong>{block.data}</strong>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleMoveUp(index)}
                  className="bg-gray-300 p-1 rounded"
                >
                  <FaArrowUp />
                </button>
                <button
                  onClick={() => handleMoveDown(index)}
                  className="bg-gray-300 p-1 rounded"
                >
                  <FaArrowDown />
                </button>
                <button
                  onClick={() => handleBlockEdit(index)}
                  className="bg-yellow-500 text-white p-1 rounded"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleBlockDelete(index)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 text-white font-bold bg-green-500 rounded-md hover:bg-green-600"
      >
        {blog ? "Update Blog" : "Add Blog"}
      </button>

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <Dialog.Panel className="bg-white p-6 rounded-md shadow-md max-w-lg w-full">
          <h3 className="text-xl font-semibold mb-4">Edit Block</h3>
          <select
            value={modalData.type}
            onChange={(e) =>
              setModalData({ ...modalData, type: e.target.value })
            }
            className="border rounded-md p-2 w-full mb-4"
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="heading">Heading</option>
            <option value="subheading">Subheading</option>
            <option value="sideheading">Side Heading</option>
            <option value="points">Points</option>
            <option value="important">Important Point</option>
          </select>
          <input
            type="text"
            value={
              Array.isArray(modalData.data)
                ? modalData.data.join(", ")
                : modalData.data
            }
            onChange={(e) =>
              setModalData({
                ...modalData,
                data:
                  modalData.type === "points"
                    ? e.target.value.split(",")
                    : e.target.value,
              })
            }
            className="border rounded-md p-2 w-full"
          />
          <div className="mt-4 flex space-x-2">
            <button
              onClick={handleBlockSave}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </form>
  );
};

export default AddEditBlog;
