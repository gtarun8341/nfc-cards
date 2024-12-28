"use client"; // Marking this as a Client Component

import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Toggles the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggles the dropdown for "Our Cards" menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Check if the auth token exists in localStorage
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const adminAuthToken = localStorage.getItem("adminAuthToken");
    const staffAuthToken = localStorage.getItem("staffAuthToken");

    // Set login status
    setIsLoggedIn(!!authToken || !!adminAuthToken || !!staffAuthToken);

    // Set the role based on the token
    if (adminAuthToken) {
      setUserRole("admin");
    } else if (staffAuthToken) {
      setUserRole("staff");
    } else if (authToken) {
      setUserRole("user");
    } else {
      setUserRole(""); // No role if no tokens exist
    }
  }, []);

  return (
    <nav className="bg-gradient-to-r from-green-500 to-green-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-1 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-extrabold text-2xl">
          <Link href="/" className="hover:scale-105 transition-transform">
            Shiven Card
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-white">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="hover:text-gray-200 hover:underline transition"
            >
              Our Cards
            </button>
            {dropdownOpen && (
              <div className="absolute top-8 left-0 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg">
                <ul className="space-y-2">
                  {[{ name: "NFC Card", href: "/nfc-card" },
                    { name: "PDF Card", href: "/pdf-card" },
                    { name: "Physical Card", href: "/physical-card" },
                    { name: "Business Profile", href: "/one-page-bussiness-profile" },
                    { name: "Bussiness Essentials", href: "/bussiness-essentials" }].map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className="block hover:text-gray-300 transition">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Other Menu Items */}
          {[{ name: "Additional Services", href: "/additional-services" },
            { name: "Blogs", href: "/blogs" },
            { name: "Shop Now", href: "/our-products" },
            { name: "Track Product", href: "/tracking" }]
            .map((item, index) => (
              <Link key={index} href={item.href} className="hover:text-gray-200 hover:underline transition">
                {item.name}
              </Link>
            ))}

          {/* Auth Button */}
          <div className="ml-6">
            {!isLoggedIn ? (
              <Link href="/auth">
                <button className="bg-white text-green-700 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition">
                  Login
                </button>
              </Link>
            ) : (
              <Link href={`/${userRole}-panel`}>
              <button className="bg-white text-green-700 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
              </button>
            </Link>
            )}
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
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
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} bg-green-600 text-white md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <ul className="space-y-4 py-4 px-6">
          <li>
            <button
              onClick={toggleDropdown}
              className="block hover:text-gray-300 transition"
            >
              Our Cards
            </button>
            {dropdownOpen && (
              <div className="bg-green-600 text-white py-2 px-4 rounded-lg">
                <ul className="space-y-2">
                  {[{ name: "NFC Card", href: "/nfc-card" },
                    { name: "PDF Card", href: "/pdf-card" },
                    { name: "Physical Card", href: "/physical-card" },
                    { name: "Business Profile", href: "/one-page-bussiness-profile" },
                    { name: "Bussiness Essentials", href: "/bussiness-essentials" }].map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className="block hover:text-gray-300 transition">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          {/* Other Mobile Menu Items */}
          {[{ name: "Additional Services", href: "/additional-services" },
            { name: "Blogs", href: "/blogs" },
            { name: "Shop Now", href: "/our-products" },
            { name: "Track Product", href: "/tracking" }]
            .map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="block hover:text-gray-300 transition">
                  {item.name}
                </Link>
              </li>
            ))}

          {/* Auth Button */}
          <li>
            {!isLoggedIn ? (
              <Link href="/auth">
                <button className="w-full bg-white text-green-700 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition">
                  Login
                </button>
              </Link>
            ) : (
              <Link href={`/${userRole}-panel`}>
              <button className="bg-white text-green-700 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
              </button>
            </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
