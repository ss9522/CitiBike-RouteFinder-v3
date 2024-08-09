import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../pages/FAQ.css'; // Import the CSS file

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={onClick}
      >
        <span className="text-lg font-semibold">{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="faq-answer mt-2 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = ({ faqData }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {faqData.map((item, index) => (
        <FAQItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default FAQ;