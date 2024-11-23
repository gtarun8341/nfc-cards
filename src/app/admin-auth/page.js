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
        router.push('/admin-panel');
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
      <section className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="relative w-full max-w-5xl h-[450px] rounded-lg shadow-2xl bg-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full p-12 flex flex-col justify-center items-center">
            <h2 className="text-4xl font-extrabold text-green-600 mb-8 animate-fadeIn">
              Login
            </h2>

            <form className="space-y-6 w-4/5 animate-slideIn" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
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
                <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
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
          </div>
        </div>
      </section>

      <AllFooter />
    </>
  );
}
