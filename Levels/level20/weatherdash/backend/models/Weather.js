const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  location: String,
  date: Date,
  temperature: Number,
  condition: String,
  humidity: Number,
});

module.exports = mongoose.model('Weather', weatherSchema);
