const express = require('express');
const path = require('path');
const mongoose = require('./db'); // Load and run the db.js file
const User = require('./models/User');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files from the React app
const buildPath = path.join(__dirname, 'client/build');
console.log(`Serving static files from ${buildPath}`);
app.use(express.static(buildPath));

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

// Catchall handler to serve the React app for any other request
app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  console.log(`Serving index.html from ${indexPath}`);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error(`Error serving index.html: ${err}`);
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});