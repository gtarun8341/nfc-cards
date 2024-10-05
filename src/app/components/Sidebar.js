// src/app/components/Sidebar.jsx

import Link from 'next/link';

const Sidebar = () => {
  return (
    <div style={sidebarStyles}>
      <h2>User Panel</h2>
      <ul>
        <li>
          <Link href="/user-panel/multi-step-form">Multi-Step Form</Link>
        </li>
        <li>
          <Link href="/user-panel/edit-account">Edit Account</Link>
        </li>
        <li>
          <Link href="/user-panel/digital-products">Digital Products</Link>
        </li>
        <li>
          <Link href="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

const sidebarStyles = {
  width: '250px',
  padding: '20px',
  background: '#f4f4f4',
  borderRight: '1px solid #ccc',
};

export default Sidebar;
