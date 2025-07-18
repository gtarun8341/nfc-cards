// src/app/layout.js
"use client"; // Mark this component as a Client Component
import { Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation"; // Updated import
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
export default function RootLayout({ children }) {
  const pathname = usePathname(); // Use usePathname instead of useRouter

  // Check if the current page is a template page (using the dynamic route)
  const isTemplatePage = pathname.includes("/templates/");

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Render Navbar and Footer only if it's not a template page */}
        {!isTemplatePage && <Navbar />}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#ffffff",
              color: "#333",
              padding: "16px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#ecfdf5",
              },
              style: {
                borderLeft: "5px solid #22c55e",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fef2f2",
              },
              style: {
                borderLeft: "5px solid #ef4444",
              },
            },
          }}
        />
        <main className="flex-grow">{children}</main>
        {!isTemplatePage && <Footer className="mt-auto" />}
      </body>
    </html>
  );
}
