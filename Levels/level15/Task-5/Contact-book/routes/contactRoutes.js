// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const validator = require('validator');

// Add a new contact
router.post('/add', async (req, res) => {
  const { name, email, phone, address, group } = req.body;

  // Input validation
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required.' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    const newContact = new Contact({ name, email, phone, address, group });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search contacts by name or group
router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const contacts = await Contact.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { group: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update contact information
router.put('/:id', async (req, res) => {
  const { name, email, phone, address, group } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, group },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found.' });
    }
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found.' });
    }
    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
