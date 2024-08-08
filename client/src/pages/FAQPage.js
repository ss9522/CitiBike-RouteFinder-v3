import React from 'react';
import FAQ from '../components/FAQ';
import { faqData } from '../data/faqData';

const FAQPage = () => {
  console.log('faqData:', faqData); // Add this line for debugging

  return (
    <div className="page-content">
      <h1>Frequently Asked Questions</h1>
      {faqData ? <FAQ faqData={faqData} /> : <p>Loading...</p>}
    </div>
  );
};

export default FAQPage;