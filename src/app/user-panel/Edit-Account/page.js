"use client";

import { useState, useEffect } from "react";
import api from "../../apiConfig/axiosConfig";
import PasswordChangePage from "./PasswordChangePage/page";
import toast from "react-hot-toast";

const AccountFormPage = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // ⬅️ NEW
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await api.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserDetails({
          name: data.name,
          email: data.email,
        });
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load user details");
        setError("Failed to load user details");
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true); // ⬅️ Start saving
    try {
      const token = localStorage.getItem("authToken");
      const { data } = await api.put("/api/users/profileUpdate", userDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails(data);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false); // ⬅️ Done saving
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
        {isChangingPassword ? (
          <PasswordChangePage onBack={() => setIsChangingPassword(false)} />
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Edit Account Details
            </h2>
            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={saving} // ⬅️ Disable while saving
                  className={`${
                    saving
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white font-medium px-6 py-2 rounded-lg transition-all duration-200`}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200"
                >
                  Change Password
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountFormPage;
