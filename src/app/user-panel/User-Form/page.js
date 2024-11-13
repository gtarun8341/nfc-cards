"use client"; // Next.js Client Component

import { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig"; // Ensure you have the right API config
import CompanyDetailsForm from "./CompanyDetailsForm/page";
import SocialMediaForm from "./SocialMediaForm/page";
import AboutCompanyForm from "./AboutCompanyForm/page";
import BankDetailsForm from "./BankDetailsForm/page";
import ProductDetailsForm from "./ProductDetailsForm/page";
import GalleryImagesForm from "./GalleryImagesForm/page";

const UserFormPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    designation: "",
    contact1: "",
    contact2: "",
    whatsapp1: "",
    whatsapp2: "",
    email: "",
    website: "",
    googleMap: "",
    address: "",
    logo: null,
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtubeChannel: "",
    otherProfile: "",
    youtubeVideos: [""], // Start with one input field
    googleBusiness: "",
    video: null,
    establishedYear: "",
    natureOfBusiness: "",
    gstNumber: "",
    aboutCompany: "",
    documents: [],
    bankName: "",
    accountNumber: "",
    branchName: "",
    ifscCode: "",
    accountHolderName: "",
    gPayNumber: "",
    paytmNumber: "",
    phonePeNumber: "",
    upiId: "",
    accountType: "",
    qrImages: [],
    products: [], // Change this to an array for multiple products
    galleryImages: [], // Add galleryImages to the state
  });

  const [currentStep, setCurrentStep] = useState(0); // Track the current step
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await api.get(`/api/user-details/`, config);
        
        // Ensure to map the response to your form structure
        const data = response.data;
        setFormData({
          companyName: data.companyName,
          name: data.name,
          designation: data.designation,
          contact1: data.contact1,
          contact2: data.contact2,
          whatsapp1: data.whatsapp1,
          whatsapp2: data.whatsapp2,
          email: data.email,
          website: data.website,
          googleMap: data.googleMap,
          address: data.address,
          logo: data.logo, // Assuming this is an image or file reference
          // Social Media Links
          facebook: data.socialMediaLinks.facebook,
          instagram: data.socialMediaLinks.instagram,
          linkedin: data.socialMediaLinks.linkedin,
          twitter: data.socialMediaLinks.twitter,
          youtubeChannel: data.socialMediaLinks.youtubeChannel,
          otherProfile:data.socialMediaLinks.otherProfile,
          youtubeVideos:data.socialMediaLinks.youtubeVideo,
          googleBusiness:data.socialMediaLinks.googleBusiness,
          // About Company
          establishedYear: data.aboutCompany.establishedYear,
          natureOfBusiness: data.aboutCompany.natureOfBusiness,
          gstNumber: data.aboutCompany.gstNumber,
          aboutCompany: data.aboutCompany.description, // Assuming you want the description here
          // documents: data.aboutCompany.documents,
          // Bank Details
          bankName: data.bankDetails.bankName,
          accountNumber: data.bankDetails.accountNumber,
          branchName: data.bankDetails.branchName,
          ifscCode: data.bankDetails.ifscCode,
          gPayNumber: data.bankDetails.gPayNumber,
          paytmNumber: data.bankDetails.paytmNumber,
          phonePeNumber: data.bankDetails.phonePeNumber,
          upiId: data.bankDetails.upiId,
          accountType: data.bankDetails.accountType,
          accountHolderName: data.bankDetails.accountHolderName,
          // Products and other fields...
          products: data.products || [], // Ensure it's an array
          galleryImages: data.galleryImages || [], // Ensure it's an array
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        setErrorMessages([...errorMessages, "Error fetching user details"]);
      }
    };
  
    fetchUserDetails();
  }, []);
  
  const handleFormDataChange = (sectionData) => {
    setFormData((prevData) => {
      if (sectionData.products) {
        return { ...prevData, products: sectionData.products }; // Update products array
      } else if (sectionData.galleryImages) {
        return { ...prevData, galleryImages: sectionData.galleryImages }; // Update gallery images
      } else if (sectionData.youtubeVideos) {
        return { ...prevData, youtubeVideos: sectionData.youtubeVideos }; // Update YouTube videos
      }
      return { ...prevData, ...sectionData }; // Otherwise, merge other data
    });
  };

  const handleSubmit = async () => {
    console.log("Submit button clicked."); // Log when the submit button is clicked
    console.log("Current Form Data:", formData); // Log current form data
    const formDataForSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "products") {
          value.forEach((product) => {
            // Append product details
            formDataForSubmit.append("products[]", JSON.stringify({
              productName: product.productName,
              productPrice: product.productPrice,
              productType: product.productType,
            }));
            // Append the image file with its name
            if (product.productImage) {
              formDataForSubmit.append("productImages[]", product.productImage, product.productImage.name);
            }
          });
        } else if (key === "galleryImages" || key === "documents" || key === "qrImages") {
          value.forEach((file) => formDataForSubmit.append(key, file, file.name)); // Append files with their names
        } else if (key === "youtubeVideos") {
          value.forEach((video) => formDataForSubmit.append("youtubeVideos[]", video)); // Append YouTube URLs
        }
      } else {
        formDataForSubmit.append(key, value);
      }
    });

    console.log("FormData for Submit:", [...formDataForSubmit]);

    try {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.post("/api/user-details/", formDataForSubmit, config);
      
      setSuccessMessage("Form submitted successfully!");
      console.log("Response:", response.data); // Log the response
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessages([...errorMessages, "Error submitting the form"]);
    }
  };

  const nextStep = () => {
    const stepNames = [
      "Company Details",
      "Social Media",
      "About Company",
      "Bank Details",
      "Product Details",
      "Gallery Images"
    ];

    // Log current step before updating
    console.log(`Current step before moving to next: ${stepNames[currentStep]}`);
    // Update to the next step
    setCurrentStep((prevStep) => {
      const newStep = prevStep + 1;
      // Log the new step after updating
      console.log(`Moving to next step: ${stepNames[newStep]}`);
      return newStep;
    });
  };

  const prevStep = () => {
    const stepNames = [
      "Company Details",
      "Social Media",
      "About Company",
      "Bank Details",
      "Product Details",
      "Gallery Images"
    ];

    // Log current step before updating
    console.log(`Current step before moving to previous: ${stepNames[currentStep]}`);
    // Update to the previous step
    setCurrentStep((prevStep) => {
      const newStep = prevStep - 1;
      // Log the new step after updating
      console.log(`Moving to previous step: ${stepNames[newStep]}`);
      return newStep;
    });
  };

  const steps = [
    <CompanyDetailsForm key="company-details" onDataChange={handleFormDataChange} initialData={formData} />,
    <SocialMediaForm key="social-media" onDataChange={handleFormDataChange} initialData={formData} />,
    <AboutCompanyForm key="about-company" onDataChange={handleFormDataChange} initialData={formData} />,
    <BankDetailsForm key="bank-details" onDataChange={handleFormDataChange} initialData={formData} />,
    <ProductDetailsForm key="product-details" onDataChange={handleFormDataChange} initialData={formData} />,
    <GalleryImagesForm key="gallery-images" onDataChange={handleFormDataChange} initialData={formData} />,
  ];
  

  return (
    <div className="form-container">
      {/* Removed <form> tag */}
      {steps[currentStep]}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-4">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={prevStep}
            className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        ) : (
          <button
            type="button" // Change to button type
            onClick={handleSubmit} // Call the handleSubmit function
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        )}
      </div>

      {/* Error/Success Messages */}
      {errorMessages.length > 0 && (
        <div className="error text-red-500">{errorMessages.join(", ")}</div>
      )}
      {successMessage && <div className="success text-green-500">{successMessage}</div>}
    </div>
  );
};

export default UserFormPage;
