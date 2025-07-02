// src/app/nfc-card/page.js
"use client"; // Next.js Client Component

import Hero from "../components/Hero"; // Adjust the import path as necessary
import AllFooter from "../components/AllFooter";
import HomeSection from "../components/HomeSection";
import HeroBanner from "../components/HeroBanner";
import EnquiryForm from "../components/EnquiryForm";
import BlogsSection from "../components/BlogsSection";
import GalarySection from "../components/GalarySection";
import FrequentlyAskedQuestions from "../components/FrequentlyAskedQuestions";

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
  const blogData = [
    {
      id: 1,
      icon: "https://via.placeholder.com/100",
      title: "Card 1",
      description: "Description for Card 1.",
    },
    {
      id: 2,
      icon: "https://via.placeholder.com/100",
      title: "Card 2",
      description: "Description for Card 2.",
    },
    {
      id: 3,
      icon: "https://via.placeholder.com/100",
      title: "Card 3",
      description: "Description for Card 3.",
    },
    {
      id: 4,
      icon: "https://via.placeholder.com/100",
      title: "Card 4",
      description: "Description for Card 4.",
    },
    {
      id: 5,
      icon: "https://via.placeholder.com/100",
      title: "Card 5",
      description: "Description for Card 5.",
    },
    {
      id: 6,
      icon: "https://via.placeholder.com/100",
      title: "Card 6",
      description: "Description for Card 6.",
    },
    {
      id: 7,
      icon: "https://via.placeholder.com/100",
      title: "Card 6",
      description: "Description for Card 6.",
    },
    {
      id: 8,
      icon: "https://via.placeholder.com/100",
      title: "Card 6",
      description: "Description for Card 6.",
    },
    {
      id: 9,
      icon: "https://via.placeholder.com/100",
      title: "Card 6",
      description: "Description for Card 6.",
    },
  ];
  const faqsData = [
    {
      question: "What is an NFC card?",
      answer:
        "An NFC card is a type of card that uses Near Field Communication technology to transmit data to compatible devices when in close proximity.",
    },
    {
      question: "How do I use the NFC card?",
      answer:
        "You can use the NFC card by tapping it against an NFC-enabled device, which will read the information stored on the card.",
    },
    {
      question: "What are the benefits of using NFC cards?",
      answer:
        "NFC cards provide quick and easy access to information, making them ideal for business cards, payments, and more.",
    },
    // Add more questions and answers as needed
  ];
  return (
    <div>
      <div className="flex justify-center mt-8 ">
        <HeroBanner text="SERVICES WE GIVE" />
      </div>{" "}
      <HomeSection sections={sections} />
      <div className="px-4 md:px-8 lg:px-16 mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Enquiry Form
        </h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-8">
          More than just a business card – a complete digital identity solution
          with features that keep you connected.
        </p>
        <EnquiryForm />
      </div>
      <GalarySection
        headingTitle="Sliders"
        headingDescription="More than just a business card – a complete digital identity solution with features that keep you connected."
        blogData={blogData}
      />
      <BlogsSection
        headingTitle="Blogs Section"
        headingDescription="Keep abreast with the most recent developments, patterns, and advice on NFC business cards with online profiles in Mumbai and elsewhere. Our site offers something for everyone, regardless of whether you're a corporate professional, freelancer, or small business owner."
        blogData={blogData}
      />
      <FrequentlyAskedQuestions
        title="Frequently Asked Questions"
        description="Select the perfect package for your networking needs, from individual cards to enterprise solutions."
        faqs={faqsData}
      />
      <AllFooter />
    </div>
  );
}
