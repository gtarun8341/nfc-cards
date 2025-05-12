"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../apiConfig/axiosConfig';
import AllFooter from '../components/AllFooter';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/admin/login', { email, password });
      console.log('Response:', response.data);

      if (response.data.token) {
        // User successfully logged in
        document.cookie = `adminAuthToken=${response.data.token}; path=/`; // Set auth token as a cookie
        localStorage.setItem('adminAuthToken', response.data.token);
        router.push('/admin-panel/Dashboard');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert('Invalid email or password');
        } else {
          console.error('Error during API request:', error);
          alert('An error occurred. Please try again later.');
        }
      } else {
        console.error('Error during API request:', error);
      }
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold text-green-600 mb-8 animate__animated animate__fadeIn">
              Admin Login
            </h2>

            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="space-y-1">
                <label htmlFor="email" className="text-lg font-semibold text-gray-800">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label htmlFor="password" className="text-lg font-semibold text-gray-800">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
              >
                Login
              </button>
            </form>

          </div>
        </div>
      </section>

      <AllFooter />
    </>
  );
}
