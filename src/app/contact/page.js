"use client"; // Marking this as a Client Component

import { useState } from 'react';
import Hero from '../components/Hero';
import AllFooter from '../components/AllFooter';

export default function Contact() {
  const [selectedService, setSelectedService] = useState(null);

  // Sample data for services
  const services = [
    { title: 'NFC Card Management', details: 'We provide NFC card management services to manage and configure contactless NFC cards.' },
    { title: 'Contactless Payments Solutions', details: 'Our contactless payment solutions offer seamless and secure payments for businesses.' },
    { title: 'Digital Business Cards', details: 'Switch to digital business cards that can be shared with a tap of your NFC-enabled device.' },
    { title: 'Custom NFC Solutions', details: 'Tailor-made NFC solutions designed to suit your business needs and operations.' },
  ];

  // Function to toggle selected service
  const toggleService = (index) => {
    setSelectedService(selectedService === index ? null : index); // Collapse if clicked twice
  };

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services and Contact Form Section */}
      <section className="container mx-auto p-6">
        <div className="flex flex-wrap md:flex-nowrap gap-8">
          
          {/* Left Side: Services */}
          <div className="w-full md:w-1/2 pr-4 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-6 text-green-600">Our Services</h2>
            <ul className="text-gray-800">
              {services.map((service, index) => (
                <li key={index} className="mb-4">
                  <button 
                    onClick={() => toggleService(index)} 
                    className="text-left w-full hover:text-green-500 transition-colors duration-300 focus:outline-none"
                  >
                    <h3 className="text-lg font-semibold flex justify-between items-center">
                      {service.title}
                      <span className={`transition-transform duration-300 ${selectedService === index ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </h3>
                  </button>
                  {/* Service Details with Animation */}
                  <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${selectedService === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="mt-2 text-gray-600">{service.details}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full md:w-1/2 pl-4 bg-white p-8 shadow-lg rounded-lg animate-fadeIn">
            <h2 className="text-3xl font-bold mb-6 text-green-600">Contact Us</h2>
            
            <form className="space-y-6">
              <div className="relative group">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 group-hover:shadow-xl"
                  placeholder="Enter your name"
                />
              </div>

              <div className="relative group">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 group-hover:shadow-xl"
                  placeholder="Enter your email"
                />
              </div>

              <div className="relative group">
                <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 group-hover:shadow-xl"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="relative group">
                <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 group-hover:shadow-xl"
                  placeholder="Enter your message"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 hover:shadow-xl"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Optional Footer Section */}
      <AllFooter />
    </>
  );
}
