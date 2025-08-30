"use client"; // Next.js Client Component

import { useEffect, useState } from "react";
import api from "../../../apiConfig/axiosConfig";

const TemplatePage = ({ params }) => {
  const { type, uuid } = params;
  const [templateData, setTemplateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await api.get(
          `/api/selectedtemplates/render?type=${type}&uid=${uuid}`,
          config
        );
        if (response.data) {
          setTemplateData(response.data);
        } else {
          setError("Template data is empty.");
        }
      } catch (err) {
        setError("Failed to load template.");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [type, uuid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  // Instead of dangerouslySetInnerHTML, render in an iframe
  return (
    <iframe
      srcDoc={templateData}
      style={{ width: "100%", height: "100vh", border: "none" }}
    />
  );
};

export default TemplatePage;
