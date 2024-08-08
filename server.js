const express = require('express');
const path = require('path');
const mongoose = require('./db'); // Existing database connection
const feedbackPool = require('./feedbackDb'); // New feedback database connection
const User = require('./models/User');
const Route = require('./models/Route');
const app = express();
const PORT = process.env.PORT || 3000;
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.FEEDBACK_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 10000
});
// Middleware for parsing JSON bodies and new helmet
app.use(express.json());

// Helmet middleware with CSP configuration
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "https://maps.googleapis.com"],
//         styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
//         imgSrc: ["'self'", "https://maps.gstatic.com", "data:"],
//         connectSrc: ["'self'", "https://maps.googleapis.com"],
//         fontSrc: ["'self'", "https://fonts.gstatic.com"],
//       },
//     },
//   })
// );

// Middleware to generate a nonce for inline scripts
const uuid = require('uuid');
app.use((req, res, next) => {
  res.locals.nonce = uuid.v4();
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API connection test route
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API routes for users
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API route to save a route
app.post('/api/routes', async (req, res) => {
  try {
    const { name } = req.body;
    const newRoute = new Route({ name });
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const result = await pool.query(
      'INSERT INTO feedback (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'An error occurred while submitting feedback' });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const result = await feedbackPool.query('SELECT * FROM feedback ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while retrieving feedback' });
  }
});

// Catchall handler to serve the React app for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
