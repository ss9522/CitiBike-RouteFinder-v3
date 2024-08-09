import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';

function ContactPage() {
  return (
    <div className="page-content">
      <div className="page-content">
        <h1>Contact Us</h1>
        <p>If you have any questions or feedback, feel free to reach out!</p>
        <ul>
          <li><a href="mailto:dev1-route-planner@shrsrm.mozmail.com"><b>Email me</b></a></li>
          <li><a href="http://github.shreyas.nyc"><b>Collaborate with me</b></a></li>
          <li><a href="http://linkedin.shreyas.nyc"><b>Connect with me</b></a></li>
        </ul>
        <h2>Feedback Form</h2>
        <p>Your feedback will be stored on a PostgreSQL database hosted on GCP.</p> 
        <p>You can come back to update your feedback by <b>using the same email address</b>.</p>
        <FeedbackForm />
        <div>
            <p>Enter your email address to retrieve previously left feedback.</p>
            <FeedbackList />
        </div>
      </div>
    </div>
    
  );
}

export default ContactPage;