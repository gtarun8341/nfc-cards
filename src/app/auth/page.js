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
    if (isRegister && (!name || !email || !password || !phone)) {
      return alert("All fields are required for registration.");
    }
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
        } else if (response.data.message?.includes("expired")) {
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
        } else if (error.response.status === 403) {
          alert(error.response.data.message); // Account deactivated
        } else if (error.response.status === 400) {
          alert(error.response.data.message); // Registration: email already in use
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
      <section className="min-h-screen flex items-center justify-center bg-[#EECCCC80]">
        <div className="flex w-full max-w-6xl h-[700px] rounded-lg shadow-2xl overflow-hidden bg-white">
          {/* Left side */}
          <div
            className="w-1/2 bg-cover bg-center p-10 text-black flex flex-col justify-center"
            style={{ backgroundImage: "url('/images/userLogin.jpg')" }} // Replace with your image path
          >
            <h1 className="text-4xl font-bold mb-6">
              Welcome To Shiven NFC Cards
            </h1>
            <p className="text-lg leading-relaxed">
              Your one-stop destination for premium NFC cards and smart digital
              services. We empower you to share your identity, links, and
              content instantly with a simple tap. Whether you&apos;re a
              professional, creator, or business owner, our tools help you stand
              out in the digital world.
              <br />
              <br />
              Log in to explore, customize, and manage your smart solutions with
              ease. Let&apos;s make your first impression unforgettable.
            </p>
          </div>

          {/* Right side */}
          <div className="w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-black mb-6 text-center">
              {isRegister ? "Register" : "User Login"}
            </h2>

            <form
              className="space-y-6 w-full max-w-md mx-auto"
              onSubmit={handleSubmit}
            >
              {isRegister && (
                <>
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
                      className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
                      className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </>
              )}

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
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#EECCCC] text-black px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                {isRegister ? "Register" : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </p>
              <button
                onClick={toggleForm}
                className="text-[#EECCCC] font-medium hover:underline mt-2 transition-all duration-300"
              >
                {isRegister ? "Login here" : "Register here"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
