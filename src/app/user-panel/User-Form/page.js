"use client"; // Next.js Client Component

import { useEffect, useState } from "react";
import api from "../../apiConfig/axiosConfig"; // Ensure you have the right API config
import CompanyDetailsForm from "../../components/CompanyDetailsForm";
import SocialMediaForm from "../../components/SocialMediaForm";
import AboutCompanyForm from "../../components/AboutCompanyForm";
import BankDetailsForm from "../../components/BankDetailsForm";
import ProductDetailsForm from "../../components/ProductDetailsForm";
import GalleryImagesForm from "../../components/GalleryImagesForm";
import AdditionalForm from "../../components/AdditionalForm";
import { CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
const UserFormPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    termsAndConditions: "",
    messages: "",
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
    usePaymentGateway: false, // <-- NEW
    razorpayKeyId: "",
    razorpayKeySecret: "",
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
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await api.get(`/api/user-details/`, config);
        console.log(response);
        // Ensure to map the response to your form structure
        const data = response.data;
        setFormData({
          id: data._id,
          userid: data.userId,
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
          otherProfile: data.socialMediaLinks.otherProfile,
          youtubeVideos: data.socialMediaLinks.youtubeVideo,
          googleBusiness: data.socialMediaLinks.googleBusiness,
          // About Company
          establishedYear: data.aboutCompany.establishedYear,
          natureOfBusiness: data.aboutCompany.natureOfBusiness,
          gstNumber: data.aboutCompany.gstNumber,
          description: data.aboutCompany.description, // Assuming you want the description here
          termsAndConditions: data.aboutCompany.termsAndConditions,
          messages: data.aboutCompany.messages,
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
          usePaymentGateway: data.bankDetails.usePaymentGateway, // <-- NEW
          razorpayKeyId: data.bankDetails.razorpayKeyId,
          razorpayKeySecret: data.bankDetails.razorpayKeySecret,
          accountHolderName: data.bankDetails.accountHolderName,
          // Products and other fields...
          products: data.products || [], // Ensure it's an array
          galleryImages: data.galleryImages || [], // Ensure it's an array
          tagLine: data.additionalForm?.tagLine || "",
          specialization: data.additionalForm?.specialization || "",
          slogan: data.additionalForm?.slogan || "",
          successStory: data.additionalForm?.successStory || "",
          ourGive: data.additionalForm?.ourGive || "",
          ourAsk: data.additionalForm?.ourAsk || "",
          vision: data.additionalForm?.vision || "",
          mission: data.additionalForm?.mission || "",
          awards: data.additionalForm?.awards || [], // Ensure it's an array
          certifications: data.additionalForm?.certifications || [], // Ensure it's an array
          annualSales: data.additionalForm?.annualSales || "",
          turnover: data.additionalForm?.turnover || "",
          companyPolicies: data.additionalForm?.companyPolicies || "",
          companyGrowth: data.additionalForm?.companyGrowth || "",
          clientList: data.additionalForm?.clientList || [], // Ensure it's an array
          team: data.additionalForm?.team || [], // Ensure it's an array
        });
        setLoading(false); // Stop loading once data is set
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error (User details not found)
          toast("User details not found. Please fill in manually.");

          console.log("User details not found, skipping pre-fill.");
        } else {
          // Handle other errors
          console.error("Error fetching user details:", error);
          setErrorMessages((prevMessages) => [
            ...prevMessages,
            "Error fetching user details",
          ]);
          toast.error("Error fetching user details");
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
    setIsSubmitting(true);
    console.log("Submit button clicked.");
    console.log("Current Form Data:", formData);

    if (!formData.id) {
      const stepFields = {
        0: [
          "companyName",
          "name",
          "designation",
          "contact1",
          "contact2",
          "whatsapp1",
          "whatsapp2",
          "email",
          "website",
          "googleMap",
          "address",
          "logo",
        ],
        1: [
          "facebook",
          "instagram",
          "linkedin",
          "twitter",
          "youtubeChannel",
          "googleBusiness",
          "otherProfile",
          "youtubeVideos",
        ],
        2: [
          "gstNumber",
          "description",
          "termsAndConditions",
          "messages",
          "establishedYear",
          "natureOfBusiness",
          "documents",
        ],
        3: [
          "bankName",
          "accountNumber",
          "branchName",
          "ifscCode",
          "accountHolderName",
          "gPayNumber",
          "paytmNumber",
          "phonePeNumber",
          "upiId",
          "accountType",
          "qrImages",
        ],
        4: ["products"],
        5: ["galleryImages"],
        6: [
          "tagLine",
          "specialization",
          "slogan",
          "annualSales",
          "turnover",
          "successStory",
          "ourGive",
          "ourAsk",
          "vision",
          "mission",
          "companyPolicies",
          "companyGrowth",
          "awards",
          "certifications",
          "team",
          "clientList",
        ],
      };

      let stepErrors = {};
      let hasErrors = false;

      Object.entries(stepFields).forEach(([step, fields]) => {
        stepErrors[step] = [];

        fields.forEach((field) => {
          if (
            !formData[field] ||
            (Array.isArray(formData[field]) && formData[field].length === 0)
          ) {
            stepErrors[step].push(field);
            hasErrors = true;
          }
        });

        // Razorpay Fields
        if (step === "3" && formData.usePaymentGateway) {
          const razorpayErrors = [];
          if (!formData.razorpayKeyId?.trim())
            razorpayErrors.push("razorpayKeyId");
          if (!formData.razorpayKeySecret?.trim())
            razorpayErrors.push("razorpayKeySecret");

          if (razorpayErrors.length > 0) {
            stepErrors[step] = [...(stepErrors[step] || []), ...razorpayErrors];
          }
        }

        // Products
        if (step == 4 && formData.products) {
          formData.products.forEach((product, index) => {
            [
              "productName",
              "productPrice",
              "productImage",
              "productType",
              "hsnCode",
              "gst",
              "units",
              "category",
            ].forEach((field) => {
              if (!product[field]) {
                stepErrors[step].push(`Product ${index + 1} - ${field}`);
                hasErrors = true;
              }
            });
          });
        }

        // Clients
        if (step == 6 && formData.clientList) {
          formData.clientList.forEach((client, index) => {
            ["name", "logo"].forEach((field) => {
              if (!client[field]) {
                stepErrors[step].push(`Client ${index + 1} - ${field}`);
                hasErrors = true;
              }
            });
          });
        }

        // Team
        if (step == 6 && formData.team) {
          formData.team.forEach((member, index) => {
            ["name", "image"].forEach((field) => {
              if (!member[field]) {
                stepErrors[step].push(`Team Member ${index + 1} - ${field}`);
                hasErrors = true;
              }
            });
          });
        }
      });

      setErrorMessages(stepErrors);

      if (hasErrors) {
        setIsSubmitting(false);
        const allErrors = Object.values(stepErrors).flat();
        const errorPreview = allErrors.slice(0, 5).join(", ");
        const errorMsg =
          allErrors.length > 5
            ? `${errorPreview}, and more...`
            : errorPreview || "Please fill in all required fields.";
        toast.error(`Validation error: ${errorMsg}`);
        return;
      }
    }

    const formDataForSubmit = new FormData();
    console.log("everything is  formdata submit reached");

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (key === "products") {
          value.forEach((product) => {
            formDataForSubmit.append(
              "products[]",
              JSON.stringify({
                productName: product.productName,
                productPrice: product.productPrice,
                productType: product.productType,
                hsnCode: product.hsnCode,
                gst: product.gst,
                units: product.units,
                category: product.category, // corrected from product.units
              })
            );

            if (product.productImage && product.productImage instanceof File) {
              formDataForSubmit.append(
                "productImages[]",
                product.productImage,
                product.productImage.name
              );
            }
          });
        } else if (["galleryImages", "documents", "qrImages"].includes(key)) {
          value.forEach((file) => {
            if (file && file instanceof File) {
              formDataForSubmit.append(key, file, file.name);
            }
          });
        } else if (key === "awards" || key === "certifications") {
          value.forEach((file) => {
            if (file && file instanceof File) {
              formDataForSubmit.append(key, file, file.name);
            }
          });
        } else if (key === "clientList") {
          value.forEach((client) => {
            formDataForSubmit.append(
              "clientList[]",
              JSON.stringify({
                clientName: client.name,
                clientLogo: client.logo ? client.logo.name : "",
              })
            );
            if (client.logo && client.logo instanceof File) {
              formDataForSubmit.append(
                "clientLogos[]",
                client.logo,
                client.logo.name
              );
            }
          });
        } else if (key === "team") {
          value.forEach((member) => {
            formDataForSubmit.append(
              "team[]",
              JSON.stringify({
                memberName: member.name,
                memberImage: member.image ? member.image.name : "",
              })
            );
            if (member.image && member.image instanceof File) {
              formDataForSubmit.append(
                "teamImages[]",
                member.image,
                member.image.name
              );
            }
          });
        } else if (key === "youtubeVideos") {
          value.forEach((video) => {
            formDataForSubmit.append("youtubeVideos[]", video);
          });
        }
      } else {
        formDataForSubmit.append(key, value);
      }
    });

    console.log("FormData for Submit:", [...formDataForSubmit]);

    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (formData.id) {
        response = await api.put(
          `/api/user-details/${formData.id}`,
          formDataForSubmit,
          config
        );
        toast.success("Form updated successfully!");
      } else {
        response = await api.post(
          "/api/user-details/",
          formDataForSubmit,
          config
        );
        toast.success("Form submitted successfully!");
      }

      console.log("Response:", response.data);
      setSuccessMessage("Form submitted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Error submitting the form");
      setErrorMessages((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        "Error submitting the form",
      ]);
    } finally {
      setIsSubmitting(false);
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
      "Additonal form",
    ];

    // Log current step before updating
    console.log(
      `Current step before moving to next: ${stepNames[currentStep]}`
    );
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
      "Additonal form",
    ];

    // Log current step before updating
    console.log(
      `Current step before moving to previous: ${stepNames[currentStep]}`
    );
    // Update to the previous step
    setCurrentStep((prevStep) => {
      const newStep = prevStep - 1;
      // Log the new step after updating
      console.log(`Moving to previous step: ${stepNames[newStep]}`);
      return newStep;
    });
  };

  const steps = [
    <CompanyDetailsForm
      key="company-details"
      onDataChange={handleFormDataChange}
      initialData={formData}
    />,
    <SocialMediaForm
      key="social-media"
      onDataChange={handleFormDataChange}
      initialData={formData}
    />,
    <AboutCompanyForm
      key="about-company"
      onDataChange={handleFormDataChange}
      initialData={formData}
    />,
    <BankDetailsForm
      key="bank-details"
      onDataChange={handleFormDataChange}
      initialData={formData}
    />,
    <ProductDetailsForm
      key="product-details"
      onDataChange={handleFormDataChange}
      initialData={formData}
    />,
    <GalleryImagesForm
      key="gallery-images"
      onDataChange={handleFormDataChange}
      initialData={formData}
    />,
    <AdditionalForm
      key="additional-form"
      onDataChange={handleFormDataChange}
      initialData={formData}
    />,
  ];

  return (
    <div className="form-container">
      <>
        {/* Sticky Button Bar */}
        <div className="sticky top-16 z-40 flex justify-between w-full px-4 py-2 bg-transparent pointer-events-none">
          <div className="flex w-full justify-between pointer-events-auto">
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
                type="button"
                onClick={handleSubmit}
                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </div>

        {/* Main Form Content */}
        <div className="form-container pt-0 px-4">
          {steps[currentStep]}

          {formData.id && (
            <div className="bg-yellow-200 border border-yellow-500 text-yellow-700 rounded-lg p-3 mt-4">
              <p className="font-semibold">⚠️ Please Note:</p>
              <p>
                1. Previously uploaded files are saved, and there is no need to
                reload them.
              </p>
              <p>
                2. Uploading new images will replace previously uploaded images.
              </p>
              <p>3. You need to fill all the fields.</p>
            </div>
          )}

          {errorMessages[currentStep]?.length > 0 && (
            <div className="bg-red-200 border border-red-500 text-red-700 p-2 rounded my-4">
              <p className="font-bold">Please fill in the following fields:</p>
              <ul className="list-disc ml-5">
                {errorMessages[currentStep].map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {successMessage && (
            <div className="p-4 mb-4 border-l-4 border-green-500 bg-green-100 text-green-700 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <p>{successMessage}</p>
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default UserFormPage;
