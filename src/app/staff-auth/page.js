"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../apiConfig/axiosConfig";
import AllFooter from "../components/AllFooter";
import { UserCog, User, Briefcase } from "lucide-react";

export default function StaffAuthPage() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [userRole, setUserRole] = useState("staff"); // default role
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading

    try {
      const response = await api.post("/api/staffAuthRoute/login", {
        staffId,
        password,
      });
      console.log("Response:", response.data);

      if (response.status === 200) {
        // alert(response.data.message);
        ["authToken", "staffAuthToken", "adminAuthToken"].forEach((token) => {
          document.cookie = `${token}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
          localStorage.removeItem(token);
        });

        // Redirect to staff panel
        document.cookie = `staffAuthToken=${response.data.token}; path=/`; // Set auth token as a cookie
        localStorage.setItem("staffAuthToken", response.data.token);
        // If it's the first-time login, redirect to change password page
        if (response.data.isInitialPassword) {
          router.replace("staff-panel/change-password");
        } else {
          // Redirect to staff panel
          router.replace("/staff-panel/Dashboard");
        }
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("Invalid credentials");
        } else if (error.response.status === 404) {
          alert("Staff not found");
        } else {
          console.error("Error during API request:", error);
          alert("An error occurred. Please try again later.");
        }
      } else {
        console.error("Error during API request:", error);
      }
    } finally {
      setLoading(false); // stop loading no matter what
    }
  };

  return (
    <>
      <section className="min-h-[80vh]  flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-black min-h-[500px]">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold text-black mb-8 animate__animated animate__fadeIn">
              Staff Login
            </h2>
            <h3 className="text-gray-600 mb-4">
              Sign in to access the dashboard
            </h3>

            <div className="w-full mb-6">
              <div className="relative flex justify-between border-b border-gray-300">
                {["admin", "staff"].map((role, index) => (
                  <button
                    key={role}
                    // onClick={() => setUserRole(role)}
                    onClick={() => {
                      router.push(`/${role}-auth`);
                    }}
                    className={`flex-1 text-center py-2 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                      userRole === role ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {role === "admin" && <UserCog size={20} />}
                    {role === "staff" && <Briefcase size={20} />}
                    <span className="capitalize">{role}</span>
                  </button>
                ))}

                {/* Sliding underline */}
                <div
                  className="absolute bottom-0 h-1 bg-[#EECCCC] transition-all duration-300"
                  style={{
                    width: "50%", // 50% width for two tabs
                    transform:
                      userRole === "admin"
                        ? "translateX(0%)"
                        : "translateX(100%)",
                  }}
                />
              </div>
            </div>

            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="space-y-1">
                <label
                  htmlFor="staffId"
                  className="text-lg font-semibold text-gray-800"
                >
                  Staff Id
                </label>
                <input
                  type="staffId"
                  id="staffId"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  placeholder="Enter your Staff Id"
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="text-lg font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-1/2 mx-auto block bg-[#EECCCC] text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <AllFooter />
    </>
  );
}
