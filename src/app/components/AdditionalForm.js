"use client"; // Next.js Client Component

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const AdditionalForm = ({ onDataChange, initialData }) => {
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

  useEffect(() => {
    if (initialData) {
      console.log(initialData);
      setData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const newFiles = Array.from(files);
      setData((prevData) => ({ ...prevData, [name]: newFiles }));
      onDataChange({ [name]: newFiles });
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
      onDataChange({ [name]: value });
    }
  };

  const handleAddClient = () => {
    setData((prevData) => ({
      ...prevData,
      clientList: [...prevData.clientList, { name: "", logo: null }],
    }));
  };

  const handleClientChange = (index, field, value) => {
    const updatedClients = [...data.clientList];
    updatedClients[index][field] = value;
    setData((prevData) => ({ ...prevData, clientList: updatedClients }));
    onDataChange({ clientList: updatedClients });
  };

  const handleAddTeamMember = () => {
    setData((prevData) => ({
      ...prevData,
      team: [...prevData.team, { name: "", image: null }],
    }));
  };

  const handleTeamChange = (index, field, value) => {
    const updatedTeam = [...data.team];
    updatedTeam[index][field] = value;
    setData((prevData) => ({ ...prevData, team: updatedTeam }));
    onDataChange({ team: updatedTeam });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Additional Details
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {[
          { label: "Tag Line", name: "tagLine" },
          { label: "Specialization", name: "specialization" },
          { label: "Slogan", name: "slogan" },
          { label: "Annual Sales", name: "annualSales" },
          { label: "Turnover", name: "turnover" },
        ].map((field) => (
          <div
            key={field.name}
            className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition-transform duration-200"
          >
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              placeholder={field.label}
              value={data[field.name]}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6">
        {[
          { label: "Success Story", name: "successStory" },
          { label: "Our Give", name: "ourGive" },
          { label: "Our Ask", name: "ourAsk" },
          { label: "Vision", name: "vision" },
          { label: "Mission", name: "mission" },
          { label: "Company Policies", name: "companyPolicies" },
          { label: "Company Growth", name: "companyGrowth" },
        ].map((field) => (
          <div
            key={field.name}
            className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition-transform duration-200"
          >
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <textarea
              name={field.name}
              placeholder={field.label}
              value={data[field.name]}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        ))}
        {[
          { label: "Awards & Recognition (Images)", name: "awards" },
          {
            label: "Certifications / Registrations (Images)",
            name: "certifications",
          },
        ].map((field) => (
          <div
            key={field.name}
            className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition-transform duration-200"
          >
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type="file"
              name={field.name}
              accept="image/*"
              multiple
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        ))}
        <div className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition-transform duration-200">
          <h3 className="text-lg font-semibold">Client List</h3>
          {data.clientList.map((client, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Client Name"
                value={client.name}
                onChange={(e) =>
                  handleClientChange(index, "name", e.target.value)
                }
                className="p-2 w-full border border-gray-300 rounded-md"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleClientChange(index, "logo", e.target.files[0])
                }
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
          <button
            onClick={handleAddClient}
            className="mt-2 p-2 bg-green-500 text-white rounded-md"
          >
            + Add Client
          </button>
        </div>
        <div className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition-transform duration-200">
          <h3 className="text-lg font-semibold">Our Team</h3>
          {data.team.map((member, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Team Member Name"
                value={member.name}
                onChange={(e) =>
                  handleTeamChange(index, "name", e.target.value)
                }
                className="p-2 w-full border border-gray-300 rounded-md"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleTeamChange(index, "image", e.target.files[0])
                }
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
          <button
            onClick={handleAddTeamMember}
            className="mt-2 p-2 bg-green-500 text-white rounded-md"
          >
            + Add Team Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalForm;
