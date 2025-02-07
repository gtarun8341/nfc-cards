// src/app/nfc-card/page.js
"use client"; // Next.js Client Component

import Hero from '../components/Hero'; // Adjust the import path as necessary
import AllFooter from '../components/AllFooter';

export default function additionalservices() {
  const cardData = [
    {
      title: "Social Media Marketing",
      link: "https://www.shiveninfotech.com/digital-marketing-services/social-media-marketing-in-navi-mumbai/",
      description: "Promote your brand effectively through social media platforms with tailored marketing strategies.",
    },
    {
      title: "GMB Local SEO Optimization",
      link: "https://www.shiveninfotech.com/digital-marketing-services/gmb-local-seo-optimization/",
      description: "Optimize your Google My Business listing to improve local search rankings and attract more customers.",
    },
    {
      title: "Global SEO Service",
      link: "https://www.shiveninfotech.com/digital-marketing-services/seo-services-in-navi-mumbai/",
      description: "Expand your reach globally with expert SEO services that drive organic traffic to your website.",
    },
    {
      title: "Google Promotions",
      link: "https://www.shiveninfotech.com/digital-marketing-services/google-promotions-agency-in-navi-mumbai/",
      description: "Boost your business with targeted Google Ads campaigns for maximum online visibility.",
    },
    {
      title: "Web Design Services",
      link: "https://www.shiveninfotech.com/web-designing-services-in-navi-mumbai/",
      description: "Create stunning, user-friendly websites that captivate your audience and elevate your brand.",
    },
    {
      title: "Software Development",
      link: "https://www.shiveninfotech.com/software-development/",
      description: "Get custom software solutions tailored to meet your specific business needs and goals.",
    },
    {
      title: "Mobile App Development",
      link: "https://www.shiveninfotech.com/mobile-app-development/",
      description: "Develop innovative and user-friendly mobile applications for Android and iOS platforms.",
    },
    {
      title: "Animation and Graphics",
      link: "https://www.shiveninfotech.com/other-digital-services-in-navi-mumbai/",
      description: "Enhance your digital presence with captivating animations and creative graphic designs.",
    },
  ];

  return (
    <div>
      <Hero />
      <div className="container mx-auto p-6">
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="mb-4">{card.description}</p>
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
      <AllFooter />
    </div>
  );
}
