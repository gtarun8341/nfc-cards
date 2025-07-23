"use client";

const Pricing = ({ heading, description, pricingData, handlePayment }) => {
  return (
    <div className="bg-[#EECCCCCC] py-12 px-4">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">{heading}</h2>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingData.map((plan) => (
            <div
              key={plan._id} // Make sure this is the correct unique ID
              className="border rounded-2xl p-6 shadow-lg bg-white text-left transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-2xl font-semibold text-black mb-2">
                {plan.title}
              </h3>
              <p className="text-xl font-bold text-gray-800 mb-4">
                ₹{plan.price}/year
              </p>

              <button
                onClick={() => handlePayment(plan)}
                className="w-full bg-[#DEE0E3] text-black border border-gray font-semibold py-2 px-4 rounded-full mb-4 hover:bg-blue-50 transition duration-300"
              >
                Get {plan.title}
              </button>

              <ul className="list-none space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start text-gray-700">
                    <svg
                      className="w-5 h-5 text-black mt-1 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 14.5l-4.5-4.5 1.4-1.4L10 11.7l3.6-3.6 1.4 1.4L10 14.5z" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
