"use client"; // Next.js Client Component
import Image from 'next/image';

import Hero from '../components/Hero';
import AllFooter from '../components/AllFooter';
export default function About() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Us Section */}
      <section className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p>We offer NFC card management solutions to simplify your card interactions.</p>
      </section>

      {/* Why Digital Card Section */}
      <section className="container mx-auto p-6 mt-8">
        <h2 className="text-3xl font-bold mb-6">Why Digital Card?</h2>
        
        {/* Feature 1 */}
        <div className="flex items-start mb-6">
          <Image src="/path/to/icon1.png" alt="Icon 1" className="w-12 h-12 mr-4"                   width={500} // Set a reasonable default width
                  height={500}
                  layout="intrinsic"/> {/* Update with the icon path */}
          <div>
            <h3 className="text-xl font-semibold">Easy to Share</h3>
            <p>Share your digital card effortlessly via a simple tap or scan.</p>
          </div>
        </div>
        
        {/* Feature 2 */}
        <div className="flex items-start mb-6">
          <Image src="/path/to/icon2.png" alt="Icon 2" className="w-12 h-12 mr-4"                   width={500} // Set a reasonable default width
                  height={500}
                  layout="intrinsic"/> {/* Update with the icon path */}
          <div>
            <h3 className="text-xl font-semibold">Contactless Interaction</h3>
            <p>Keep your interactions contact-free with our innovative NFC solutions.</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-start mb-6">
          <Image src="/path/to/icon3.png" alt="Icon 3" className="w-12 h-12 mr-4"                  width={500} // Set a reasonable default width
                  height={500}
                  layout="intrinsic" /> {/* Update with the icon path */}
          <div>
            <h3 className="text-xl font-semibold">Environmentally Friendly</h3>
            <p>Reduce plastic waste by switching to digital cards.</p>
          </div>
        </div>

        {/* Add more features as needed */}
      </section>
      <AllFooter />

    </>
  );
}
