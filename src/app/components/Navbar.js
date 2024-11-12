"use client"; // Marking this as a Client Component

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Check if the auth token exists in localStorage
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!authToken);
  }, []);

  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left Side - Brand Name */}
        <div className="text-white font-bold text-lg">
          <Link href="/">Shiven Card</Link>
        </div>

        {/* Right Side - Menu Items and Hamburger Menu */}
        <div className="flex items-center space-x-4">
          {/* Menu Items for Desktop */}
          <ul className="hidden md:flex space-x-4 text-white">
            <li>
              <Link href="/nfc-card">NFC Card</Link>
            </li>
            <li>
              <Link href="/pdf-card">PDF Card</Link>
            </li>
            <li>
              <Link href="/physical-card">Physical Card</Link>
            </li>
            <li>
              <Link href="/one-page-bussiness-profile">One Page Business Profile</Link>
            </li>
            <li>
              <Link href="/one-page-bussiness-profile">Business Essentials</Link>
            </li>
            <li>
              <Link href="/one-page-bussiness-profile">Additional Services</Link>
            </li>
            <li>
              <Link href="/our-products">Shop Now</Link>
            </li>
            <li>
              <Link href="/tracking">Track Product</Link>
            </li>
          </ul>

          {/* Hamburger Menu Icon (visible on all screen sizes) */}
          <button onClick={toggleMenu} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Right Side - Login Button (visible on larger screens) */}
          {!isLoggedIn && (
            <Link href="/auth">
              <button className="bg-white text-green-500 px-4 py-2 rounded-md hidden md:block">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Responsive Menu (conditional rendering based on screen size) */}
      <div className={`${isOpen ? 'block' : 'hidden'} mt-4`}>
        <ul className="space-y-2 text-white">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>

          {isOpen && (
            <>
              <li>
                <Link href="/nfc-card">NFC Card</Link>
              </li>
              <li>
                <Link href="/pdf-card">PDF Card</Link>
              </li>
              <li>
                <Link href="/physical-card">Physical Card</Link>
              </li>
              <li>
              <Link href="/one-page-bussiness-profile">One Page Business Profile</Link>
            </li>
            <li>
              <Link href="/one-page-bussiness-profile">Business Essentials</Link>
            </li>
            <li>
              <Link href="/one-page-bussiness-profile">Additional Services</Link>
            </li>
            <li>
              <Link href="/our-products">Shop Now</Link>
            </li>
            <li>
              <Link href="/tracking">Track Product</Link>
            </li>
              {!isLoggedIn && (
                <li>
                  <Link href="/auth">
                    <button className="bg-white text-green-500 w-full px-4 py-2 rounded-md mt-2">
                      Login
                    </button>
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
