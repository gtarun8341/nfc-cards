"use client"; // Marking this as a Client Component

import { useState } from 'react';

const MultiStepForm = ({ steps, formTitle }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files : value,
    });
  };

  // Handle next step
  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit all data at the last step
    console.log('Final Form Data:', formData);
  };

  return (
    <div
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto"
      style={{
        maxHeight: '80vh',
        overflowY: 'auto',
        marginTop: '30px',
        marginBottom: '50px',
        scrollbarWidth: 'none', // For Firefox
        '-ms-overflow-style': 'none', // For IE/Edge
      }}
    >
      <style>
        {`
          /* Hide scrollbar for WebKit browsers */
          .bg-white::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>
      <h3 className="text-lg mb-2">{steps[step].title}</h3>
      <form onSubmit={step === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps[step].fields.map((field, index) => (
            <div key={index} className="mt-4">
              <label htmlFor={field.name} className="block text-lg font-semibold">
                {field.label}
              </label>
              {field.type === 'text' && (
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  required={field.required}
                />
              )}
              {field.type === 'number' && (
                <input
                  type="number"
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  required={field.required}
                />
              )}
              {field.type === 'email' && (
  <input
    type="email"
    id={field.name}
    name={field.name}
    placeholder={field.placeholder}
    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg"
    onChange={handleInputChange}
    required={field.required}
  />
)}
{field.type === 'password' && (
  <input
    type="password"
    id={field.name}
    name={field.name}
    placeholder={field.placeholder}
    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg"
    onChange={handleInputChange}
    required={field.required}
  />
)}
 {field.type === 'url' && (
                <input
                  type="url"
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  required={field.required}
                />
              )}
              {field.type === 'file' && (
                <input
                  type="file"
                  id={field.name}
                  name={field.name}
                  accept={field.accept}
                  className="mt-2 block w-full border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  required={field.required}
                  multiple={field.multiple}
                />
              )}
              {field.type === 'textarea' && (
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  required={field.required}
                ></textarea>
              )}
              {field.type === 'radio' && (
                <div className="mt-2">
                  {field.options.map((option, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="radio"
                        id={option.value}
                        name={field.name}
                        value={option.value}
                        className="mr-2"
                        onChange={handleInputChange}
                        required={field.required}
                      />
                      <label htmlFor={option.value}>{option.label}</label>
                    </div>
                  ))}
                </div>
              )}
              {field.type === 'dropdown' && (
                <select
                  id={field.name}
                  name={field.name}
                  className="mt-2 block w-full border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={handlePrevious}
            >
              Back
            </button>
          )}
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleNext}
          >
            {step === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
