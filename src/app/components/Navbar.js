"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for hamburger

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const adminAuthToken = localStorage.getItem("adminAuthToken");
    const staffAuthToken = localStorage.getItem("staffAuthToken");

    setIsLoggedIn(!!authToken || !!adminAuthToken || !!staffAuthToken);

    if (adminAuthToken) setUserRole("admin");
    else if (staffAuthToken) setUserRole("staff");
    else if (authToken) setUserRole("user");
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center gap-x-12 flex-wrap">
        {/* Left side - Logo + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Hamburger (visible only on mobile) */}
          <button
            className="text-2xl text-black md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-black font-extrabold text-2xl hover:scale-105 transition-transform"
          >
            Shiven Card
          </Link>
        </div>

        {/* Desktop Top Menu */}
        <div className="hidden md:flex items-center gap-x-12">
          {[
            { name: "NFC Card", href: "/nfc-card" },
            { name: "Digital Visiting Card", href: "/pdf-card" },
            { name: "Physical Visiting Card", href: "/physical-card" },
            { name: "Business Profile", href: "/one-page-bussiness-profile" },
            { name: "Business Essentials", href: "/bussiness-essentials" },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="text-black font-medium text-sm hover:underline transition-colors hover:text-green-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Bottom Navigation */}
      <div className="hidden md:flex border-t border-gray-200 mx-4 md:mx-16 lg:mx-24 justify-end items-center py-3 gap-12 text-black text-sm font-medium">
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

        {/* Auth Button */}
        {!isLoggedIn ? (
          <Link href="/auth">
            <button className="text-black px-4 py-2 rounded-md hover:bg-green-700 transition shadow">
              Register / Login
            </button>
          </Link>
        ) : (
          <Link href={`/${userRole}-panel/Dashboard`}>
            <button className="text-black px-4 py-2 rounded-md hover:bg-green-700 transition shadow">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-300 px-6 py-4 bg-white space-y-4">
          {/* Card Types Section */}
          <div className="space-y-4 pb-4 border-b border-gray-200">
            {[
              { name: "NFC Card", href: "/nfc-card" },
              { name: "Digital Visiting Card", href: "/pdf-card" },
              { name: "Physical Visiting Card", href: "/physical-card" },
              { name: "Business Profile", href: "/one-page-bussiness-profile" },
              { name: "Business Essentials", href: "/bussiness-essentials" },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="block text-black hover:text-green-800"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Info Pages Section */}
          <div className="space-y-4">
            {[
              { name: "About Us", href: "/about" },
              { name: "Shop Now", href: "/our-products" },
              { name: "Services", href: "/additional-services" },
              { name: "Blogs", href: "/blogs" },
              { name: "Track Product", href: "/tracking" },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="block text-black hover:text-green-800"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Button */}
          <div className="pt-2">
            {!isLoggedIn ? (
              <Link href="/auth">
                <button className="w-full text-black px-4 py-2 rounded-md hover:bg-green-700 transition shadow">
                  Register / Login
                </button>
              </Link>
            ) : (
              <Link href={`/${userRole}-panel/Dashboard`}>
                <button className="w-full text-black px-4 py-2 rounded-md hover:bg-green-700 transition shadow">
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
