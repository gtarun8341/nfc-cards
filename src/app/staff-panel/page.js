// "use client"; // Next.js Client Component
// import { useRouter } from 'next/navigation'; 
// import { useState } from 'react';
// import { UserIcon, CogIcon, AdjustmentsHorizontalIcon, DocumentArrowUpIcon,   ChartBarIcon,  InboxIcon,  PencilSquareIcon,  UserGroupIcon,  WrenchIcon} from '@heroicons/react/24/outline';
// import Sidebar from '../components/Sidebar'; // Import Sidebar component
// import Dashboard from './Dashboard/page'; // Dashboard component
// import MiniWebsite from './ManageListing/MiniWebsite/page'; // Mini Website component
// import NFCCards from './ManageListing/NFCCards/page'; // NFC Cards component
// import PDFVisitingCard from './ManageListing/PDFVisitingCard/page'; // PDF Visiting Card component
// import OnePageBusinessProfile from './ManageListing/OnePageBusinessProfile/page'; // One Page Business Profile component
// import PhysicalVisitingCard from './ManageListing/PhysicalVisitingCard/page'; // Physical Visiting Card component
// import GenerateQRCode from './GenerateQRCode/page'; // Generate QR Code component
// import GenerateLink from './GenerateLink/page'; // Generate Link component
// import CustomerProfileManagement from './CustomerProfileManagement/page'; // Customer Profile Management component
// import CustomerCompanyManagement from './CustomerCompanyManagement/page'; // Customer Company Management component
// import CustomerManagement from './CustomerManagement/page'; // Customer Management component
// import ProductsCategories from './ProductsCategories/page'; // Products & Categories component
// import ContactDeveloper from './ContactDeveloper/page'; // Contact Developer component
// import BlogsTestimonials from './BlogsTestimonials/page'; // Blogs & Testimonials component
// import ContactUs from './ContactUs/page'; // Contact Us component
// import AdminProductsPage from './AdminProducts/page';
// import AdminPlansPage from './AdminPlansPage/page';
// import AllCardPurchases from './All-Card-Purchases/page';
// import ContactManagement from './contact-management/page';
// import AdminTestimonialsPage from './AdminTestimonialsPage/page';
// const AdminPanel = () => {
//   const [activeForm, setActiveForm] = useState('dashboard');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle
//   const router = useRouter();

//   const menuItems = [
//     { name: 'Dashboard', path: 'dashboard', icon: UserIcon, onClick: () => setActiveForm('dashboard') },
//     { 
//       name: 'Manage Listing', 
//       icon: CogIcon, 
//       submenu: [
//         { name: 'Mini Website', icon: UserIcon, onClick: () => setActiveForm('mini-website') },
//         { name: 'NFC Cards', icon: UserIcon, onClick: () => setActiveForm('nfc-cards') },
//         { name: 'PDF Visiting Card', icon: UserIcon, onClick: () => setActiveForm('pdf-visiting-card') },
//         { name: 'One Page Business Profile', icon: UserIcon, onClick: () => setActiveForm('one-page-business-profile') },
//         { name: 'Physical Visiting Card', icon: UserIcon, onClick: () => setActiveForm('physical-visiting-card') },
//         // { name: 'Business Essentials', icon: UserIcon, onClick: () => setActiveForm('business-essentials') },
//         // { name: 'Additional Services', icon: UserIcon, onClick: () => setActiveForm('additional-services') },
//       ]
//     },  
//     { name: 'All Card Purchases', path: 'All-Card-Purchases', icon: InboxIcon, onClick: () => setActiveForm('All-Card-Purchases') },
//     { name: 'Generate QR Code', path: 'generate-qr-code', icon: AdjustmentsHorizontalIcon, onClick: () => setActiveForm('generate-qr-code') },
//     { name: 'Generate Link for Customer', path: 'generate-link', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('generate-link') },
//     { name: 'Customer Profile Management', path: 'customer-profile-management', icon: UserIcon, onClick: () => setActiveForm('customer-profile-management') },
//     { name: 'Customer Company Management', path: 'customer-company-management', icon: CogIcon, onClick: () => setActiveForm('customer-company-management') },
//     { name: 'Customer Management', path: 'customer-management', icon: UserIcon, onClick: () => setActiveForm('customer-management') },
//     { name: 'Products & Categories', path: 'products-categories', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('products-categories') },
//     { name: 'Admin Products', path: 'admin-products', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('admin-products') }, 
//     { name: 'Contact Developer', path: 'contact-developer', icon: CogIcon, onClick: () => setActiveForm('contact-developer') },
//     { name: 'Testimonials', path: 'AdminTestimonialsPage', icon: UserIcon, onClick: () => setActiveForm('AdminTestimonialsPage') },
//         { name: 'User Contact Management', path: 'contact-management', icon: AdjustmentsHorizontalIcon, onClick: () => setActiveForm('contact-management') },
//     { name: 'Blogs, Testimonials', path: 'blogs-testimonials', icon: DocumentArrowUpIcon, onClick: () => setActiveForm('blogs-testimonials') },
//     { name: 'Contact Us', path: 'contact-us', icon: UserIcon, onClick: () => setActiveForm('contact-us') },
//   ];

//   const handleLogout = () => {
//     document.cookie = 'staffAuthToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
//     localStorage.clear();
//     router.push('/staff-auth');
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
//       {activeForm === 'dashboard' && <Dashboard />}
//       {activeForm === 'mini-website' && <MiniWebsite />}
//       {activeForm === 'nfc-cards' && <NFCCards />}
//       {activeForm === 'pdf-visiting-card' && <PDFVisitingCard />}
//       {activeForm === 'one-page-business-profile' && <OnePageBusinessProfile />}
//       {activeForm === 'physical-visiting-card' && <PhysicalVisitingCard />}
//       {activeForm === 'All-Card-Purchases' && <AllCardPurchases />}
//       {/* {activeForm === 'business-essentials' && <BusinessEssentials />} */}
//       {/* {activeForm === 'additional-services' && <AdditionalServices />} */}
//       {activeForm === 'generate-qr-code' && <GenerateQRCode />}
//       {activeForm === 'generate-link' && <GenerateLink />}
//       {activeForm === 'customer-profile-management' && <CustomerProfileManagement />}
//       {activeForm === 'customer-company-management' && <CustomerCompanyManagement />}
//       {activeForm === 'customer-management' && <CustomerManagement />}
//       {activeForm === 'products-categories' && <ProductsCategories />}
//       {activeForm === 'admin-products' && <AdminProductsPage />}
//       {activeForm === 'contact-developer' && <ContactDeveloper />}
//       {activeForm === 'AdminTestimonialsPage' && <AdminTestimonialsPage />}
//             {activeForm === 'contact-management' && <ContactManagement />}
//       {activeForm === 'blogs-testimonials' && <BlogsTestimonials />}
//       {activeForm === 'contact-us' && <ContactUs />}
      
//       {activeForm === '' && <Dashboard />} 
//     </div>
//   </div>
// );
// };

// export default AdminPanel;
