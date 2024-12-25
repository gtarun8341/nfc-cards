"use client"; // Next.js Client Component

import { useEffect, useState } from 'react';
import api from "../../../apiConfig/axiosConfig";
import NoLayout from "./no-layout";

// Standard UUID Validation (for the format you provided)
const isValidUUID = (id) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);

const TemplatePage = ({ params }) => {
    const { type, uuid } = params;
    const [templateData, setTemplateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Log initial params
    useEffect(() => {
        console.log("Initial Params in TemplatePage:", { type, uuid });
    }, []);

    useEffect(() => {
        console.log("Fetching Template for:", { type, uuid });

        // Check if UUID is valid
        if (!isValidUUID(uuid)) {
            console.warn("Invalid UUID format:", uuid);
            setError("Invalid template ID.");
            setLoading(false);
            return; // Skip API call
        }

        if (!type || !uuid) {
            console.warn("Skipping API call due to invalid params:", { type, uuid });
            return;
        }

        const fetchTemplate = async () => {
            try {
                console.log("Fetching template with API URL:", `/api/selectedtemplates/render?type=${type}&uid=${uuid}`);
                const token = localStorage.getItem("authToken");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await api.get(`/api/selectedtemplates/render?type=${type}&uid=${uuid}`, config);

                if (response.data) {
                    setTemplateData(response.data);
                } else {
                    console.error("Template data is empty.");
                    setError('Template data is empty.');
                }
            } catch (err) {
                console.error("Error fetching template:", err);
                setError('Failed to load template.');
            } finally {
                setLoading(false);
            }
        };

        fetchTemplate();
    }, [type, uuid]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <NoLayout>
            <div dangerouslySetInnerHTML={{ __html: templateData }} />
        </NoLayout>
    );
};

TemplatePage.getLayout = function getLayout(page) {
    return <NoLayout>{page}</NoLayout>;
};

export default TemplatePage;
