"use client"; // Next.js Client Component
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  UserIcon,
  CogIcon,
  AdjustmentsHorizontalIcon,
  DocumentArrowUpIcon,
  ChartBarIcon,
  InboxIcon,
  PencilSquareIcon,
  UserGroupIcon,
  WrenchIcon,
  BriefcaseIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  PhoneIcon,
  GiftIcon,
  ArchiveBoxIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../components/Sidebar"; // Import Sidebar component

const StaffPanelLayout = ({ children }) => {
  const [activeForm, setActiveForm] = useState("multi-step");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle
  const router = useRouter();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/staff-panel/dashboard",
      icon: UserIcon,
      onClick: () => setActiveForm("dashboard"),
    },
    {
      name: "Manage Listing",
      icon: CogIcon,
      submenu: [
        {
          name: "Mini Website",
          path: "/staff-panel/ManageListing/All-Card-Purchases",
          icon: UserIcon,
          onClick: () => setActiveForm("mini-website"),
        },
        {
          name: "NFC Cards",
          path: "/staff-panel/ManageListing/All-Card-Purchases",
          icon: UserIcon,
          onClick: () => setActiveForm("nfc-cards"),
        },
        {
          name: "PDF Visiting Card",
          path: "/staff-panel/ManageListing/All-Card-Purchases",
          icon: UserIcon,
          onClick: () => setActiveForm("pdf-visiting-card"),
        },
        {
          name: "One Page Business Profile",
          path: "/staff-panel/ManageListing/All-Card-Purchases",
          icon: UserIcon,
          onClick: () => setActiveForm("one-page-business-profile"),
        },
        {
          name: "Physical Visiting Card",
          path: "/staff-panel/ManageListing/All-Card-Purchases",
          icon: UserIcon,
          onClick: () => setActiveForm("physical-visiting-card"),
        },
        {
          name: "Business Essentials",
          path: "/staff-panel/ManageListing/All-Card-Purchases",
          icon: UserIcon,
          onClick: () => setActiveForm("business-essentials"),
        },
        // { name: 'Additional Services', icon: UserIcon, onClick: () => setActiveForm('additional-services') },
      ],
    },
    {
      name: "All Card Purchases",
      path: "/staff-panel/All-Card-Purchases",
      icon: InboxIcon,
      onClick: () => setActiveForm("All-Card-Purchases"),
    },
    {
      name: "Generate QR Code",
      path: "/staff-panel/generate-qr-code",
      icon: AdjustmentsHorizontalIcon,
      onClick: () => setActiveForm("generate-qr-code"),
    },
    {
      name: "Generate Link for Customer",
      path: "/staff-panel/generate-link",
      icon: DocumentArrowUpIcon,
      onClick: () => setActiveForm("generate-link"),
    },
    {
      name: "Customer Profile Management",
      path: "/staff-panel/customer-profile-management",
      icon: UserIcon,
      onClick: () => setActiveForm("customer-profile-management"),
    },
    {
      name: "Customer Company Management",
      path: "/staff-panel/customer-company-management",
      icon: CogIcon,
      onClick: () => setActiveForm("customer-company-management"),
    },
    {
      name: "Customer Management",
      path: "/staff-panel/customer-management",
      icon: UserIcon,
      onClick: () => setActiveForm("customer-management"),
    },
    {
      name: "Products & Categories",
      path: "/staff-panel/products-categories",
      icon: DocumentArrowUpIcon,
      onClick: () => setActiveForm("products-categories"),
    },
    {
      name: "Admin Products",
      path: "/staff-panel/admin-products",
      icon: DocumentArrowUpIcon,
      onClick: () => setActiveForm("admin-products"),
    },
    {
      name: "Contact Developer",
      path: "/staff-panel/contact-developer",
      icon: CogIcon,
      onClick: () => setActiveForm("contact-developer"),
    },
    {
      name: "Testimonials",
      path: "/staff-panel/AdminTestimonialsPage",
      icon: UserIcon,
      onClick: () => setActiveForm("AdminTestimonialsPage"),
    },
    {
      name: "User Contact Management",
      path: "/staff-panel/contact-management",
      icon: AdjustmentsHorizontalIcon,
      onClick: () => setActiveForm("contact-management"),
    },
    {
      name: "Blogs, Testimonials",
      path: "/staff-panel/blogs-testimonials",
      icon: DocumentArrowUpIcon,
      onClick: () => setActiveForm("blogs-testimonials"),
    },
    {
      name: "Contact Us",
      path: "/staff-panel/contact-us",
      icon: UserIcon,
      onClick: () => setActiveForm("contact-us"),
    },
  ];

  const handleLogout = () => {
    ["authToken", "staffAuthToken", "adminAuthToken"].forEach((token) => {
      // Clear cookie
      document.cookie = `${token}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      // Clear localStorage
      localStorage.removeItem(token);
    });

    router.push("/staff-auth");
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        menuItems={menuItems}
        onLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-grow p-4 overflow-auto">{children}</div>
    </div>
  );
};

export default StaffPanelLayout;
