const express = require('express');
const path = require('path');
const mongoose = require('./db'); // Load and run new db.js file
const User = require('./models/User');
const app = express();
const PORT = process.env.PORT || 5000;

// parsing JSON
app.use(express.json());

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});