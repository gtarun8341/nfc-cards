import MultiStepForm from '../../../components/MultiStepForm'; // Assuming MultiStepForm is in the same folder
import { useState } from 'react';

const PasswordChangePage = ({ onBack }) => {
  const steps = [
    {
      title: 'Change Password',
      fields: [
        { name: 'currentPassword', type: 'password', label: 'Current Password', placeholder: 'Enter your current password', required: true },
        { name: 'newPassword', type: 'password', label: 'New Password', placeholder: 'Enter a new password', required: true },
        { name: 'confirmNewPassword', type: 'password', label: 'Confirm New Password', placeholder: 'Confirm your new password', required: true },
      ],
    },
  ];

  const handleSubmit = (formData) => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    // Implement your password change logic here
    console.log('Changing password...', formData);

    // Reset form fields if needed
  };

  return (
    <div>
      <MultiStepForm 
        steps={steps} 
        formTitle="Change Password" 
        onSubmit={handleSubmit}
        onBack={onBack} 
      />
    </div>
  );
};

export default PasswordChangePage;
