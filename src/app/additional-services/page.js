// src/app/nfc-card/page.js
"use client"; // Next.js Client Component

import Hero from '../components/Hero'; // Adjust the import path as necessary
import AllFooter from '../components/AllFooter';
import HomeSection from '../components/HomeSection';

export default function AdditionalServices() {
  const sections = [
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Social Media Marketing",
        text: "Promote your brand effectively through social media platforms with tailored marketing strategies.",
      },
      link: "https://www.shiveninfotech.com/digital-marketing-services/social-media-marketing-in-navi-mumbai/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "GMB Local SEO Optimization",
        text: "Optimize your Google My Business listing to improve local search rankings and attract more customers.",
      },
      link: "https://www.shiveninfotech.com/digital-marketing-services/gmb-local-seo-optimization/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Global SEO Service",
        text: "Expand your reach globally with expert SEO services that drive organic traffic to your website.",
      },
      link: "https://www.shiveninfotech.com/digital-marketing-services/seo-services-in-navi-mumbai/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Google Promotions",
        text: "Boost your business with targeted Google Ads campaigns for maximum online visibility.",
      },
      link: "https://www.shiveninfotech.com/digital-marketing-services/google-promotions-agency-in-navi-mumbai/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Web Design Services",
        text: "Create stunning, user-friendly websites that captivate your audience and elevate your brand.",
      },
      link: "https://www.shiveninfotech.com/web-designing-services-in-navi-mumbai/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Software Development",
        text: "Get custom software solutions tailored to meet your specific business needs and goals.",
      },
      link: "https://www.shiveninfotech.com/software-development/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Mobile App Development",
        text: "Develop innovative and user-friendly mobile applications for Android and iOS platforms.",
      },
      link: "https://www.shiveninfotech.com/mobile-app-development/",
    },
    {
      image: "https://via.placeholder.com/400x300",
      description: {
        title: "Animation and Graphics",
        text: "Enhance your digital presence with captivating animations and creative graphic designs.",
      },
      link: "https://www.shiveninfotech.com/other-digital-services-in-navi-mumbai/",
    },
  ];

  return (
    <div>
      <Hero />
      <HomeSection sections={sections} />
      <AllFooter />
    </div>
  );
}
