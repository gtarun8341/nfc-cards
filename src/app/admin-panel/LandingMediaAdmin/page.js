"use client";
import { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig";
import toast from "react-hot-toast";

const LandingMediaAdmin = () => {
  const [form, setForm] = useState({
    page: "",
    section: "",
    mediaType: "image",
    mediaFiles: [{ title: "", file: null }],
  });

  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false); // for fetching media
  const [uploading, setUploading] = useState(false); // for uploading media
  const [editing, setEditing] = useState(false); // for editing media
  const [deleting, setDeleting] = useState(false); // for deleting media

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editLink, setEditLink] = useState("");
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const commonSections = [
    "Different Type Of Cards",
    "How Cards Work",
    "Beneficial For",
    "Sample Cards",
    "Our Bestsellers",
    "Success Stories",
  ];

  const sectionOptionsByPage = {
    NfcCardTemplate: commonSections,
    PdfCardTemplate: commonSections,
    MiniWebsiteTemplate: commonSections,
    OnePageBusinessProfile: commonSections,
    PhysicalVisitingCard: commonSections,
    BusinessEssentials: commonSections,
    HomePage: commonSections,
  };

  const handleAddField = () => {
    setForm((prev) => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, { title: "", file: null }],
    }));
  };

  const handleFileChange = (index, file) => {
    const updated = [...form.mediaFiles];
    updated[index].file = file;
    setForm((prev) => ({ ...prev, mediaFiles: updated }));
  };

  const handleChangeField = (index, field, value) => {
    const updated = [...form.mediaFiles];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, mediaFiles: updated }));
  };

  const fetchMedia = async () => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: form.page, section: form.section },
      };
      setLoading(true);
      const { data } = await api.get("/api/landing", config);
      setMediaList(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch media");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("page", form.page);
      formData.append("section", form.section);
      formData.append("mediaType", form.mediaType);

      form.mediaFiles.forEach(({ title, file }, i) => {
        if (!file) throw new Error(`File missing in media item ${i + 1}`);
        formData.append("file", file);
        formData.append("title", title || "");
      });

      await api.post("/api/landing/upload", formData, config);
      toast.success("Media uploaded successfully");
      fetchMedia();

      setForm({
        page: "",
        section: "",
        mediaType: "image",
        mediaFiles: [{ title: "", file: null }],
      });
    } catch (e) {
      console.error(e);
      toast.error(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingGroupId || editingIndex === null) return;
    try {
      setEditing(true);
      const token = localStorage.getItem("adminAuthToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      await api.patch(
        `/api/landing/edit/${editingGroupId}/${editingIndex}`,
        {
          title: editTitle,
          mediaType:
            mediaList.find((g) => g._id === editingGroupId)?.media[editingIndex]
              ?.mediaType || "image",
        },
        config
      );

      toast.success("Media updated");
      setIsEditing(false);
      setEditingGroupId(null);
      setEditingIndex(null);
      fetchMedia();
    } catch (e) {
      console.error("Update failed:", e);
      toast.error("Failed to update media");
    } finally {
      setEditing(false);
    }
  };

  const handleDelete = async (groupId, mediaIndex) => {
    try {
      setDeleting(true);
      const token = localStorage.getItem("adminAuthToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.delete(`/api/landing/delete/${groupId}/${mediaIndex}`, config);
      toast.success("Media deleted successfully");
      fetchMedia();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete media");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (form.page && form.section) fetchMedia();
  }, [form.page, form.section]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Landing Page Media Uploader</h2>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <select
          value={form.page}
          onChange={(e) =>
            setForm({ ...form, page: e.target.value, section: "" })
          }
          className="border p-2 rounded"
        >
          <option value="">Select Page</option>
          {Object.keys(sectionOptionsByPage).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        {form.page && (
          <select
            value={form.section}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, section: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">Select Section</option>
            {sectionOptionsByPage[form.page].map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        )}

        <select
          value={form.mediaType}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, mediaType: e.target.value }))
          }
          className="border p-2 rounded"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>

      {form.page && form.section && (
        <>
          {form.mediaFiles.map((item, idx) => (
            <div key={idx} className="grid md:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                placeholder="Title (optional)"
                value={item.title}
                onChange={(e) =>
                  handleChangeField(idx, "title", e.target.value)
                }
                className="border p-2 rounded"
              />
              <input
                type="file"
                accept={form.mediaType === "image" ? "image/*" : "video/*"}
                onChange={(e) => handleFileChange(idx, e.target.files[0])}
                className="border p-2 rounded"
              />
            </div>
          ))}

          <button
            onClick={handleAddField}
            className="text-blue-600 hover:underline mb-4"
          >
            + Add More
          </button>
        </>
      )}

      <button
        onClick={handleSubmit}
        disabled={
          uploading ||
          !form.page ||
          !form.section ||
          form.mediaFiles.some((item) => !item.file)
        }
        className={`${
          uploading ||
          !form.page ||
          !form.section ||
          form.mediaFiles.some((item) => !item.file)
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        } text-white px-4 py-2 rounded mb-8 transition`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {loading && <p className="text-center text-gray-500">Loading data...</p>}

      {!loading &&
        mediaList.map((group) => (
          <div key={group._id} className="mt-4 border rounded p-3">
            <h4 className="font-bold mb-2">
              {group.page} - {group.section}
            </h4>

            <table className="w-full text-sm text-left border mt-2 bg-white rounded overflow-hidden">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Media</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {group.media.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    {isEditing &&
                    editingGroupId === group._id &&
                    editingIndex === index ? (
                      <>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2 text-gray-500">
                          {item.mediaType.charAt(0).toUpperCase() +
                            item.mediaType.slice(1)}
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={editLink}
                            disabled
                            className="w-full border px-2 py-1 rounded"
                          />
                          <small className="text-gray-500 block mt-1 text-xs">
                            To change media, please delete and re-upload.
                          </small>
                        </td>
                        <td className="px-4 py-2 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={handleUpdate}
                              disabled={editing}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 disabled:opacity-50"
                            >
                              {editing ? "Saving..." : "Save"}
                            </button>
                            <button
                              onClick={() => {
                                setIsEditing(false);
                                setEditingGroupId(null);
                                setEditingIndex(null);
                                setEditTitle("");
                                setEditLink("");
                              }}
                              disabled={editing}
                              className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-xs hover:bg-gray-400 disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2 text-gray-800">
                          {item.title || "Untitled"}
                        </td>
                        <td className="px-4 py-2 text-gray-500 capitalize">
                          {item.mediaType}
                        </td>
                        <td className="px-4 py-2">
                          {item.mediaType === "image" ? (
                            <img
                              src={item.cloudinaryUrl}
                              alt={item.title || "Media"}
                              className="w-32 h-auto rounded shadow"
                            />
                          ) : (
                            <video width="320" height="240" controls>
                              <source
                                src={item.cloudinaryUrl}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditTitle(item.title || "");
                                setEditLink(item.cloudinaryUrl);
                                setEditingGroupId(group._id);
                                setEditingIndex(index);
                                setIsEditing(true);
                              }}
                              className="text-yellow-600 text-sm hover:underline"
                              disabled={deleting}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(group._id, index)}
                              disabled={deleting}
                              className="text-red-500 text-sm hover:underline disabled:opacity-50"
                            >
                              {deleting ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default LandingMediaAdmin;
