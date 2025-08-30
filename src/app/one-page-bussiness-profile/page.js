// src/app/nfc-card/page.js
"use client"; // Next.js Client Component
import { useEffect, useState } from "react";
import api from "../apiConfig/axiosConfig";
import Hero from "../components/HeroBussiness"; // Adjust the import path as necessary
import AllCards from "../components/AllCards"; // Import the AllCards component
import Pricing from "../components/Pricing"; // Import the Pricing component
import DemoVideos from "../components/DemoVideos"; // Import the DemoVideos component
import HowItWorks from "../components/HowItWorks"; // Import the HowItWorks component
import Samples from "../components/Samples"; // Import the Samples component
import Benefits from "../components/Benefits"; // Import the Benefits component
import FrequentlyAskedQuestions from "../components/FrequentlyAskedQuestions";
import OtherServices from "../components/OtherServices"; // Import the OtherServices component
import AllFooter from "../components/AllFooter";
import FeaturesCard from "../components/FeaturesCard";
import SeeHowItWorks from "../components/seeHowItWorks";
import BeneficialFor from "../components/BeneficialFor";
import CountStats from "../components/CountStats";
import PrintAndDeliver from "../components/PrintAndDeliver";
import Testimonials from "../components/Testimonials";
import BestSellers from "../components/BestSellers";
import SuccessStory from "../components/SuccessStory";
import BlogsSection from "../components/BlogsSection";
import AdditionalServices from "../components/AdditionalServices";
import OurMoreProducts from "../components/OurMoreProducts";
import DifferentTypeCards from "../components/DifferentTypeCards";

const cardsData = [
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
];
const demoVideos = [
  "https://www.youtube.com/embed/VIDEO_ID_1",
  "https://www.youtube.com/embed/VIDEO_ID_2",
  "https://www.youtube.com/embed/VIDEO_ID_3",
  // Add more video links as needed
];

const benefitsData = [
  {
    id: 1,
    icon: "https://via.placeholder.com/50",
    title: "Benefit 1",
    description: "Description of Benefit 1.",
  },
  {
    id: 2,
    icon: "https://via.placeholder.com/50",
    title: "Benefit 2",
    description: "Description of Benefit 2.",
  },
  {
    id: 3,
    icon: "https://via.placeholder.com/50",
    title: "Benefit 3",
    description: "Description of Benefit 3.",
  },
  {
    id: 4,
    icon: "https://via.placeholder.com/50",
    title: "Benefit 4",
    description: "Description of Benefit 4.",
  },
  {
    id: 5,
    icon: "https://via.placeholder.com/50",
    title: "Benefit 4",
    description: "Description of Benefit 4.",
  },
  {
    id: 6,
    icon: "https://via.placeholder.com/50",
    title: "Benefit 4",
    description: "Description of Benefit 4.",
  },
  // Add more benefits as needed
];

const statsData = [
  { count: "12M+", label: "Products Sold" },
  { count: "500K+", label: "Happy Customers" },
  { count: "1.2M+", label: "NFC Cards Issued" },
  { count: "95%", label: "Positive Feedback" },
];
const deliverySteps = [
  { id: 1, image: "/images/step1.png", text: "Printed with Precision" },
  { id: 2, image: "/images/step2.png", text: "Carefully Packaged" },
  { id: 3, image: "/images/step3.png", text: "Dispatched Swiftly" },
  { id: 4, image: "/images/step4.png", text: "Delivered to Your Doorstep" },
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

export default function Onepagebussinessprofile() {
  const [differenttypecardsimages, setDifferentTypeCardsImages] = useState([]);
  const [HowItWorkscardsData, setHowCardsWorkImages] = useState([]);
  const [benficalFor, setBeneficialForImages] = useState([]);
  const [sampleImages, setSampleCardsImages] = useState([]);
  const [bestSellerImages, setOurBestsellersImages] = useState([]);
  const [stories, setSuccessStoriesImages] = useState([]);

  const fetchMedia = async () => {
    try {
      const { data } = await api.get("/api/landing", {
        params: { page: "OnePageBusinessProfile" },
      });
      // console.log(data);
      data.forEach((item) => {
        const images = item.media
          ?.filter((m) => m.mediaType === "image")
          ?.map((m) => m.cloudinaryUrl); // Use cloudinaryUrl directly

        switch (item.section) {
          case "Different Type Of Cards":
            setDifferentTypeCardsImages(images);
            break;
          case "How Cards Work":
            setHowCardsWorkImages(images);
            break;
          case "Beneficial For":
            setBeneficialForImages(images);
            break;
          case "Sample Cards":
            setSampleCardsImages(images);
            break;
          case "Our Bestsellers":
            setOurBestsellersImages(images);
            break;
          case "Success Stories":
            setSuccessStoriesImages(images);
            break;
          default:
            break;
        }
      });
    } catch (err) {
      console.error("Failed to fetch media", err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);
  return (
    <div className="bg-white">
      <Hero />
      <FeaturesCard
        headingTitle="Features Of One Page Business Profile"
        headingDescription="More than just a business card – a complete digital identity solution with features that keep you connected."
        cardsData={cardsData}
      />
      <SeeHowItWorks
        title="See How One Page Business Profile Work"
        description="See how our Tap-and-Share NFC Business Cards in Mumbai work with a simple tap. No apps, no hassle — just contactless networking at your fingertips."
        videos={demoVideos}
        cardsData={HowItWorkscardsData}
      />
      <Benefits
        title="Advantages Of Using One Page Business Profile"
        description="More than just a business card – a complete digital identity solution with features that keep you connected."
        benefitsData={benefitsData}
      />
      <BeneficialFor
        headingTitle="Beneficial for"
        headingDescription="Our technology serves professionals across all industries looking to make meaningful connections."
        benficalData={benficalFor}
      />
      <CountStats stats={statsData} />

      <Testimonials
        heading="Testimonials"
        description="Our technology serves professionals across all industries looking to make meaningful connections."
      />
      <Samples
        heading="Sample One Page Business Profile"
        description="Each NFC card links to a customizable digital profile. Here are some examples of what yours could look like."
        sideHeading="Service Catalog with Direct Links"
        sideHeadingDescription="Use NFC smart cards with customizable templates to showcase offerings by emphasizing services, prices, and clickable links."
        images={sampleImages}
      />
      <BestSellers
        heading="Our Bestsellers"
        description="Discover how actual professionals and companies are using our contactless cards and NFC cards to revolutionize their growth."
        images={bestSellerImages}
      />
      <SuccessStory
        heading="Success Stories"
        description="Discover how actual professionals and companies are using our contactless cards and NFC cards to revolutionize their growth."
        stories={stories}
      />
      <Pricing
        heading="Subscription Plan"
        description="Select the perfect package for your networking needs, from individual cards to enterprise solutions."
      />
      <BlogsSection
        headingTitle="Blogs Section"
        headingDescription="Keep abreast with the most recent developments, patterns, and advice on NFC business cards with online profiles in Mumbai and elsewhere. Our site offers something for everyone, regardless of whether you're a corporate professional, freelancer, or small business owner."
      />
      <FrequentlyAskedQuestions
        title="Frequently Asked Questions"
        description="Select the perfect package for your networking needs, from individual cards to enterprise solutions."
        faqs={faqsData}
      />
      <AdditionalServices
        headingTitle="Our Additional Services"
        headingDescription="Select the perfect package for your networking needs, from individual cards to enterprise solutions."
      />
      <OurMoreProducts
        headingTitle="Our More Products"
        headingDescription="Select the perfect package for your networking needs, from individual cards to enterprise solutions."
      />

      <AllFooter />
    </div>
  );
}
