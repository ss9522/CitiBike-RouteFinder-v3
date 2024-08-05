import React from 'react';

function FAQPage() {
  return (
    <div className="page-content">
      <h1>Frequently Asked Questions</h1>
      <ul>
        <li>
          <strong>Q:</strong> How do I start using Citibike?
          <br />
          <strong>A:</strong> Simply sign up and start exploring routes!
        </li>
        <li>
          <strong>Q:</strong> How can I save my favorite routes?
          <br />
          <strong>A:</strong> You can save routes once you create an account and log in.
        </li>
      </ul>
    </div>
  );
}

export default FAQPage;