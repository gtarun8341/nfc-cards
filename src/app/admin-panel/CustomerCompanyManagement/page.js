"use client"; // Next.js Client Component
import Image from 'next/image';
import { useState, useEffect } from 'react';
import api from '../../apiConfig/axiosConfig';
import { jsPDF } from "jspdf";

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
        console.log(response.data);
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
      const user = company.user || {};
      return (
        user.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.phone.includes(event.target.value) ||
        user.email.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    setFilteredCompanies(filtered);
    setSelectedCompany(null); // Reset selected company when a search is performed
  };

  const handleViewClick = (company) => {
    setSelectedCompany(company);
  };

  const handleDownloadPDF = (selectedCompany) => {
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(16);
    doc.text("Company Details Of User", 10, 10);
  
    let yPosition = 20;
  
    // Add User Information
    doc.setFontSize(14);
    doc.text("User Information:", 10, yPosition);
    yPosition += 10;
  
    const user = selectedCompany.user || {};
    const userDetails = [
      ["Name", user.name || "N/A"],
      ["Phone", user.phone || "N/A"],
      ["Email", user.email || "N/A"],
    ];
  
    userDetails.forEach(([key, value]) => {
      doc.setFontSize(12);
      doc.text(`${key}:`, 10, yPosition);
      doc.text(`${value}`, 60, yPosition);
      yPosition += 10;
  
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    });
  
    // Company Details Section
    doc.setFontSize(14);
    doc.text("Company Details:", 10, yPosition);
    yPosition += 10;
  
    // Company Details
    const companyDetails = [
      ["Name", selectedCompany.name || "N/A"],
      ["Designation", selectedCompany.designation || "N/A"],
      ["Company Name", selectedCompany.companyName || "N/A"],
      ["Contact 1", selectedCompany.contact1 || "N/A"],
      ["Contact 2", selectedCompany.contact2 || "N/A"],
      ["WhatsApp 1", selectedCompany.whatsapp1 || "N/A"],
      ["WhatsApp 2", selectedCompany.whatsapp2 || "N/A"],
      ["Email", selectedCompany.email || "N/A"],
      ["Website", selectedCompany.website || "N/A"],
      ["Google Map Link", selectedCompany.googleMap || "N/A"],
      ["Address", selectedCompany.address || "N/A"],
    ];
  
    companyDetails.forEach(([key, value]) => {
      doc.setFontSize(12);
      doc.text(`${key}:`, 10, yPosition);
      doc.text(`${value}`, 60, yPosition);
      yPosition += 10;
  
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    });
  
    if (selectedCompany.logo) {
      const logoUrl = `${api.defaults.baseURL}/uploads/userDetails/${selectedCompany.userId}/${selectedCompany.logo}`;
      doc.addImage(logoUrl, "JPEG", 10, yPosition, 50, 50);
      yPosition += 60;
    }
  
    // About Company
    doc.setFontSize(14);
    doc.text("About Company:", 10, yPosition);
    yPosition += 10;
  
    const aboutCompany = [
      ["Established Year", selectedCompany.aboutCompany?.establishedYear || "N/A"],
      ["Nature of Business", selectedCompany.aboutCompany?.natureOfBusiness || "N/A"],
      ["GST Number", selectedCompany.aboutCompany?.gstNumber || "N/A"],
      ["Description", selectedCompany.aboutCompany?.description || "N/A"],
    ];
  
    aboutCompany.forEach(([key, value]) => {
      doc.setFontSize(12);
      doc.text(`${key}:`, 10, yPosition);
      doc.text(`${value}`, 60, yPosition);
      yPosition += 10;
  
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    });
  
    // if (selectedCompany.aboutCompany?.documents?.length > 0) {
    //   doc.text("Documents:", 10, yPosition);
    //   yPosition += 10;
    //   selectedCompany.aboutCompany.documents.forEach((docLink, index) => {
    //     doc.text(`Document ${index + 1}:`, 10, yPosition);
    //     doc.text(`${api.defaults.baseURL}/uploads/userDetails/${selectedCompany.userId}/${docLink}`, 60, yPosition);
    //     yPosition += 10;
  
    //     if (yPosition > 250) {
    //       doc.addPage();
    //       yPosition = 20;
    //     }
    //   });
    // }
  
    // Bank Details
    doc.setFontSize(14);
    doc.text("Bank Details:", 10, yPosition);
    yPosition += 10;
  
    const bankDetails = [
      ["Bank Name", selectedCompany.bankDetails?.bankName || "N/A"],
      ["Account Number", selectedCompany.bankDetails?.accountNumber || "N/A"],
      ["IFSC Code", selectedCompany.bankDetails?.ifscCode || "N/A"],
      ["Branch Name", selectedCompany.bankDetails?.branchName || "N/A"],
      ["Account Holder Name", selectedCompany.bankDetails?.accountHolderName || "N/A"],
      ["GPay Number", selectedCompany.bankDetails?.gPayNumber || "N/A"],
      ["Paytm Number", selectedCompany.bankDetails?.paytmNumber || "N/A"],
      ["PhonePe Number", selectedCompany.bankDetails?.phonePeNumber || "N/A"],
      ["UPI ID", selectedCompany.bankDetails?.upiId || "N/A"],
      ["Account Type", selectedCompany.bankDetails?.accountType || "N/A"],
    ];
  
    bankDetails.forEach(([key, value]) => {
      doc.setFontSize(12);
      doc.text(`${key}:`, 10, yPosition);
      doc.text(`${value}`, 60, yPosition);
      yPosition += 10;
  
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    });
  
    if (selectedCompany.bankDetails?.qrImages?.length > 0) {
      doc.text("QR Images:", 10, yPosition);
      yPosition += 10;
      selectedCompany.bankDetails.qrImages.forEach((image, index) => {
        const qrImageUrl = `${api.defaults.baseURL}/uploads/userDetails/${selectedCompany.userId}/${image}`;
        doc.addImage(qrImageUrl, "JPEG", 10, yPosition, 50, 50);
        yPosition += 60;
  
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
      });
    }
  
 // Products Section
 doc.setFontSize(14);
 doc.text("Products:", 10, yPosition);
 yPosition += 10;

 if (selectedCompany.products && selectedCompany.products.length > 0) {
   selectedCompany.products.forEach((product, index) => {
     doc.setFontSize(12);
     doc.text(`Product ${index + 1}:`, 10, yPosition);
     yPosition += 10;
     doc.text(`Name: ${product.productName || "N/A"}`, 10, yPosition);
     yPosition += 8;
     doc.text(`Price: ${product.productPrice || "N/A"}`, 10, yPosition);
     yPosition += 8;
     doc.text(`Type: ${product.productType || "N/A"}`, 10, yPosition);
     yPosition += 8;
     doc.text(`HSN Code: ${product.hsnCode || "N/A"}`, 10, yPosition);
     yPosition += 8;
     doc.text(`GST: ${product.gst || "N/A"}`, 10, yPosition);
     yPosition += 8;
     doc.text(`Discount: ${product.discount || "N/A"}`, 10, yPosition);
     yPosition += 8;

     // Add product image
     if (product.productImages) {
       const productImageUrl = `${api.defaults.baseURL}/uploads/userDetails/${selectedCompany.userId}/${product.productImages}`;
       doc.addImage(productImageUrl, "JPEG", 10, yPosition, 50, 50);
       yPosition += 60;  // Space for the image
     }

     // Add page if content exceeds page height
     if (yPosition > 250) {
       doc.addPage();
       yPosition = 20;
     }
   });
 } else {
   doc.text("No products available", 10, yPosition);
   yPosition += 10;
 }

 // Gallery Section
 doc.setFontSize(14);
 doc.text("Gallery:", 10, yPosition);
 yPosition += 10;

 if (selectedCompany.galleryImages && selectedCompany.galleryImages.length > 0) {
   selectedCompany.galleryImages.forEach((image, index) => {
     const imageUrl = `${api.defaults.baseURL}/uploads/userDetails/${selectedCompany.userId}/${image}`;
     doc.addImage(imageUrl, "JPEG", 10, yPosition, 50, 50);
     yPosition += 60; // Space for the image

     // Add page if content exceeds page height
     if (yPosition > 250) {
       doc.addPage();
       yPosition = 20;
     }
   });
 } else {
   doc.text("No gallery images available", 10, yPosition);
   yPosition += 10;
 }
 
    // Save PDF
    doc.save(`${selectedCompany.companyName || "company"}_details.pdf`);
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
            placeholder="Search by Name, Phone, or Email"
            className="w-full mb-5 p-2 border rounded"
          />

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Phone</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => {
                  const user = company.user || {}; // Get the user data
                  return (
                    <tr key={company._id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border">{user.name || 'N/A'}</td>
                      <td className="py-2 px-4 border">{user.phone || 'N/A'}</td>
                      <td className="py-2 px-4 border">{user.email || 'N/A'}</td>
                      <td className="py-2 px-4 border flex gap-2">
                        <button
                          onClick={() => handleViewClick(company)}
                          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(company)}
                          className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
                  <strong>Name:</strong> {selectedCompany.name}
                </div>
                <div>
                  <strong>Designation:</strong> {selectedCompany.designation}
                </div>
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
                <div>description: {selectedCompany.aboutCompany.description}</div>
                {selectedCompany.aboutCompany.documents?.length > 0 && (
    <div className="mt-4">
      <h5 className="text-md font-semibold">Documents:</h5>
      <div className="flex flex-wrap gap-4">
        {selectedCompany.aboutCompany.documents.map((doc, index) => (
          <a
            key={index}
            href={`${api.defaults.baseURL}/uploads/userDetails/${selectedCompany.userId}/${doc}`}
            download
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Download Document {index + 1}
          </a>
        ))}
      </div>
    </div>
  )}
              </div>

              <div className="mt-8 space-y-4">
                <h4 className="text-lg font-semibold">Bank Details:</h4>
                <div>Bank Name: {selectedCompany.bankDetails.bankName}</div>
                <div>Account Number: {selectedCompany.bankDetails.accountNumber}</div>
                <div>IFSC Code: {selectedCompany.bankDetails.ifscCode}</div>
                <div>Branch Name: {selectedCompany.bankDetails.branchName}</div>
                <div>Account Holder Name: {selectedCompany.bankDetails.accountHolderName}</div>
                <div>GPay Number: {selectedCompany.bankDetails.gPayNumber}</div>
                <div>Paytm Number: {selectedCompany.bankDetails.paytmNumber}</div>
                <div>PhonePe Number: {selectedCompany.bankDetails.phonePeNumber}</div>
                <div>UPI ID: {selectedCompany.bankDetails.upiId}</div>
                <div>Account Type: {selectedCompany.bankDetails.accountType}</div>
                {selectedCompany.bankDetails.qrImages.map((image, index) => (
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
