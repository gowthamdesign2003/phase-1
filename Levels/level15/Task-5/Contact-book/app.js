// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
const Contact = require('./contactModel');


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// API routes
app.use('/api/contacts', contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  app.post('/contacts', async (req, res) => {
    try {
      const { name, email, phone, address } = req.body;
  
      // Validate inputs (optional)
      if (!name || !email || !phone || !address) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      // Create a new contact
      const contact = new Contact({
        name,
        email,
        phone,
        address
      });
  
      // Save to database
      await contact.save();
  
      res.status(201).json(contact);  // Respond with the created contact
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
