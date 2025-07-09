"use client";
import { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig";

const LandingMediaAdmin = () => {
  const [form, setForm] = useState({
    page: "",
    section: "",
    mediaType: "image",
    mediaList: [{ title: "", driveLink: "" }],
  });

  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
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
      mediaList: [...prev.mediaList, { title: "", driveLink: "" }],
    }));
  };

  const handleChangeField = (index, field, value) => {
    const updated = [...form.mediaList];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, mediaList: updated }));
  };

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/landing", {
        params: { page: form.page },
      });
      console.log(data);
      setMediaList(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const mediaListPayload = form.mediaList.map((item) => ({
        mediaType: form.mediaType,
        title: item.title,
        driveLink: item.driveLink,
      }));

      await api.post("/api/landing/upload", {
        page: form.page,
        section: form.section,
        mediaList: mediaListPayload,
      });

      alert("Uploaded");
      fetchMedia();
      setForm({
        page: "",
        section: "",
        mediaType: "image",
        mediaList: [{ title: "", driveLink: "" }],
      });
    } catch (e) {
      alert("Upload failed");
    }
  };
  const handleUpdate = async () => {
    if (!editingGroupId || editingIndex === null) return;

    await api.patch(`/api/landing/edit/${editingGroupId}/${editingIndex}`, {
      title: editTitle,
      driveLink: editLink,
      mediaType:
        mediaList.find((g) => g._id === editingGroupId)?.media[editingIndex]
          ?.mediaType || "image",
    });

    setIsEditing(false);
    setEditingGroupId(null);
    setEditingIndex(null);
    fetchMedia();
  };

  useEffect(() => {
    if (form.page) fetchMedia();
  }, [form.page]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Landing Page Media Uploader</h2>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <select
          value={form.page}
          onChange={(e) =>
            setForm({
              ...form,
              page: e.target.value,
              section: "", // reset section when page changes
            })
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
            onChange={(e) => setForm({ ...form, section: e.target.value })}
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
          onChange={(e) => setForm({ ...form, mediaType: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>

      {form.page && form.section && (
        <>
          {form.mediaList.map((item, idx) => (
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
                type="text"
                placeholder="Google Drive Link"
                value={item.driveLink}
                onChange={(e) =>
                  handleChangeField(idx, "driveLink", e.target.value)
                }
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
          !form.page ||
          !form.section ||
          form.mediaList.some((item) => !item.driveLink.trim())
        }
        className={`${
          !form.page ||
          !form.section ||
          form.mediaList.some((item) => !item.driveLink.trim())
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        } text-white px-4 py-2 rounded mb-8 transition`}
      >
        Upload
      </button>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

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
                  <th className="px-4 py-2">Drive Link</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {group.media.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    {editingGroupId === group._id && editingIndex === index ? (
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
                            onChange={(e) => setEditLink(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                          />
                        </td>
                        <td className="px-4 py-2 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={handleUpdate}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setIsEditing(false);
                                setEditingGroupId(null);
                                setEditingIndex(null);
                                setEditTitle("");
                                setEditLink("");
                              }}
                              className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-xs hover:bg-gray-400"
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
                          <a
                            href={item.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline break-all"
                          >
                            View
                          </a>
                        </td>
                        <td className="px-4 py-2 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditTitle(item.title || "");
                                setEditLink(item.driveLink);
                                setEditingGroupId(group._id);
                                setEditingIndex(index);
                                setIsEditing(true);
                              }}
                              className="text-yellow-600 text-sm hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                api
                                  .delete(
                                    `/api/landing/delete/${group._id}/${index}`
                                  )
                                  .then(fetchMedia)
                              }
                              className="text-red-500 text-sm hover:underline"
                            >
                              Delete
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
