import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';

function ContactPage() {
  return (
    <div className="page-content">
      <h1>Contact Us</h1>
      <p>If you have any questions or feedback, feel free to reach out!</p>
      <div>
        <h2>Feedback Form</h2>
        <p>Send us your feedback below.</p>
        <FeedbackForm />
        <div>
          <h2>Feedback Retrieval</h2>
          <p>Enter your email address to retrieve previously left feedback.</p>
          <FeedbackList />
        </div>
      </div>
    </div>
  );
}

export default ContactPage;