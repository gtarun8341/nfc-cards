"use client"; // Next.js Client Component

import MultiStepForm from "../../../components/MultiStepForm"; // Assuming MultiStepForm is in the same folder
import { useState } from "react";
import api from "../../../apiConfig/axiosConfig"; // Importing the API config
import toast from "react-hot-toast";

const PasswordChangePage = ({ onBack }) => {
  const [errorMessages, setErrorMessages] = useState([]); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const steps = [
    {
      title: "Change Password",
      fields: [
        {
          name: "currentPassword",
          type: "password",
          label: "Current Password",
          placeholder: "Enter your current password",
          required: true,
        },
        {
          name: "newPassword",
          type: "password",
          label: "New Password",
          placeholder: "Enter a new password",
          required: true,
        },
        {
          name: "confirmNewPassword",
          type: "password",
          label: "Confirm New Password",
          placeholder: "Confirm your new password",
          required: true,
        },
      ],
    },
  ];

  const validatePasswords = (formData) => {
    const errors = [];

    if (formData.newPassword.length < 6) {
      errors.push("New password must be at least 6 characters long.");
    }

    // // Add more complexity checks here if needed
    // if (!/[A-Z]/.test(formData.newPassword)) {
    //   errors.push('New password must contain at least one uppercase letter.');
    // }

    // if (!/\d/.test(formData.newPassword)) {
    //   errors.push('New password must contain at least one number.');
    // }

    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)) {
    //   errors.push('New password must contain at least one special character.');
    // }

    return errors;
  };

  const handleSubmit = async (formData) => {
    setErrorMessages([]); // Clear previous error messages
    setSuccessMessage(""); // Clear previous success message

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    const validationErrors = validatePasswords(formData);
    if (validationErrors.length > 0) {
      setErrorMessages(validationErrors); // Show all validation errors
      return;
    }

    try {
      const token = localStorage.getItem("authToken"); // Retrieve the JWT token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
        },
      };

      // Make API call to change password
      const response = await api.put(
        "/api/users/changePassword",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        config
      );

      toast.success(response.data.message || "Password changed successfully!");
      // Reset form fields if needed
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div>
      <MultiStepForm
        steps={steps}
        formTitle="Change Password"
        onSubmit={handleSubmit}
        onBack={onBack}
      />
      {errorMessages.length > 0 && (
        <div className="error-messages">
          {errorMessages.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
        </div>
      )}
      {successMessage && (
        <div className="success-message" style={{ color: "green" }}>
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default PasswordChangePage;
