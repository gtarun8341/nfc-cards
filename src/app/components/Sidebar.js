import { useState } from 'react';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Sidebar = ({ menuItems, onLogout, isSidebarOpen, setIsSidebarOpen }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null); // State to track the currently open submenu

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index); // Toggle submenu open/close
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

      {/* Menu Items - make this area scrollable without showing scrollbar */}
      <div
        className="space-y-4 flex-grow overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {menuItems.map((item, index) => (
          <div key={index}>
            <button
              className="flex items-center w-full py-2 px-4 rounded-md hover:bg-gray-700"
              onClick={item.submenu ? () => toggleSubmenu(index) : item.onClick}
            >
              <item.icon className="h-6 w-6" />
              {isSidebarOpen && <span className="ml-4">{item.name}</span>}
            </button>
            {/* Render Submenu if the item has one and is currently open */}
            {item.submenu && openSubmenu === index && (
              <div className="ml-8 space-y-2">
                {item.submenu.map((subItem, subIndex) => (
                  <button
                    key={subIndex}
                    className="flex items-center w-full py-2 px-4 rounded-md hover:bg-gray-600"
                    onClick={subItem.onClick}
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

      {/* Hide the scrollbar for Webkit browsers */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Logout Button at the Bottom */}
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
