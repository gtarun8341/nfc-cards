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
  // const [userDetailsExist, setUserDetailsExist] = useState(false); // State to check user details
  const [limitations, setLimitations] = useState({});
  const [flags, setFlags] = React.useState({
    aboutCompanyExists: false,
    additionalFormExists: false,
    bankDetailsExists: false,
    companyDetailsExists: false,
    galleryImagesExists: false,
    hasActiveProducts: false,
    socialMediaExists: false,
  });
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
        const data = response.data;

        setFlags({
          aboutCompanyExists: !!data.aboutCompanyExists,
          additionalFormExists: !!data.additionalFormExists,
          bankDetailsExists: !!data.bankDetailsExists,
          companyDetailsExists: !!data.companyDetailsExists,
          galleryImagesExists: !!data.galleryImagesExists,
          hasActiveProducts: !!data.hasActiveProducts,
          socialMediaExists: !!data.socialMediaExists,
        });

        setLimitations(response.data?.limitations || {});
      } catch (error) {
        console.error("Error fetching user details:", error);
        // setUserDetailsExist(false);
      }
    };
    fetchUserDetails();
  }, []);

  // Destructure for easy checks
  const {
    aboutCompanyExists,
    additionalFormExists,
    bankDetailsExists,
    companyDetailsExists,
    galleryImagesExists,
    hasActiveProducts,
    socialMediaExists,
  } = flags;

  // Define completeness flags
  const allExceptAdditional =
    aboutCompanyExists &&
    bankDetailsExists &&
    companyDetailsExists &&
    galleryImagesExists &&
    hasActiveProducts &&
    socialMediaExists;

  const allComplete = allExceptAdditional && additionalFormExists;

  const menuItems = [
    {
      name: "Dashboard",
      path: "/user-panel/Dashboard",
      icon: UserIcon,
    },

    {
      name: "Customer Profile",
      path: "/user-panel/Edit-Account",
      icon: UserGroupIcon,
    },
    {
      name: "Company Profile",
      path: "/user-panel/User-Form",
      icon: BriefcaseIcon,
      onClick: () => setActiveForm("company-profile"),
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
    {
      name: "Card Purchases",
      path: "/user-panel/card-purchases",
      icon: CreditCardIcon,
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
    {
      name: "Sold Products",
      path: "/user-panel/sold-products",
      icon: ArchiveBoxIcon,
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
      icon: ChatBubbleLeftRightIcon,
      onClick: () => setActiveForm("feedback"),
    },
    {
      name: "Manage Contacts",
      path: "/user-panel/contact-management",
      icon: UserGroupIcon,
      onClick: () => setActiveForm("contact-management"),
    },
    {
      name: "CRM",
      path: "/user-panel/crm",
      icon: AdjustmentsHorizontalIcon,
      onClick: () => setActiveForm("crm"),
    },
    {
      name: "Enquires",
      path: "/user-panel/enquires",
      icon: InboxIcon,
      onClick: () => setActiveForm("enquires"),
    },
    {
      name: "Reviews",
      path: "/user-panel/Review",
      icon: ClipboardDocumentIcon,
      onClick: () => setActiveForm("Review"),
    },
  ];

  // Conditionally build listing submenu based on flags and limitations
  let listingSubmenu = [];

  if (allExceptAdditional && !additionalFormExists) {
    // Show all except "One Page Business Profile"
    if (limitations?.miniWebsite !== "0") {
      listingSubmenu.push({
        name: "Mini Website",
        path: "/user-panel/mini-website",
        icon: DocumentArrowUpIcon,
        onClick: () => setActiveForm("mini-website"),
      });
    }
    if (limitations?.pdfVisitingCard !== "0") {
      listingSubmenu.push({
        name: "PDF Visiting Card",
        path: "/user-panel/pdf-visiting-card",
        icon: DocumentArrowUpIcon,
        onClick: () => setActiveForm("pdf-visiting-card"),
      });
    }
    if (limitations?.physicalVisitingCard !== "0") {
      listingSubmenu.push({
        name: "Physical Visiting Card",
        path: "/user-panel/physical-visiting-card",
        icon: CreditCardIcon,
        onClick: () => setActiveForm("physical-visiting-card"),
      });
    }
    if (limitations?.businessEssentials !== "0") {
      listingSubmenu.push({
        name: "Business Essentials",
        path: "/user-panel/business-essentials",
        icon: BriefcaseIcon,
        onClick: () => setActiveForm("business-essentials"),
      });
    }
  } else if (allComplete) {
    // Show all including "One Page Business Profile"
    if (limitations?.miniWebsite !== "0") {
      listingSubmenu.push({
        name: "Mini Website",
        path: "/user-panel/mini-website",
        icon: DocumentArrowUpIcon,
        onClick: () => setActiveForm("mini-website"),
      });
    }
    if (limitations?.pdfVisitingCard !== "0") {
      listingSubmenu.push({
        name: "PDF Visiting Card",
        path: "/user-panel/pdf-visiting-card",
        icon: DocumentArrowUpIcon,
        onClick: () => setActiveForm("pdf-visiting-card"),
      });
    }
    if (limitations?.businessProfile !== "0") {
      listingSubmenu.push({
        name: "One Page Business Profile",
        path: "/user-panel/one-page-business-profile",
        icon: PencilSquareIcon,
        onClick: () => setActiveForm("one-page-business-profile"),
      });
    }
    if (limitations?.physicalVisitingCard !== "0") {
      listingSubmenu.push({
        name: "Physical Visiting Card",
        path: "/user-panel/physical-visiting-card",
        icon: CreditCardIcon,
        onClick: () => setActiveForm("physical-visiting-card"),
      });
    }
    if (limitations?.businessEssentials !== "0") {
      listingSubmenu.push({
        name: "Business Essentials",
        path: "/user-panel/business-essentials",
        icon: BriefcaseIcon,
        onClick: () => setActiveForm("business-essentials"),
      });
    }
  } else {
    // No listing pages, optionally prompt for completing required forms
    listingSubmenu = [];
  }

  // Insert "Manage Listing" menu if there are any listing submenu items
  if (listingSubmenu.length > 0) {
    const manageListingMenu = {
      name: "Manage Listing",
      icon: CogIcon,
      submenu: listingSubmenu,
    };
    menuItems.splice(3, 0, manageListingMenu);
  }

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
