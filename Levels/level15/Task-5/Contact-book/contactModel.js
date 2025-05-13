const mongoose = require('mongoose');

// Define the schema for contacts
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

// Create the Contact model
const Contact = mongoose.model('Contact', contactSchema);

// Export the Contact model for use in other files
module.exports = Contact;
