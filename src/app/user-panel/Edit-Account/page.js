"use client"; // Next.js Client Component

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig"; // Import Axios instance
import MultiStepForm from "../../components/MultiStepForm"; // Assuming MultiStepForm is in the same folder
import PasswordChangePage from "./PasswordChangePage/page"; // Import the PasswordChangePage component
import toast from "react-hot-toast";

const AccountFormPage = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    displayName: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve the JWT token from localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
          },
        };
        const { data } = await api.get("/api/users/profile", config); // Make API request
        setUserDetails({
          name: data.name,
          email: data.email,
          displayName: data.name, // Assuming displayName is the same as name initially
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details");
        toast.error("Failed to load user details");

        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const steps = [
    {
      title: "Edit Account Details",
      fields: [
        {
          name: "name",
          type: "text",
          label: "Full Name",
          placeholder: "Enter your name",
          required: true,
        },
        {
          name: "email",
          type: "email",
          label: "Email Address",
          placeholder: "Enter your email",
          required: true,
        },
        {
          name: "displayName",
          type: "text",
          label: "Display Name",
          placeholder: "Enter your display name",
          required: true,
        },
      ],
    },
  ];

  const handleProfileUpdate = async (formData) => {
    try {
      console.log(formData, "data sending ");
      const token = localStorage.getItem("authToken"); // Retrieve the JWT token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
        },
      };

      const response = await api.put(
        "/api/users/profileUpdate",
        formData,
        config
      ); // Send the updated data to the server
      setUserDetails(response.data); // Update user details in the state
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile");
    }
  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {isChangingPassword ? (
        <PasswordChangePage onBack={() => setIsChangingPassword(false)} />
      ) : (
        <>
          <MultiStepForm
            steps={steps}
            formTitle="Edit Account Details"
            initialFormData={userDetails}
            onSubmit={handleProfileUpdate} // Pass the update handler to the form
          />
          <button
            onClick={handleChangePasswordClick}
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md"
          >
            Change Password
          </button>
        </>
      )}
    </div>
  );
};

export default AccountFormPage;
