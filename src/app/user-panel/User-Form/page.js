"use client"; // Next.js Client Component

import { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig"; // Ensure you have the right API config
import CompanyDetailsForm from "./CompanyDetailsForm/page";
import SocialMediaForm from "./SocialMediaForm/page";
import AboutCompanyForm from "./AboutCompanyForm/page";
import BankDetailsForm from "./BankDetailsForm/page";
import ProductDetailsForm from "./ProductDetailsForm/page";
import GalleryImagesForm from "./GalleryImagesForm/page";
import AdditionalForm from "./AdditionalForm/page";
import { CheckCircle,AlertCircle } from "lucide-react";

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
    description: "",
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
    tagLine: "",
    specialization: "",
    slogan: "",
    clientList: [],
    successStory: "",
    ourGive: "",
    ourAsk: "",
    vision: "",
    mission: "",
    awards: [],
    certifications: [],
    team: [],
    annualSales: "",
    turnover: "",
    companyPolicies: "",
    companyGrowth: "",
  });
  const [loading, setLoading] = useState(true); // Loading state

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
          id:data._id,
          userid:data.userId,
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
          description: data.aboutCompany.description, // Assuming you want the description here
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
          tagLine: data.additionalForm?.tagLine || '',
          specialization: data.additionalForm?.specialization || '',
          slogan: data.additionalForm?.slogan || '',
          successStory: data.additionalForm?.successStory || '',
          ourGive: data.additionalForm?.ourGive || '',
          ourAsk: data.additionalForm?.ourAsk || '',
          vision: data.additionalForm?.vision || '',
          mission: data.additionalForm?.mission || '',
          awards: data.additionalForm?.awards || [], // Ensure it's an array
          certifications: data.additionalForm?.certifications || [], // Ensure it's an array
          annualSales: data.additionalForm?.annualSales || '',
          turnover: data.additionalForm?.turnover || '',
          companyPolicies: data.additionalForm?.companyPolicies || '',
          companyGrowth: data.additionalForm?.companyGrowth || '',
          clientList: data.additionalForm?.clientList || [], // Ensure it's an array
          team: data.additionalForm?.team || [] // Ensure it's an array
        });
        setLoading(false); // Stop loading once data is set
      } catch (error) {
        if (error.response && error.response.status === 404) {
            // Handle 404 error (User details not found)
            console.log("User details not found, skipping pre-fill.");
        } else {
            // Handle other errors
            console.error("Error fetching user details:", error);
            setErrorMessages((prevMessages) => [...prevMessages, "Error fetching user details"]);
        }
        setLoading(false); // Stop loading even if there's an error

    }
};

