const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

// Create a post
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const user = await User.findById(author);
    if (!user) return res.status(404).json({ error: 'Author not found' });

    const post = new Post({ title, content, author });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts with populated author
router.get('/', async (req, res) => {
  try {
    const query = {};
    if (req.query.author) {
      query.author = req.query.author;
    }

    const posts = await Post.find(query).populate('author');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
