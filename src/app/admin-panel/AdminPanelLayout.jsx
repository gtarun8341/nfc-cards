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
  ClipboardDocumentListIcon,
  ShoppingBagIcon,
  CubeIcon,
  BanknotesIcon,
  ChartPieIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../components/Sidebar"; // Import Sidebar component

const AdminPanelLayout = ({ children }) => {
  const [activeForm, setActiveForm] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle
  const router = useRouter();
  const menuItems = [
    { name: "Dashboard", path: "/admin-panel/Dashboard", icon: UserIcon },
    // { name: 'User Management', path: 'user-management', icon: UserGroupIcon, onClick: () => setActiveForm('user-management') },
    // { name: 'Settings', path: 'settings', icon: WrenchIcon, onClick: () => setActiveForm('settings') },
    {
      name: "Template Management",
      path: "/admin-panel/TemplateManagement",
      icon: InboxIcon,
      onClick: () => setActiveForm("template-management"),
    },
    {
      name: "Manage Listing",
      icon: CogIcon,
      submenu: [
        {
          name: "Mini Website",
          path: "/admin-panel/ManageListing/mini-website",
          icon: DocumentArrowUpIcon,
          onClick: () => setActiveForm("mini-website"),
        },
        {
          name: "NFC Cards",
          path: "/admin-panel/ManageListing/nfc-cards",
          icon: CreditCardIcon,
          onClick: () => setActiveForm("nfc-cards"),
        },
        {
          name: "PDF Visiting Card",
          path: "/admin-panel/ManageListing/pdf-visiting-card",
          icon: DocumentArrowUpIcon,
          onClick: () => setActiveForm("pdf-visiting-card"),
        },
        {
          name: "One Page Business Profile",
          path: "/admin-panel/ManageListing/one-page-business-profile",
          icon: PencilSquareIcon,
          onClick: () => setActiveForm("one-page-business-profile"),
        },
        {
          name: "Physical Visiting Card",
          path: "/admin-panel/ManageListing/physical-visiting-card",
          icon: CreditCardIcon,
          onClick: () => setActiveForm("physical-visiting-card"),
        },
        {
          name: "Business Essentials",
          path: "/admin-panel/ManageListing/business-essentials",
          icon: BriefcaseIcon,
          onClick: () => setActiveForm("business-essentials"),
        },
        // { name: 'Additional Services', icon: UserIcon, onClick: () => setActiveForm('additional-services') },
      ],
    },
    {
      name: "Reports",
      icon: ChartBarIcon, // or any relevant icon
      submenu: [
        {
          name: "Customer Reports", // Join/Leave history
          path: "/admin-panel/customer-reports",
          icon: UserGroupIcon,
        },
        {
          name: "Template Usage Reports", // Template usage history
          path: "/admin-panel/template-reports",
          icon: ClipboardDocumentListIcon,
        },
        {
          name: "Customer Product Sales", // Customer's own product sales
          path: "/admin-panel/customer-product-sales",
          icon: ShoppingBagIcon,
        },
        {
          name: "Admin Product Sales", // Admin-provided products sold
          path: "/admin-panel/admin-product-sales",
          icon: CubeIcon,
        },
        {
          name: "Payment Reports", // Full payment transaction logs
          path: "/admin-panel/payment-reports",
          icon: BanknotesIcon,
        },
        {
          name: "Enquiry Reports", // Contact Dev, Contact Us, Feedback, etc.
          path: "/admin-panel/form-reports",
          icon: ChatBubbleLeftEllipsisIcon,
        },
      ],
    },
    {
      name: "All Card Purchases",
      path: "/admin-panel/All-Card-Purchases",
      icon: InboxIcon,
      onClick: () => setActiveForm("All-Card-Purchases"),
    },
    {
      name: "Landing Media ",
      path: "/admin-panel/LandingMediaAdmin",
      icon: InboxIcon,
      onClick: () => setActiveForm("LandingMediaAdmin"),
    },
    {
      name: "Generate QR Code",
      path: "/admin-panel/generate-qr-code",
      icon: AdjustmentsHorizontalIcon,
      onClick: () => setActiveForm("generate-qr-code"),
    },
    {
      name: "Generate Link for Customer",
      path: "/admin-panel/generate-link",
      icon: DocumentArrowUpIcon,
      onClick: () => setActiveForm("generate-link"),
    },
    {
      name: "Staff Management",
      path: "/admin-panel/staff-management",
      icon: CogIcon,
      onClick: () => setActiveForm("staff-management"),
    },
    {
      name: "Customer Profile Management",
      path: "/admin-panel/customer-profile-management",
      icon: UserIcon,
      onClick: () => setActiveForm("customer-profile-management"),
    },
    {
      name: "Customer Company Management",
      path: "/admin-panel/customer-company-management",
      icon: CogIcon,
      onClick: () => setActiveForm("customer-company-management"),
    },
    {
      name: "Customer Management",
      path: "/admin-panel/customer-management",
      icon: UserIcon,
      onClick: () => setActiveForm("customer-management"),
    },
    // { name: 'Payment Gateway Integration', path: 'payment-gateway', icon: AdjustmentsHorizontalIcon, onClick: () => setActiveForm('payment-gateway') },
    {
      name: "Products & Categories",
      path: "/admin-panel/products-categories",
      icon: DocumentArrowUpIcon,
      onClick: () => setActiveForm("products-categories"),
    },
    {
      name: "SubscriptionPlan",
      path: "/admin-panel/subscription-plan",
      icon: DocumentArrowUpIcon,
      onClick: () => setActiveForm("subscription-plan"),
    },
    {
      name: "Admin Products",
      path: "/admin-panel/admin-products",
      icon: DocumentArrowUpIcon,
      onClick: () => setActiveForm("admin-products"),
    },
    {
      name: "Payment Management",
      path: "/admin-panel/payment-management",
      icon: CogIcon,
      onClick: () => setActiveForm("payment-management"),
    },
    {
      name: "Sales & Income",
      path: "/admin-panel/sales-income",
      icon: UserIcon,
      onClick: () => setActiveForm("sales-income"),
    },
    // {
    //   name: 'Reports & Graphs',
    //   icon: AdjustmentsHorizontalIcon,
    //   submenu: [
    //     { name: 'Customers added as per products', icon: UserIcon, onClick: () => setActiveForm('customers-per-products') },
    //     { name: 'Products sold as per category', icon: UserIcon, onClick: () => setActiveForm('products-per-category') },
    //     { name: 'Income generated as per different categories', icon: UserIcon, onClick: () => setActiveForm('income-per-categories') },
    //     { name: 'Customer engagement to blogs & testimonials', icon: UserIcon, onClick: () => setActiveForm('customer-engagement') },
    //   ]
    // },
    // { name: 'Social Media Integration', path: 'social-media', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('social-media') },
    {
      name: "Contact Developer",
      path: "/admin-panel/contact-developer",
      icon: CogIcon,
      onClick: () => setActiveForm("contact-developer"),
    },
    {
      name: "Feedback",
      path: "/admin-panel/feedback",
      icon: UserIcon,
      onClick: () => setActiveForm("feedback"),
    },
    {
      name: "Testimonials",
      path: "/admin-panel/AdminTestimonialsPage",
      icon: UserIcon,
      onClick: () => setActiveForm("AdminTestimonialsPage"),
    },
    {
      name: "User Contact Management",
      path: "/admin-panel/contact-management",
      icon: AdjustmentsHorizontalIcon,
      onClick: () => setActiveForm("contact-management"),
    },

    // { name: 'SMS / WhatsApp Integration', path: 'sms-whatsapp', icon: AdjustmentsHorizontalIcon, onClick: () => setActiveForm('sms-whatsapp') },
    {
      name: "Blogs",
      path: "/admin-panel/blogs-testimonials",
      icon: DocumentArrowUpIcon,
      onClick: () => setActiveForm("blogs-testimonials"),
    },
    // {
    //   name: 'Compliance Documents',
    //   icon: CogIcon,
    //   submenu: [
    //     { name: 'Privacy Policy', icon: UserIcon, onClick: () => setActiveForm('privacy-policy') },
    //     { name: 'Refund Policy', icon: UserIcon, onClick: () => setActiveForm('refund-policy') },
    //     { name: 'Terms & Conditions', icon: UserIcon, onClick: () => setActiveForm('terms-conditions') },
    //     { name: 'Shipping Policy', icon: UserIcon, onClick: () => setActiveForm('shipping-policy') },
    //     { name: 'Cancellation Policy', icon: UserIcon, onClick: () => setActiveForm('cancellation-policy') },
    //   ]
    // },
    {
      name: "Contact Us",
      path: "/admin-panel/contact-us",
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

    router.push("/admin-auth");
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

export default AdminPanelLayout;
