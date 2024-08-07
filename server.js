const express = require('express');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('./db'); // Load and run the db.js file
const User = require('./models/User');
const Route = require('./models/Route'); // Add the Route model
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies and new helmet
app.use(express.json());
app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://maps.googleapis.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "https://maps.googleapis.com"],
      },
    },
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API route (example)
app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from the server!' });
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

// Catchall handler to serve the React app for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
