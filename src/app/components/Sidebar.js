'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Sidebar = ({ menuItems, onLogout, isSidebarOpen, setIsSidebarOpen }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`bg-gray-800 text-white flex flex-col justify-between p-4 transition-width duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      } h-screen`}
    >
      {/* Sidebar Toggle Button */}
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

      {/* Scrollable Menu Items */}
      <div
        className="space-y-4 flex-grow overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {menuItems.map((item, index) => (
          <div key={index}>
            <button
              className={`flex items-center w-full py-2 px-4 rounded-md hover:bg-gray-700 ${
                pathname === item.path ? 'bg-gray-700 font-semibold' : ''
              }`}
              onClick={() => {
                if (item.path) router.push(item.path);
                else if (item.submenu) toggleSubmenu(index);
              }}
            >
              <item.icon className="h-6 w-6" />
              {isSidebarOpen && <span className="ml-4">{item.name}</span>}
            </button>

            {/* Submenu */}
            {item.submenu && openSubmenu === index && (
              <div className="ml-8 space-y-2">
                {item.submenu.map((subItem, subIndex) => (
                  <button
                    key={subIndex}
                    className={`flex items-center w-full py-2 px-4 rounded-md hover:bg-gray-600 ${
                      pathname === subItem.path ? 'bg-gray-600 font-semibold' : ''
                    }`}
                    onClick={() => {
                      if (subItem.path) router.push(subItem.path);
                    }}
                  >
                    <subItem.icon className="h-5 w-5" />
                    {isSidebarOpen && <span className="ml-4">{subItem.name}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hide scrollbar for WebKit */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Logout Button */}
      <button
        className="flex items-center w-full py-2 px-4 rounded-md hover:bg-red-600"
        onClick={onLogout}
      >
        <ArrowRightOnRectangleIcon className="h-6 w-6" />
        {isSidebarOpen && <span className="ml-4">Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;
