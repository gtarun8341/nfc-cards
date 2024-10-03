// src/app/components/Pricing.js
"use client"; // Marking this as a Client Component

const Pricing = ({ pricingData }) => { // Accept pricingData as props
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Pricing Plans</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingData.map((plan) => (
          <div 
            key={plan.id} 
            className="border rounded-lg p-6 shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-xl bg-white"
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">{plan.title}</h3>
            <ul className="list-disc list-inside mb-4 text-center"> {/* Centering the feature list */}
              {plan.features.map((feature, index) => (
                <li 
                  key={index} 
                  className="text-gray-700 mb-2 flex justify-center items-center" // Center text and icons
                >
                  <svg 
                    className="w-4 h-4 text-green-500 mr-2" 
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 14.5l-4.5-4.5 1.4-1.4L10 11.7l3.6-3.6 1.4 1.4L10 14.5z" />
                  </svg>
                  <span className="text-center">{feature}</span> {/* Centering feature text */}
                </li>
              ))}
            </ul>
            <button className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
