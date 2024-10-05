import MultiStepForm from '../../components/MultiStepForm'; // Assuming MultiStepForm is in the same folder

const UserFormPage = () => {
    const steps = [
        {
          title: 'Company Details',
          fields: [
            { name: 'companyName', type: 'text', label: 'Company Name', placeholder: 'Enter your company name', required: true },
            { name: 'name', type: 'text', label: 'Name', placeholder: 'Enter your name', required: true },
            { name: 'designation', type: 'text', label: 'Designation', placeholder: 'Enter your designation', required: true },
            { name: 'contact1', type: 'text', label: 'Contact Number 1', placeholder: 'Enter contact number', required: true },
            { name: 'contact2', type: 'text', label: 'Contact Number 2', placeholder: 'Enter contact number', required: false },
            { name: 'whatsapp1', type: 'text', label: 'WhatsApp Number 1', placeholder: 'Enter WhatsApp number', required: true },
            { name: 'whatsapp2', type: 'text', label: 'WhatsApp Number 2', placeholder: 'Enter WhatsApp number', required: false },
            { name: 'website', type: 'url', label: 'Website URL', placeholder: 'Enter your website URL', required: false },
            { name: 'googleMap', type: 'url', label: 'Google Map Link', placeholder: 'Enter Google Map link', required: false },
            { name: 'address', type: 'text', label: 'Address', placeholder: 'Enter your address', required: true },
            { name: 'logo', type: 'file', label: 'Logo Image', accept: 'image/*', required: true },
          ],
        },
        {
          title: 'Social Media Links',
          fields: [
            { name: 'facebook', type: 'url', label: 'Facebook Profile Link', placeholder: 'Enter Facebook link', required: false },
            { name: 'instagram', type: 'url', label: 'Instagram Profile Link', placeholder: 'Enter Instagram link', required: false },
            { name: 'linkedin', type: 'url', label: 'LinkedIn Profile Link', placeholder: 'Enter LinkedIn link', required: false },
            { name: 'twitter', type: 'url', label: 'Twitter Profile Link', placeholder: 'Enter Twitter link', required: false },
            { name: 'youtube', type: 'url', label: 'YouTube Channel Link', placeholder: 'Enter YouTube link', required: false },
            { name: 'googleBusiness', type: 'url', label: 'Google Business Link', placeholder: 'Enter Google Business link', required: false },
            { name: 'other', type: 'url', label: 'Other Profile Link', placeholder: 'Enter other profile link', required: false },
            { name: 'video', type: 'file', label: 'Upload Video', accept: 'video/*', required: false },
          ],
        },
        {
          title: 'About Company',
          fields: [
            { name: 'establishedYear', type: 'text', label: 'Established Year', placeholder: 'Enter the established year', required: true },
            { name: 'natureOfBusiness', type: 'text', label: 'Nature of Business', placeholder: 'Describe your business', required: true },
            { name: 'gstNumber', type: 'text', label: 'GST Number', placeholder: 'Enter your GST number', required: true },
            { name: 'aboutCompany', type: 'textarea', label: 'About Company', placeholder: 'About your company', required: true },
            { name: 'documents', type: 'file', label: 'Upload Documents (max 10)', accept: 'application/pdf', required: false, multiple: true },
          ],
        },
        {
          title: 'Bank Details',
          fields: [
            { name: 'bankName', type: 'text', label: 'Bank Name', placeholder: 'Enter your bank name', required: true },
            { name: 'accountNumber', type: 'text', label: 'Account Number', placeholder: 'Enter your account number', required: true },
            { name: 'branchName', type: 'text', label: 'Branch Name', placeholder: 'Enter branch name', required: true },
            { name: 'ifscCode', type: 'text', label: 'IFSC Code', placeholder: 'Enter IFSC code', required: true },
            { name: 'accountHolderName', type: 'text', label: 'Account Holder Name', placeholder: 'Enter account holder name', required: true },
            { name: 'gPayNumber', type: 'text', label: 'GPay Number', placeholder: 'Enter GPay number', required: false },
            { name: 'paytmNumber', type: 'text', label: 'Paytm Number', placeholder: 'Enter Paytm number', required: false },
            { name: 'phonePeNumber', type: 'text', label: 'PhonePe Number', placeholder: 'Enter PhonePe number', required: false },
            { name: 'upiId', type: 'text', label: 'UPI ID', placeholder: 'Enter UPI ID', required: false },
            { name: 'accountType', type: 'dropdown', label: 'Account Type', options: [{ value: 'savings', label: 'Savings' }, { value: 'current', label: 'Current' }], required: true },
            { name: 'qrImages', type: 'file', label: 'Upload QR Images (up to 4)', accept: 'image/*', required: false, multiple: true },
          ],
        },
        {
          title: 'Products/Services',
          fields: [
            { name: 'productName', type: 'text', label: 'Product/Service Name', placeholder: 'Enter product/service name', required: true },
            { name: 'productPrice', type: 'number', label: 'Product/Service Price', placeholder: 'Enter price', required: true },
            { name: 'productImage', type: 'file', label: 'Product/Service Image', accept: 'image/*', required: true },
            {
              name: 'productType',
              type: 'radio',
              label: 'Type',
              options: [
                { value: 'product', label: 'Product' },
                { value: 'service', label: 'Service' },
              ],
              required: true,
            },
          ],
        },
        {
          title: 'Gallery',
          fields: [
            { name: 'galleryImages', type: 'file', label: 'Upload Images (up to 10)', accept: 'image/*', required: false, multiple: true },
          ],
        },
      ];

  return (
    <div>
      <MultiStepForm steps={steps} formTitle="User Registration Form" />
    </div>
  );
};

export default UserFormPage;
