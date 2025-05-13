const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

// Get all posts by a specific user
router.get('/:id/posts', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const posts = await Post.find({ author: req.params.id }).populate('author');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
