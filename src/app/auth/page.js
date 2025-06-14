"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../apiConfig/axiosConfig";
import AllFooter from "../components/AllFooter";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // New state for phone number
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiEndpoint = isRegister ? "/api/users/register" : "/api/users/login";
    const requestData = isRegister
      ? { name, email, password, phone }
      : { email, password };

    try {
      const response = await api.post(apiEndpoint, requestData);
      console.log("Response:", response.data);

      if (!isRegister) {
        if (response.data.token) {
          // User has an active plan
          ["authToken", "staffAuthToken", "adminAuthToken"].forEach((token) => {
            document.cookie = `${token}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
            localStorage.removeItem(token);
          });

          document.cookie = `authToken=${response.data.token}; path=/`; // Set auth token as a cookie
          localStorage.setItem("authToken", response.data.token);
          router.push("/user-panel/Dashboard");
        }
        // else {
        //   // User doesn't have an active plan
        //   alert(response.data.message); // Alert the message from the backend
        //   localStorage.setItem('_id', response.data._id);
        //   localStorage.setItem('userName', response.data.name);
        //   localStorage.setItem('userEmail', response.data.email);
        //   localStorage.setItem('userPhone', response.data.phone);
        //   router.push('/purchase-plan');
        // }
        else if (response.data.message?.includes("expired")) {
          alert(response.data.message);
          localStorage.setItem("_id", response.data._id);
          localStorage.setItem("userName", response.data.name);
          localStorage.setItem("userEmail", response.data.email);
          localStorage.setItem("userPhone", response.data.phone);
          router.push("/purchase-plan");
        }
      } else {
        // Registration successful
        alert("Registration successful! Please log in to continue.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("Invalid email or password");
        } else {
          console.error("Error during API request:", error);
          alert("An error occurred. Please try again later.");
        }
      } else {
        console.error("Error during API request:", error);
      }
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4">
        <div className="relative w-full max-w-lg h-[650px] rounded-lg shadow-xl bg-white overflow-hidden transform-style-3d">
          <div
            className={`absolute top-0 left-0 w-full h-full p-8 transition-transform duration-700 ease-in-out 
            ${isRegister ? "rotate-y-180" : ""} transform-style-3d`}
          >
            {/* Login Form */}
            <div
              className={`absolute top-0 left-0 w-full h-full p-8 transition-all duration-700 ease-in-out flex flex-col justify-center items-center ${
                isRegister ? "hidden" : ""
              }`}
            >
              <h2 className="text-3xl font-extrabold text-green-600 mb-8 transition-opacity duration-500 opacity-100">
                Login
              </h2>

              <form
                className="space-y-6 w-full max-w-sm animate-slideIn"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300"
                >
                  Login
                </button>
              </form>

              <div className="mt-6">
                <p className="text-gray-600 text-sm">
                  Don&apos;t have an account?
                </p>
                <button
                  onClick={toggleForm}
                  className="text-green-600 font-medium hover:underline mt-2 transition-all duration-300"
                >
                  Register here
                </button>
              </div>
            </div>

            {/* Register Form */}
            <div
              className={`absolute top-0 left-0 w-full h-full p-8 transition-all duration-700 ease-in-out flex flex-col justify-center items-center ${
                !isRegister ? "hidden" : ""
              }`}
            >
              <h2 className="text-3xl font-extrabold text-green-600 mb-8 transition-opacity duration-500 opacity-100">
                Register
              </h2>

              <form
                className="space-y-6 w-full max-w-sm animate-slideIn"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your Phone Number"
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300"
                >
                  Register
                </button>
              </form>

              <div className="mt-6">
                <p className="text-gray-600 text-sm">
                  Already have an account?
                </p>
                <button
                  onClick={toggleForm}
                  className="text-green-600 font-medium hover:underline mt-2 transition-all duration-300"
                >
                  Login here
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AllFooter />
    </>
  );
}
