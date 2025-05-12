// "use client"; // Next.js Client Component
// import { useRouter } from 'next/navigation'; 
// import React, { useState, useEffect } from 'react';
// import {
//   UserIcon, CogIcon, AdjustmentsHorizontalIcon, DocumentArrowUpIcon, ChartBarIcon,
//   InboxIcon, PencilSquareIcon, UserGroupIcon, WrenchIcon, BriefcaseIcon,
//   ShoppingCartIcon, CreditCardIcon, PhoneIcon, GiftIcon, ArchiveBoxIcon, AcademicCapIcon
// } from '@heroicons/react/24/outline';
// import Sidebar from '../components/Sidebar'; // Import Sidebar component
// import UserFormPage from './User-Form/page';
// import AccountFormPage from './Edit-Account/page';
// import DigitalProductsPage from './Digital-Products/page'; // Make sure to import your new component
// import TemplatesPage from './templates/page';
// import CustomerProfilePage from './customer-profile/page';
// import CompanyProfilePage from './company-profile/page';
// import MiniWebsitePage from './mini-website/page';
// import NFCCardsPage from './nfc-cards/page';
// import PDFVisitingCardPage from './pdf-visiting-card/page';
// import OnePageBusinessProfilePage from './one-page-business-profile/page';
// import PhysicalVisitingCardPage from './physical-visiting-card/page';
// import BusinessEssentialsPage from './business-essentials/page';
// import PurchaseHistoryPage from './purchase-history/page';
// import ProductCataloguePage from './product-catalogue/page';
// import ProductSalesManagementPage from './product-sales-management/page';
// import PaymentManagementPage from './payment-management/page';
// import ContactDeveloperPage from './contact-developer/page';
// import FeedbackPage from './feedback/page';
// import ContactManagementPage from './contact-management/page';
// import CardAnalyticsPage from './card-analytics/page';
// import CaptureLeadsPage from './capture-leads/page';
// import CRMPage from './crm/page';
// import PaperBusinessCardsScanPage from './paper-business-cards-scan/page';
// import EnquiriesPage from './enquires/page';
// import OfferDiscountsEventsPage from './offer-discounts-events/page';
// import SoldProducts from './sold-products/page';
// import CardPurchases from './card-purchases/page';
// import ReviewPage from './Review/page';
// import api from '../apiConfig/axiosConfig'; // Import the axios instance

// const UserPanel = () => {
//   const [activeForm, setActiveForm] = useState('multi-step');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle
//   const router = useRouter();
//   const [userDetailsExist, setUserDetailsExist] = useState(false); // State to check user details
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
  
//         const response = await api.get('/api/users/checkUserDetails', config);
//         console.log(response.data, 'Server response');
//         console.log(!!response.data?.userDetailsExist, 'Converted boolean value');
//         setUserDetailsExist(!!response.data?.userDetailsExist); // Make sure this is a boolean
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//         setUserDetailsExist(false);
//       }
//     };
//     fetchUserDetails();
//   }, []);
  
