"use client";
import { useState } from "react";
import {
  Building2,
  Share2,
  Info,
  Banknote,
  Package,
  Image,
  FilePlus,
} from "lucide-react";

// ✅ Import your actual form components
import CompanyDetailsForm from "../../components/CompanyDetailsForm";
import SocialMediaForm from "../../components/SocialMediaForm";
import AboutCompanyForm from "../../components/AboutCompanyForm";
import BankDetailsForm from "../../components/BankDetailsForm";
import ProductDetailsForm from "../../components/ProductDetailsForm";
import GalleryImagesForm from "../../components/GalleryImagesForm";
import AdditionalForm from "../../components/AdditionalForm";

const steps = [
  { name: "Company Details", icon: Building2, component: CompanyDetailsForm },
  { name: "Social Media", icon: Share2, component: SocialMediaForm },
  { name: "About Company", icon: Info, component: AboutCompanyForm },
  { name: "Bank Details", icon: Banknote, component: BankDetailsForm },
  { name: "Product Details", icon: Package, component: ProductDetailsForm },
  { name: "Gallery Images", icon: Image, component: GalleryImagesForm },
  { name: "Additional Form", icon: FilePlus, component: AdditionalForm },
];

export default function UserFormTabs() {
  const [currentStep, setCurrentStep] = useState(0);

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="w-full p-4">
      {/* --- Full Width Row Menus --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 mb-6 border rounded-md overflow-hidden">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStep === idx;
          return (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`flex items-center justify-center gap-2 w-full px-3 py-3 text-xs sm:text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              <Icon size={16} />
              <span className="truncate">{step.name}</span>
            </button>
          );
        })}
      </div>

      {/* --- Form Content --- */}
      <div className="bg-white rounded-lg shadow p-6 min-h-[200px]">
        <CurrentComponent />
      </div>
    </div>
  );
}
