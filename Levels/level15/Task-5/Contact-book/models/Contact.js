// models/Contact.js
const mongoose = require('mongoose');

// Contact schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  group: { type: String },  // Contact category/group
});

// Create the Contact model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
