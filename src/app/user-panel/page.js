"use client"; // Next.js Client Component
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';
import {
  UserIcon, CogIcon, AdjustmentsHorizontalIcon, DocumentArrowUpIcon, ChartBarIcon,
  InboxIcon, PencilSquareIcon, UserGroupIcon, WrenchIcon, BriefcaseIcon,
  ShoppingCartIcon, CreditCardIcon, PhoneIcon, GiftIcon, ArchiveBoxIcon, AcademicCapIcon
} from '@heroicons/react/24/outline';
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import UserFormPage from './User-Form/page';
import AccountFormPage from './Edit-Account/page';
import DigitalProductsPage from './Digital-Products/page'; // Make sure to import your new component
import TemplatesPage from './templates/page';
import CustomerProfilePage from './Customer-Profile/page';
import CompanyProfilePage from './Company-Profile/page';
import MiniWebsitePage from './Mini-Website/page';
import NFCCardsPage from './NFC-Cards/page';
import PDFVisitingCardPage from './PDF-Visiting-Card/page';
import OnePageBusinessProfilePage from './One-Page-Business-Profile/page';
import PhysicalVisitingCardPage from './Physical-Visiting-Card/page';
import BusinessEssentialsPage from './Business-Essentials/page';
import PurchaseHistoryPage from './Purchase-History/page';
import ProductCataloguePage from './Product-Catalogue/page';
import ProductSalesManagementPage from './Product-Sales-Management/page';
import PaymentManagementPage from './Payment-Management/page';
import ContactDeveloperPage from './Contact-Developer/page';
import FeedbackPage from './Feedback/page';
import ContactManagementPage from './Contact-Management/page';
import CardAnalyticsPage from './Card-Analytics/page';
import CaptureLeadsPage from './Capture-Leads/page';
import CRMPage from './CRM/page';
import PaperBusinessCardsScanPage from './Paper-Business-Cards-Scan/page';
import EnquiriesPage from './Enquires/page';
import OfferDiscountsEventsPage from './Offer-Discounts-Events/page';
import SoldProducts from './sold-products/page';
const UserPanel = () => {
  const [activeForm, setActiveForm] = useState('multi-step');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle
  const router = useRouter();

  const menuItems = [
    // { name: 'multi-step', path: 'multi-step', icon: UserIcon, onClick: () => setActiveForm('multi-step') },
    // { name: 'edit-account', path: 'edit-account', icon: UserGroupIcon, onClick: () => setActiveForm('edit-account') },
    { name: 'Customer Profile', path: 'customer-profile', icon: UserIcon, onClick: () => setActiveForm('customer-profile') },
    { name: 'Company Profile', path: 'company-profile', icon: BriefcaseIcon, onClick: () => setActiveForm('company-profile') },
    // { name: 'templates-manage', path: 'templates-manage', icon: WrenchIcon, onClick: () => setActiveForm('templates-manage') },
    { name: 'Mini Website', path: 'mini-website', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('mini-website') },
    { name: 'NFC Cards', path: 'nfc-cards', icon: CreditCardIcon, onClick: () => setActiveForm('nfc-cards') },
    { name: 'PDF Visiting Card', path: 'pdf-visiting-card', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('pdf-visiting-card') },
    { name: 'One Page Business Profile', path: 'one-page-business-profile', icon: PencilSquareIcon, onClick: () => setActiveForm('one-page-business-profile') },
    { name: 'Physical Visiting Card', path: 'physical-visiting-card', icon: CreditCardIcon, onClick: () => setActiveForm('physical-visiting-card') },
    { name: 'Business Essentials', path: 'business-essentials', icon: BriefcaseIcon, onClick: () => setActiveForm('business-essentials') },
    { name: 'Purchase History', path: 'purchase-history', icon: ArchiveBoxIcon, onClick: () => setActiveForm('purchase-history') },
    { name: 'Product Catalogue', path: 'product-catalogue', icon: ShoppingCartIcon, onClick: () => setActiveForm('product-catalogue') },
    { name: 'Product Sales Management', path: 'product-sales-management', icon: ChartBarIcon, onClick: () => setActiveForm('product-sales-management') },
    // { name: 'Payment Management', path: 'payment-management', icon: CreditCardIcon, onClick: () => setActiveForm('payment-management') },
    { name: 'Sold Products', path: 'sold-products', icon: CreditCardIcon, onClick: () => setActiveForm('sold-products') },
    { name: 'Contact Developer', path: 'contact-developer', icon: PhoneIcon, onClick: () => setActiveForm('contact-developer') },
    { name: 'Feedback', path: 'feedback', icon: InboxIcon, onClick: () => setActiveForm('feedback') },
    { name: 'Contact Management', path: 'contact-management', icon: UserGroupIcon, onClick: () => setActiveForm('contact-management') },
    { name: 'Card Analytics', path: 'card-analytics', icon: AdjustmentsHorizontalIcon, onClick: () => setActiveForm('card-analytics') },
    { name: 'Capture Leads', path: 'capture-leads', icon: ChartBarIcon, onClick: () => setActiveForm('capture-leads') },
    { name: 'CRM', path: 'crm', icon: AcademicCapIcon, onClick: () => setActiveForm('crm') },
    { name: 'Paper Business Cards Scan', path: 'paper-business-cards-scan', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('paper-business-cards-scan') },
    { name: 'Enquires', path: 'enquires', icon: InboxIcon, onClick: () => setActiveForm('enquires') },
    { name: 'Offer / Discounts / Events', path: 'offer-discounts-events', icon: GiftIcon, onClick: () => setActiveForm('offer-discounts-events') },
  ];

  const handleLogout = () => {
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    localStorage.clear();
    router.push('/auth');
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
        {/* {activeForm === 'multi-step' && <UserFormPage />} */}
        {/* {activeForm === 'edit-account' && <AccountFormPage />} */}
        {activeForm === 'templates-manage' && <TemplatesPage />}

        {/* Render Components based on the selected menu */}
        {activeForm === 'customer-profile' && <AccountFormPage />}
        {activeForm === 'company-profile' && <UserFormPage />}
        {activeForm === 'mini-website' && <MiniWebsitePage />}
        {activeForm === 'nfc-cards' && <NFCCardsPage />}
        {activeForm === 'pdf-visiting-card' && <PDFVisitingCardPage />}
        {activeForm === 'one-page-business-profile' && <OnePageBusinessProfilePage />}
        {activeForm === 'physical-visiting-card' && <PhysicalVisitingCardPage />}
        {activeForm === 'business-essentials' && <BusinessEssentialsPage />}
        {activeForm === 'purchase-history' && <PurchaseHistoryPage />}
        {activeForm === 'product-catalogue' && <ProductCataloguePage />}
        {activeForm === 'product-sales-management' && <ProductSalesManagementPage />}
        {/* {activeForm === 'payment-management' && <PaymentManagementPage />} */}
        {activeForm === 'sold-products' && <SoldProducts />}
        {activeForm === 'contact-developer' && <ContactDeveloperPage />}
        {activeForm === 'feedback' && <FeedbackPage />}
        {activeForm === 'contact-management' && <ContactManagementPage />}
        {activeForm === 'card-analytics' && <CardAnalyticsPage />}
        {activeForm === 'capture-leads' && <CaptureLeadsPage />}
        {activeForm === 'crm' && <CRMPage />}
        {activeForm === 'paper-business-cards-scan' && <PaperBusinessCardsScanPage />}
        {activeForm === 'enquires' && <EnquiriesPage />}
        {activeForm === 'offer-discounts-events' && <OfferDiscountsEventsPage />}
      </div>
    </div>
  );
};

export default UserPanel;
