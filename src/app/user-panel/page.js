"use client"; // Next.js Client Component

import { useState } from 'react';
import { UserIcon, CogIcon, ShoppingCartIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import UserFormPage from './User-Form/page';
import AccountFormPage from './Edit-Account/page';
import DigitalProductsPage from './Digital-Products/page'; // Make sure to import your new component

const UserPanel = () => {
  const [activeForm, setActiveForm] = useState('multi-step');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle

  const handleFormChange = (form) => {
    setActiveForm(form);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex flex-col justify-between p-4 transition-width duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Sidebar Toggle Button at the Top */}
        <button
          className="flex items-center justify-center mb-4 hover:bg-gray-700 rounded-md"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <ChevronDoubleLeftIcon className="h-6 w-6" />
          ) : (
            <ChevronDoubleRightIcon className="h-6 w-6" />
          )}
        </button>

        <div className="space-y-4 flex-grow">
          <button
            className={`flex items-center w-full py-2 px-4 rounded-md ${
              activeForm === 'multi-step' ? 'bg-green-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleFormChange('multi-step')}
          >
            <UserIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-4">Multi-Step Form</span>}
          </button>

          <button
            className={`flex items-center w-full py-2 px-4 rounded-md ${
              activeForm === 'edit-account' ? 'bg-green-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleFormChange('edit-account')}
          >
            <CogIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-4">Edit Account</span>}
          </button>

          {/* New Digital Products Tab */}
          <button
            className={`flex items-center w-full py-2 px-4 rounded-md ${
              activeForm === 'digital-products' ? 'bg-green-500' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleFormChange('digital-products')}
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-4">Digital Products</span>}
          </button>
        </div>

        {/* Logout Button at the Bottom */}
        <button
          className="flex items-center w-full py-2 px-4 rounded-md hover:bg-red-600"
          onClick={handleLogout}
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
          {isSidebarOpen && <span className="ml-4">Logout</span>}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeForm === 'multi-step' ? <UserFormPage /> : 
         activeForm === 'edit-account' ? <AccountFormPage /> : 
         <DigitalProductsPage />}
      </div>
    </div>
  );
};

export default UserPanel;
