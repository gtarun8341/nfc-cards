"use client"; // Next.js Client Component

import { useState } from 'react';
import { UserIcon, CogIcon, AdjustmentsHorizontalIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Dashboard from './Dashboard/page'; // Dashboard component
import UserManagement from './UserManagement/page'; // User Management component
import Settings from './Settings/page'; // Settings component

const AdminPanel = () => {
  const [activeForm, setActiveForm] = useState('dashboard');
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
        className={`bg-gray-800 text-white flex flex-col justify-between p-4 transition-width duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
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
            className={`flex items-center w-full py-2 px-4 rounded-md ${activeForm === 'dashboard' ? 'bg-green-500' : 'hover:bg-gray-700'}`}
            onClick={() => handleFormChange('dashboard')}
          >
            <UserIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-4">Dashboard</span>}
          </button>

          <button
            className={`flex items-center w-full py-2 px-4 rounded-md ${activeForm === 'user-management' ? 'bg-green-500' : 'hover:bg-gray-700'}`}
            onClick={() => handleFormChange('user-management')}
          >
            <CogIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-4">User Management</span>}
          </button>

          <button
            className={`flex items-center w-full py-2 px-4 rounded-md ${activeForm === 'settings' ? 'bg-green-500' : 'hover:bg-gray-700'}`}
            onClick={() => handleFormChange('settings')}
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-4">Settings</span>}
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
        {activeForm === 'dashboard' ? <Dashboard /> :
         activeForm === 'user-management' ? <UserManagement /> :
         <Settings />}
      </div>
    </div>
  );
};

export default AdminPanel;
