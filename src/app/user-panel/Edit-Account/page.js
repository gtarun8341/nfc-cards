"use client"; // Next.js Client Component


import MultiStepForm from '../../components/MultiStepForm'; // Assuming MultiStepForm is in the same folder
import PasswordChangePage from './PasswordChangePage/page'; // Import the PasswordChangePage component
import { useState } from 'react';

const AccountFormPage = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const steps = [
    {
      title: 'Edit Account Details',
      fields: [
        { name: 'name', type: 'text', label: 'Full Name', placeholder: 'Enter your name', required: true },
        { name: 'email', type: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true },
        { name: 'displayName', type: 'text', label: 'Display Name', placeholder: 'Enter your display name', required: true },
      ],
    },
    // Add other steps for Account Edit Form...
  ];

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
  };

  return (
    <div>
      {isChangingPassword ? (
        <PasswordChangePage onBack={() => setIsChangingPassword(false)} />
      ) : (
        <>
          <MultiStepForm steps={steps} formTitle="Edit Account Details" />
          <button
            onClick={handleChangePasswordClick}
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md"
          >
            Change Password
          </button>
        </>
      )}
    </div>
  );
};

export default AccountFormPage;
