"use client"; // Next.js Client Component
import Image from 'next/image';

import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig';

const CustomerCompanyManagementPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all company details when the component is mounted
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get('/api/user-details/admin/users'); // Fetch all user details for admin
        console.log(response.data)
        setCompanies(response.data);  // Store user details in state
      } catch (err) {
        setError('Error fetching companies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);
console.log(`${api.defaults.baseURL}`)
  return (
    <div className="max-w-full mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Customer Company Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Company Name</th>
                <th className="py-2 px-4 border">Contact 1</th>
                <th className="py-2 px-4 border">Contact 2</th>
                <th className="py-2 px-4 border">WhatsApp 1</th>
                <th className="py-2 px-4 border">WhatsApp 2</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Website</th>
                <th className="py-2 px-4 border">Google Map Link</th>
                <th className="py-2 px-4 border">Address</th>
                <th className="py-2 px-4 border">Logo</th>
                <th className="py-2 px-4 border">About Company</th>
                <th className="py-2 px-4 border">Bank Details</th>
                <th className="py-2 px-4 border">Products</th>
                <th className="py-2 px-4 border">Gallery</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{company.companyName}</td>
                  <td className="py-2 px-4 border">{company.contact1}</td>
                  <td className="py-2 px-4 border">{company.contact2}</td>
                  <td className="py-2 px-4 border">{company.whatsapp1}</td>
                  <td className="py-2 px-4 border">{company.whatsapp2}</td>
                  <td className="py-2 px-4 border">{company.email}</td>
                  <td className="py-2 px-4 border">{company.website}</td>
                  <td className="py-2 px-4 border">{company.googleMap}</td>
                  <td className="py-2 px-4 border">{company.address}</td>
                  <td className="py-2 px-4 border">
                    <Image src={`${api.defaults.baseURL}/uploads/userDetails/${company.userId}/${company.logo}`} alt="Company Logo" className="w-16 h-16 object-cover"                   width={500} // Set a reasonable default width
                  height={500}
                  layout="intrinsic"/>
                  </td>
                  <td className="py-2 px-4 border">
                    <div><strong>Established Year:</strong> {company.aboutCompany.establishedYear}</div>
                    <div><strong>Nature of Business:</strong> {company.aboutCompany.natureOfBusiness}</div>
                    <div><strong>GST Number:</strong> {company.aboutCompany.gstNumber}</div>
                  </td>
                  <td className="py-2 px-4 border">
                    <div><strong>Bank Name:</strong> {company.bankDetails.bankName}</div>
                    <div><strong>Account Number:</strong> {company.bankDetails.accountNumber}</div>
                    <div><strong>IFSC Code:</strong> {company.bankDetails.ifscCode}</div>
                    <div><strong>Account Holder:</strong> {company.bankDetails.accountHolderName}</div>
                  </td>
                  <td className="py-2 px-4 border">
                    {company.products.map((product, index) => (
                      <div key={index}>
                        <div><strong>Product Name:</strong> {product.productName}</div>
                        <div><strong>Price:</strong> {product.productPrice}</div>
                        <div><strong>Type:</strong> {product.productType}</div>
                        <div><strong>Discount:</strong> {product.discount || 'N/A'}</div>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border">
                    {company.galleryImages.map((image, index) => (
                      <Image key={index} src={`${api.defaults.baseURL}/uploads/userDetails/${company.userId}/${image}`} alt={`Gallery Image ${index + 1}`} className="w-16 h-16 object-cover mb-2"                   width={500} // Set a reasonable default width
                      height={500}
                      layout="intrinsic"/>
                    ))}
                  </td>
                  <td className="py-2 px-4 border">
                    {/* You can add edit, delete buttons here */}
                    <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerCompanyManagementPage;
