"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  const dropdownRef = useRef(null); // Reference for dropdown

  // Toggles the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggles the dropdown for "Our Cards" menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check if the auth token exists in localStorage
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const adminAuthToken = localStorage.getItem("adminAuthToken");
    const staffAuthToken = localStorage.getItem("staffAuthToken");

    setIsLoggedIn(!!authToken || !!adminAuthToken || !!staffAuthToken);

    if (adminAuthToken) {
      setUserRole("admin");
    } else if (staffAuthToken) {
      setUserRole("staff");
    } else if (authToken) {
      setUserRole("user");
    } else {
      setUserRole("");
    }
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Section: Logo + Card Types */}
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-x-14 gap-y-2">
        {/* Logo (treated like a menu item) */}
        <Link
          href="/"
          className="text-black font-extrabold text-2xl hover:scale-105 transition-transform"
        >
          Shiven Card
        </Link>

        {/* Card Types */}
        {[
          { name: "NFC Card", href: "/nfc-card" },
          { name: "Digital Visiting Card", href: "/pdf-card" },
          { name: "Physical Visiting Card", href: "/physical-card" },
          { name: "Business Profile", href: "/one-page-bussiness-profile" },
          { name: "Business Essentials", href: "/bussiness-essentials" },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-black font-medium text-sm hover:underline transition-colors hover:text-green-900"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Bottom Section: Navigation */}
      <div className="bg-white">
        <div className="border-t border-gray-200 mx-4 md:mx-16 lg:mx-24">
          <div className="w-full px-4 py-3 flex flex-col md:flex-row justify-end items-center space-y-2 md:space-y-0 gap-6">
            {/* Navigation links */}
            <div className="flex flex-wrap justify-end items-center gap-6 text-black text-sm font-medium">
              {[
                { name: "About Us", href: "/about" },
                { name: "Shop Now", href: "/our-products" },
                { name: "Services", href: "/additional-services" },
                { name: "Blogs", href: "/blogs" },
                { name: "Track Product", href: "/tracking" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="hover:underline hover:text-green-700 transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Auth Button */}
            <div>
              {!isLoggedIn ? (
                <Link href="/auth">
                  <button className="text-black  px-4 py-2 rounded-md hover:bg-green-700 transition shadow">
                    Register / Login
                  </button>
                </Link>
              ) : (
                <Link href={`/${userRole}-panel/Dashboard`}>
                  <button className="text-black  px-4 py-2 rounded-md hover:bg-green-700 transition shadow">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
