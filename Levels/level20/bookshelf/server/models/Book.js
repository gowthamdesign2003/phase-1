const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  googleId: String,
  title: String,
  authors: [String],
  description: String,
  shelf: { type: String, enum: ['read', 'reading', 'wantToRead'], default: 'wantToRead' }
});

module.exports = mongoose.model('Book', bookSchema);
