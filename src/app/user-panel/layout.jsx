// app/user-panel/layout.jsx
'use client';

import UserPanelLayout from './UserPanelLayout';

export default function UserPanelRootLayout({ children }) {
  return <UserPanelLayout>{children}</UserPanelLayout>;
}
