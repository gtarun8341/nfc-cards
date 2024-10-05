"use client";  // Marking this as a Client Component

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
              <Link href="/our-products">Our Products</Link>
            </li>
          </ul>

          {/* Hamburger Menu Icon (visible on all screen sizes) */}
          <button onClick={toggleMenu} className="text-white">
            {/* Hamburger Icon */}
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
          <Link href="/auth">
            <button className="bg-white text-green-500 px-4 py-2 rounded-md hidden md:block">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Responsive Menu (conditional rendering based on screen size) */}
      <div className={`${isOpen ? 'block' : 'hidden'} mt-4`}>
        <ul className="space-y-2 text-white">
          {/* Always show Home, About, and Contact on larger screens */}
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>

          {/* Show all menu items only on smaller screens or when the menu is open */}
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
                <Link href="/our-products">Our Products</Link>
              </li>
              <li>
                <Link href="/auth">
                  <button className="bg-white text-green-500 w-full px-4 py-2 rounded-md mt-2">
                    Login
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
