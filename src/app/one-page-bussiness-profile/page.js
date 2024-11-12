// src/app/nfc-card/page.js
import Hero from '../components/Hero'; // Adjust the import path as necessary
import AllCards from '../components/AllCards'; // Import the AllCards component
import Pricing from '../components/Pricing'; // Import the Pricing component
import DemoVideos from '../components/DemoVideos'; // Import the DemoVideos component
import HowItWorks from '../components/HowItWorks'; // Import the HowItWorks component
import Samples from '../components/Samples'; // Import the Samples component
import Benefits from '../components/Benefits'; // Import the Benefits component
import FrequentlyAskedQuestions from '../components/FrequentlyAskedQuestions';
import OtherServices from '../components/OtherServices'; // Import the OtherServices component
import AllFooter from '../components/AllFooter';
const cardsData = [
  {
    id: 1,
    icon: 'https://via.placeholder.com/100',
    title: 'Card 1',
    description: 'Description for Card 1.',
  },
  {
    id: 2,
    icon: 'https://via.placeholder.com/100',
    title: 'Card 2',
    description: 'Description for Card 2.',
  },
  {
    id: 3,
    icon: 'https://via.placeholder.com/100',
    title: 'Card 3',
    description: 'Description for Card 3.',
  },
  {
    id: 4,
    icon: 'https://via.placeholder.com/100',
    title: 'Card 4',
    description: 'Description for Card 4.',
  },
  {
    id: 5,
    icon: 'https://via.placeholder.com/100',
    title: 'Card 5',
    description: 'Description for Card 5.',
  },
  {
    id: 6,
    icon: 'https://via.placeholder.com/100',
    title: 'Card 6',
    description: 'Description for Card 6.',
  },
];

const HowItWorkscardsData = [
    {
      id: 1,
      icon: 'https://via.placeholder.com/100',
      title: 'Card 1',
      description: 'Description for Card 1.',
    },
    {
      id: 2,
      icon: 'https://via.placeholder.com/100',
      title: 'Card 2',
      description: 'Description for Card 2.',
    },
    {
      id: 3,
      icon: 'https://via.placeholder.com/100',
      title: 'Card 3',
      description: 'Description for Card 3.',
    },

  ];

  const productsData = [
    {
      id: 1,
      icon: 'https://via.placeholder.com/150',
      title: 'Product 1',
      description: '$10.00',
    },
    {
      id: 2,
      icon: 'https://via.placeholder.com/150',
      title: 'Product 2',
      description: '$15.00',
    },
    {
      id: 3,
      icon: 'https://via.placeholder.com/150',
      title: 'Product 3',
      description: '$20.00',
    },
    // Add more products as needed
  ];
  
// Define the pricing data here
const pricingData = [
  {
    id: 1,
    title: '7-Days Trial',
    features: [
      'No. of Users Visited',
      'Physical NFC Card',
      'Unlimited Sharing',
      'Click To Call',
      'Click To WhatsApp',
      'Click To Email',
      'Website Link',
    ],
  },
  {
    id: 2,
    title: '1 Year',
    features: [
      'No. of Users Visited',
      'Physical NFC Card',
      'Unlimited Sharing',
      'Click To Call',
      'Click To WhatsApp',
      'Click To Email',
      'Website Link',
    ],
  },
  {
    id: 3,
    title: '3 Years',
    features: [
      'No. of Users Visited',
      'Physical NFC Card',
      'Unlimited Sharing',
      'Click To Call',
      'Click To WhatsApp',
      'Click To Email',
      'Website Link',
    ],
  },
  {
    id: 4,
    title: '5 Years',
    features: [
      'No. of Users Visited',
      'Physical NFC Card',
      'Unlimited Sharing',
      'Click To Call',
      'Click To WhatsApp',
      'Click To Email',
      'Website Link',
    ],
  },
];
const demoVideos = [
    'https://www.youtube.com/embed/VIDEO_ID_1',
    'https://www.youtube.com/embed/VIDEO_ID_2',
    'https://www.youtube.com/embed/VIDEO_ID_3',
    // Add more video links as needed
  ];
  
  const sampleImages = [
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/300x210',
    'https://via.placeholder.com/300x220',
    'https://via.placeholder.com/300x230',
    'https://via.placeholder.com/300x240',
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/300x200',
    // Add more images as needed
  ];

  const benefitsData = [
    {
      id: 1,
      title: 'Benefit 1',
      description: 'Description of Benefit 1.',
    },
    {
      id: 2,
      title: 'Benefit 2',
      description: 'Description of Benefit 2.',
    },
    {
      id: 3,
      title: 'Benefit 3',
      description: 'Description of Benefit 3.',
    },
    {
      id: 4,
      title: 'Benefit 4',
      description: 'Description of Benefit 4.',
    },
    {
        id: 4,
        title: 'Benefit 4',
        description: 'Description of Benefit 4.',
      },
      {
        id: 4,
        title: 'Benefit 4',
        description: 'Description of Benefit 4.',
      },
    // Add more benefits as needed
  ];

  const faqsData = [
    {
      question: 'What is an NFC card?',
      answer: 'An NFC card is a type of card that uses Near Field Communication technology to transmit data to compatible devices when in close proximity.',
    },
    {
      question: 'How do I use the NFC card?',
      answer: 'You can use the NFC card by tapping it against an NFC-enabled device, which will read the information stored on the card.',
    },
    {
      question: 'What are the benefits of using NFC cards?',
      answer: 'NFC cards provide quick and easy access to information, making them ideal for business cards, payments, and more.',
    },
    // Add more questions and answers as needed
  ];

  const servicesData = [
    {
      image: 'https://via.placeholder.com/400x250',
      title: 'Service 1',
      description: 'Description for Service 1.',
      link: '#',
    },
    {
      image: 'https://via.placeholder.com/300x200',
      title: 'Service 2',
      description: 'Description for Service 2.',
      link: '#',
    },
    // Add more services as needed
  ];
  
  <OtherServices services={servicesData} />
  
export default function onepagebussinessprofile() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">NFC Card</h1>
        <p>This is the NFC Card page. Here you can find information about NFC cards.</p>
      </div>
      <AllCards cardsData={cardsData} /> {/* Pass the cardsData as props */}
      <Pricing pricingData={pricingData} /> {/* Pass the pricingData as props */}

    
      {/* Demo Video Section */}
        <h2 className="text-3xl font-bold mb-4 text-center">Demo Videos</h2>
        <DemoVideos videos={demoVideos} /> {/* Pass video data as props */}

      {/* How It Works Section */}
        <h2 className="text-3xl font-bold mb-4 text-center">How It Works</h2>
        <HowItWorks cardsData={HowItWorkscardsData} />

      {/* Samples Section */}
        <h2 className="text-3xl font-bold mb-4 text-center">Samples</h2>
        <Samples images={sampleImages} /> {/* Pass image data as props */}

        <h2 className="text-3xl font-bold mb-4 text-center">Benefits</h2>
        <Benefits benefitsData={benefitsData} />

        <h2 className="text-3xl font-bold mb-4 text-center">More Products</h2>
        <AllCards cardsData={productsData} full={true} /> {/* Use full prop for full-width images */}

        <h2 className="text-3xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
        <FrequentlyAskedQuestions faqs={faqsData} /> {/* Pass the FAQs as props */}
        
        <h2 className="text-3xl font-bold mb-4 text-center">Other Services</h2>
        <OtherServices services={servicesData} /> {/* Pass the services data as props */}
        <AllFooter />


    </div>
  );
}
