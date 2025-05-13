// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to return the User schema fields
router.get('/schema', (req, res) => {
  res.json({
    fields: Object.keys(User.schema.paths)
  });
});

module.exports = router;
