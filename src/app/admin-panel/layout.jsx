// app/admin-panel/layout.jsx
'use client';

import AdminPanelLayout from './AdminPanelLayout';

export default function AdminPanelRootLayout({ children }) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