fetchUserDetails();
}, []);
if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
<p className="ml-3 text-lg font-semibold">Loading user data...</p>
    </div>
  );
}
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
    console.log("Submit button clicked.");
    console.log("Current Form Data:", formData);
    if (!formData.id) {

  //   // Define the required fields for the formData
  //   const requiredFields = [
  //     "companyName", "name", "designation", "contact1", "email", "website", 
  //     "googleMap", "address", "logo", "facebook", "instagram", "linkedin", 
  //     "twitter", "youtubeChannel", "gstNumber", "description", "bankName", 
  //     "accountNumber", "branchName", "ifscCode", "accountHolderName", 
  //     "gPayNumber", "paytmNumber", "phonePeNumber", "upiId", "accountType", 
  //     "googleBusiness",  "establishedYear", "natureOfBusiness", 
  //     "documents", "qrImages", "galleryImages", "products", "tagLine", "specialization", 
  //     "slogan", "clientList", "successStory", "ourGive", "ourAsk", "vision", 
  //     "mission", "awards", "certifications", "team", "annualSales", "turnover", 
  //     "companyPolicies", "companyGrowth"
  // ];

  // // Initialize an empty array to hold error messages
  // let missingFields = [];

  // // Check if any required field in formData is missing
  // requiredFields.forEach(field => {
  //     if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
  //         missingFields.push(field);
  //     }
  // });

  // // Validate products array (check each product in products array)
  // formData.products.forEach((product, index) => {
  //     const productFields = ["productName", "productPrice", "productImage", "productType", "hsnCode", "gst"];
  //     productFields.forEach(field => {
  //         if (!product[field]) {
  //             missingFields.push(`Product ${index + 1} - ${field}`);
  //         }
  //     });
  // });

  // formData.clientList.forEach((client, index) => {
  //   const clientFields = ["name", "logo"];
  //   clientFields.forEach(field => {
  //     if (!client[field]) {
  //       missingFields.push(`Client ${index + 1} - ${field}`);
  //     }
  //   });
  // });

  // // Validate team array (check each team member in team)
  // formData.team.forEach((teamMember, index) => {
  //   const teamFields = ["name", "image"];
  //   teamFields.forEach(field => {
  //     if (!teamMember[field]) {
  //       missingFields.push(`Team Member ${index + 1} - ${field}`);
  //     }
  //   });
  // });
  const stepFields = {
    0: ["companyName", "name", "designation", "contact1","contact2","whatsapp1","whatsapp2", "email", "website", "googleMap", "address", "logo"],
    1: ["facebook", "instagram", "linkedin", "twitter", "youtubeChannel", "googleBusiness","otherProfile","youtubeVideos"],
    2: ["gstNumber", "description", "establishedYear", "natureOfBusiness","documents"],
    3: ["bankName", "accountNumber", "branchName", "ifscCode", "accountHolderName", "gPayNumber", "paytmNumber", "phonePeNumber", "upiId", "accountType", "qrImages"],
    4: ["products"], // Products will be validated separately
    5: ["galleryImages"],
    6: ["tagLine", "specialization", "slogan", "annualSales", "turnover", "successStory", "ourGive", "ourAsk", "vision", "mission", "companyPolicies", "companyGrowth", "awards", "certifications", "team","clientList"]
  };
  
  // Store errors for each step
  let stepErrors = {};
  
  // Loop through steps and collect missing fields per step
  Object.entries(stepFields).forEach(([step, fields]) => {
    stepErrors[step] = [];
  
    fields.forEach(field => {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        stepErrors[step].push(field);
      }
    });
  
    // Validate products (Step 4)
    if (step == 4 && formData.products) {
      formData.products.forEach((product, index) => {
        ["productName", "productPrice", "productImage", "productType", "hsnCode", "gst"].forEach(field => {
          if (!product[field]) {
            stepErrors[step].push(`Product ${index + 1} - ${field}`);
          }
        });
      });
    }
  
    // Validate clients (Step 6)
    if (step == 6 && formData.clientList) {
      formData.clientList.forEach((client, index) => {
        ["name", "logo"].forEach(field => {
          if (!client[field]) {
            stepErrors[step].push(`Client ${index + 1} - ${field}`);
          }
        });
      });
    }
  
    // Validate team members (Step 6)
    if (step == 6 && formData.team) {
      formData.team.forEach((teamMember, index) => {
        ["name", "image"].forEach(field => {
          if (!teamMember[field]) {
            stepErrors[step].push(`Team Member ${index + 1} - ${field}`);
          }
        });
      });
    }
  });
  
  // Store errors in state
  setErrorMessages(stepErrors);
  
  // Prevent submission if any step has errors
  if (Object.values(stepErrors).some(errors => errors.length > 0)) {
    return;
  }
  
  // If there are missing fields, show an error message and prevent form submission
  // if (missingFields.length > 0) {
  //   setErrorMessages(["Please fill in the following fields: ", ...missingFields]);
  //   return;
  // }
    }
    const formDataForSubmit = new FormData();
  
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "products") {
          value.forEach((product) => {
            // Append product details as objects, NOT strings
            formDataForSubmit.append("products[]", JSON.stringify({
              productName: product.productName,
              productPrice: product.productPrice,
              productType: product.productType,
              hsnCode: product.hsnCode,
              gst: product.gst,
            }));
  
            // Append the image file only if it's a valid file (instanceof File)
            if (product.productImage && product.productImage instanceof File) {
              formDataForSubmit.append("productImages[]", product.productImage, product.productImage.name);
            }
          });
        } else if (key === "galleryImages" || key === "documents" || key === "qrImages") {
          value.forEach((file) => {
            if (file && file instanceof File) {
              formDataForSubmit.append(key, file, file.name);
            }
          });
        }  else if (key === "awards" || key === "certifications") {
          value.forEach((file) => {
            if (file && file instanceof File) {
              formDataForSubmit.append(key, file, file.name); // Append awards/certifications files
            }
          });
        }else if (key === "clientList") {
          value.forEach((client) => {
            formDataForSubmit.append("clientList[]", JSON.stringify({
              clientName: client.name,
              clientLogo: client.logo ? client.logo.name : "", // If a logo is provided, attach it
            }));
            if (client.logo && client.logo instanceof File) {
              formDataForSubmit.append("clientLogos[]", client.logo, client.logo.name);
            }
          });
        } else if (key === "team") {
          value.forEach((member) => {
            formDataForSubmit.append("team[]", JSON.stringify({
              memberName: member.name,
              memberImage: member.image ? member.image.name : "", // Attach image if available
            }));
            if (member.image && member.image instanceof File) {
              formDataForSubmit.append("teamImages[]", member.image, member.image.name);
            }
          });
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
  
      let response;
      if (formData.id) {
        // If prefilled (data exists), update the user details
        response = await api.put(`/api/user-details/${formData.id}`, formDataForSubmit, config);
        setSuccessMessage("Form updated successfully!");
        console.log("Update Response:", response.data);
      } else {
        // New submission (no prefilled data)
        response = await api.post("/api/user-details/", formDataForSubmit, config);
        setSuccessMessage("Form submitted successfully!");
        console.log("Response:", response.data);
      }
  
      window.location.reload(); // Refresh the page
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
      "Gallery Images",
      "Additonal form"
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
      "Gallery Images",
      "Additonal form"
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
    <AdditionalForm key="additional-form" onDataChange={handleFormDataChange} initialData={formData} />,
  ];
  

  return (
    <div className="form-container">
      {/* Removed <form> tag */}
    {/* Notice Message (Moved Inside with Margin) */}
    {formData.id && (
      <div className="bg-yellow-200 border border-yellow-500 text-yellow-700 rounded-lg p-3 mb-4">
        <p className="m-0 font-semibold">⚠️ Notice:</p>
        <p className="m-0">Uploading new files or images will replace previously uploaded ones.</p>
      </div>
    )}

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
      {steps[currentStep]}

      {/* Navigation buttons */}
    

{/* Error/Success Messages */}

{errorMessages[currentStep] && errorMessages[currentStep].length > 0 && (
  <div className="bg-red-200 border border-red-500 text-red-700 p-2 rounded mb-4">
    <p className="font-bold">Please fill in the following fields:</p>
    <ul className="list-disc ml-5">
      {errorMessages[currentStep].map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  </div>
)}

{successMessage && (
  <div className="success-message p-4 mb-4 border-l-4 border-green-500 bg-green-100 text-green-700 rounded-lg">
    <div className="flex items-center">
      <span className="mr-2">
        {/* Success Icon */}
        <CheckCircle className="h-5 w-5 text-green-600" />
      </span>
      <p>{successMessage}</p>
    </div>
  </div>
)}

    </div>
  );
};

export default UserFormPage;
