// src/app/components/AllFooter.js
"use client";
import { FaEnvelope, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Link from "next/link";

const AllFooter = () => {
  return (
    <footer className="bg-[#EECCCC80] text-black p-6">
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-6 px-4">
        {/* Column 1 - Logo + Social */}
        <div>
          <h1 className="font-extrabold text-3xl mb-2">Shiven</h1>
          <div className="flex gap-4 text-xl">
            <a href="mailto:info@shiven.com" aria-label="Email">
              <FaEnvelope className="hover:text-green-600 transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="hover:text-pink-600 transition" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="hover:text-blue-600 transition" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube className="hover:text-red-600 transition" />
            </a>
          </div>
        </div>
        {/* Column 2 */}
        <div>
          <h5 className="font-bold mb-2 text-[#FDB98F]">Shop By Category</h5>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/nfc-card">NFC Cards</Link>
            </li>
            <li>
              <Link href="/pdf-card">Digital Visiting Cards</Link>
            </li>
            <li>
              <Link href="/physical-card">Physical Visiting Cards</Link>
            </li>
            <li>
              <Link href="/one-page-bussiness-profile">Business Profile</Link>
            </li>
            <li>
              <Link href="/bussiness-essentials">Business Essentials</Link>
            </li>
          </ul>
        </div>
        {/* Column 3 */}
        <div>
          <h5 className="font-bold mb-2 text-[#FDB98F]">Learn</h5>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/faqs">FAQs</Link>
            </li>
          </ul>
        </div>
        {/* Column 4 */}
        <div>
          <h5 className="font-bold mb-2 text-[#FDB98F]">Help</h5>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/privacy-policy">Privacy Policies</Link>
            </li>
            <li>
              <Link href="/returns-refunds">Returns & Refunds</Link>
            </li>
            <li>
              <Link href="/terms-conditions">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/shipping">Shipping</Link>
            </li>
          </ul>
        </div>
        {/* Column 5 */}
        <div>
          <h5 className="font-bold mb-2 text-[#FDB98F]">Connect With Us</h5>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/contact-us">Contact us</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default AllFooter;
