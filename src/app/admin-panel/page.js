"use client"; // Next.js Client Component
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';
import { UserIcon, CogIcon, AdjustmentsHorizontalIcon, DocumentArrowUpIcon,   ChartBarIcon,  InboxIcon,  PencilSquareIcon,  UserGroupIcon,  WrenchIcon} from '@heroicons/react/24/outline';
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import Dashboard from './Dashboard/page'; // Dashboard component
import UserManagement from './UserManagement/page'; // Example page component
import Settings from './Settings/page'; // Example page component
import TemplateManagement from './TemplateManagement/page'; // Example page component
import MiniWebsite from './ManageListing/MiniWebsite/page'; // Mini Website component
import NFCCards from './ManageListing/NFCCards/page'; // NFC Cards component
import PDFVisitingCard from './ManageListing/PDFVisitingCard/page'; // PDF Visiting Card component
import OnePageBusinessProfile from './ManageListing/OnePageBusinessProfile/page'; // One Page Business Profile component
import PhysicalVisitingCard from './ManageListing/PhysicalVisitingCard/page'; // Physical Visiting Card component
import BusinessEssentials from './ManageListing/BusinessEssentials/page'; // Business Essentials component
import AdditionalServices from './ManageListing/AdditionalServices/page'; // Additional Services component
import GenerateQRCode from './GenerateQRCode/page'; // Generate QR Code component
import GenerateLink from './GenerateLink/page'; // Generate Link component
import StaffManagement from './StaffManagement/page'; // Staff Management component
import CustomerProfileManagement from './CustomerProfileManagement/page'; // Customer Profile Management component
import CustomerCompanyManagement from './CustomerCompanyManagement/page'; // Customer Company Management component
import CustomerManagement from './CustomerManagement/page'; // Customer Management component
import PaymentGatewayIntegration from './PaymentGatewayIntegration/page'; // Payment Gateway Integration component
import ProductsCategories from './ProductsCategories/page'; // Products & Categories component
import PaymentManagement from './PaymentManagement/page'; // Payment Management component
import SalesIncome from './SalesIncome/page'; // Sales & Income component
import CustomersPerProducts from './ReportsGraphs/CustomersPerProducts/page'; // Customers per Products report
import ProductsPerCategory from './ReportsGraphs/ProductsPerCategory/page'; // Products per Category report
import IncomePerCategories from './ReportsGraphs/IncomePerCategories/page'; // Income per Categories report
import CustomerEngagement from './ReportsGraphs/CustomerEngagement/page'; // Customer Engagement report
import SocialMediaIntegration from './SocialMediaIntegration/page'; // Social Media Integration component
import ContactDeveloper from './ContactDeveloper/page'; // Contact Developer component
import Feedback from './Feedback/page'; // Feedback component
import SMSWhatsAppIntegration from './SMSWhatsAppIntegration/page'; // SMS/WhatsApp Integration component
import BlogsTestimonials from './BlogsTestimonials/page'; // Blogs & Testimonials component
import PrivacyPolicy from './ComplianceDocuments/PrivacyPolicy/page'; // Privacy Policy component
import RefundPolicy from './ComplianceDocuments/RefundPolicy/page'; // Refund Policy component
import TermsConditions from './ComplianceDocuments/TermsConditions/page'; // Terms & Conditions component
import ShippingPolicy from './ComplianceDocuments/ShippingPolicy/page'; // Shipping Policy component
import CancellationPolicy from './ComplianceDocuments/CancellationPolicy/page'; // Cancellation Policy component
import ContactUs from './ContactUs/page'; // Contact Us component
import AdminProductsPage from './AdminProducts/page';
import AdminPlansPage from './AdminPlansPage/page';
import AllCardPurchases from './All-Card-Purchases/page';
import ContactManagement from './contact-management/page';
const AdminPanel = () => {
  const [activeForm, setActiveForm] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', path: 'dashboard', icon: UserIcon, onClick: () => setActiveForm('dashboard') },
    // { name: 'User Management', path: 'user-management', icon: UserGroupIcon, onClick: () => setActiveForm('user-management') },
    // { name: 'Settings', path: 'settings', icon: WrenchIcon, onClick: () => setActiveForm('settings') },
    { name: 'Template Management', path: 'template-management', icon: InboxIcon, onClick: () => setActiveForm('template-management') },
    { 
      name: 'Manage Listing', 
      icon: CogIcon, 
      submenu: [
        { name: 'Mini Website', icon: UserIcon, onClick: () => setActiveForm('mini-website') },
        { name: 'NFC Cards', icon: UserIcon, onClick: () => setActiveForm('nfc-cards') },
        { name: 'PDF Visiting Card', icon: UserIcon, onClick: () => setActiveForm('pdf-visiting-card') },
        { name: 'One Page Business Profile', icon: UserIcon, onClick: () => setActiveForm('one-page-business-profile') },
        { name: 'Physical Visiting Card', icon: UserIcon, onClick: () => setActiveForm('physical-visiting-card') },
        // { name: 'Business Essentials', icon: UserIcon, onClick: () => setActiveForm('business-essentials') },
        // { name: 'Additional Services', icon: UserIcon, onClick: () => setActiveForm('additional-services') },
      ]
    },  
    { name: 'All Card Purchases', path: 'All-Card-Purchases', icon: InboxIcon, onClick: () => setActiveForm('All-Card-Purchases') },
    { name: 'Generate QR Code', path: 'generate-qr-code', icon: AdjustmentsHorizontalIcon, onClick: () => setActiveForm('generate-qr-code') },
    { name: 'Generate Link for Customer', path: 'generate-link', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('generate-link') },
    { name: 'Staff Management', path: 'staff-management', icon: CogIcon, onClick: () => setActiveForm('staff-management') },
    { name: 'Customer Profile Management', path: 'customer-profile-management', icon: UserIcon, onClick: () => setActiveForm('customer-profile-management') },
    { name: 'Customer Company Management', path: 'customer-company-management', icon: CogIcon, onClick: () => setActiveForm('customer-company-management') },
    { name: 'Customer Management', path: 'customer-management', icon: UserIcon, onClick: () => setActiveForm('customer-management') },
    // { name: 'Payment Gateway Integration', path: 'payment-gateway', icon: AdjustmentsHorizontalIcon, onClick: () => setActiveForm('payment-gateway') },
    { name: 'Products & Categories', path: 'products-categories', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('products-categories') },
    { name: 'SubscriptionPlan', path: 'subscription-plan', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('subscription-plan') },
    { name: 'Admin Products', path: 'admin-products', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('admin-products') },
    { name: 'Payment Management', path: 'payment-management', icon: CogIcon, onClick: () => setActiveForm('payment-management') },
    { name: 'Sales & Income', path: 'sales-income', icon: UserIcon, onClick: () => setActiveForm('sales-income') },
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
    { name: 'Contact Developer', path: 'contact-developer', icon: CogIcon, onClick: () => setActiveForm('contact-developer') },
    { name: 'Feedback', path: 'feedback', icon: UserIcon, onClick: () => setActiveForm('feedback') },
        { name: 'User Contact Management', path: 'contact-management', icon: AdjustmentsHorizontalIcon, onClick: () => setActiveForm('contact-management') },

    // { name: 'SMS / WhatsApp Integration', path: 'sms-whatsapp', icon: AdjustmentsHorizontalIcon, onClick: () => setActiveForm('sms-whatsapp') },
    { name: 'Blogs, Testimonials', path: 'blogs-testimonials', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('blogs-testimonials') },
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
    { name: 'Contact Us', path: 'contact-us', icon: UserIcon, onClick: () => setActiveForm('contact-us') },
  ];

  const handleLogout = () => {
    document.cookie = 'adminAuthToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    localStorage.clear();
    router.push('/admin-auth');
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        menuItems={menuItems}
        onLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
      {activeForm === 'dashboard' && <Dashboard />}
      {/* {activeForm === 'user-management' && <UserManagement />} */}
      {/* {activeForm === 'settings' && <Settings />} */}
      {activeForm === 'template-management' && <TemplateManagement />}
      {activeForm === 'mini-website' && <MiniWebsite />}
      {activeForm === 'nfc-cards' && <NFCCards />}
      {activeForm === 'pdf-visiting-card' && <PDFVisitingCard />}
      {activeForm === 'one-page-business-profile' && <OnePageBusinessProfile />}
      {activeForm === 'physical-visiting-card' && <PhysicalVisitingCard />}
      {activeForm === 'All-Card-Purchases' && <AllCardPurchases />}
      {/* {activeForm === 'business-essentials' && <BusinessEssentials />} */}
      {/* {activeForm === 'additional-services' && <AdditionalServices />} */}
      {activeForm === 'generate-qr-code' && <GenerateQRCode />}
      {activeForm === 'generate-link' && <GenerateLink />}
      {activeForm === 'staff-management' && <StaffManagement />}
      {activeForm === 'customer-profile-management' && <CustomerProfileManagement />}
      {activeForm === 'customer-company-management' && <CustomerCompanyManagement />}
      {activeForm === 'customer-management' && <CustomerManagement />}
      {/* {activeForm === 'payment-gateway' && <PaymentGatewayIntegration />} */}
      {activeForm === 'products-categories' && <ProductsCategories />}
      {activeForm === 'admin-products' && <AdminProductsPage />}
      {activeForm === 'subscription-plan' && <AdminPlansPage />}
      {activeForm === 'payment-management' && <PaymentManagement />}
      {activeForm === 'sales-income' && <SalesIncome />}
      {/* {activeForm === 'customers-per-products' && <CustomersPerProducts />}
      {activeForm === 'products-per-category' && <ProductsPerCategory />}
      {activeForm === 'income-per-categories' && <IncomePerCategories />} */}
      {/* {activeForm === 'customer-engagement' && <CustomerEngagement />} */}
      {/* {activeForm === 'social-media' && <SocialMediaIntegration />} */}
      {activeForm === 'contact-developer' && <ContactDeveloper />}
      {activeForm === 'feedback' && <Feedback />}
            {activeForm === 'contact-management' && <ContactManagement />}
      {/* {activeForm === 'sms-whatsapp' && <SMSWhatsAppIntegration />} */}
      {activeForm === 'blogs-testimonials' && <BlogsTestimonials />}
      {/* {activeForm === 'privacy-policy' && <PrivacyPolicy />}
      {activeForm === 'refund-policy' && <RefundPolicy />}
      {activeForm === 'terms-conditions' && <TermsConditions />}
      {activeForm === 'shipping-policy' && <ShippingPolicy />}
      {activeForm === 'cancellation-policy' && <CancellationPolicy />} */}
      {activeForm === 'contact-us' && <ContactUs />}
      
      {/* Fallback component if none match */}
      {activeForm === '' && <Dashboard />} {/* Default to Dashboard if no activeForm is set */}
    </div>
  </div>
);
};

export default AdminPanel;
