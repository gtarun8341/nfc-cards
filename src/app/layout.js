// src/app/layout.js
"use client";  // Mark this component as a Client Component

import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { usePathname } from 'next/navigation'; // Updated import

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Use usePathname instead of useRouter

  // Check if the current page is a template page (using the dynamic route)
  const isTemplatePage = pathname.includes('/templates/');
 
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Render Navbar and Footer only if it's not a template page */}
        {!isTemplatePage && <Navbar />}
        <main className="flex-grow">
          {children}
        </main>
        {!isTemplatePage && <Footer className="mt-auto" />}
      </body>
    </html>
  );
}
