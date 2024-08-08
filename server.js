const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.FEEDBACK_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware
app.use(express.json());

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Feedback API routes
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Check if a record with this email already exists
    const existingRecord = await pool.query(
      'SELECT * FROM feedback WHERE email = $1',
      [email]
    );

    let result;
    if (existingRecord.rows.length > 0) {
      // Update existing record
      result = await pool.query(
        'UPDATE feedback SET name = $1, message = $2, created_at = CURRENT_TIMESTAMP WHERE email = $3 RETURNING *',
        [name, message, email]
      );
      console.log('Feedback updated for email:', email);
    } else {
      // Insert new record
      result = await pool.query(
        'INSERT INTO feedback (name, email, message) VALUES ($1, $2, $3) RETURNING *',
        [name, email, message]
      );
      console.log('New feedback inserted for email:', email);
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'An error occurred while submitting feedback' });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM feedback ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while retrieving feedback' });
  }
});

app.get('/api/feedback/byEmail', async (req, res) => {
  try {
    const { email } = req.query;
    console.log('Received request for email:', email);
    
    if (!email) {
      console.log('No email provided');
      return res.status(400).json({ error: 'Email address is required' });
    }

    const result = await pool.query(
      'SELECT * FROM feedback WHERE email = $1 ORDER BY created_at DESC',
      [email]
    );

    console.log('Query result:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving feedback by email:', err);
    res.status(500).json({ error: 'An error occurred while retrieving feedback' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Catchall handler to serve the React app for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});