//   const menuItems = [
//     // { name: 'multi-step', path: 'multi-step', icon: UserIcon, onClick: () => setActiveForm('multi-step') },
//     // { name: 'edit-account', path: 'edit-account', icon: UserGroupIcon, onClick: () => setActiveForm('edit-account') },
//     { name: 'Customer Profile', path: '/user-panel/Edit-Account', icon: UserIcon},
//     { name: 'Company Profile', path: '/user-panel/User-Form', icon: BriefcaseIcon, onClick: () => setActiveForm('company-profile') },
//     // { name: 'templates-manage', path: 'templates-manage', icon: WrenchIcon, onClick: () => setActiveForm('templates-manage') },
//     { 
//       name: 'Manage Listing', 
//       icon: CogIcon, 
//       submenu: [
//         { name: 'Mini Website', path: '/user-panel/mini-website', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('mini-website') },
//         { name: 'NFC Cards', path: '/user-panel/nfc-cards', icon: CreditCardIcon, onClick: () => setActiveForm('nfc-cards') },
//         { name: 'PDF Visiting Card', path: '/user-panel/pdf-visiting-card', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('pdf-visiting-card') },
//         { name: 'One Page Business Profile', path: '/user-panel/one-page-business-profile', icon: PencilSquareIcon, onClick: () => setActiveForm('one-page-business-profile') },
//         { name: 'Physical Visiting Card', path: '/user-panel/physical-visiting-card', icon: CreditCardIcon, onClick: () => setActiveForm('physical-visiting-card') },
//         { name: 'Business Essentials', path: '/user-panel/business-essentials', icon: BriefcaseIcon, onClick: () => setActiveForm('business-essentials') },
//         // { name: 'Additional Services', icon: UserIcon, onClick: () => setActiveForm('additional-services') },
//       ]
//     },  
//     // { name: 'Mini Website', path: 'mini-website', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('mini-website') },
//     // { name: 'NFC Cards', path: 'nfc-cards', icon: CreditCardIcon, onClick: () => setActiveForm('nfc-cards') },
//     // { name: 'PDF Visiting Card', path: 'pdf-visiting-card', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('pdf-visiting-card') },
//     // { name: 'One Page Business Profile', path: 'one-page-business-profile', icon: PencilSquareIcon, onClick: () => setActiveForm('one-page-business-profile') },
//     // { name: 'Physical Visiting Card', path: 'physical-visiting-card', icon: CreditCardIcon, onClick: () => setActiveForm('physical-visiting-card') },
//     // { name: 'Business Essentials', path: 'business-essentials', icon: BriefcaseIcon, onClick: () => setActiveForm('business-essentials') },
//     { name: 'Card Purchases', path: '/user-panel/card-purchases', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('card-purchases') },
//     { name: 'Purchase History', path: '/user-panel/purchase-history', icon: ArchiveBoxIcon, onClick: () => setActiveForm('purchase-history') },
//     { name: 'Product Catalogue', path: '/user-panel/product-catalogue', icon: ShoppingCartIcon, onClick: () => setActiveForm('product-catalogue') },
//     // { name: 'Product Sales Management', path: 'product-sales-management', icon: ChartBarIcon, onClick: () => setActiveForm('product-sales-management') },
//     // { name: 'Payment Management', path: 'payment-management', icon: CreditCardIcon, onClick: () => setActiveForm('payment-management') },
//     { name: 'Sold Products', path: '/user-panel/sold-products', icon: CreditCardIcon, onClick: () => setActiveForm('sold-products') },
//     { name: 'Contact Developer', path: '/user-panel/contact-developer', icon: PhoneIcon, onClick: () => setActiveForm('contact-developer') },
//     { name: 'Feedback', path: '/user-panel/feedback', icon: InboxIcon, onClick: () => setActiveForm('feedback') },
//     { name: 'Contact Management', path: '/user-panel/contact-management', icon: UserGroupIcon, onClick: () => setActiveForm('contact-management') },
//     // { name: 'Card Analytics', path: 'card-analytics', icon: AdjustmentsHorizontalIcon, onClick: () => setActiveForm('card-analytics') },
//     // { name: 'Capture Leads', path: 'capture-leads', icon: ChartBarIcon, onClick: () => setActiveForm('capture-leads') },
//     { name: 'CRM', path: '/user-panel/crm', icon: AcademicCapIcon, onClick: () => setActiveForm('crm') },
//     // { name: 'Paper Business Cards Scan', path: 'paper-business-cards-scan', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('paper-business-cards-scan') },
//     { name: 'Enquires', path: '/user-panel/enquires', icon: InboxIcon, onClick: () => setActiveForm('enquires') },
//     { name: 'Reviews', path: '/user-panel/Review', icon: InboxIcon, onClick: () => setActiveForm('Review') },
//     { name: 'Offer / Discounts / Events', path: '/user-panel/offer-discounts-events', icon: GiftIcon, onClick: () => setActiveForm('offer-discounts-events') },
//   ];

//   const handleLogout = () => {
//     document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
//     localStorage.clear();
//     router.push('/auth');
//   };
  

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar
//         menuItems={menuItems}
//         onLogout={handleLogout}
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />

//       {/* Main Content Area */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         {/* {activeForm === 'multi-step' && <UserFormPage />} */}
//         {/* {activeForm === 'edit-account' && <AccountFormPage />} */}
//         {activeForm === 'templates-manage' && <TemplatesPage />}

