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
  ClipboardDocumentIcon,
  BanknotesIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../components/Sidebar"; // Import Sidebar component
import api from "../apiConfig/axiosConfig"; // Import the axios instance

const UserPanelLayout = ({ children }) => {
  const [activeForm, setActiveForm] = useState("multi-step");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle
  const router = useRouter();
  const [userDetailsExist, setUserDetailsExist] = useState(false); // State to check user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await api.get("/api/users/checkUserDetails", config);
        console.log(response.data, "Server response");
        console.log(
          !!response.data?.userDetailsExist,
          "Converted boolean value"
        );
        setUserDetailsExist(!!response.data?.userDetailsExist); // Make sure this is a boolean
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserDetailsExist(false);
      }
    };
    fetchUserDetails();
  }, []);

  const menuItems = [
    // { name: 'multi-step', path: 'multi-step', icon: UserIcon, onClick: () => setActiveForm('multi-step') },
    // { name: 'edit-account', path: 'edit-account', icon: UserGroupIcon, onClick: () => setActiveForm('edit-account') },
    {
      name: "Dashboard",
      path: "/user-panel/Dashboard",
      icon: UserIcon,
    },

    {
      name: "Customer Profile",
      path: "/user-panel/Edit-Account",
      icon: UserIcon,
    },
    {
      name: "Company Profile",
      path: "/user-panel/User-Form",
      icon: BriefcaseIcon,
      onClick: () => setActiveForm("company-profile"),
    },
    // { name: 'templates-manage', path: 'templates-manage', icon: WrenchIcon, onClick: () => setActiveForm('templates-manage') },
    {
      name: "Manage Listing",
      icon: CogIcon,
      submenu: [
        {
          name: "Mini Website",
          path: "/user-panel/mini-website",
          icon: DocumentArrowUpIcon,
          onClick: () => setActiveForm("mini-website"),
        },
        {
          name: "NFC Cards",
          path: "/user-panel/nfc-cards",
          icon: CreditCardIcon,
          onClick: () => setActiveForm("nfc-cards"),
        },
        {
          name: "PDF Visiting Card",
          path: "/user-panel/pdf-visiting-card",
          icon: DocumentArrowUpIcon,
          onClick: () => setActiveForm("pdf-visiting-card"),
        },
        {
          name: "One Page Business Profile",
          path: "/user-panel/one-page-business-profile",
          icon: PencilSquareIcon,
          onClick: () => setActiveForm("one-page-business-profile"),
        },
        {
          name: "Physical Visiting Card",
          path: "/user-panel/physical-visiting-card",
          icon: CreditCardIcon,
          onClick: () => setActiveForm("physical-visiting-card"),
        },
        {
          name: "Business Essentials",
          path: "/user-panel/business-essentials",
          icon: BriefcaseIcon,
          onClick: () => setActiveForm("business-essentials"),
        },
        // { name: 'Additional Services', icon: UserIcon, onClick: () => setActiveForm('additional-services') },
      ],
    },
    {
      name: "Reports",
      icon: ChartBarIcon, // You can use a Lucide or Heroicons icon here
      submenu: [
        {
          name: "Product Reports",
          path: "/user-panel/product-reports",
          icon: ClipboardDocumentIcon,
          onClick: () => setActiveForm("product-report"),
        },
        {
          name: "Payment Reports",
          path: "/user-panel/payment-reports",
          icon: BanknotesIcon,
          onClick: () => setActiveForm("payment-report"),
        },
        {
          name: "Form Reports",
          path: "/user-panel/form-reports",
          icon: ChatBubbleLeftRightIcon,
          onClick: () => setActiveForm("form-reviews"),
        },
      ],
    },

    // { name: 'Mini Website', path: 'mini-website', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('mini-website') },
    // { name: 'NFC Cards', path: 'nfc-cards', icon: CreditCardIcon, onClick: () => setActiveForm('nfc-cards') },
    // { name: 'PDF Visiting Card', path: 'pdf-visiting-card', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('pdf-visiting-card') },
    // { name: 'One Page Business Profile', path: 'one-page-business-profile', icon: PencilSquareIcon, onClick: () => setActiveForm('one-page-business-profile') },
    // { name: 'Physical Visiting Card', path: 'physical-visiting-card', icon: CreditCardIcon, onClick: () => setActiveForm('physical-visiting-card') },
    // { name: 'Business Essentials', path: 'business-essentials', icon: BriefcaseIcon, onClick: () => setActiveForm('business-essentials') },
    {
      name: "Card Purchases",
      path: "/user-panel/card-purchases",
      icon: DocumentArrowUpIcon,
      onClick: () => setActiveForm("card-purchases"),
    },
    {
      name: "Purchase History",
      path: "/user-panel/purchase-history",
      icon: ArchiveBoxIcon,
      onClick: () => setActiveForm("purchase-history"),
    },
    {
      name: "Product Catalogue",
      path: "/user-panel/product-catalogue",
      icon: ShoppingCartIcon,
      onClick: () => setActiveForm("product-catalogue"),
    },
    // { name: 'Product Sales Management', path: 'product-sales-management', icon: ChartBarIcon, onClick: () => setActiveForm('product-sales-management') },
    // { name: 'Payment Management', path: 'payment-management', icon: CreditCardIcon, onClick: () => setActiveForm('payment-management') },
    {
      name: "Sold Products",
      path: "/user-panel/sold-products",
      icon: CreditCardIcon,
      onClick: () => setActiveForm("sold-products"),
    },
    {
      name: "Contact Developer",
      path: "/user-panel/contact-developer",
      icon: PhoneIcon,
      onClick: () => setActiveForm("contact-developer"),
    },
    {
      name: "Feedback",
      path: "/user-panel/feedback",
      icon: InboxIcon,
      onClick: () => setActiveForm("feedback"),
    },
    {
      name: "Contact Management",
      path: "/user-panel/contact-management",
      icon: UserGroupIcon,
      onClick: () => setActiveForm("contact-management"),
    },
    // { name: 'Card Analytics', path: 'card-analytics', icon: AdjustmentsHorizontalIcon, onClick: () => setActiveForm('card-analytics') },
    // { name: 'Capture Leads', path: 'capture-leads', icon: ChartBarIcon, onClick: () => setActiveForm('capture-leads') },
    {
      name: "CRM",
      path: "/user-panel/crm",
      icon: AcademicCapIcon,
      onClick: () => setActiveForm("crm"),
    },
    // { name: 'Paper Business Cards Scan', path: 'paper-business-cards-scan', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('paper-business-cards-scan') },
    {
      name: "Enquires",
      path: "/user-panel/enquires",
      icon: InboxIcon,
      onClick: () => setActiveForm("enquires"),
    },
    {
      name: "Reviews",
      path: "/user-panel/Review",
      icon: InboxIcon,
      onClick: () => setActiveForm("Review"),
    },
    {
      name: "Offer / Discounts / Events",
      path: "/user-panel/offer-discounts-events",
      icon: GiftIcon,
      onClick: () => setActiveForm("offer-discounts-events"),
    },
  ];

  const handleLogout = () => {
    ["authToken", "staffAuthToken", "adminAuthToken"].forEach((token) => {
      document.cookie = `${token}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      localStorage.removeItem(token);
    });

    router.push("/auth");
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

export default UserPanelLayout;
