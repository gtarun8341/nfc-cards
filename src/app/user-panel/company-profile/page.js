"use client";
import { useState } from 'react';

const CompanyProfilePage = () => {
  const [companyData, setCompanyData] = useState({
    companyName: 'Tech Corp',
    industry: 'Software Development',
    address: '123 Tech Lane',
  });

  const handleUpdateCompany = () => {
    // Logic to update company profile
    alert('Company profile updated');
  };

  return (
    <div>
      <h1>Company Profile</h1>
      <div>
        <p>Company: {companyData.companyName}</p>
        <p>Industry: {companyData.industry}</p>
        <p>Address: {companyData.address}</p>
        <button onClick={handleUpdateCompany}>Update Company Profile</button>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