//         {/* Render Components based on the selected menu */}
//         {activeForm === 'customer-profile' && <AccountFormPage />}
//         {activeForm === 'company-profile' && <UserFormPage />}
//         {/* {activeForm === 'mini-website' && <MiniWebsitePage />}
//         {activeForm === 'nfc-cards' && <NFCCardsPage />}
//         {activeForm === 'pdf-visiting-card' && <PDFVisitingCardPage />}
//         {activeForm === 'one-page-business-profile' && <OnePageBusinessProfilePage />}
//         {activeForm === 'physical-visiting-card' && <PhysicalVisitingCardPage />}
//         {activeForm === 'business-essentials' && <BusinessEssentialsPage />} */}
//           {activeForm === 'mini-website' &&
//           (userDetailsExist ? (
//             <MiniWebsitePage />
//           ) : (
//             <div className="text-center text-red-500">
//               Please complete your Company profile to access this page.
//             </div>
//           ))}
//         {activeForm === 'nfc-cards' &&
//           (userDetailsExist ? (
//             <NFCCardsPage />
//           ) : (
//             <div className="text-center text-red-500">
//               Please complete your Company profile to access this page.
//             </div>
//           ))}
//         {activeForm === 'pdf-visiting-card' &&
//           (userDetailsExist ? (
//             <PDFVisitingCardPage />
//           ) : (
//             <div className="text-center text-red-500">
//               Please complete your Company profile to access this page.
//             </div>
//           ))}
//         {activeForm === 'one-page-business-profile' &&
//           (userDetailsExist ? (
//             <OnePageBusinessProfilePage />
//           ) : (
//             <div className="text-center text-red-500">
//               Please complete your Company profile to access this page.
//             </div>
//           ))}
//         {activeForm === 'physical-visiting-card' &&
//           (userDetailsExist ? (
//             <PhysicalVisitingCardPage />
//           ) : (
//             <div className="text-center text-red-500">
//               Please complete your Company profile to access this page.
//             </div>
//           ))}
//         {activeForm === 'business-essentials' &&
//           (userDetailsExist ? (
//             <BusinessEssentialsPage />
//           ) : (
//             <div className="text-center text-red-500">
//               Please complete your Company profile to access this page.
//             </div>
//           ))}
//         {activeForm === 'card-purchases' && <CardPurchases />}
//         {activeForm === 'purchase-history' && <PurchaseHistoryPage />}
//         {/* {activeForm === 'product-catalogue' && <ProductCataloguePage />} */}
//         {activeForm === 'product-catalogue' &&
//           (userDetailsExist ? (
//             <ProductCataloguePage />
//           ) : (
//             <div className="text-center text-red-500">
//               Please complete your Company profile to access this page.
//             </div>
//           ))}
//         {/* {activeForm === 'product-sales-management' && <ProductSalesManagementPage />} */}
//         {/* {activeForm === 'payment-management' && <PaymentManagementPage />} */}
//         {activeForm === 'sold-products' && <SoldProducts />}
//         {activeForm === 'contact-developer' && <ContactDeveloperPage />}
//         {activeForm === 'feedback' && <FeedbackPage />}
//         {activeForm === 'contact-management' && <ContactManagementPage />}
//         {/* {activeForm === 'card-analytics' && <CardAnalyticsPage />} */}
//         {/* {activeForm === 'capture-leads' && <CaptureLeadsPage />} */}
//         {activeForm === 'crm' && <CRMPage />}
//         {/* {activeForm === 'paper-business-cards-scan' && <PaperBusinessCardsScanPage />} */}
//         {activeForm === 'enquires' && <EnquiriesPage />}
//         {activeForm === 'Review' && <ReviewPage />}
//         {activeForm === 'offer-discounts-events' && <OfferDiscountsEventsPage />}
//         {activeForm === 'offer-discounts-events' &&
//           (userDetailsExist ? (
//             <OfferDiscountsEventsPage />
//           ) : (
//             <div className="text-center text-red-500">
//               Please complete your Company profile to access this page.
//             </div>
//           ))}
//         {activeForm === '' && <AccountFormPage />} {/* Default to Dashboard if no activeForm is set */}

//       </div>
//     </div>
//   );
// };

// export default UserPanel;
