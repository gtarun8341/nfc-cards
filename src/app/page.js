// src/app/page.js
"use client";

import Hero from './components/Hero'; // Import the Hero component
import HomeCard from './components/HomeCard'; // Import the HomeCard component
import HomeSection from './components/HomeSection'; // Import the HomeSection component
import OurClients from './components/OurClients'; // Import the OurClients component
import Testimonials from './components/Testimonials'; // Import the Testimonials component
import FAQ from './components/FAQ'; // Import the FAQ component
import AllFooter from './components/AllFooter'; // Import the Footer component

export default function Home() {
  // Sample data for the cards, including icons
  const cardData = [
    { title: 'NFC Card 1', description: 'Description for NFC Card 1', icon: 'https://via.placeholder.com/150' },
    { title: 'NFC Card 2', description: 'Description for NFC Card 2', icon: 'https://via.placeholder.com/150' },
    { title: 'NFC Card 3', description: 'Description for NFC Card 3', icon: 'https://via.placeholder.com/150' },
    { title: 'NFC Card 4', description: 'Description for NFC Card 4', icon: 'https://via.placeholder.com/150' },
    { title: 'NFC Card 5', description: 'Description for NFC Card 5', icon: 'https://via.placeholder.com/150' },
    { title: 'NFC Card 6', description: 'Description for NFC Card 6', icon: 'https://via.placeholder.com/150' },
  ];

  // Data for HomeSection pairs
  const homeSectionData = [
    {
      image: 'https://via.placeholder.com/400x300', // Example image URL
      description: { title: 'Description 1', text: 'This is the description for the first pair.' },
    },
    {
      image: 'https://via.placeholder.com/400x300', // Example image URL
      description: { title: 'Description 2', text: 'This is the description for the second pair.' },
    },
    {
      image: 'https://via.placeholder.com/400x300', // Example image URL
      description: { title: 'Description 3', text: 'This is the description for the third pair.' },
    },
    {
      image: 'https://via.placeholder.com/400x300', // Example image URL
      description: { title: 'Description 4', text: 'This is the description for the fourth pair.' },
    },
  ];

  // Sample data for our clients
  const clientData = [
    { name: 'Company 1', icon: 'https://via.placeholder.com/100' },
    { name: 'Company 2', icon: 'https://via.placeholder.com/100' },
    { name: 'Company 3', icon: 'https://via.placeholder.com/100' },
    { name: 'Company 4', icon: 'https://via.placeholder.com/100' },
    { name: 'Company 5', icon: 'https://via.placeholder.com/100' },
    { name: 'Company 6', icon: 'https://via.placeholder.com/100' },
  ];

  // Sample data for testimonials
  const testimonialData = [
    {
      icon: 'https://via.placeholder.com/50',
      name: 'John Doe',
      designation: 'Web Developer',
      heading: 'Excellent Service!',
      description: 'The service provided was outstanding and exceeded my expectations.',
    },
    // Add more testimonials as needed
  ];

  // Sample data for FAQ
  const faqData = [
    {
      question: 'What is an NFC Card?',
      answer: 'An NFC card is a card that uses Near Field Communication technology to allow for data exchange with compatible devices.'
    },
    {
      question: 'How do I use my NFC Card?',
      answer: 'You can use your NFC card by tapping it on a compatible NFC reader or smartphone.'
    },
    {
      question: 'Are NFC Cards secure?',
      answer: 'Yes, NFC technology includes several security features to protect your data.'
    },
  ];

  return (
    <div>
      <Hero />
      <section className="container mx-auto text-center p-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to the NFC Card Website</h1>
        <p className="mb-6">Manage your NFC card data securely and efficiently.</p>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Get Started</button>
      </section>
      
      {/* HomeCards Section */}
      <section className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <HomeCard key={index} title={card.title} description={card.description} icon={card.icon} />
          ))}
        </div>
      </section>

      {/* HomeSections */}
      <HomeSection sections={homeSectionData} />

      {/* Our Clients Section */}
      <OurClients clients={clientData} />

      {/* Testimonials Section */}
      <Testimonials testimonials={testimonialData} />

      {/* FAQ Section */}
      <FAQ faqs={faqData} />

      {/* Footer Section */}
      <AllFooter />
    </div>
  );
}
