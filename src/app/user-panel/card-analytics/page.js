// CardAnalyticsPage.js
"use client"; // Next.js Client Component

import React from 'react';

const CardAnalyticsPage = () => {
  const analyticsData = {
    cardScans: 150,
    contactsShared: 120,
    contactsSaved: 90,
  };

  return (
    <div>
      <h1>Card Analytics</h1>
      <p>Card Scans: {analyticsData.cardScans}</p>
      <p>Contacts Shared: {analyticsData.contactsShared}</p>
      <p>Contacts Saved: {analyticsData.contactsSaved}</p>
    </div>
  );
};

export default CardAnalyticsPage;
