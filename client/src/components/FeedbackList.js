import React, { useState, useEffect } from 'react';

function FeedbackList() {
  const [email, setEmail] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [error, setError] = useState(null);

  const fetchFeedback = async () => {
    try {
      const response = await fetch(`/api/feedback/byEmail?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      const data = await response.json();
      setFeedbackList(data);
      setError(null);
    } catch (err) {
      setError('Error fetching feedback. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />
      <br /><br />
      <button onClick={fetchFeedback}>Fetch Feedback</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {feedbackList.map((feedback) => (
          <li key={feedback.id}>
            <p><strong>Name:</strong> {feedback.name}</p>
            <p><strong>Email:</strong> {feedback.email}</p>
            <p><strong>Message:</strong> {feedback.message}</p>
            <p><strong>Date:</strong> {new Date(feedback.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;