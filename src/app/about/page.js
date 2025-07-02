"use client"; // Next.js Client Component
import Image from "next/image";

import Hero from "../components/Hero";
import AllFooter from "../components/AllFooter";
import SuccessStory from "../components/SuccessStory";
import BlogsSection from "../components/BlogsSection";
import EnquiryForm from "../components/EnquiryForm";
import HeroBanner from "../components/HeroBanner";
import AboutSection from "../components/AboutSection";
import GalarySection from "../components/GalarySection";

const stories = [
  {
    image: "/images/story1.jpg",
    title: "Achieved Big Milestone",
    description: "We helped this client reach 1M users.",
    date: "2024-06-20", // must be in YYYY-MM-DD format
  },
  {
    image: "/images/story2.jpg",
    title: "Another Success",
    description: "Our platform boosted their engagement by 300%.",
    date: "2024-05-12",
  },
  {
    image: "/images/story2.jpg",
    title: "Another Success",
    description: "Our platform boosted their engagement by 300%.",
    date: "2024-05-12",
  },
  // Add more stories if needed
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
export default function About() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex justify-center px-10 md:px-80">
        <HeroBanner text="ABOUT US" />
      </div>

      {/* Why Digital Card Section */}
      <AboutSection />
      <GalarySection
        headingTitle="Gallery"
        headingDescription="More than just a business card – a complete digital identity solution with features that keep you connected."
        blogData={blogData}
      />
      <SuccessStory
        heading="Success Stories"
        description="Discover how actual professionals and companies are using our contactless cards and NFC cards to revolutionize their growth."
        stories={stories}
      />

      <BlogsSection
        headingTitle="Blogs Section"
        headingDescription="Keep abreast with the most recent developments, patterns, and advice on NFC business cards with online profiles in Mumbai and elsewhere. Our site offers something for everyone, regardless of whether you're a corporate professional, freelancer, or small business owner."
        blogData={blogData}
      />
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
      <AllFooter />
    </>
  );
}
