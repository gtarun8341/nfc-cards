// CaptureLeadsPage.js
import React from 'react';

const CaptureLeadsPage = () => {
  // Sample leads data
  const leads = [
    { name: 'Client A', email: 'clientA@example.com', mobile: '1234567890' },
    { name: 'Client B', email: 'clientB@example.com', mobile: '0987654321' },
  ];

  return (
    <div>
      <h1>Capture Leads</h1>
      <ul>
        {leads.map((lead, index) => (
          <li key={index}>
            {lead.name} - {lead.email} - {lead.mobile}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaptureLeadsPage;
