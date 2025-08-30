"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../apiConfig/axiosConfig";

const AdditionalForm = () => {
  const [data, setData] = useState({
    tagLine: "",
    specialization: "",
    slogan: "",
    clientList: [],
    successStory: "",
    ourGive: "",
    ourAsk: "",
    vision: "",
    mission: "",
    awards: [],
    certifications: [],
    team: [],
    annualSales: "",
    turnover: "",
    companyPolicies: "",
    companyGrowth: "",
  });

  const [loading, setLoading] = useState(false);
  const additional_BASE = `${api.defaults.baseURL}/uploads/additional`;

  // Load data on mount (GET)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await api.get("/api/additional-form", config);
        console.log("Fetched additional form data:", res.data);
        if (res.data) {
          // For awards & certifications, create URLs with base path
          const awardsWithUrls = (res.data.awards || []).map((file) => ({
            file,
            url: `${additional_BASE}/${res.data.userId}/${file}`,
          }));
          const certificationsWithUrls = (res.data.certifications || []).map(
            (file) => ({
              file,
              url: `${additional_BASE}/${res.data.userId}/${file}`,
            })
          );

          // For client list and team, map files similarly
          const clientListWithUrls = (res.data.clientList || []).map(
            (client) => ({
              ...client,
              // Assuming images are filenames stored in `logo`
              logoUrl: client.logo
                ? `${additional_BASE}/${res.data.userId}/${client.logo}`
                : null,
              logoFile: null, // for new upload
            })
          );

          const teamWithUrls = (res.data.team || []).map((member) => ({
            ...member,
            imageUrl: member.image
              ? `${additional_BASE}/${res.data.userId}/${member.image}`
              : null,
            imageFile: null, // for new upload
          }));

          setData({
            ...res.data,
            awards: awardsWithUrls,
            certifications: certificationsWithUrls,
            clientList: clientListWithUrls,
            team: teamWithUrls,
          });
        }
      } catch (error) {
        // Handle errors or empty response gracefully
        if (!(error.response && error.response.status === 404)) {
          toast.error("Failed to load initial data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Unified change handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const newFiles = Array.from(files);
      const newFileObjs = newFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      setData((prev) => ({
        ...prev,
        [name]: [...(prev[name] || []), ...newFileObjs],
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddClient = () => {
    setData((prev) => ({
      ...prev,
      clientList: [...(prev.clientList || []), { name: "", logo: null }],
    }));
  };

  const handleClientChange = (index, field, value) => {
    const updated = [...data.clientList];
    updated[index][field] = value;
    setData((prev) => ({ ...prev, clientList: updated }));
  };

  const handleAddTeamMember = () => {
    setData((prev) => ({
      ...prev,
      team: [...(prev.team || []), { name: "", image: null }],
    }));
  };

  const handleTeamChange = (index, field, value) => {
    const updated = [...data.team];
    updated[index][field] = value;
    setData((prev) => ({ ...prev, team: updated }));
  };

  // // Validate all mandatory fields before submit
  // const validate = () => {
  //   const requiredFields = [
  //     "tagLine",
  //     "specialization",
  //     "slogan",
  //     "successStory",
  //     "ourGive",
  //     "ourAsk",
  //     "vision",
  //     "mission",
  //     "annualSales",
  //     "turnover",
  //     "companyPolicies",
  //     "companyGrowth",
  //   ];

  //   for (const field of requiredFields) {
  //     if (
  //       !data[field] ||
  //       (typeof data[field] === "string" && data[field].trim() === "")
  //     ) {
  //       toast.error(`${field} is required`);
  //       return false;
  //     }
  //   }

  //   // Validate client list names and logos
  //   if (data.clientList.length === 0) {
  //     toast.error("Please add at least one client");
  //     return false;
  //   }
  //   for (const [i, client] of data.clientList.entries()) {
  //     if (!client.name.trim()) {
  //       toast.error(`Client #${i + 1} name is required`);
  //       return false;
  //     }
  //     if (!client.logo) {
  //       toast.error(`Client #${i + 1} logo is required`);
  //       return false;
  //     }
  //   }

  //   // Validate team members similarly
  //   if (data.team.length === 0) {
  //     toast.error("Please add at least one team member");
  //     return false;
  //   }
  //   for (const [i, member] of data.team.entries()) {
  //     if (!member.name.trim()) {
  //       toast.error(`Team member #${i + 1} name is required`);
  //       return false;
  //     }
  //     if (!member.image) {
  //       toast.error(`Team member #${i + 1} image is required`);
  //       return false;
  //     }
  //   }

  //   return true;
  // };

  // Submit handler with add/update logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form, _id present?", data._id);

    // if (!validate()) return;

    const formData = new FormData();

    // Append fields only if they exist to support partial update as well
    Object.entries(data).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        (typeof value !== "string" || value.trim() !== "")
      ) {
        // Special handling for arrays of files or mixed content
        if (Array.isArray(value)) {
          if (key === "awards" || key === "certifications") {
            value.forEach((file) => {
              if (file instanceof File) {
                formData.append(key, file);
              }
            });
          } else if (key === "clientList" || key === "team") {
            const arrWithoutFiles = value.map((item) => {
              const copy = { ...item };
              delete copy.logo;
              delete copy.image;
              return copy;
            });
            formData.append(key, JSON.stringify(arrWithoutFiles));
            value.forEach((item, idx) => {
              if (item.logo && item.logo instanceof File) {
                formData.append("clientLogos", item.logo);
              }
              if (item.image && item.image instanceof File) {
                formData.append("teamImages", item.image);
              }
            });
          } else {
            // In case of other arrays, serialize JSON
            formData.append(key, JSON.stringify(value));
          }
        } else {
          formData.append(key, value);
        }
      }
    });

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      let res;
      if (data._id) {
        // Assuming _id means existing record
        res = await api.put("/api/additional-form", formData, config);
        toast.success("Details updated successfully!");
      } else {
        console.log("Creating new record:", formData);
        res = await api.post("/api/additional-form", formData, config);
        toast.success("Details submitted successfully!");
      }

      // if (onSubmit) onSubmit(res.data);
    } catch (error) {
      toast.error("Failed to submit details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto p-4 space-y-6"
    >
      {/* Basic Fields */}
      <div className="grid grid-cols-2 gap-6">
        {[
          { label: "Tag Line", name: "tagLine" },
          { label: "Specialization", name: "specialization" },
          { label: "Slogan", name: "slogan" },
          { label: "Annual Sales", name: "annualSales" },
          { label: "Turnover", name: "turnover" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium">{label}</label>
            <input
              type="text"
              name={name}
              value={data[name] || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              // required
            />
          </div>
        ))}
      </div>

      {/* Textareas */}
      <div className="space-y-4">
        {[
          { label: "Success Story", name: "successStory" },
          { label: "Our Give", name: "ourGive" },
          { label: "Our Ask", name: "ourAsk" },
          { label: "Vision", name: "vision" },
          { label: "Mission", name: "mission" },
          { label: "Company Policies", name: "companyPolicies" },
          { label: "Company Growth", name: "companyGrowth" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium">{label}</label>
            <textarea
              name={name}
              value={data[name] || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              // required
              rows={3}
            />
          </div>
        ))}
      </div>

      {[
        { label: "Awards & Recognition (Images)", name: "awards" },
        {
          label: "Certifications / Registrations (Images)",
          name: "certifications",
        },
      ].map(({ label, name }) => (
        <div key={name} className="mb-6">
          <label className="block font-medium text-gray-700">{label}</label>
          <input
            type="file"
            name={name}
            multiple
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {/* Display image previews right below this input */}
          {data[name] && data[name].length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {data[name].map((img, idx) => {
                const src =
                  img.url ||
                  (img.file instanceof File
                    ? URL.createObjectURL(img.file)
                    : null);
                if (img.url)
                  console.log(`Preview URL for ${name}[${idx}]:`, img.url);

                return (
                  <div
                    key={img.file || idx}
                    className="relative w-24 h-24 border rounded overflow-hidden"
                  >
                    {src ? (
                      <img
                        src={src}
                        alt={`${name} image ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
                        No preview
                      </div>
                    )}
                    <p className="text-center text-xs mt-1 truncate">
                      {img.file instanceof File ? img.file.name : img.file}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Client List */}
      <div>
        <h3 className="font-semibold mb-2">Client List</h3>
        {data.clientList.map((client, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Client Name"
              value={client.name}
              onChange={(e) => handleClientChange(idx, "name", e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
              // required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleClientChange(idx, "logo", e.target.files[0] || null)
              }
              className="w-24 p-2 border border-gray-300 rounded"
              // required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddClient}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Client
        </button>
        {data.clientList && data.clientList.length > 0 && (
          <div>
            <label>Client Logos:</label>
            <div className="flex space-x-2 mt-1">
              {data.clientList.map((client, idx) =>
                client.logoUrl ? (
                  <img
                    key={idx}
                    src={client.logoUrl}
                    alt={client.name}
                    className="h-20 rounded"
                  />
                ) : null
              )}
            </div>
          </div>
        )}
      </div>

      {/* Team */}
      <div>
        <h3 className="font-semibold mb-2">Our Team</h3>
        {data.team.map((member, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Team Member Name"
              value={member.name}
              onChange={(e) => handleTeamChange(idx, "name", e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
              // required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleTeamChange(idx, "image", e.target.files[0] || null)
              }
              className="w-24 p-2 border border-gray-300 rounded"
              // required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddTeamMember}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Team Member
        </button>
        {data.team && data.team.length > 0 && (
          <div>
            <label>Team Images:</label>
            <div className="flex space-x-2 mt-1">
              {data.team.map((member, idx) =>
                member.imageUrl ? (
                  <img
                    key={idx}
                    src={member.imageUrl}
                    alt={member.name}
                    className="h-20 rounded"
                  />
                ) : null
              )}
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : data._id ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AdditionalForm;
