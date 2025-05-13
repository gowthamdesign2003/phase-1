const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

// GET /api/users?limit=5&skip=0&name=Alice&email=example.com
router.get('/', async (req, res) => {
  try {
    const { limit = 10, skip = 0, name, email } = req.query;

    // Build query dynamically based on filters
    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (email) query.email = { $regex: email, $options: 'i' };

    const users = await User.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

module.exports = router;
