"use client"; // Marking this as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use router for navigation
import AllFooter from '../components/AllFooter';

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const router = useRouter(); // Initialize router

  // Dummy login handling
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login success
    setIsLoggedIn(true);
    // Redirect to user panel after login
    router.push('/user-panel');
  };

  // Toggle between login and register
  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="relative w-full max-w-5xl h-[550px] rounded-lg shadow-2xl bg-white overflow-hidden">
          <div
            className={`absolute top-0 left-0 w-1/2 h-full p-12 transition-transform duration-700 ease-in-out flex flex-col justify-center items-center ${
              isRegister ? 'translate-x-full' : ''
            }`}
          >
            <h2 className="text-4xl font-extrabold text-green-600 mb-8 animate-fadeIn">
              {isRegister ? 'Register' : 'Login'}
            </h2>

            <form className="space-y-6 w-4/5 animate-slideIn" onSubmit={handleSubmit}>
              {isRegister ? (
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
                      placeholder="Your Name"
                      className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </>
              ) : null}

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
                  placeholder="Your Password"
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                {isRegister ? 'Register' : 'Login'}
              </button>
            </form>

            <div className="mt-6">
              <p className="text-gray-600 text-sm">
                {isRegister ? 'Already have an account?' : "Don't have an account?"}
              </p>
              <button
                onClick={toggleForm}
                className="text-green-600 font-medium hover:underline mt-2 transition-all duration-300"
              >
                {isRegister ? 'Login here' : 'Register here'}
              </button>
            </div>
          </div>

          <div
            className={`absolute top-0 right-0 w-1/2 h-full bg-cover bg-center transition-transform duration-700 ease-in-out flex justify-center items-center ${
              isRegister ? '-translate-x-full' : ''
            }`}
            style={{
              backgroundImage:
                'url("https://source.unsplash.com/featured/?nfc,card,technology")',
            }}
          >
            <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-lg animate-fadeIn">
              <img
                src="https://source.unsplash.com/random/?card"
                alt="NFC Card"
                className="w-40 h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Optional Footer */}
      <AllFooter />
    </>
  );
}
