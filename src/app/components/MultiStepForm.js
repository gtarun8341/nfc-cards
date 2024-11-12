import { useState, useEffect } from 'react';

const MultiStepForm = ({ steps, formTitle, initialFormData = {}, onSubmit }) => { // Added onSubmit prop
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (Object.keys(formData).length === 0) {
      const defaultFormData = {};
      steps.forEach((step) => {
        step.fields.forEach((field) => {
          defaultFormData[field.name] = initialFormData[field.name] || '';
        });
      });
      setFormData(defaultFormData);
    }
  }, [initialFormData, steps]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files : value,
    });
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the passed onSubmit function
    console.log('Final Form Data:', formData);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto" style={{
      maxHeight: '80vh',
      overflowY: 'auto',
      marginTop: '30px',
      marginBottom: '50px',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}>
      <style>
        {`
          .bg-white::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <h3 className="text-lg mb-2">{steps[step].title}</h3>
      <form onSubmit={step === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps[step].fields.map((field, index) => (
            <div key={index} className="mt-4">
              <label htmlFor={field.name} className="block text-lg font-semibold">{field.label}</label>
              {/* Render the appropriate input based on field type */}
              {field.type === 'text' && (
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  value={formData[field.name] || ''}
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
                  value={formData[field.name] || ''}
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
                  value={formData[field.name] || ''}
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
                  value={formData[field.name] || ''}
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
                  value={formData[field.name] || ''}
                  required={field.required}
                ></textarea>
              )}
              {field.type === 'dropdown' && (
    <select
        id={field.name}
        name={field.name}
        className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg"
        onChange={handleInputChange}
        value={formData[field.name] || ''}
        required={field.required}
    >
        <option value="" disabled>
            {field.placeholder} {/* Placeholder as the first option */}
        </option>
        {field.options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
)}

              {field.type === 'radio' && (
                <div className="mt-2">
                  {field.options.map((option, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="radio"
                        id={option.name}
                        name={field.name}
                        value={option.value}
                        onChange={handleInputChange}
                        checked={formData[field.name] === option.value}
                        required={field.required}
                      />
                      <label htmlFor={option.name} className="ml-2">{option.label}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="py-2 px-4 bg-gray-600 text-white rounded-md"
            >
              Previous
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="py-2 px-4 bg-blue-600 text-white rounded-md"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="py-2 px-4 bg-green-600 text-white rounded-md"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
