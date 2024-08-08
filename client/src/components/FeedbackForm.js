import React, { useState } from 'react';

function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Submitting...');
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit feedback');
      }
      setSubmitStatus('Feedback submitted successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus(`Failed to submit feedback: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <br />
      <input
        id="name"
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <br /><br />
      <label htmlFor="email">Email:</label>
      <br />
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <br /><br />
      <label htmlFor="message">Feedback:</label>
      <br />
      <textarea
        id="message"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your feedback"
        required
      />
      <br />
      <button type="submit">Submit Feedback</button>
      {submitStatus && <p>{submitStatus}</p>}
    </form>
  );
}

export default FeedbackForm;