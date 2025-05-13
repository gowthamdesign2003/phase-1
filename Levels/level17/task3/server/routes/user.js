// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users — Create a new user
router.post('/', async (req, res) => {
  const { name, email, age } = req.body;

  // Basic input validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  if (age && age < 18) {
    return res.status(400).json({ error: 'Age must be at least 18' });
  }

  try {
    const user = new User({ name, email, age });
    const savedUser = await user.save();
    res.status(201).json(savedUser); // Success
  } catch (error) {
    // Duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    // Other server/database errors
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
