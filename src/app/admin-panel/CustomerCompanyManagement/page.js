"use client"; // Next.js Client Component
import Image from 'next/image';
import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig';

const CustomerCompanyManagementPage = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all company details when the component is mounted
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('adminAuthToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await api.get('/api/user-details/admin/users', config); // Fetch user details for admin
        setCompanies(response.data);
        setFilteredCompanies(response.data); // Initialize filteredCompanies with all companies
      } catch (err) {
        setError('Error fetching companies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filtered = companies.filter((company) => {
      return (
        company.companyName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        company.contact1.includes(event.target.value) ||
        company.email.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    setFilteredCompanies(filtered);
    setSelectedCompany(null); // Reset selected company when a search is performed
  };

  const handleViewClick = (company) => {
    setSelectedCompany(company);
  };

  const handleCloseClick = () => {
    setSelectedCompany(null); // Close the selected company details
  };

  return (
    <div className="max-w-full mx-auto p-5 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-5">Customer Company Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by Company Name, Contact Number, or Email"
            className="w-full mb-5 p-2 border rounded"
          />

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Company Name</th>
                  <th className="py-2 px-4 border">Contact 1</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr key={company._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border">{company.companyName}</td>
                    <td className="py-2 px-4 border">{company.contact1}</td>
                    <td className="py-2 px-4 border">{company.email}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleViewClick(company)}
                        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Display selected company details */}
          {selectedCompany && (
            <div className="mt-10 p-5 border rounded shadow-lg bg-gray-50">
              <div className="flex justify-between mb-5">
                <h3 className="text-xl font-semibold">Company Details</h3>
                <button
                  onClick={handleCloseClick}
                  className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <strong>Company Name:</strong> {selectedCompany.companyName}
                </div>
                <div>
                  <strong>Contact 1:</strong> {selectedCompany.contact1}
                </div>
                <div>
                  <strong>Contact 2:</strong> {selectedCompany.contact2}
                </div>
                <div>
                  <strong>WhatsApp 1:</strong> {selectedCompany.whatsapp1}
                </div>
                <div>
                  <strong>WhatsApp 2:</strong> {selectedCompany.whatsapp2}
                </div>
                <div>
                  <strong>Email:</strong> {selectedCompany.email}
                </div>
                <div>
                  <strong>Website:</strong> {selectedCompany.website}
                </div>
                <div>
                  <strong>Google Map Link:</strong> {selectedCompany.googleMap}
                </div>
                <div>
                  <strong>Address:</strong> {selectedCompany.address}
                </div>
                <div>
                  <strong>Logo:</strong>
                  <Image
                    src={`${api.defaults.baseURL}/uploads/userDetails/${selectedCompany.userId}/${selectedCompany.logo}`}
                    alt="Company Logo"
                    width={150}
                    height={150}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h4 className="text-lg font-semibold">About Company:</h4>
                <div>Established Year: {selectedCompany.aboutCompany.establishedYear}</div>
                <div>Nature of Business: {selectedCompany.aboutCompany.natureOfBusiness}</div>
                <div>GST Number: {selectedCompany.aboutCompany.gstNumber}</div>
              </div>

              <div className="mt-8 space-y-4">
                <h4 className="text-lg font-semibold">Bank Details:</h4>
                <div>Bank Name: {selectedCompany.bankDetails.bankName}</div>
                <div>Account Number: {selectedCompany.bankDetails.accountNumber}</div>
                <div>IFSC Code: {selectedCompany.bankDetails.ifscCode}</div>
                <div>Account Holder: {selectedCompany.bankDetails.accountHolderName}</div>
              </div>

              <div className="mt-8 space-y-4">
                <h4 className="text-lg font-semibold">Products:</h4>
                {selectedCompany.products.map((product, index) => (
                  <div key={index}>
                    <div>Product Name: {product.productName}</div>
                    <div>Price: {product.productPrice}</div>
                    <div>Type: {product.productType}</div>
                    <div>HsnCode: {product.hsnCode}</div>
                    <div>GST: {product.gst}</div>
                    <div>Image:  <Image
                      key={index}
                      src={`${api.defaults.baseURL}/uploads/userDetails/${selectedCompany.userId}/${product.productImages}`}
                      alt={`Gallery Image ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-cover"
                    /></div>
                    <div>Discount: {product.discount || 'N/A'}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <h4 className="text-lg font-semibold">Gallery:</h4>
                <div className="flex space-x-4">
                  {selectedCompany.galleryImages.map((image, index) => (
                    <Image
                      key={index}
                      src={`${api.defaults.baseURL}/uploads/userDetails/${selectedCompany.userId}/${image}`}
                      alt={`Gallery Image ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerCompanyManagementPage;
