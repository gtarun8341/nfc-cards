import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Dialog } from "@headlessui/react";
import { FaGripVertical, FaEdit, FaTrash } from "react-icons/fa"; // Import drag handle icon
import api from "../../apiConfig/axiosConfig";

const AddEditBlog = ({ setIsAddingOrEditing, blog,onBlogSave }) => {
  const [form, setForm] = useState({ slug: "", title: "", content: [] });
  const [currentBlock, setCurrentBlock] = useState({ type: "text", data: "" });
  const [isEditingBlock, setIsEditingBlock] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ type: "", data: "" });

  useEffect(() => {
    if (blog) {
      setForm(blog);
    }
  }, [blog]);

  const addBlock = () => {
    setForm({
      ...form,
      content: [...form.content, currentBlock],
    });
    setCurrentBlock({ type: "text", data: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminAuthToken");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (blog) {
        const response = await api.put(`/api/blogRoutes/${blog._id}`, form, config);
        if (response.status === 200) {
          alert("Blog updated successfully!");
          setIsAddingOrEditing(false);
          onBlogSave();  // Call the callback to refresh blogs
        }
      } else {
        const response = await api.post("/api/blogRoutes/", form, config);
        if (response.status === 200) {
          alert("Blog added successfully!");
          setIsAddingOrEditing(false);
          onBlogSave();  // Call the callback to refresh blogs
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
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

  const handleModalChange = (e) => {
    setModalData({ ...modalData, data: e.target.value });
  };

  const handleBlockTypeChange = (e) => {
    setModalData({ ...modalData, type: e.target.value });
  };

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const reorderedBlocks = Array.from(form.content);
    const [removed] = reorderedBlocks.splice(source.index, 1);
    reorderedBlocks.splice(destination.index, 0, removed);

    setForm({ ...form, content: reorderedBlocks });
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

      {/* Add Block Section */}
      <div className="flex flex-col space-y-4">
        <select
          value={currentBlock.type}
          onChange={(e) => setCurrentBlock({ ...currentBlock, type: e.target.value })}
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

        <input
          type="text"
          placeholder={`Enter ${currentBlock.type}`}
          value={currentBlock.data}
          onChange={(e) => setCurrentBlock({ ...currentBlock, data: e.target.value })}
          className="border rounded-md p-2"
        />

        <button type="button" onClick={addBlock} className="bg-blue-500 text-white py-2 px-4 rounded">
          Add Block
        </button>
      </div>

      {/* Blog Preview and Drag-and-Drop Blocks */}
      <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-md">
        <h3 className="text-xl font-semibold mb-4">Blog Preview</h3>
        <h2 className="text-2xl font-bold">{form.title}</h2>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                {form.content.map((block, index) => (
                  <Draggable key={index} draggableId={`block-${index}`} index={index}>
                    {(provided) => (
                      <div
                        className="p-4 border rounded-md flex items-center space-x-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {/* Drag Handle Icon */}
                        <FaGripVertical className="cursor-move" {...provided.dragHandleProps} />
                        <div className="flex-grow">
                          {block.type === "text" && <p>{block.data}</p>}
                          {block.type === "image" && <img src={block.data} alt="Image block" className="w-full h-64 object-cover" />}
                          {block.type === "heading" && <h3 className="text-2xl font-bold">{block.data}</h3>}
                          {block.type === "subheading" && <h4 className="text-xl font-semibold">{block.data}</h4>}
                          {block.type === "sideheading" && <h5 className="text-lg font-medium text-gray-600">{block.data}</h5>}
                          {block.type === "points" && (
                            <ul className="list-disc pl-6">
                              {block.data.map((point, i) => <li key={i}>{point}</li>)}
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
                            type="button"
                            onClick={() => handleBlockEdit(index)}
                            className="bg-yellow-500 text-white py-1 px-2 rounded"
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleBlockDelete(index)}
                            className="bg-red-500 text-white py-1 px-2 rounded"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 text-white font-bold bg-green-500 rounded-md hover:bg-green-600"
      >
        {blog ? "Update Blog" : "Add Blog"}
      </button>

      {/* Modal for Block Editing */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Dialog.Panel className="bg-white p-6 rounded-md shadow-md max-w-lg w-full">
          <h3 className="text-xl font-semibold mb-4">Edit Block</h3>
          <select
            value={modalData.type}
            onChange={handleBlockTypeChange}
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
            value={modalData.data}
            onChange={handleModalChange}
            className="border rounded-md p-2 w-full"
          />
          <div className="mt-4 flex space-x-2">
            <button onClick={handleBlockSave} className="bg-green-500 text-white py-2 px-4 rounded">
              Save
            </button>
            <button onClick={() => setShowModal(false)} className="bg-red-500 text-white py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </form>
  );
};

export default AddEditBlog;
