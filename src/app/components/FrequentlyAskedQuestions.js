"use client"; // Marking this as a Client Component

import { useEffect, useState } from 'react';

const FrequentlyAskedQuestions = ({ faqs }) => { // Accept faqs as a prop
  const [activeIndex, setActiveIndex] = useState(null); // Track the currently active question
  const [displayedAnswer, setDisplayedAnswer] = useState(''); // Track the displayed answer

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      // If it's already active, reset
      setActiveIndex(null);
      setDisplayedAnswer(''); // Reset displayed answer
    } else {
      // Set the active index and start typing
      setActiveIndex(index);
      typeAnswer(faqs[index].answer);
    }
  };

  const typeAnswer = (answer) => {
    let i = 0;
    setDisplayedAnswer(''); // Clear previous answer
    const typingInterval = setInterval(() => {
      if (i < answer.length) {
        setDisplayedAnswer(prev => prev + answer[i]);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjust typing speed (ms)
  };

  return (
    <div className="container mx-auto p-6">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <div
            className="flex items-center justify-between p-4 border rounded cursor-pointer"
            onClick={() => toggleAnswer(index)}
          >
            <span className="font-semibold text-lg">{faq.question}</span>
            <span className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}>
              ▼ {/* Dropdown icon */}
            </span>
          </div>
          {activeIndex === index && (
            <div className="p-4 bg-gray-100 rounded mt-2">
              <p className="text-sm sm:text-base break-words whitespace-pre-wrap">{displayedAnswer}</p> {/* Display the animated answer */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FrequentlyAskedQuestions;
