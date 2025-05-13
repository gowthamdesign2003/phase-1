const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/newdata', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
